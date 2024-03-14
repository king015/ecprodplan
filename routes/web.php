<?php
use App\Http\Controllers\FinishedGoodsController;
use App\Http\Controllers\ProductionController;
use App\Http\Controllers\ProductionPlanController;
use App\Http\Controllers\ProfileController;
use App\Http\Controllers\WorkInProcessController;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;

// Welcome page route
Route::get('/', function () {
    return Inertia::render('Welcome');
});

// Dashboard route requiring authentication and email verification
Route::middleware(['auth', 'verified'])->get('/dashboard', function () {
    return Inertia::render('Dashboard');
})->name('dashboard');

// Profile routes requiring authentication
Route::middleware(['auth'])->group(function () {
    Route::get('/profile', [ProfileController::class, 'edit'])->name('profile.edit');
    Route::patch('/profile', [ProfileController::class, 'update'])->name('profile.update');
    Route::delete('/profile', [ProfileController::class, 'destroy'])->name('profile.destroy');
});

// Production Plan routes
Route::middleware(['auth'])->resource('/production-plan', ProductionPlanController::class)->except(['create', 'edit']);

// Work In Process routes
Route::resource('/work-in-process', WorkInProcessController::class)->except(['create', 'edit']);

// Finished Goods routes
Route::resource('/finished-goods', FinishedGoodsController::class)->except(['create', 'edit']);

// Finished Goods routes with authentication and authorization
Route::middleware(['auth', 'can:manage-finished-goods'])->resource('/finished-goods', FinishedGoodsController::class)->except(['create', 'edit']);

// Authentication routes
require __DIR__.'/auth.php';

