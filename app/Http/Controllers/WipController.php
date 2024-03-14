<?php

namespace App\Http\Controllers;

use App\Http\Requests\StoreWipRequest;

use App\Http\Requests\UpdateWipRequest;

use App\Http\Resources\WipResource;
use App\Models\Finished;

use App\Models\Wip;

use Illuminate\Http\Response;

class WipController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $workInProcess = Wip::orderBy('id', 'desc')->paginate(10);

        return WipResource::collection($workInProcess);
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(StoreWipRequest $request)
    {
        $data = $request->validated();
        $workInProcess = Wip::create($data);
        return new WipResource($workInProcess, Response::HTTP_CREATED);
    }

    /**
     * Display the specified resource.
     */
    public function show(Wip $workInProcess)
    {
        return new WipResource($workInProcess);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(UpdateWipRequest $request, Wip $workInProcess)
    {
        $data = $request->validated();
        $workInProcess->update($data);
        return new WipResource($workInProcess);
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Finished $workInProcess)
    {
        $workInProcess->delete();
        return response("", Response::HTTP_NO_CONTENT);
    }
}
