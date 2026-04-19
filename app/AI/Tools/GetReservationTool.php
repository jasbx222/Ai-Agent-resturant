<?php

namespace App\AI\Tools;

use App\Models\Reservation;
use Illuminate\Contracts\JsonSchema\JsonSchema;
use Illuminate\Support\Facades\Log;
use Laravel\Ai\Contracts\Tool;
use Laravel\Ai\Tools\Request;

class GetReservationTool implements Tool
{
    public function description(): string
    {
        return 'Get reservation details using customer phone number.';
    }

    public function handle(Request $request): string
    {
        Log::info('get reversation working !');
        $phone = $request['phone'] ?? null;

        if (! $phone) {
            return json_encode([
                'success' => false,
                'error' => 'Phone number is required.',
            ], JSON_UNESCAPED_UNICODE | JSON_PRETTY_PRINT);
        }

        $reservation = Reservation::where('phone', $phone)
            ->latest()
            ->first();

        if (! $reservation) {
            return json_encode([
                'success' => false,
                'error' => 'Reservation not found.',
            ], JSON_UNESCAPED_UNICODE | JSON_PRETTY_PRINT);
        }

        return json_encode([
            'success' => true,
            'item' => [
                'id' => $reservation->id,
                'name' => $reservation->name,
                'email' => $reservation->email,
                'phone' => $reservation->phone,
                'party_size' => $reservation->party_size,
                'date' => optional($reservation->date)->format('Y-m-d'),
                'time_slot' => $reservation->time_slot,
                'status' => $reservation->status,
                'special_requests' => $reservation->special_requests,
                'notes' => $reservation->notes,
                'confirmed_at' => optional($reservation->confirmed_at)?->format('Y-m-d H:i:s'),
                'cancelled_at' => optional($reservation->cancelled_at)?->format('Y-m-d H:i:s'),
                'cancellation_reason' => $reservation->cancellation_reason,
            ],
        ], JSON_UNESCAPED_UNICODE | JSON_PRETTY_PRINT);
    }

    public function schema(JsonSchema $schema): array
    {
        return [
            'phone' => $schema->string()
                ->description('Customer phone number used for the reservation.')
                ->required(),
        ];
    }
}