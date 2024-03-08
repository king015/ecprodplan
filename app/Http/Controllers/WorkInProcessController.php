<?php

namespace App\Http\Controllers;

use App\Models\WorkInProcess;
use App\Http\Requests\StoreWorkInProcessRequest;
use App\Http\Requests\UpdateWorkInProcessRequest;
use App\Http\Resources\WorkInProcessResource;
use Illuminate\Http\Response;

class WorkInProcessController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $workInProcess = WorkInProcess::orderBy('created_at', 'desc')->paginate(10);
        return WorkInProcessResource::collection($workInProcess);
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(StoreWorkInProcessRequest $request)
    {
        $data = $request->validated();
        $workInProcess = WorkInProcess::create($data);
        return response(new WorkInProcessResource($workInProcess), Response::HTTP_CREATED);
    }

    /**
     * Display the specified resource.
     */
    public function show(WorkInProcess $workInProcess)
    {
        return new WorkInProcessResource($workInProcess);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(UpdateWorkInProcessRequest $request, WorkInProcess $workInProcess)
    {
        $data = $request->validated();
        $workInProcess->update($data);
        return new WorkInProcessResource($workInProcess);
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(WorkInProcess $workInProcess)
    {
        $workInProcess->delete();
        return response("", Response::HTTP_NO_CONTENT);
    }
}
