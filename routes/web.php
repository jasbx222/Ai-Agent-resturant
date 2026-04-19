<?php

use App\Http\Controllers\Public\HomeController;
use App\Http\Controllers\Public\MenuController;
use App\Http\Controllers\Public\ReservationController;
use App\Http\Controllers\Public\PageController;
use App\Http\Controllers\Admin\DashboardController as AdminDashboard;
use App\Http\Controllers\Admin\MenuController as AdminMenu;
use App\Http\Controllers\Admin\ReservationController as AdminReservation;
use App\Http\Controllers\Admin\AiMonitorController;
use App\Http\Controllers\ChatController;
use App\Http\Controllers\Settings\ProfileController;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;

// Public Routes
Route::get('/', [HomeController::class, 'index'])->name('home');
Route::get('/menu', [MenuController::class, 'index'])->name('menu');
Route::get('/menu/{dish}', [MenuController::class, 'show'])->name('menu.show');
Route::get('/reserve', [ReservationController::class, 'index'])->name('reserve');
Route::post('/reserve', [ReservationController::class, 'store'])->name('reserve.store');
Route::post('/reservations/check-availability', [ReservationController::class, 'checkAvailability']);

Route::get('/about', [PageController::class, 'about'])->name('about');
Route::get('/contact', [PageController::class, 'contact'])->name('contact');

// AI Chat API
Route::post('/api/chat', [ChatController::class, 'chat']);

// Admin Routes (Protected by auth and role:admin)
Route::middleware(['auth', 'verified', 'admin'])->prefix('admin')->group(function () {

    Route::get('/dashboard', [AdminDashboard::class, 'index'])->name('admin.dashboard');
    
    // Menu Management
    Route::get('/menu', [AdminMenu::class, 'index'])->name('admin.menu');
    Route::post('/menu/dishes', [AdminMenu::class, 'storeDish'])->name('admin.menu.store');
    Route::patch('/menu/dishes/{dish}', [AdminMenu::class, 'updateDish'])->name('admin.menu.update');
    Route::delete('/menu/dishes/{dish}', [AdminMenu::class, 'deleteDish'])->name('admin.menu.destroy');

    // Reservations
    Route::get('/reservations', [AdminReservation::class, 'index'])->name('admin.reservations');
    Route::patch('/reservations/{reservation}/status', [AdminReservation::class, 'updateStatus'])->name('admin.reservations.status');
    Route::delete('/reservations/{reservation}', [AdminReservation::class, 'destroy'])->name('admin.reservations.destroy');

    // AI Monitor
    Route::get('/ai-monitor', [AiMonitorController::class, 'index'])->name('admin.ai-monitor');
    Route::get('/ai-monitor/conversations/{id}', [AiMonitorController::class, 'showConversation'])->name('admin.ai-monitor.conversation');

    // Customers
    Route::get('/customers', [App\Http\Controllers\Admin\CustomerController::class, 'index'])->name('admin.customers');

    // Settings
    Route::get('/settings', [App\Http\Controllers\Admin\SettingController::class, 'index'])->name('admin.settings');
    Route::patch('/settings', [App\Http\Controllers\Admin\SettingController::class, 'update'])->name('admin.settings.update');
});

require __DIR__.'/auth.php';
