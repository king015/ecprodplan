<?php

namespace App\Http\Resources;

use Illuminate\Http\Resources\Json\JsonResource;

class WorkInProcessResource extends JsonResource
{
    /**
     * Transform the resource into an array.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return array
     */
    public function toArray($request)
    {
        // Return an array with properties
        return [
            'id' => $this->id,
            'customer' => $this->customer,
            'code' => $this->code,
            'itemDescription' => $this->itemDescription,
            'partNumber' => $this->partNumber,
            'creaser' => $this->creaser ?? null,
            'flexo_print' => $this->flexo_print ?? null,
            'printer_slotter' => $this->printer_slotter ?? null,
            'slotting' => $this->slotting ?? null,
            'clapper' => $this->clapper ?? null,
            'diecut' => $this->diecut ?? null,
            'stitching' => $this->stitching ?? null,
            'detach' => $this->detach ?? null,
            'gluing' => $this->gluing ?? null,
            'pre_assembly' => $this->pre_assembly ?? null,
            'manual_slotting' => $this->manual_slotting ?? null,
            'pallet_assembly' => $this->pallet_assembly ?? null,
            'manual_printing' => $this->manual_printing ?? null,
            'manual_cutting' => $this->manual_cutting ?? null,
            'laminating' => $this->laminating ?? null,
            'box_assembly' => $this->box_assembly ?? null,
            'fp_manual_cutting' => $this->fp_manual_cutting ?? null,
            'fp_diecut' => $this->fp_diecut ?? null,
            'bandsaw' => $this->bandsaw ?? null,
            'skiving' => $this->skiving ?? null,
            'fp_detach' => $this->fp_detach ?? null,
            'heating_plate' => $this->heating_plate ?? null,
            'hotmelt' => $this->hotmelt ?? null,
            'assembly_heating' => $this->assembly_heating ?? null,
            'fp_manual_printing' => $this->fp_manual_printing ?? null,
            'sealing' => $this->sealing ?? null,
            'fp_packing' => $this->fp_packing ?? null,
        ];
    }
}
