<?php

namespace App\Http\Controllers;

use App\Models\ProductionPlan;
use App\Http\Requests\StoreProductionPlanRequest;
use App\Http\Requests\UpdateProductionPlanRequest;
use App\Http\Resources\ProductionPlanResource;

class ProductionPlanController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @param mixed $resource
     *
     * @return \Illuminate\Http\Resources\Json\AnonymousResourceCollection
     */
    public function index()
    {
        return ProductionPlanResource::collection(ProductionPlan::query()->orderBy('id', 'desc')->paginate(50));
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(StoreProductionPlanRequest $request)
    {
        $data =  $request->validated();

        $productionPlan = ProductionPlan::create($data);
        return response(new ProductionPlanResource($productionPlan), 201) ;
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
    public function update(UpdateProductionPlanRequest $request, ProductionPlan $productionPlan)
    {
        $data = $request->validated();
        $productionPlan->update($data);

        return new ProductionPlanResource($productionPlan);
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(ProductionPlan $productionPlan)
    {
        $productionPlan->delete();

        return response("", 204);
    }
}
