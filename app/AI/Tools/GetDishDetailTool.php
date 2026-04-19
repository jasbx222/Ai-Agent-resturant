<?php

namespace App\AI\Tools;

use App\Repositories\DishRepository;
use Illuminate\Contracts\JsonSchema\JsonSchema;
use Laravel\Ai\Contracts\Tool;
use Laravel\Ai\Tools\Request;

class GetDishDetailTool implements Tool
{
    public function __construct(
        protected DishRepository $dishRepository
    ) {}

    public function description(): string
    {
        return 'Get full details about a specific dish using its slug, including allergens.';
    }

    public function handle(Request $request): string
    {
        $dishSlug = $request['dish_slug'] ?? null;

        if (! $dishSlug) {
            return json_encode([
                'success' => false,
                'error' => 'Dish slug is required.',
            ], JSON_UNESCAPED_UNICODE | JSON_PRETTY_PRINT);
        }

        $dish = $this->dishRepository->findBySlugWithAllergens($dishSlug);

        if (! $dish) {
            return json_encode([
                'success' => false,
                'error' => 'Dish not found.',
            ], JSON_UNESCAPED_UNICODE | JSON_PRETTY_PRINT);
        }

        return json_encode([
            'success' => true,
            'item' => [
                'name' => $dish->name,
                'slug' => $dish->slug,
                'description' => $dish->description,
                'price' => $dish->price !== null ? (float) $dish->price : null,
                'is_vegan' => (bool) $dish->is_vegan,
                'is_spicy' => (bool) $dish->is_spicy,
                'category' => $dish->category?->name,
                'allergens' => $dish->allergens->pluck('allergen_name')->values()->toArray(),
            ],
        ], JSON_UNESCAPED_UNICODE | JSON_PRETTY_PRINT);
    }

    public function schema(JsonSchema $schema): array
    {
        return [
            'dish_slug' => $schema->string()
                ->description('The slug of the dish to get details for, such as kebab-halabi.')
                ->required(),
        ];
    }
}