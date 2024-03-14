<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class WorkInProcess extends Model
{
    use HasFactory;

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
        'finished_goods_id',
    ];

    protected $table = 'work_in_process';

    /**
     * Get the finished goods associated with the work in process.
     */
    public function finishedGoods()
    {
        return $this->belongsTo(FinishedGoods::class);
    }

    /**
     * Calculate total work in process.
     *
     * @return int
     */
    public function getTotalWorkInProcess()
    {
        // Sum all the work in process attributes
        return array_sum($this->attributesToArray());
    }

    /**
     * Scope a query to include only work in process with specific attributes.
     *
     * @param  \Illuminate\Database\Eloquent\Builder  $query
     * @param  array  $attributes
     * @return \Illuminate\Database\Eloquent\Builder
     */
    public function scopeWithAttributes($query, array $attributes)
    {
        // Filter the query to include only work in process with the specified attributes
        foreach ($attributes as $attribute => $value) {
            $query->where($attribute, $value);
        }

        return $query;
    }
}
