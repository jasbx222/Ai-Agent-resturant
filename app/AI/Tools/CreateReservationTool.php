<?php

namespace App\AI\Tools;

use App\Services\ReservationService;
use Illuminate\Contracts\JsonSchema\JsonSchema;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Log;
use Laravel\Ai\Contracts\Tool;
use Laravel\Ai\Tools\Request;

class CreateReservationTool implements Tool
{
    public function __construct(
        protected ReservationService $reservationService
    ) {}

    public function description(): string
    {
        return 'إنشاء حجز جديد في المطعم. استدعِ هذه الأداة فقط عند اكتمال الحقول الإلزامية: الاسم، الهاتف، التاريخ، الوقت، وعدد الأشخاص.';
    }

    public function handle(Request $request): string
    {
        Log::warning('CreateReservationTool executed');

        $name = $request['name'] ?? null;
        $phone = $request['phone'] ?? null;
        $date = $request['date'] ?? null;
        $timeSlot = $request['time_slot'] ?? null;
        $partySize = (int) ($request['party_size'] ?? 0);
        $email = $request['email'] ?? null;
        $specialRequests = $request['special_requests'] ?? null;

        if (! $name || ! $phone || ! $date || ! $timeSlot || $partySize < 1) {
            return json_encode([
                'success' => false,
                'error' => 'بيانات ناقصة. يرجى تزويد الاسم، الهاتف، التاريخ، الوقت، وعدد الأشخاص (1 على الأقل).',
            ], JSON_UNESCAPED_UNICODE | JSON_PRETTY_PRINT);
        }

        if (! preg_match('/^\d{4}-\d{2}-\d{2}$/', $date)) {
            return json_encode([
                'success' => false,
                'error' => 'صيغة التاريخ غير صحيحة. استخدم YYYY-MM-DD مثل 2026-08-15.',
            ], JSON_UNESCAPED_UNICODE | JSON_PRETTY_PRINT);
        }

        if (! preg_match('/^\d{2}:\d{2}$/', $timeSlot)) {
            return json_encode([
                'success' => false,
                'error' => 'صيغة الوقت غير صحيحة. استخدم HH:MM مثل 19:30.',
            ], JSON_UNESCAPED_UNICODE | JSON_PRETTY_PRINT);
        }

        $result = $this->reservationService->createFromAi([
            'user_id' => Auth::id(),
            'name' => $name,
            'email' => $email,
            'phone' => $phone,
            'date' => $date,
            'time_slot' => $timeSlot,
            'party_size' => $partySize,
            'special_requests' => $specialRequests,
        ]);

        Log::info('CreateReservationTool result', is_array($result) ? $result : ['result' => $result]);

        return json_encode($result, JSON_UNESCAPED_UNICODE | JSON_PRETTY_PRINT);
    }

    public function schema(JsonSchema $schema): array
    {
        return [
            'name' => $schema->string()->description('اسم الضيف')->required(),
            'phone' => $schema->string()->description('رقم الهاتف')->required(),
            'date' => $schema->string()->description('التاريخ بصيغة YYYY-MM-DD')->required(),
            'time_slot' => $schema->string()->description('الوقت بصيغة HH:MM')->required(),
            'party_size' => $schema->integer()->description('عدد الأشخاص')->required(),
            'email' => $schema->string()->description('البريد الإلكتروني إن وجد')->nullable(),
            'special_requests' => $schema->string()->description('طلبات خاصة إن وجدت')->nullable(),
        ];
    }
}