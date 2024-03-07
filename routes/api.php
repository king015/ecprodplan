<?php

use App\Http\Controllers\Api\ActivityLogController;
use App\Http\Controllers\Api\AuthController;
use App\Http\Controllers\Api\UserController;
use App\Http\Controllers\FinishedGoodsController;
use App\Http\Controllers\ProductionPlanController;
use App\Http\Controllers\WorkInProcessController;
use App\Models\FinishedGoods;
use App\Models\ProductionPlan;
use App\Models\WorkInProcess;
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
    Route::apiResource('/work_in_processes', WorkInProcessController::class);
});

Route::post('/signup', [AuthController::class, 'signup']);
Route::post('/login', [AuthController::class, 'login']);

Route::get('/combined_data', function () {
    $combinedData = ProductionPlan::with('finishedGoods', 'workInProcess')->get();

    return response()->json([
        'combined_data' => $combinedData,
    ]);
});
