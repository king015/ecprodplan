<?php

namespace App\Http\Controllers;

use App\Http\Requests\StoreFinishedGoodsRequest;
use App\Http\Requests\UpdateFinishedGoodsRequest;
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
        return response()->noContent();
    }

    /**
     * Count the number of work in process items.
     */
    public function count()
    {
        $count = FinishedGoods::count();
        return response()->json(['count' => $count]);
    }

    /**
     * Update the quantity of a specific finished goods item.
     */
    public function updateQuantity(Request $request, $id)
    {
        try {
            // Validate the request data
            $validatedData = $request->validate([
                'quantity' => 'required|integer|min:0',
            ]);

            // Find the finished goods item by its ID
            $finishedGoods = FinishedGoods::findOrFail($id);

            // Update the quantity of the finished goods item
            $finishedGoods->quantity = $validatedData['quantity'];
            $finishedGoods->save();

            // Return success response
            return response()->json([
                'message' => 'Quantity updated successfully.',
                'finished_goods' => new FinishedGoodsResource($finishedGoods),
            ]);
        } catch (\Exception $e) {
            // Log the error for debugging
            \Log::error('Error updating quantity: ' . $e->getMessage());

            // Return error response
            return response()->json([
                'error' => 'Failed to update quantity. Please try again later.',
            ], 500);
        }
    }
}
