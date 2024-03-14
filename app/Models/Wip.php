<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Wip extends Model
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

    protected $table = 'production';
}
