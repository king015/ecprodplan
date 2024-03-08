<?php

namespace App\Http\Controllers;

use App\Models\ProductionPlan;
use Illuminate\Http\Request;
use App\Http\Resources\ProductionPlanResource;

class ProductionPlanController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $productionPlans = ProductionPlan::orderBy('created_at', 'desc')->paginate(10);
        return ProductionPlanResource::collection($productionPlans);
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        $data = $request->validate([
            // Define validation rules for your fields here
        ]);

        $productionPlan = ProductionPlan::create($data);
        return new ProductionPlanResource($productionPlan);
    }

    /**
     * Display the specified resource.
     */
    public function show(ProductionPlan $productionPlan)
    {
        return new ProductionPlanResource($productionPlan);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, ProductionPlan $productionPlan)
    {
        $data = $request->validate([
            // Define validation rules for your fields here
        ]);

        $productionPlan->update($data);
        return new ProductionPlanResource($productionPlan);
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(ProductionPlan $productionPlan)
    {
        $productionPlan->delete();
        return response()->noContent();
    }
}
