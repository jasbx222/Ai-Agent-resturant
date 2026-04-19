<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Inertia\Inertia;

class AiMonitorController extends Controller
{
    public function index()
    {
        $stats = [
            'total_conversations' => DB::table('ai_conversations')->count(),
            'total_messages' => DB::table('ai_messages')->count(),
            'avg_messages_per_conversation' => DB::table('ai_conversations')
                ->join('ai_messages', 'ai_conversations.id', '=', 'ai_messages.conversation_id')
                ->select(DB::raw('count(ai_messages.id) / count(distinct ai_conversations.id) as avg'))
                ->first()->avg ?? 0,
        ];

        $recentConversations = DB::table('ai_conversations')
            ->select('ai_conversations.*', DB::raw('(SELECT content FROM ai_messages WHERE conversation_id = ai_conversations.id ORDER BY created_at DESC LIMIT 1) as last_message'))
            ->orderBy('updated_at', 'desc')
            ->limit(10)
            ->get();

        return Inertia::render('Admin/AiMonitor/Index', [
            'stats' => $stats,
            'recentConversations' => $recentConversations,
            'header' => 'مراقبة الذكاء الاصطناعي'
        ]);
    }

    public function showConversation($id)
    {
        $messages = DB::table('ai_messages')
            ->where('conversation_id', $id)
            ->orderBy('created_at', 'asc')
            ->get();

        return response()->json($messages);
    }
}
