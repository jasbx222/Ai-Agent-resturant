<?php

namespace App\Http\Controllers\Public;

use App\Http\Controllers\Controller;
use App\Services\ReservationService;
use Illuminate\Http\Request;
use Inertia\Inertia;

class ReservationController extends Controller
{
    public function __construct(
        protected ReservationService $reservationService
    ) {}

    public function index()
    {
        return Inertia::render('Reserve/Reservation', [
            'seo' => [
                'title' => 'حجز طاولة | مائدة الشيف',
                'description' => 'احجز طاولتك الآن بكل سهولة. اختر التاريخ والوقت المفضل وعدد الضيوف.',
            ]
        ]);
    }

    public function store(Request $request)
    {
        $validated = $request->validate([
            'name' => 'required|string|max:255',
            'email' => 'required|email|max:255',
            'phone' => 'required|string|max:20',
            'date' => 'required|date|after_or_equal:today',
            'time_slot' => 'required',
            'party_size' => 'required|integer|min:1|max:20',
            'special_requests' => 'nullable|string',
        ]);

        $reservation = $this->reservationService->createReservation($validated);

        // Convert data to Arabic summary
        $dateStr = date('Y-m-d', strtotime($reservation->date));
        
        return back()->with('success', [
            'id' => $reservation->id,
            'summary' => "شكراً لك يا {$reservation->name}. تم استلام طلب حجزكم لعدد {$reservation->party_size} أشخاص بتاريخ {$dateStr} الساعة {$reservation->time_slot}. طلبكم قيد التأكيد حالياً.",
        ]);
    }

    public function checkAvailability(Request $request)
    {
        $request->validate([
            'date' => 'required|date',
            'party_size' => 'required|integer|min:1',
        ]);

        $slots = $this->reservationService->getAvailableSlots(
            $request->date,
            (int)$request->party_size
        );

        return response()->json(['slots' => $slots]);
    }
}
