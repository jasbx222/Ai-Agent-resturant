<?php

namespace Database\Seeders;

use App\Models\RestaurantSetting;
use Illuminate\Database\Seeder;

class RestaurantSettingSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $settings = [
            'restaurant_name' => 'مائدة الشيف',
            'restaurant_tagline' => 'حيثُ يلتقي الفنُّ بالمذاق',
            'restaurant_address' => 'شارع التخصصي، الرياض، المملكة العربية السعودية',
            'restaurant_phone' => '+966 50 000 0000',
            'restaurant_email' => 'contact@maidathalchef.com',
            'currency_code' => 'ريال',
            'reservation_interval' => '30',
            'max_party_size' => '20',
            'advance_reservation_days' => '30',
            'auto_confirm_reservations' => '0',
            'ai_enabled' => '1',
            'ai_system_prompt' => null, // Will use default if null
            'opening_hours' => json_encode([
                'mon' => ['status' => 'closed'],
                'tue' => ['status' => 'open', 'start' => '12:00', 'end' => '23:00'],
                'wed' => ['status' => 'open', 'start' => '12:00', 'end' => '23:00'],
                'thu' => ['status' => 'open', 'start' => '12:00', 'end' => '23:00'],
                'fri' => ['status' => 'open', 'start' => '14:00', 'end' => '01:00'],
                'sat' => ['status' => 'open', 'start' => '12:00', 'end' => '23:00'],
                'sun' => ['status' => 'open', 'start' => '12:00', 'end' => '23:00'],
            ]),
        ];

        foreach ($settings as $key => $value) {
            RestaurantSetting::updateOrCreate(
                ['key' => $key],
                ['value' => $value]
            );
        }
    }
}
