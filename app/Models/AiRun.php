<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class AiRun extends Model
{
    protected $fillable = [
        'conversation_id',  'input_tokens', 
        'output_tokens', 'tools_called', 'duration_ms'
    ];

    protected $casts = [
        'tools_called' => 'array',
        'input_tokens' => 'integer',
        'output_tokens' => 'integer',
        'duration_ms' => 'integer',
    ];

    public function conversation()
    {
        return $this->belongsTo(AiConversation::class, 'conversation_id');
    }
}
