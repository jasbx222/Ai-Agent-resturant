<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\Category;
use App\Models\Dish;
use App\Services\MenuService;
use App\Repositories\DishRepository;
use App\Repositories\CategoryRepository;
use Illuminate\Http\Request;
use Inertia\Inertia;

class MenuManagerController extends Controller
{
    public function __construct(
        protected DishRepository $dishRepository,
        protected CategoryRepository $categoryRepository
    ) {}

    public function index()
    {
        return Inertia::render('Admin/Menu/Index', [
            'categories' => $this->categoryRepository->getAllOrdered(),
            'dishes' => Dish::with('category', 'allergens')->get(),
        ]);
    }

    public function storeDish(Request $request)
    {
        $validated = $request->validate([
            'category_id' => 'required|exists:categories,id',
            'name' => 'required|string|max:255',
            'description' => 'required|string',
            'price' => 'required|numeric|min:0',
            'is_vegan' => 'boolean',
            'is_spicy' => 'boolean',
            'is_featured' => 'boolean',
            'is_available' => 'boolean',
            'allergens' => 'array',
        ]);

        $this->dishRepository->create($validated);

        return back()->with('success', 'Dish created successfully.');
    }

    public function updateDish(Request $request, Dish $dish)
    {
        $validated = $request->validate([
            'category_id' => 'required|exists:categories,id',
            'name' => 'required|string|max:255',
            'description' => 'required|string',
            'price' => 'required|numeric|min:0',
            'is_vegan' => 'boolean',
            'is_spicy' => 'boolean',
            'is_featured' => 'boolean',
            'is_available' => 'boolean',
            'allergens' => 'array',
        ]);

        $this->dishRepository->update($dish, $validated);

        return back()->with('success', 'Dish updated successfully.');
    }

    public function deleteDish(Dish $dish)
    {
        $this->dishRepository->delete($dish);
        return back()->with('success', 'Dish deleted successfully.');
    }

    public function storeCategory(Request $request)
    {
        $validated = $request->validate([
            'name' => 'required|string|max:255',
            'icon' => 'nullable|string|max:10',
            'display_order' => 'integer',
        ]);

        $this->categoryRepository->create($validated);

        return back()->with('success', 'Category created successfully.');
    }
}
