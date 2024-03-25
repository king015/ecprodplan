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
        Schema::create('finished_goods', function (Blueprint $table) {
            $table->id();
            $table->unsignedBigInteger('production_plan_id')->nullable();
            $table->string('customer')->nullable();
            $table->string('code')->nullable();
            $table->string('itemDescription')->nullable();
            $table->string('partNumber')->nullable();
            $table->string('location')->nullable();
            $table->unsignedBigInteger('beginning_inventory')->nullable();
            $table->date('beginning_date')->nullable();
            $table->unsignedBigInteger('ending_inventory')->nullable();
            $table->date('ending_date')->nullable();
            $table->unsignedBigInteger('fg_in')->nullable();
            $table->unsignedBigInteger('fg_out')->nullable();
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('finished_goods');
    }
};
