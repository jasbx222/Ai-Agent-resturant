<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Dish extends Model
{
    protected $fillable = [
        'category_id', 'name', 'slug', 'description', 'price', 
        'image', 'is_vegan', 'is_spicy', 'is_featured', 'is_available'
    ];

    protected $casts = [
        'is_vegan' => 'boolean',
        'is_spicy' => 'boolean',
        'is_featured' => 'boolean',
        'is_available' => 'boolean',
        'price' => 'decimal:2',
    ];

    public function category()
    {
        return $this->belongsTo(Category::class);
    }

    public function allergens()
    {
        return $this->hasMany(DishAllergen::class);
    }
}
