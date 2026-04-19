<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\Dish;
use App\Models\Reservation;
use App\Models\AiConversation;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Illuminate\Support\Facades\DB;

class DashboardController extends Controller
{
    public function index()
    {
        // Real-time aggregate stats
        $stats = [
            'todayReservations' => Reservation::whereDate('created_at', today())->count(),
            'totalReservations' => Reservation::count(),
            'activeDishes' => Dish::where('is_available', true)->count(),
            'aiConversations' => AiConversation::count(),
        ];

        // Chart Data: Reservation History (last 30 days)
       $reservationHistory = Reservation::select(
        DB::raw('DATE(created_at) as date'),
        DB::raw('count(*) as count')
    )
    ->where('created_at', '>=', now()->subDays(30))
    ->groupBy(DB::raw('DATE(created_at)'))
    ->orderBy(DB::raw('DATE(created_at)'))
    ->get()
    ->map(function ($item) {
        return [
            'date' => \Carbon\Carbon::parse($item->date)->format('m/d'),
            'count' => $item->count
        ];
    });

        // Chart Data: Popular Dishes (Mocking based on reservation count for now if no pivot exists, 
        // or just returning top dishes as placeholders)
        $popularDishes = Dish::where('is_available', true)
            ->take(5)
            ->get()
            ->map(function ($dish) {
                return [
                    'name' => $dish->name,
                    'count' => rand(10, 50) // Placeholder logic for demonstration
                ];
            });

        return Inertia::render("Admin/Dashboard", [
            'stats' => $stats,
            'charts' => [
                'reservationHistory' => $reservationHistory,
                'popularDishes' => $popularDishes,
            ],
            'recentReservations' => Reservation::with('user')->latest()->take(5)->get(),
        ]);
    }
}
