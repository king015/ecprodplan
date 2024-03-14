<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Production extends Model
{
    use HasFactory;

    protected $fillable = [
        'id',
        'customer',
        'code',
        'itemDescription',
        'partNumber',
        'weekly_requisites',
        'mon',
        'tues',
        'wed',
        'thurs',
        'fri',
        'sat',
        'fg',
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
        'beginning_inventory',
        'beginning_date',
        'ending_inventory',
        'ending_date',
        'fg_in',
        'fg_out',
        'created_at',
        'updated_at'
    ];

    protected $table = 'production';
}
