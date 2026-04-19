<?php

namespace App\AI\Tools;

use App\Repositories\DishRepository;
use Laravel\Ai\Contracts\Tool;
use Laravel\Ai\Tools\Request;
use Illuminate\Contracts\JsonSchema\JsonSchema;

class GetMenuTool implements Tool
{
    public function __construct(
        protected DishRepository $dishRepository
    ) {}

    public function description(): string
    {
        return 'Fetch only real available dishes from the menu. Never invent dishes.';
    }

    public function handle(Request $request): string
    {
        $categorySlug = $request['category_slug'] ?? null;

        $dishes = $this->dishRepository->getAvailableByCategory($categorySlug);

        $items = $dishes->map(fn ($dish) => [
            'name' => $dish->name,
            'slug' => $dish->slug,
            'description' => $dish->description,
            'price' => $dish->price !== null ? (float) $dish->price : null,
            'is_vegan' => (bool) $dish->is_vegan,
            'is_spicy' => (bool) $dish->is_spicy,
            'category' => $dish->category?->name,
        ])->values();

        return json_encode([
            'count' => $items->count(),
            'items' => $items,
        ], JSON_UNESCAPED_UNICODE | JSON_PRETTY_PRINT);
    }

    public function schema(JsonSchema $schema): array
    {
        return [
            'category_slug' => $schema->string()
                ->description('Optional category slug such as salads, starters, desserts.')
                ->nullable(),
        ];
    }
}