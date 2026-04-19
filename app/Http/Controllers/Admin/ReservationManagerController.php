<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\Reservation;
use App\Repositories\ReservationRepository;
use Illuminate\Http\Request;
use Inertia\Inertia;

class ReservationManagerController extends Controller
{
    public function __construct(
        protected ReservationRepository $reservationRepository
    ) {}

    public function index(Request $request)
    {
        $query = Reservation::with('user')->orderBy('date', 'desc')->orderBy('time_slot', 'desc');

        if ($request->has('status')) {
            $query->where('status', $request->status);
        }

        if ($request->has('date')) {
            $query->where('date', $request->date);
        }

        return Inertia::render('Admin/Reservations/Index', [
            'reservations' => $query->paginate(20),
            'filters' => $request->only(['status', 'date']),
        ]);
    }

    public function updateStatus(Request $request, Reservation $reservation)
    {
        $validated = $request->validate([
            'status' => 'required|in:pending,confirmed,seated,completed,cancelled',
            'cancellation_reason' => 'nullable|string',
        ]);

        $this->reservationRepository->updateStatus(
            $reservation, 
            $validated['status'], 
            $validated['cancellation_reason'] ?? null
        );

        return back()->with('success', "Reservation status updated to {$validated['status']}.");
    }

    public function exportCsv()
    {
        $reservations = Reservation::all();
        $filename = "reservations_" . now()->format('Y-m-d') . ".csv";
        
        $handle = fopen('php://temp', 'w+');
        fputcsv($handle, ['ID', 'Name', 'Email', 'Phone', 'Date', 'Time', 'Party Size', 'Status']);

        foreach ($reservations as $res) {
            fputcsv($handle, [
                $res->id, $res->name, $res->email, $res->phone, 
                $res->date->toDateString(), $res->time_slot, 
                $res->party_size, $res->status
            ]);
        }

        rewind($handle);
        $content = stream_get_contents($handle);
        fclose($handle);

        return response($content)
            ->header('Content-Type', 'text/csv')
            ->header('Content-Disposition', "attachment; filename={$filename}");
    }
}
