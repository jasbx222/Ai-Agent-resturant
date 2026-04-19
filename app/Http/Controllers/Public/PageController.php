<?php

namespace App\Http\Controllers\Public;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Inertia\Inertia;

class PageController extends Controller
{
    public function about()
    {
        return Inertia::render('About', [
            'seo' => [
                'title' => 'عن مائدة الشيف | قصة شغف',
                'description' => 'تعرف على قصة مطعم مائدة الشيف ورؤيتنا في تقديم فن الطهي الفاخر في الرياض.',
            ]
        ]);
    }

    public function contact()
    {
        return Inertia::render('Contact', [
            'seo' => [
                'title' => 'تواصل معنا | نحن بانتظاركم',
                'description' => 'هل لديكم أي استفسار؟ نحن هنا للمساعدة. تواصلوا معنا عبر الهاتف أو البريد الإلكتروني أو زيارتنا في الرياض.',
            ]
        ]);
    }
}
