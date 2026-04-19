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
        Schema::create('ai_conversations', function (Blueprint $table) {
            $table->id();
            $table->string('session_id')->index();
            $table->foreignId('user_id')->nullable()->constrained()->onDelete('set null');
            $table->timestamp('last_activity_at')->nullable();
            $table->timestamps();
        });

        Schema::create('ai_messages', function (Blueprint $table) {
            $table->id();
            $table->foreignId('conversation_id')->constrained('ai_conversations')->onDelete('cascade');
            $table->enum('role', ['user', 'assistant']);
            $table->text('content');
            $table->timestamps();
        });

        Schema::create('ai_runs', function (Blueprint $table) {
            $table->id();
            $table->foreignId('conversation_id')->constrained('ai_conversations')->onDelete('cascade');
        
            $table->integer('input_tokens')->default(0);
            $table->integer('output_tokens')->default(0);
            $table->json('tools_called')->nullable();
            $table->integer('duration_ms')->default(0);
            $table->timestamps();
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('ai_runs');
        Schema::dropIfExists('ai_messages');
        Schema::dropIfExists('ai_conversations');
    }
};
