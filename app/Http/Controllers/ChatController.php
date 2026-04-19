<?php

namespace App\Http\Controllers;

use App\AI\Agents\RestaurantAgent;
use App\AI\Tools\GetMenuTool;
use App\Services\AiConversationService;
use Illuminate\Http\Request;

class ChatController extends Controller
{
    public function __construct(
        protected AiConversationService $aiConversationService,
        protected RestaurantAgent $agent,
        protected GetMenuTool $getMenuTool,
    ) {}

    public function chat(Request $request)
    {
        $request->validate([
            'message' => ['required', 'string'],
        ]);

        $conversation = $this->aiConversationService->getOrCreateConversationForSession(
            $request->user()?->id
        );

        $this->aiConversationService->recordMessage(
            $conversation->id,
            'user',
            $request->message
        );

        $history = $this->aiConversationService->getRecentHistory($conversation->id);

        $response = $this->agent
            ->withMessages($this->formatHistory($history))
            ->prompt($request->message);

        $assistantText = trim($response->text ?? '');

        if ($assistantText === '' && !empty($response->toolCalls)) {
            foreach ($response->toolCalls as $toolCall) {
                if (($toolCall->name ?? null) === 'GetMenuTool') {
                    $categorySlug = $toolCall->arguments['category_slug'] ?? null;

                    $toolRequest = new \Laravel\Ai\Tools\Request([
                        'category_slug' => $categorySlug,
                    ]);

                    $toolRawResult = $this->getMenuTool->handle($toolRequest);
                    $toolData = json_decode($toolRawResult, true);

                    $items = $toolData['items'] ?? $toolData ?? [];

                    if (empty($items)) {
                        $assistantText = 'حالياً هذا الخيار غير متوفر في قائمتنا.';
                    } else {
                        $names = collect($items)
                            ->pluck('name')
                            ->filter()
                            ->values()
                            ->implode('، ');

                        $assistantText = 'المتوفر حالياً: ' . $names;
                    }

                    break;
                }
            }
        }

        if ($assistantText === '') {
            $assistantText = 'عذراً، لم أتمكن من جلب بيانات القائمة حالياً.';
        }

        $this->aiConversationService->recordMessage(
            $conversation->id,
            'assistant',
            $assistantText
        );

        return response()->json([
            'message' => $assistantText,
            'conversation_id' => $conversation->id,
        ]);
    }

    protected function formatHistory($history): array
    {
        return $history->map(fn ($msg) => [
            'role' => $msg->role,
            'content' => $msg->content,
        ])->toArray();
    }
}