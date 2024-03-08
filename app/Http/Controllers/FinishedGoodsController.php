<?php

namespace App\Http\Controllers;

use App\Models\FinishedGoods;
use Illuminate\Http\Request;
use App\Http\Resources\FinishedGoodsResource;

class FinishedGoodsController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $finishedGoods = FinishedGoods::orderBy('created_at', 'desc')->paginate(10);
        return FinishedGoodsResource::collection($finishedGoods);
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        $data = $request->validate([
            // Define validation rules for your fields here
        ]);

        $finishedGoods = FinishedGoods::create($data);
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
