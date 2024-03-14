<?php

namespace App\Http\Controllers;

use App\Models\WorkInProcess;
use App\Http\Requests\StoreWorkInProcessRequest;
use App\Http\Requests\UpdateWorkInProcessRequest;
use App\Http\Resources\WorkInProcessResource;
use Illuminate\Http\Response;
use Illuminate\Support\Facades\Auth;

class WorkInProcessController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $workInProcess = WorkInProcess::with('finishedGoods')->orderBy('id', 'desc')->paginate(10);

        return WorkInProcessResource::collection($workInProcess);
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(StoreWorkInProcessRequest $request)
    {
        $data = $request->validated();
        $workInProcess = WorkInProcess::create($data);

        return new WorkInProcessResource($workInProcess);
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
        $this->authorize('update', $workInProcess);

        $data = $request->validated();
        $workInProcess->update($data);

        return new WorkInProcessResource($workInProcess);
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(WorkInProcess $workInProcess)
    {
        $this->authorize('delete', $workInProcess);

        $workInProcess->delete();

        return response()->noContent();
    }
}
