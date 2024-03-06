<?php

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
    Route::apiResource('/production_plans', ProductionPlanController::class); // Corrected resource name
    Route::apiResource('/finished_goods', FinishedGoodsController::class);
    Route::apiResource('/work_in_processes', WorkInProcessController::class); // Corrected resource name
});

Route::post('/signup', [AuthController::class, 'signup']);
Route::post('/login', [AuthController::class, 'login']);

Route::get('/combined_data', function () {
    $productionPlans = ProductionPlan::all();
    $finishedGoods = FinishedGoods::all();
    $workInProcess = WorkInProcess::all();

    return response()->json([
        'production_plan' => $productionPlans,
        'finished_goods' => $finishedGoods,
        'work_in_processes' => $workInProcess,
    ]);
});

