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
            $table->unsignedBigInteger('wip_id')->nullable();
            $table->string('customer');
            $table->string('code');
            $table->string('itemDescription');
            $table->string('partNumber');
            $table->string('location');
            $table->unsignedBigInteger('beginning_inventory');
            $table->date('beginning_date');
            $table->unsignedBigInteger('ending_inventory');
            $table->date('ending_date');
            $table->unsignedBigInteger('fg_in');
            $table->unsignedBigInteger('fg_out');
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
