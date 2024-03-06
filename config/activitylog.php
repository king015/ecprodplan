<?php

return [

    /*
    |--------------------------------------------------------------------------
    | Database Table
    |--------------------------------------------------------------------------
    |
    | Specify the name of the database table where activity logs will be stored.
    |
    */

    'table' => 'activity_logs',

    /*
    |--------------------------------------------------------------------------
    | Loggable Fields
    |--------------------------------------------------------------------------
    |
    | Define the fields that should be logged when recording activity.
    |
    */

    'loggable_fields' => [
        'user_id',
        'activity',
        'created_at',
    ],

];
