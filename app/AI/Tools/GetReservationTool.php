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
    $phone = $request['phone'] ?? null;

    if (! $phone) {
        return json_encode([
            'success' => false,
            'error' => 'Phone number is required.',
        ]);
    }

    // 🔥 تنظيف الرقم (أهم خطوة)
    $phone = preg_replace('/\D/', '', $phone); // حذف أي شيء غير رقم

    // قص الرقم إذا صار طويل (مثلاً أكثر من 11 رقم)
    if (strlen($phone) > 11) {
        $phone = substr($phone, 0, 11);
    }

    $reservation = \App\Models\Reservation::where('phone', $phone)
        ->latest()
        ->first();

    if (! $reservation) {
        return json_encode([
            'success' => false,
            'error' => 'Reservation not found.',
        ]);
    }

    return json_encode([
        'success' => true,
        'item' => $reservation,
    ]);
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