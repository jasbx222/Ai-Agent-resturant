<?php

namespace App\Services;

use App\Repositories\RestaurantSetting;
use App\Models\RestaurantSetting as SettingModel;
use Illuminate\Support\Facades\Cache;

class SettingsService
{
    public function getAll()
    {
        return Cache::remember('restaurant_settings', 3600, function () {
            return SettingModel::all()->pluck('value', 'key')->toArray();
        });
    }

    public function get(string $key, $default = null)
    {
        $settings = $this->getAll();
        return $settings[$key] ?? $default;
    }

    public function update(array $settings)
    {
        foreach ($settings as $key => $value) {
            SettingModel::updateOrCreate(['key' => $key], ['value' => $value]);
        }
        Cache::forget('restaurant_settings');
    }
}
