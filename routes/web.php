<?php

use App\Http\Controllers\FinishedGoodsController;
use App\Http\Controllers\ProductionPlanController;
use App\Http\Controllers\ProfileController;
use App\Http\Controllers\WorkInProcessController;
use Illuminate\Foundation\Application;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;

/*
|--------------------------------------------------------------------------
| Web Routes
|--------------------------------------------------------------------------
|
| Here is where you can register web routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| contains the "web" middleware group. Now create something great!
|
*/

Route::get('/', function () {
    return Inertia::render('Welcome', [
        'canLogin' => Route::has('login'),
        'canRegister' => Route::has('register'),
        'laravelVersion' => Application::VERSION,
        'phpVersion' => PHP_VERSION,
    ]);
});

Route::get('/dashboard', function () {
    return Inertia::render('Dashboard');
})->middleware(['auth', 'verified'])->name('dashboard');

Route::middleware('auth')->group(function () {
    Route::get('/profile', [ProfileController::class, 'edit'])->name('profile.edit');
    Route::patch('/profile', [ProfileController::class, 'update'])->name('profile.update');
    Route::delete('/profile', [ProfileController::class, 'destroy'])->name('profile.destroy');

     // Production Plan routes
     Route::get('/production-plan', [ProductionPlanController::class, 'index'])->name('production-plan.index');
     Route::post('/production-plan', [ProductionPlanController::class, 'store'])->name('production-pla.store');
     Route::get('/production-plan/{productionPlan}', [ProductionPlanController::class, 'show'])->name('production-plan.show');
     Route::put('/production-plan/{productionPlan}', [ProductionPlanController::class, 'update'])->name('production-plan.update');
     Route::delete('/production-plan/{productionPlan}', [ProductionPlanController::class, 'destroy'])->name('production-plan.destroy');

       // Work In Process routes
    Route::get('/work-in-process', [WorkInProcessController::class, 'index'])->name('work-in-process.index');
    Route::post('/work-in-process', [WorkInProcessController::class, 'store'])->name('work-in-process.store');
    Route::get('/work-in-process/{workInProcess}', [WorkInProcessController::class, 'show'])->name('work-in-process.show');
    Route::put('/work-in-process/{workInProcess}', [WorkInProcessController::class, 'update'])->name('work-in-process.update');
    Route::delete('/work-in-process/{workInProcess}', [WorkInProcessController::class, 'destroy'])->name('work-in-process.destroy');

    // Finished Goods routes
    Route::get('/finished-goods', [FinishedGoodsController::class, 'index'])->name('finished-goods.index');
    Route::post('/finished-goods', [FinishedGoodsController::class, 'store'])->name('finished-goods.store');
    Route::get('/finished-goods/{finishedGoods}', [FinishedGoodsController::class, 'show'])->name('finished-goods.show');
    Route::put('/finished-goods/{finishedGoods}', [FinishedGoodsController::class, 'update'])->name('finished-goods.update');
    Route::delete('/finished-goods/{finishedGoods}', [FinishedGoodsController::class, 'destroy'])->name('finished-goods.destroy');


});

require __DIR__.'/auth.php';
