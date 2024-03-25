<?php
use App\Http\Controllers\Api\ActivityLogController;
use App\Http\Controllers\Api\AuthController;
use App\Http\Controllers\Api\UserController;
use App\Http\Controllers\FinishedGoodsController;
use App\Http\Controllers\PmmsMasterlistController;
use App\Http\Controllers\ProductionPlanController;
use App\Http\Controllers\WorkInProcessController;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

Route::middleware('auth:sanctum')->group(function () {
    Route::get('/user', function (Request $request) {
        return $request->user();
    });

    Route::post('/logout', [AuthController::class, 'logout']);
    Route::apiResource('/users', UserController::class);
    Route::get('/user_activities', [ActivityLogController::class, 'index']);
    Route::apiResource('/production_plan', ProductionPlanController::class);
    Route::apiResource('/finished_goods', FinishedGoodsController::class);
    Route::apiResource('/work_in_process', WorkInProcessController::class);
    Route::put('/finished_goods/{id}/fg_in', [FinishedGoodsController::class, 'updateFGIn']);
    Route::put('/finished_goods/{id}/beginning_inventory', [FinishedGoodsController::class, 'updateBeginningInventory']);
    // Define the route for updating FG In
    Route::get('/pmms_masterlist', [PmmsMasterlistController::class, 'index']);
    Route::post('/finished_goods/{id}/update_quantity', [FinishedGoodsController::class, 'updateQuantity']);
    Route::put('/finished_goods/{id}/ending_inventory', [FinishedGoodsController::class, 'updateEndingInventory']);
});

Route::post('/signup', [AuthController::class, 'signup']);
Route::post('/login', [AuthController::class, 'login']);

Route::get('/finished_goods_data', function () {
    try {
        // Fetch data from FinishedGoods table
        $finishedGoodsData = \App\Models\FinishedGoods::all();

        if ($finishedGoodsData->isEmpty()) {
            return response()->json([
                'message' => 'No finished goods data found.',
            ], 404);
        }

        // Fetch data from WorkInProcess table
        $workInProcessData = \App\Models\WorkInProcess::all();

        // Merge work_in_process data with finished_goods data
        foreach ($finishedGoodsData as $finishedGoodsItem) {
            $workInProcessItem = $workInProcessData->where('id', $finishedGoodsItem->id)->first();
            $finishedGoodsItem->creaser = $workInProcessItem->creaser ?? null;
            $finishedGoodsItem->flexo_print = $workInProcessItem->flexo_print ?? null;
            $finishedGoodsItem->printer_slotter = $workInProcessItem->printer_slotter ?? null;
            $finishedGoodsItem->slotting = $workInProcessItem->slotting ?? null;
            $finishedGoodsItem->clapper = $workInProcessItem->clapper ?? null;
            $finishedGoodsItem->diecut = $workInProcessItem->diecut ?? null;
            $finishedGoodsItem->stitching = $workInProcessItem->stitching ?? null;
            $finishedGoodsItem->detach = $workInProcessItem->detach ?? null;
            $finishedGoodsItem->gluing = $workInProcessItem->gluing ?? null;
            $finishedGoodsItem->pre_assembly = $workInProcessItem->pre_assembly ?? null;
            $finishedGoodsItem->manual_slotting = $workInProcessItem->manual_slotting ?? null;
            $finishedGoodsItem->pallet_assembly = $workInProcessItem->pallet_assembly ?? null;
            $finishedGoodsItem->manual_printing = $workInProcessItem->manual_printing ?? null;
            $finishedGoodsItem->manual_cutting = $workInProcessItem->manual_cutting ?? null;
            $finishedGoodsItem->laminating = $workInProcessItem->laminating ?? null;
            $finishedGoodsItem->box_assembly = $workInProcessItem->box_assembly ?? null;
            $finishedGoodsItem->fp_manual_cutting = $workInProcessItem->fp_manual_cutting ?? null;
            $finishedGoodsItem->fp_diecut = $workInProcessItem->fp_diecut ?? null;
            $finishedGoodsItem->bandsaw = $workInProcessItem->bandsaw ?? null;
            $finishedGoodsItem->skiving = $workInProcessItem->skiving ?? null;
            $finishedGoodsItem->fp_detach = $workInProcessItem->fp_detach ?? null;
            $finishedGoodsItem->heating_plate = $workInProcessItem->heating_plate ?? null;
            $finishedGoodsItem->hotmelt = $workInProcessItem->hotmelt ?? null;
            $finishedGoodsItem->assembly_heating = $workInProcessItem->assembly_heating ?? null;
            $finishedGoodsItem->fp_manual_printing = $workInProcessItem->fp_manual_printing ?? null;
            $finishedGoodsItem->sealing = $workInProcessItem->sealing ?? null;
            $finishedGoodsItem->fp_packing = $workInProcessItem->fp_packing ?? null;
        }

        return response()->json([
            'finished_goods_data' => $finishedGoodsData,
        ]);
    } catch (\Exception $e) {
        // Log the error for debugging
        \Log::error('Error fetching finished goods data: ' . $e->getMessage());

        // Return error response
        return response()->json([
            'error' => 'Failed to fetch finished goods data. Please try again later.',
        ], 500);
    }
});
