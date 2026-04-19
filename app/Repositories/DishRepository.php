<?php

namespace App\Repositories;

use App\Models\Dish;
use Illuminate\Support\Str;

class DishRepository
{
    public function getFeatured(int $limit = 6)
    {
        return Dish::with('category')
            ->where('is_featured', true)
            ->where('is_available', true)
            ->limit($limit)
            ->get();
    }

    public function getAvailableByCategory(?string $categorySlug = null)
    {
        $query = Dish::with('category', 'allergens')
            ->where('is_available', true);

        if ($categorySlug) {
            $query->whereHas('category', function ($q) use ($categorySlug) {
                $q->where('slug', $categorySlug);
            });
        }

        return $query->get();
    }

    public function findBySlugWithAllergens(string $slug)
    {
        return Dish::with('allergens', 'category')
            ->where('slug', $slug)
            ->firstOrFail();
    }

    public function create(array $data)
    {
        if (isset($data['name']) && !isset($data['slug'])) {
            $data['slug'] = Str::slug($data['name']);
        }
        
        $dish = Dish::create($data);
        
        if (isset($data['allergens'])) {
            foreach ($data['allergens'] as $allergen) {
                $dish->allergens()->create(['allergen_name' => $allergen]);
            }
        }
        
        return $dish;
    }

    public function update(Dish $dish, array $data)
    {
        if (isset($data['name']) && (!isset($data['slug']) || $data['slug'] === $dish->slug)) {
            $data['slug'] = Str::slug($data['name']);
        }

        $dish->update($data);

        if (isset($data['allergens'])) {
            $dish->allergens()->delete();
            foreach ($data['allergens'] as $allergen) {
                $dish->allergens()->create(['allergen_name' => $allergen]);
            }
        }

        return $dish;
    }

    public function delete(Dish $dish)
    {
        return $dish->delete();
    }
}
