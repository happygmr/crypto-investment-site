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
        Schema::create('trades', function (Blueprint $table) {
            $table->id();
            $table->unsignedBigInteger('trader_id');
            $table->string('symbol');
            $table->enum('type', ['buy', 'sell']);
            $table->decimal('amount', 20, 8);
            $table->decimal('price', 20, 8);
            $table->timestamp('trade_time');
            $table->enum('status', ['open', 'closed', 'cancelled'])->default('open');
            $table->timestamps();

            $table->foreign('trader_id')->references('id')->on('traders')->onDelete('cascade');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('trades');
    }
};
