<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class FinishedGoods extends Model
{
    use HasFactory;

    protected $fillable = [
        'customer',
        'code',
        'itemDescription',
        'partNumber',
        'location',
        'beginning_inventory',
        'beginning_date',
        'ending_inventory',
        'ending_date',
        'fg_in',
        'fg_out',
        'production_plan_id'
    ];

    protected $table = 'finished_goods';

    /**
     * Get the work in process associated with the finished goods.
     */
    public function workInProcess()
    {
        return $this->hasOne(WorkInProcess::class);
    }

    /**
     * Get the production plan associated with the finished goods.
     */
    public function productionPlan()
    {
        return $this->belongsTo(ProductionPlan::class, 'production_plan_id');
    }
}
