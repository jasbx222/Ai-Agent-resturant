<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\Reservation;
use Illuminate\Http\Request;
use Inertia\Inertia;

class ReservationController extends Controller
{
    public function index(Request $request)
    {
        $status = $request->query('status');
        $date = $request->query('date');

        $query = Reservation::query()->latest();

        if ($status) {
            $query->where('status', $status);
        }

        if ($date) {
            $query->whereDate('date', $date);
        }

        return Inertia::render('Admin/Reservations/Index', [
            'reservations' => $query->get(),
            'filters' => $request->only(['status', 'date']),
            'header' => 'إدارة الحجوزات'
        ]);
    }

    public function updateStatus(Request $request, Reservation $reservation)
    {
        $validated = $request->validate([
            'status' => 'required|in:pending,confirmed,cancelled'
        ]);

        $reservation->update($validated);

        return back()->with('success', 'تم تحديث حالة الحجز بنجاح');
    }

    public function destroy(Reservation $reservation)
    {
        $reservation->delete();
        return back()->with('success', 'تم حذف الحجز بنجاح');
    }
}
