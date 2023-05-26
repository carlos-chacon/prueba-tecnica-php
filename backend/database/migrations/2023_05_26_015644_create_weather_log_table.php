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
        Schema::create('weather_log', function (Blueprint $table) {
            $table->id();
            $table->string('city');
            $table->string('lat');
            $table->string('lon');
            $table->string('humidity');
            $table->string('timezone');
            $table->json('weather');
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('weather_log');
    }
};
