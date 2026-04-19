<?php

namespace App\Repositories;

use App\Models\AiRun;
use App\Models\AiConversation;
use App\Models\AiMessage;

class AiRunRepository
{
    public function logRun(array $data)
    {
        return AiRun::create($data);
    }

    public function getConversation(string $sessionId)
    {
        return AiConversation::with('messages')
            ->where('session_id', $sessionId)
            ->first();
    }

    public function createConversation(string $sessionId, ?int $userId = null)
    {
        return AiConversation::create([
            'session_id' => $sessionId,
            'user_id' => $userId,
            'last_activity_at' => now(),
        ]);
    }

    public function addMessage(int $conversationId, string $role, string $content)
    {
        return AiMessage::create([
            'conversation_id' => $conversationId,
            'role' => $role,
            'content' => $content,
        ]);
    }

    public function getLatestMessages(int $conversationId, int $limit = 20)
    {
        return AiMessage::where('conversation_id', $conversationId)
            ->orderBy('created_at', 'desc')
            ->limit($limit)
            ->get()
            ->reverse();
    }
}
