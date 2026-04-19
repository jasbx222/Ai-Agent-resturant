<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Services\SettingsService;
use Illuminate\Http\Request;
use Inertia\Inertia;

class SettingsController extends Controller
{
    public function __construct(
        protected SettingsService $settingsService
    ) {}

    public function index()
    {
        return Inertia::render('Admin/Settings/Index', [
            'settings' => $this->settingsService->getAll(),
        ]);
    }

    public function update(Request $request)
    {
        $this->settingsService->update($request->all());

        return back()->with('success', 'Settings updated successfully.');
    }
}
