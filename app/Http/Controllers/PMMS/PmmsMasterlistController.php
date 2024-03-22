<?php

namespace App\Http\Controllers;

use App\Models\PmmsMasterlist;
use Illuminate\Http\Request;

class PmmsMasterlistController extends Controller
{
    /**
     * Retrieve all records from the pmms_masterlist table.
     *
     * @return \Illuminate\Http\JsonResponse
     */
    public function index()
    {
        try {
            // Retrieve all records from the pmms_masterlist table
            $records = PmmsMasterlist::all();

            // Return the records as a JSON response
            return response()->json([
                'success' => true,
                'data' => $records
            ]);
        } catch (\Exception $e) {
            // Log the error for debugging
            \Log::error('Error fetching records from pmms_masterlist table: ' . $e->getMessage());

            // Return error response
            return response()->json([
                'success' => false,
                'message' => 'Failed to fetch records from pmms_masterlist table. Please try again later.'
            ], 500);
        }
    }

    // Implement other methods for additional functionalities like creating, updating, or deleting records if needed
}
