<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class ActivityLog extends Model
{
    use HasFactory;

    protected $fillable = [
        'user_id', // Assuming user_id is the foreign key for the user who performed the activity
        'activity', // Assuming activity is the name of the activity
        'created_at', // Assuming created_at is the timestamp when the activity occurred
        // Add other properties as needed
    ];

    // Define any relationships if applicable, for example:
    public function user()
    {
        return $this->belongsTo(User::class);
    }
}
