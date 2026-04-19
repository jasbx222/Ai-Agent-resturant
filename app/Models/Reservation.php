<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Reservation extends Model
{
    protected $fillable = [
        'user_id', 'name', 'email', 'phone', 'party_size', 
        'date', 'time_slot', 'status', 'special_requests', 
        'notes', 'confirmed_at', 'cancelled_at', 'cancellation_reason'
    ];

    protected $casts = [
        'date' => 'date',
        'party_size' => 'integer',
        'confirmed_at' => 'datetime',
        'cancelled_at' => 'datetime',
    ];

    public function user()
    {
        return $this->belongsTo(User::class);
    }
}
