<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class WorkInProcess extends Model
{
    use HasFactory;

    /**
     * The attributes that are mass assignable.
     *
     * @var array<string>
     */
    protected $fillable = [
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

    public function productionPlan()
    {
        return $this->belongsTo(ProductionPlan::class, 'work_in_process_id');
    }

}
