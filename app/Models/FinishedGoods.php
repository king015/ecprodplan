<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class FinishedGoods extends Model
{
    use HasFactory;

    /**
     * The attributes that are mass assignable.
     *
     * @var array
     */
    protected $fillable = [
        'customer',
        'code',
        'itemDescription',
        'partNumber',
        'beginning_inventory',
        'beginning_date',
        'ending_inventory',
        'ending_date',
        'fg_in',
    ];

    /**
     * Get the production plan associated with the finished good.
     */
    public function productionPlan()
    {
        return $this->belongsTo(ProductionPlan::class);
    }
}
