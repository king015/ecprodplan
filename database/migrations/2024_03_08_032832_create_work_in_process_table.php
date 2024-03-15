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
        Schema::create('work_in_process', function (Blueprint $table) {
            $table->id();
            $table->unsignedBigInteger('finished_goods_id')->nullable();
            $table->integer('creaser')->nullable();
            $table->integer('flexo_print')->nullable();
            $table->integer('printer_slotter')->nullable();
            $table->integer('slotting')->nullable();
            $table->integer('clapper')->nullable();
            $table->integer('diecut')->nullable();
            $table->integer('stitching')->nullable();
            $table->integer('detach')->nullable();
            $table->integer('gluing')->nullable();
            $table->integer('pre_assembly')->nullable();
            $table->integer('manual_slotting')->nullable();
            $table->integer('pallet_assembly')->nullable();
            $table->integer('manual_printing')->nullable();
            $table->integer('manual_cutting')->nullable();
            $table->integer('laminating')->nullable();
            $table->integer('box_assembly')->nullable();
            $table->integer('fp_manual_cutting')->nullable();
            $table->integer('fp_diecut')->nullable();
            $table->integer('bandsaw')->nullable();
            $table->integer('skiving')->nullable();
            $table->integer('fp_detach')->nullable();
            $table->integer('heating_plate')->nullable();
            $table->integer('hotmelt')->nullable();
            $table->integer('assembly_heating')->nullable();
            $table->integer('fp_manual_printing')->nullable();
            $table->integer('sealing')->nullable();
            $table->integer('fp_packing')->nullable();
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('work_in_process');
    }
};
