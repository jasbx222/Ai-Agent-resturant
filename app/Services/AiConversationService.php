<?php

namespace App\Services;

use App\Repositories\AiRunRepository;
use Illuminate\Support\Facades\Session;

class AiConversationService
{
    public function __construct(
        protected AiRunRepository $aiRunRepository
    ) {}

    public function getOrCreateConversationForSession(?int $userId = null)
    {
        $sessionId = Session::getId();
        $conversation = $this->aiRunRepository->getConversation($sessionId);

        if (!$conversation) {
            $conversation = $this->aiRunRepository->createConversation($sessionId, $userId);
        } elseif ($userId && !$conversation->user_id) {
            $conversation->update(['user_id' => $userId]);
        }

        return $conversation;
    }

    public function recordMessage(int $conversationId, string $role, string $content)
    {
        return $this->aiRunRepository->addMessage($conversationId, $role, $content);
    }

    public function logRun(int $conversationId, array $runData)
    {
        $runData['conversation_id'] = $conversationId;
        return $this->aiRunRepository->logRun($runData);
    }

    public function getRecentHistory(int $conversationId, int $limit = 20)
    {
        return $this->aiRunRepository->getLatestMessages($conversationId, $limit);
    }
}
