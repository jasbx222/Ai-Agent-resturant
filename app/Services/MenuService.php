<?php

namespace App\Services;

use App\Repositories\DishRepository;
use App\Repositories\CategoryRepository;

class MenuService
{
    public function __construct(
        protected DishRepository $dishRepository,
        protected CategoryRepository $categoryRepository
    ) {}

    public function getFullMenuData()
    {
        return [
            'categories' => $this->categoryRepository->getAllOrdered(),
            'dishes' => $this->dishRepository->getAvailableByCategory(),
        ];
    }

    public function getFeaturedDishes()
    {
        return $this->dishRepository->getFeatured();
    }

    public function getDishBySlug(string $slug)
    {
        return $this->dishRepository->findBySlugWithAllergens($slug);
    }

    public function getAllCategories()
    {
        return $this->categoryRepository->getAllOrdered();
    }

    public function getDishesByCategory($category = null)
    {
        return $this->dishRepository->getAvailableByCategory($category);
    }
}