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
            $table->integer('creaser');
            $table->integer('flexo_print');
            $table->integer('printer_slotter');
            $table->integer('slotting');
            $table->integer('clapper');
            $table->integer('diecut');
            $table->integer('stitching');
            $table->integer('detach');
            $table->integer('gluing');
            $table->integer('pre_assembly');
            $table->integer('manual_slotting');
            $table->integer('pallet_assembly');
            $table->integer('manual_printing');
            $table->integer('manual_cutting');
            $table->integer('laminating');
            $table->integer('box_assembly');
            $table->integer('fp_manual_cutting');
            $table->integer('fp_diecut');
            $table->integer('bandsaw');
            $table->integer('skiving');
            $table->integer('fp_detach');
            $table->integer('heating_plate');
            $table->integer('hotmelt');
            $table->integer('assembly_heating');
            $table->integer('fp_manual_printing');
            $table->integer('sealing');
            $table->integer('fp_packing');
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
