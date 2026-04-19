<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class AiConversation extends Model
{
    protected $fillable = ['session_id', 'user_id', 'last_activity_at'];

    protected $casts = [
        'last_activity_at' => 'datetime',
    ];

    public function user()
    {
        return $this->belongsTo(User::class);
    }

    public function messages()
    {
        return $this->hasMany(AiMessage::class, 'conversation_id');
    }

    public function runs()
    {
        return $this->hasMany(AiRun::class, 'conversation_id');
    }
}
