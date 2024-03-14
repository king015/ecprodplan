<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class StoreProductionRequest extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('production', function (Blueprint $table) {
            $table->id();
            $table->integer('creaser')->nullable()->default(0);
            $table->integer('flexo_print')->nullable()->default(0);
            $table->integer('printer_slotter')->nullable()->default(0);
            $table->integer('slotting')->nullable()->default(0);
            $table->integer('clapper')->nullable()->default(0);
            $table->integer('diecut')->nullable()->default(0);
            $table->integer('stitching')->nullable()->default(0);
            $table->integer('detach')->nullable()->default(0);
            $table->integer('gluing')->nullable()->default(0);
            $table->integer('pre_assembly')->nullable()->default(0);
            $table->integer('manual_slotting')->nullable()->default(0);
            $table->integer('packing')->nullable()->default(0);
            $table->integer('pallet_assembly')->nullable()->default(0);
            $table->integer('manual_printing')->nullable()->default(0);
            $table->integer('manual_cutting')->nullable()->default(0);
            $table->integer('laminating')->nullable()->default(0);
            $table->integer('box_assembly')->nullable()->default(0);
            $table->integer('fp_manual_cutting')->nullable()->default(0);
            $table->integer('fp_diecut')->nullable()->default(0);
            $table->integer('bandsaw')->nullable()->default(0);
            $table->integer('skiving')->nullable()->default(0);
            $table->integer('fp_detach')->nullable()->default(0);
            $table->integer('heating_plate')->nullable()->default(0);
            $table->integer('hotmelt')->nullable()->default(0);
            $table->integer('assembly_heating')->nullable()->default(0);
            $table->integer('fp_manual_printing')->nullable()->default(0);
            $table->integer('sealing')->nullable()->default(0);
            $table->integer('fp_packing')->nullable()->default(0);
            $table->integer('finished_goods_id')->nullable()->default(0);
            $table->string('customer');
            $table->string('code');
            $table->string('itemDescription');
            $table->string('partNumber');
            $table->integer('beginning_inventory')->nullable()->default(0);
            $table->date('beginning_date')->nullable();
            $table->integer('ending_inventory')->nullable()->default(0);
            $table->date('ending_date')->nullable();
            $table->integer('fg_in')->nullable()->default(0);
            $table->integer('fg_out')->nullable()->default(0);
            $table->integer('weekly_requisites')->nullable()->default(0);
            $table->integer('mon')->nullable()->default(0);
            $table->integer('tues')->nullable()->default(0);
            $table->integer('wed')->nullable()->default(0);
            $table->integer('thurs')->nullable()->default(0);
            $table->integer('fri')->nullable()->default(0);
            $table->integer('sat')->nullable()->default(0);
            $table->integer('fg')->nullable()->default(0);
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('production');
    }
}
