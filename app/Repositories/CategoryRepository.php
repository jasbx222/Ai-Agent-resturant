<?php

namespace App\Repositories;

use App\Models\Category;

class CategoryRepository
{
    public function getAllOrdered()
    {
        return Category::orderBy('display_order')->get();
    }

    public function findBySlug(string $slug)
    {
        return Category::where('slug', $slug)->firstOrFail();
    }

    public function create(array $data)
    {
        return Category::create($data);
    }

    public function update(Category $category, array $data)
    {
        $category->update($data);
        return $category;
    }

    public function delete(Category $category)
    {
        return $category->delete();
    }
}
