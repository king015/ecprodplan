<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class ProductionPlan extends Model
{
    use HasFactory;

    protected $fillable = [
        'weekly_requisites',
        'mon',
        'tues',
        'wed',
        'thurs',
        'fri',
        'sat',
        'fg',
    ];

    protected $table = 'production_plan';

    /**
     * Get the finished goods related to this production plan.
     */
    public function finishedGoods()
    {
        return $this->hasMany(FinishedGoods::class, 'production_plan_id');
    }

    /**
     * Get the work in process related to this production plan.
     */
    public function workInProcess()
    {
        return $this->hasMany(WorkInProcess::class, 'production_plan_id');
    }
}
