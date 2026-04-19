<?php

namespace App\Http\Controllers\Public;

use App\Http\Controllers\Controller;
use App\Services\MenuService;
use Illuminate\Http\Request;
use Inertia\Inertia;

class MenuController extends Controller
{
    public function __construct(
        protected MenuService $menuService
    ) {}
    

    public function index(Request $request)
    {
        
        $category = $request->query('category');
        
        return Inertia::render('Menu', [
            'categories' => $this->menuService->getAllCategories(),
            'dishes' => $this->menuService->getDishesByCategory($category),
            'currentCategory' => $category,
            'seo' => [
                'title' => 'قائمة الطعام | مائدة الشيف',
                'description' => 'تصفّح قائمة طعامنا المنسقة التي تضم أفضل المكونات المحلية والعالمية بلمسات فنية.',
            ]
        ]);
    }

    public function show(string $dish)
    {
        $dishData = $this->menuService->getDishBySlug($dish);

        return Inertia::render('DishDetail', [
            'dish' => $dishData,
            'seo' => [
                'title' => "{$dishData->name} | مائدة الشيف",
                'description' => $dishData->description,
            ]
        ]);
    }
}
