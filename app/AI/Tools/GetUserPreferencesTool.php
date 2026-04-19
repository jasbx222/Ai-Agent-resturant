<?php

namespace App\AI\Tools;

use App\Repositories\ReservationRepository;
use Laravel\Ai\Contracts\Tool;

use Laravel\Ai\Tools\Request;
use Stringable;
use Illuminate\Contracts\JsonSchema\JsonSchema;

class GetUserPreferencesTool implements Tool
{
    public function __construct(
        protected ReservationRepository $reservationRepository
    ) {}

    public function description(): string
    {
        return 'Get past reservation history and preferences for the logged-in user.';
    }

    public function handle(Request $request): string
    {
        $user_id = (int) $request->input('user_id');
        $history = $this->reservationRepository->getUserHistory($user_id);

        return json_encode([
            'reservation_count' => $history->count(),
            'past_reservations' => $history->take(5)->map(fn($res) => [
                'date' => $res->date->toDateString(),
                'party_size' => $res->party_size,
                'special_requests' => $res->special_requests,
                'status' => $res->status,
            ])->toArray(),
        ], JSON_PRETTY_PRINT);
    }

    public function schema(JsonSchema $schema): array
    {
        return [
            'user_id' => $schema->integer()
                ->description('The ID of the user to get preferences for.')
                ->required(),
        ];
    }
}
