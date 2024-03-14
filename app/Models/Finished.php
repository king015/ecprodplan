<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Finished extends Model
{
    use HasFactory;

    protected $fillable = [
        'id',
        'customer',
        'code',
        'itemDescription',
        'partNumber',
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
