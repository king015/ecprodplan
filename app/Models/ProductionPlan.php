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
     * Get the Finished Goods related to this production plan.
     */
    public function finishedGoods()
    {
        return $this->hasMany(FinishedGoods::class);
    }

    /**
     * Get the Work In Process related to this production plan.
     */
    public function workInProcess()
    {
        return $this->hasMany(WorkInProcess::class);
    }
}
