<?php

namespace App\Repositories;

use App\Models\Reservation;
use App\Models\BlockedDate;
use Carbon\Carbon;

class ReservationRepository
{
    public function getUpcoming(int $days = 14)
    {
        return Reservation::where('date', '>=', now()->toDateString())
            ->where('date', '<=', now()->addDays($days)->toDateString())
            ->orderBy('date')
            ->orderBy('time_slot')
            ->get();
    }

    public function getByDate(string $date)
    {
        return Reservation::where('date', $date)
            ->where('status', '!=', 'cancelled')
            ->get();
    }

    public function find(int $id)
    {
        return Reservation::findOrFail($id);
    }

    public function create(array $data)
    {
        return Reservation::create($data);
    }

    public function updateStatus(Reservation $reservation, string $status, ?string $reason = null)
    {
        $update = ['status' => $status];
        
        if ($status === 'confirmed') {
            $update['confirmed_at'] = now();
        } elseif ($status === 'cancelled') {
            $update['cancelled_at'] = now();
            $update['cancellation_reason'] = $reason;
        }

        $reservation->update($update);
        return $reservation;
    }

    public function isDateBlocked(string $date)
    {
        return BlockedDate::where('date', $date)->exists();
    }

    public function getUserHistory(int $userId)
    {
        return Reservation::where('user_id', $userId)
            ->orderBy('date', 'desc')
            ->get();
    }
}
