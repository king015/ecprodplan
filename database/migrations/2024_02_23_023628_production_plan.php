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
        Schema::create('production_plan', function (Blueprint $table) {
            $table->id();

            $table->string('weekly_requisites');
            $table->integer('mon');
            $table->integer('tues');
            $table->integer('wed');
            $table->integer('thurs');
            $table->integer('fri');
            $table->integer('sat');

            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('production_plan');
    }
};
