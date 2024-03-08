<?php

namespace App\Http\Resources;

use Illuminate\Http\Resources\Json\JsonResource;

class ProductionPlanResource extends JsonResource
{
    /**
     * Transform the resource into an array.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return array
     */
    public function toArray($request)
    {
        return [
            'id' => $this->id,

            'weekly_requisites' => $this->weekly_requisites,
            'mon' => $this->mon,
            'tues' => $this->tues,
            'wed' => $this->wed,
            'thurs' => $this->thurs,
            'fri' => $this->fri,
            'sat' => $this->sat,
            'fg' => $this->fg,
            'created_at' => $this->created_at,
            'updated_at' => $this->updated_at,
        ];
    }
}
