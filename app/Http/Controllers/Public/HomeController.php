<?php

namespace App\Http\Controllers\Public;

use App\Http\Controllers\Controller;
use App\Services\MenuService;
use App\Services\SettingsService;
use Illuminate\Http\Request;
use Inertia\Inertia;

class HomeController extends Controller
{
    public function __construct(
        protected MenuService $menuService,
        protected SettingsService $settingsService
    ) {}

    public function index()
    {
        return Inertia::render('Home', [
            'featuredDishes' => $this->menuService->getFeaturedDishes(),
            'seo' => [
                'title' => 'مائدة الشيف | حلم المذاق الرفيع',
                'description' => 'اكتشف تجربة طعام استثنائية في أرقى مطاعم الرياض. حيث تلتقي الأصالة بالفن في كل طبق.',
            ]
        ]);
    }
}
