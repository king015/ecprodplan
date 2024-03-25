<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class PmmsMasterlist extends Model
{
    use HasFactory;

    protected $table = 'pmms_masterlist';

    /**
     * The connection name for the model.
     *
     * @var string|null
     */
    protected $connection = 'pmms_connection';

    // Define any additional relationships or configuration as needed
}
