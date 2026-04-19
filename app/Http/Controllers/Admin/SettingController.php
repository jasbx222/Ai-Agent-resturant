<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\RestaurantSetting;
use Illuminate\Http\Request;
use Inertia\Inertia;

class SettingController extends Controller
{
    public function index()
    {
        $settings = RestaurantSetting::all()->pluck('value', 'key');

        return Inertia::render('Admin/Settings/Index', [
            'settings' => $settings,
            'header' => 'إعدادات النظام'
        ]);
    }

    public function getSettings()
    {
        $settings = RestaurantSetting::all()->pluck('value', 'key');

        return response()->json([
            'settings' => $settings,
        ]);
    }
    public function update(Request $request)
    {
        $validated = $request->validate([
            'settings' => 'required|array'
        ]);

        foreach ($validated['settings'] as $key => $value) {
            RestaurantSetting::updateOrCreate(['key' => $key], ['value' => $value]);
        }

        return back()->with('success', 'تم حفظ الإعدادات بنجاح');
    }
}
