<?php

namespace App\Services;

use App\Repositories\ReservationRepository;
use Carbon\Carbon;
use Carbon\CarbonPeriod;
use Illuminate\Support\Facades\Log;
use Illuminate\Support\Facades\Mail;

class ReservationService
{
    public function __construct(
        protected ReservationRepository $reservationRepository,
        protected SettingsService $settingsService
    ) {}

 public function getAvailableSlots(string $date, int $partySize): array
{
    if ($this->reservationRepository->isDateBlocked($date)) {
        return [];
    }

    $settings     = $this->settingsService->getAll();
    $openingHours = json_decode($settings['opening_hours'] ?? '[]', true);
    $dayName      = Carbon::parse($date)->locale('en')->format('l'); // ← en مهم
    $daySchedule  = collect($openingHours)->firstWhere('day', $dayName);

    if (! $daySchedule || ! ($daySchedule['is_open'] ?? true)) {
        return [];
    }

    $openTime     = Carbon::parse($daySchedule['open_time']  ?? '12:00');
    $closeTime    = Carbon::parse($daySchedule['close_time'] ?? '23:00');
    $slotDuration = (int) ($settings['slot_duration']        ?? 30);
    $maxCovers    = (int) ($settings['max_covers_per_slot']  ?? 20);

    $period = CarbonPeriod::since($openTime->format('H:i'))
        ->minutes($slotDuration)
        ->until($closeTime->subMinutes($slotDuration)->format('H:i'));

    $existingReservations = $this->reservationRepository->getByDate($date);

    $availableSlots = [];
    foreach ($period as $slot) {
        // ← H:i بدل H:i:s للمقارنة الصحيحة
        $timeString = $slot->format('H:i');

        $coversUsed = $existingReservations
            ->where('time_slot', $timeString)
            ->sum('party_size');

        if (($coversUsed + $partySize) <= $maxCovers) {
            $availableSlots[] = $slot->format('H:i');
        }
    }

    return $availableSlots;
}

    public function createReservation(array $data)
    {
        return $this->reservationRepository->create($data);
    }

    public function createFromAi(array $data): array
{
    // ── 1. التحقق من أن التاريخ مستقبلي ──────────────────────────
    if (Carbon::parse($data['date'])->startOfDay()->isPast()) {
        return [
            'success' => false,
            'error'   => 'التاريخ المحدد في الماضي. يرجى اختيار تاريخ مستقبلي.',
        ];
    }

    // ── 2. جلب الأوقات المتاحة ────────────────────────────────────
    $availableSlots = $this->getAvailableSlots(
        $data['date'],
        $data['party_size']
    );

    if (empty($availableSlots)) {
        return [
            'success' => false,
            'error'   => 'لا توجد أوقات متاحة في هذا التاريخ.',
        ];
    }

    // ── 3. التحقق من الوقت المطلوب ───────────────────────────────
    $requestedTime = Carbon::parse($data['time_slot'])->format('H:i');

    if (! collect($availableSlots)->contains($requestedTime)) {
        return [
            'success'         => false,
            'error'           => "الوقت {$requestedTime} غير متاح.",
            'available_slots' => $availableSlots,
        ];
    }

    // ── 4. تحديد الحالة ───────────────────────────────────────────
    $status      = 'pending';
    $confirmedAt = null;

    if ($this->settingsService->get('auto_confirm_reservations') === 'true') {
        $status      = 'confirmed';
        $confirmedAt = now();
    }

    // ── 5. إنشاء الحجز ───────────────────────────────────────────
    $reservation = $this->reservationRepository->create([
        'user_id'          => $data['user_id']          ?? null,
        'name'             => $data['name'],
        'email'            => $data['email']            ?? null,
        'phone'            => $data['phone'],
        'date'             => $data['date'],
        'time_slot'        => $requestedTime . ':00',
        'party_size'       => $data['party_size'],
        'special_requests' => $data['special_requests'] ?? null,
        'status'           => $status,
        'confirmed_at'     => $confirmedAt,
    ]);

    // ── 6. إرسال بريد التأكيد ────────────────────────────────────
    if ($reservation->email) {
        try {
            Mail::to($reservation->email)
                ->send(new \App\Mail\ReservationConfirmedMail($reservation));
        } catch (\Exception $e) {
            Log::warning('فشل إرسال بريد التأكيد: ' . $e->getMessage());
        }
    }

    // ── 7. إرجاع النتيجة ─────────────────────────────────────────
    return [
        'success'        => true,
        'reservation_id' => $reservation->id,
        'status'         => $status,
        'summary'        => [
            'الاسم'        => $reservation->name,
            'الهاتف'       => $reservation->phone,
            'البريد'       => $reservation->email ?? 'غير محدد',
            'التاريخ'      => Carbon::parse($reservation->date)
                                ->translatedFormat('l، j F Y'),
            'الوقت'        => Carbon::parse($reservation->time_slot)
                                ->format('h:i A'),
            'عدد_الأشخاص' => $reservation->party_size,
            'طلبات_خاصة'  => $reservation->special_requests ?? 'لا يوجد',
            'حالة_الحجز'  => $status === 'confirmed' ? 'مؤكد ✓' : 'قيد الانتظار',
        ],
    ];
}
}