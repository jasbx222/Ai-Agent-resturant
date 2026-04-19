<?php

namespace Database\Seeders;

use App\Models\Category;
use Illuminate\Database\Seeder;
use Illuminate\Support\Str;

class CategorySeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $categories = [
            ['name' => 'المقبّلات', 'icon' => '🥗', 'display_order' => 1],
            ['name' => 'المعكرونة', 'icon' => '🍝', 'display_order' => 2],
            ['name' => 'الأطباق الرئيسية', 'icon' => '🥩', 'display_order' => 3],
            ['name' => 'المأكولات البحرية', 'icon' => '🐟', 'display_order' => 4],
            ['name' => 'الحلويات', 'icon' => '🍮', 'display_order' => 5],
            ['name' => 'المشروبات', 'icon' => '🍷', 'display_order' => 6],
        ];

        foreach ($categories as $category) {
            Category::updateOrCreate(
                ['name' => $category['name']],
                [
                    'slug' => Str::slug($category['name'], '-', 'ar'),
                    'icon' => $category['icon'],
                    'display_order' => $category['display_order'],
                ]
            );
        }
    }
}
