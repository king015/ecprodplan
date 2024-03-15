<?php

namespace App\Http\Controllers;

use App\Http\Requests\StoreFinishedGoodsRequest;
use App\Models\FinishedGoods;
use Illuminate\Http\Request;
use App\Http\Resources\FinishedGoodsResource;
use Auth;

class FinishedGoodsController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $finishedGoods = FinishedGoods::orderBy('id', 'desc')->paginate(10);
        return FinishedGoodsResource::collection($finishedGoods);
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(StoreFinishedGoodsRequest $request)
    {
        // The request is automatically authorized and validated
        // Access the validated data including the token using $request->validated()
        $validatedData = $request->validated();

        // Now you can use the validated data, including the token
        $finishedGoods = FinishedGoods::create($validatedData);
        return new FinishedGoodsResource($finishedGoods);
    }

    /**
     * Display the specified resource.
     */
    public function show(FinishedGoods $finishedGoods)
    {
        return new FinishedGoodsResource($finishedGoods);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, FinishedGoods $finishedGoods)
    {
        $data = $request->validate([
            // Define validation rules for your fields here
        ]);

        $finishedGoods->update($data);
        return new FinishedGoodsResource($finishedGoods);
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(FinishedGoods $finishedGoods)
    {
        $finishedGoods->delete();
        return response()->noContent();
    }
}
