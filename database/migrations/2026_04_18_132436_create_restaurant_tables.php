<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::create('categories', function (Blueprint $table) {
            $table->id();
            $table->string('name');
            $table->string('slug')->unique();
            $table->string('icon', 10)->nullable();
            $table->integer('display_order')->default(0);
            $table->timestamps();
        });

        Schema::create('dishes', function (Blueprint $table) {
            $table->id();
            $table->foreignId('category_id')->constrained()->onDelete('cascade');
            $table->string('name');
            $table->string('slug')->unique();
            $table->text('description');
            $table->decimal('price', 8, 2);
            $table->string('image')->nullable();
            $table->boolean('is_vegan')->default(false);
            $table->boolean('is_spicy')->default(false);
            $table->boolean('is_featured')->default(false);
            $table->boolean('is_available')->default(true);
            $table->timestamps();
        });

        Schema::create('dish_allergens', function (Blueprint $table) {
            $table->id();
            $table->foreignId('dish_id')->constrained()->onDelete('cascade');
            $table->string('allergen_name');
            $table->timestamps();
        });

        Schema::create('reservations', function (Blueprint $table) {
            $table->id();
            $table->foreignId('user_id')->nullable()->constrained()->onDelete('set null');
            $table->string('name');
            $table->string('email');
            $table->string('phone');
            $table->tinyInteger('party_size');
            $table->date('date');
            $table->time('time_slot');
            $table->enum('status', ['pending', 'confirmed', 'seated', 'completed', 'cancelled'])->default('pending');
            $table->text('special_requests')->nullable();
            $table->text('notes')->nullable();
            $table->timestamp('confirmed_at')->nullable();
            $table->timestamp('cancelled_at')->nullable();
            $table->text('cancellation_reason')->nullable();
            $table->timestamps();
        });

        Schema::create('blocked_dates', function (Blueprint $table) {
            $table->id();
            $table->date('date')->unique();
            $table->string('reason')->nullable();
            $table->timestamps();
        });

        Schema::create('restaurant_settings', function (Blueprint $table) {
            $table->id();
            $table->string('key')->unique();
            $table->text('value')->nullable();
            $table->timestamps();
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('restaurant_settings');
        Schema::dropIfExists('blocked_dates');
        Schema::dropIfExists('reservations');
        Schema::dropIfExists('dish_allergens');
        Schema::dropIfExists('dishes');
        Schema::dropIfExists('categories');
    }
};
