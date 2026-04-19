<?php

namespace App\AI\Tools;

use App\Services\ReservationService;
use Illuminate\Contracts\JsonSchema\JsonSchema;
use Laravel\Ai\Contracts\Tool;
use Laravel\Ai\Tools\Request;

class CheckAvailabilityTool implements Tool
{
    public function __construct(
        protected ReservationService $reservationService
    ) {}

    public function description(): string
    {
        return 'Check available time slots for a specific date and party size.';
    }

    public function handle(Request $request): string
    {
        $date = $request['date'] ?? null;
        $partySize = (int) ($request['party_size'] ?? 0);

        $slots = $this->reservationService->getAvailableSlots($date, $partySize);

        return json_encode([
            'date' => $date,
            'party_size' => $partySize,
            'available_slots' => $slots,
        ], JSON_UNESCAPED_UNICODE | JSON_PRETTY_PRINT);
    }

    public function schema(JsonSchema $schema): array
    {
        return [
            'date' => $schema->string()
                ->description('The date to check availability for (YYYY-MM-DD).')
                ->required(),
            'party_size' => $schema->integer()
                ->description('The number of guests.')
                ->required(),
        ];
    }
}