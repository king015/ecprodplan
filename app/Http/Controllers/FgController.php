<?php

namespace App\Http\Controllers;

use App\Http\Requests\StoreFinishedRequest;
use App\Http\Requests\UpdateFinishedRequest;
use App\Http\Resources\FinishedResource;
use App\Http\Resources\ProductionResource;
use App\Models\Finished;
use App\Models\Production;
use Illuminate\Http\Request;
use Illuminate\Http\Response;

class FgController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $finishedGoods = Production::orderBy('id', 'desc')->paginate(10);

        return ProductionResource::collection($finishedGoods);
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(StoreFinishedRequest $request)
    {
        $data = $request->validated();
        $finishedGoods = Finished::create($data);
        return new ProductionResource($finishedGoods, Response::HTTP_CREATED);
    }

    /**
     * Display the specified resource.
     */
    public function show(Finished $finishedGoods)
    {
        return new FinishedResource($finishedGoods);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(UpdateFinishedRequest $request, Finished $finished)
    {
        $data = $request->validated();
        $finished->update($data);
        return new ProductionResource($finished);
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Finished $finished)
    {
        $finished->delete();
        return response("", Response::HTTP_NO_CONTENT);
    }
}
