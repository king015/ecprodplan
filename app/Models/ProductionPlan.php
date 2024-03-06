<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class ProductionPlan extends Model
{
    use HasFactory;

    /**
     * The attributes that are mass assignable.
     *
     * @var array<string>
     */
    protected $fillable = [
        'customer',
        'code',
        'item_description',
        'part_number',
        'weekly_requisites',
        'mon',
        'tues',
        'wed',
        'thurs',
        'fri',
        'sat',
        'finished_goods',
        'creaser',
        'flexo_print',
        'printer_slotter',
        'slotting',
        'clapper',
        'diecut',
        'stitching',
        'detach',
        'gluing',
        'pre_assembly',
        'manual_slotting',
        'packing',
        'pallet_assembly',
        'manual_printing',
        'manual_cutting',
        'laminating',
        'box_assembly',
        'fp_manual_cutting',
        'fp_diecut',
        'bandsaw',
        'skiving',
        'fp_detach',
        'heating_plate',
        'hotmelt',
        'assembly_heating',
        'fp_manual_printing',
        'sealing',
        'fp_packing',
    ];
}
