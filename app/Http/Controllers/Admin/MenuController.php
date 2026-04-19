<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\Category;
use App\Models\Dish;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Illuminate\Support\Str;
use Illuminate\Support\Facades\Storage;

class MenuController extends Controller
{
    public function index()
    {
        return Inertia::render('Admin/Menu/Index', [
            'categories' => Category::withCount('dishes')->get(),
            'dishes' => Dish::with('category')->latest()->get(),
            'header' => 'إدارة قائمة الطعام'
        ]);
    }

    public function storeDish(Request $request)
    {
        $validated = $request->validate([
            'category_id' => 'required|exists:categories,id',
            'name' => 'required|string|max:255',
            'description' => 'required|string',
            'price' => 'required|numeric|min:0',
            'is_available' => 'nullable|boolean',
            'is_featured' => 'nullable|boolean',
            'is_spicy' => 'nullable|boolean',
            'is_vegan' => 'nullable|boolean',
            'image' => 'nullable|image|mimes:jpeg,png,jpg,gif,webp|max:2048',
        ]);

        if ($request->hasFile('image')) {
            $validated['image'] = $request->file('image')->store('dishes', 'public');
        }

        $validated['is_available'] = $request->boolean('is_available');
        $validated['is_featured'] = $request->boolean('is_featured');
        $validated['is_spicy'] = $request->boolean('is_spicy');
        $validated['is_vegan'] = $request->boolean('is_vegan');

        Dish::create(array_merge($validated, [
            'slug' => Str::slug($validated['name'], '-', 'ar')
        ]));

        return back()->with('success', 'تم إضافة الطبق بنجاح');
    }

    public function updateDish(Request $request, Dish $dish)
    {
        $validated = $request->validate([
            'category_id' => 'required|exists:categories,id',
            'name' => 'required|string|max:255',
            'description' => 'required|string',
            'price' => 'required|numeric|min:0',
            'is_available' => 'nullable|boolean',
            'is_featured' => 'nullable|boolean',
            'is_spicy' => 'nullable|boolean',
            'is_vegan' => 'nullable|boolean',
            'image' => 'nullable|image|mimes:jpeg,png,jpg,gif,webp|max:2048',
        ]);

        if ($request->hasFile('image')) {
            if ($dish->image && Storage::disk('public')->exists($dish->image)) {
                Storage::disk('public')->delete($dish->image);
            }

            $validated['image'] = $request->file('image')->store('dishes', 'public');
        }

        $validated['is_available'] = $request->boolean('is_available');
        $validated['is_featured'] = $request->boolean('is_featured');
        $validated['is_spicy'] = $request->boolean('is_spicy');
        $validated['is_vegan'] = $request->boolean('is_vegan');

        $dish->update(array_merge($validated, [
            'slug' => Str::slug($validated['name'], '-', 'ar')
        ]));

        return back()->with('success', 'تم تحديث الطبق بنجاح');
    }

    public function deleteDish(Dish $dish)
    {
        if ($dish->image && Storage::disk('public')->exists($dish->image)) {
            Storage::disk('public')->delete($dish->image);
        }

        $dish->delete();

        return back()->with('success', 'تم حذف الطبق بنجاح');
    }
}