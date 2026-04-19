<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class DishAllergen extends Model
{
    protected $fillable = ['dish_id', 'allergen_name'];

    public function dish()
    {
        return $this->belongsTo(Dish::class);
    }
}
