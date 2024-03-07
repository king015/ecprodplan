<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\ActivityLog;
use Illuminate\Http\Request;

class ActivityLogController extends Controller
{
    /**
     * Display a listing of the activity logs.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        // Retrieve all activity logs
        $activityLogs = ActivityLog::all();

        // Return activity logs as JSON response
        return response()->json([
            'activity_logs' => $activityLogs,
        ]);
    }
}
