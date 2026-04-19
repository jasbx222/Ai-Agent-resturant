<?php

namespace Database\Seeders;

use App\Models\User;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\Hash;

class AdminUserSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        User::updateOrCreate(
            ['email' => 'admin@maidathalchef.com'],
            [
                'name' => 'مدير النظام',
                'password' => Hash::make('password'),
                'role' => 'admin',
                'phone' => '0500000000'
            ]
        );
    }
}
