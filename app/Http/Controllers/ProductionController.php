<?php

namespace App\Http\Controllers;

use App\Http\Requests\StoreProductionPlanRequest;
use App\Http\Requests\UpdateProductionRequest;
use App\Http\Resources\ProductionResource;
use App\Models\Production;
use Illuminate\Http\Request;
use Illuminate\Http\Response;
use StoreProductionRequest;

class ProductionController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $productions = Production::orderBy('id', 'desc')->paginate(10);

        return ProductionResource::collection($productions);
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(StoreProductionPlanRequest $request)
    {
        $data = $request->validated();
        $production = Production::create($data);
        return new ProductionResource($production, Response::HTTP_CREATED);
    }

    /**
     * Display the specified resource.
     */
    public function show(Production $production)
    {
        return new ProductionResource($production);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(UpdateProductionRequest $request, Production $production)
    {
        $data = $request->validated();
        $production->update($data);
        return new ProductionResource($production);
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Production $production)
    {
        $production->delete();
        return response("", Response::HTTP_NO_CONTENT);
    }
}
