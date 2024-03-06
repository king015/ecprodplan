<?php

namespace App\Http\Controllers;

use App\Models\WorkInProcess;
use App\Http\Requests\StoreWorkInProcessRequest;
use App\Http\Requests\UpdateWorkInProcessRequest;
use App\Http\Resources\WorkInProcessResource;

class WorkInProcessController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        return WorkInProcessResource::collection(WorkInProcess::query()->orderBy('id', 'desc')->paginate(50));
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(StoreWorkInProcessRequest $request)
    {
        $data =  $request->validated();

        $workInProcess = WorkInProcess::create($data);
        return response(new WorkInProcessResource($workInProcess), 201) ;
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

        return response("", 204);
    }
}
