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

    public function updateFGIn(Request $request, $id)
    {
        try {
            // Validate the request data
            $validatedData = $request->validate([
                'fg_in' => 'required|integer|min:0',
                // Add validation rules for other fields if needed
            ]);

            // Find the finished goods item by its ID
            $finishedGoods = FinishedGoods::findOrFail($id);

            // Log the request payload to check if 'fg_in' is present
            \Log::info('Request Payload: ', $validatedData);

            // Update the fg_in (finished goods in) field of the finished goods item
            $finishedGoods->fg_in = $validatedData['fg_in'];

            // Log the updated finished goods object to check 'fg_in' value before saving
            \Log::info('Updated Finished Goods Object: ', $finishedGoods->toArray());

            // Save the changes to the database
            $finishedGoods->save();

            // Return success response
            return response()->json([
                'message' => 'Finished goods in quantity updated successfully.',
                'finished_goods' => new FinishedGoodsResource($finishedGoods),
            ]);
        } catch (\Exception $e) {
            // Log the error for debugging
            \Log::error('Error updating finished goods in quantity: ' . $e->getMessage());

            // Return error response
            return response()->json([
                'error' => 'Failed to update finished goods in quantity. Please try again later.',
                'details' => $e->getMessage(), // Add details of the exception for debugging
            ], 500);
        }
    }

    public function updateEndingInventory($id, Request $request)
    {
        try {
            // Retrieve the finished goods item by ID
            $finishedGoodsItem = FinishedGoods::findOrFail($id);

            // Get the ending inventory from the request payload
            $endingInventory = $request->input('ending_inventory');

            // Update the ending inventory of the finished goods item
            $finishedGoodsItem->ending_inventory = $endingInventory;
            $finishedGoodsItem->save();

            // Retrieve fg_in from the request payload
            $fgIn = $request->input('fg_in');

            // Update fg_in of the finished goods item
            $finishedGoodsItem->fg_in = $fgIn;
            $finishedGoodsItem->save();

            // Return success response
            return response()->json([
                'message' => 'Ending inventory and fg_in updated successfully.',
                'finished_goods' => $finishedGoodsItem,
            ]);
        } catch (\Exception $e) {
            // Log the error for debugging
            \Log::error('Error updating ending inventory: ' . $e->getMessage());

            // Return error response
            return response()->json([
                'error' => 'Failed to update ending inventory. Please try again later.',
            ], 500);
        }
    }
    public function updateBeginningInventory(Request $request, $id)
    {
        // Retrieve the finished goods item by its ID
        $finishedGoods = FinishedGoods::findOrFail($id);

        // Update the beginning inventory with the value provided in the request
        $finishedGoods->beginning_inventory = $request->input('beginning_inventory');

        // Save the changes
        $finishedGoods->save();

        // Return a success response
        return response()->json(['message' => 'Beginning inventory updated successfully']);
    }

}
