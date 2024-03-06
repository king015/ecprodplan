<?php

namespace App\Http\Controllers;

use App\Models\FinishedGoods;
use App\Http\Requests\StoreFinishedGoodsRequest;
use App\Http\Requests\UpdateFinishedGoodsRequest;
use App\Http\Resources\FinishedGoodsResource;

class FinishedGoodsController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     *  @param mixed $resource
     *
     * @return \Illuminate\Http\Resources\Json\AnonymousResourceCollection
     *
     */
    public function index()
    {
        return FinishedGoodsResource::collection(FinishedGoods::query()->orderBy('id', 'desc')->paginate(50));
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(StoreFinishedGoodsRequest $request)
    {
        $data =  $request->validated();

        $finishedGoods = FinishedGoods::create($data);
        return response(new FinishedGoodsResource($finishedGoods), 201) ;
    }

    /**
     * Display the specified resource.
     */
    public function show(FinishedGoods $finishedGoods)
    {
        return new FinishedGoodsResource(($finishedGoods));
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(UpdateFinishedGoodsRequest $request, FinishedGoods $finishedGoods)
    {
        $data = $request->validated();
        $finishedGoods->update($data);

        return new FinishedGoodsResource($finishedGoods);
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(FinishedGoods $finishedGoods)
    {
        $finishedGoods->delete();

        return response("", 204);
    }
}
