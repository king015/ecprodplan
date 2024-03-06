<?php

namespace App\Http\Resources;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class FinishedGoodsResource extends JsonResource
{
    /**
     * Transform the resource into an array.
     *
     * @return array<string, mixed>
     */
    public function toArray($request)
    {
        return [
            'id' => $this->id,
            'customer' => $this->customer,
            'code' => $this->code,
            'itemDescription' => $this->itemDescription,
            'partNumber' => $this->partNumber,
            'location' => $this->location,
            'beginning_inventory' => $this->beginning_inventory,
            'beginning_date' => $this->beginning_date,
            'ending_inventory' => $this->ending_date,
            'fg_in' => $this->fg_in,
            'fg_out' => $this->fg_out,
        ];
    }
}
