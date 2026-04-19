<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\User;
use Illuminate\Http\Request;
use Inertia\Inertia;

class UserManagerController extends Controller
{
    public function index()
    {
        return Inertia::render('Admin/Customers/Index', [
            'customers' => User::where('role', 'customer')
                ->withCount('reservations')
                ->latest()
                ->paginate(20),
        ]);
    }

    public function show(User $user)
    {
        return Inertia::render('Admin/Customers/Show', [
            'customer' => $user->load(['reservations']),
        ]);
    }
}
