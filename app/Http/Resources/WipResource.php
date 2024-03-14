<?php

namespace App\Http\Resources;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class WipResource extends JsonResource
{
    /**
     * Transform the resource into an array.
     *
     * @return array<string, mixed>
     */
    public function toArray(Request $request): array
    {
        return [

            'creaser' => $this->creaser,
            'flexo_print' => $this->flexo_print,
            'printer_slotter' => $this->printer_slotter,
            'slotting' => $this->slotting,
            'clapper' => $this->clapper,
            'diecut' => $this->diecut,
            'stitching' => $this->stitching,
            'detach' => $this->detach,
            'gluing' => $this->gluing,
            'pre_assembly' => $this->pre_assembly,
            'manual_slotting' => $this->manual_slotting,
            'packing' => $this->packing,
            'pallet_assembly' => $this->pallet_assembly,
            'manual_printing' => $this->manual_printing,
            'manual_cutting' => $this->manual_cutting,
            'laminating' => $this->laminating,
            'box_assembly' => $this->box_assembly,
            'fp_manual_cutting' => $this->fp_manual_cutting,
            'fp_diecut' => $this->fp_diecut,
            'bandsaw' => $this->bandsaw,
            'skiving' => $this->skiving,
            'fp_detach' => $this->fp_detach,
            'heating_plate' => $this->heating_plate,
            'hotmelt' => $this->hotmelt,
            'assembly_heating' => $this->assembly_heating,
            'fp_manual_printing' => $this->fp_manual_printing,
            'sealing' => $this->sealing,
            'fp_packing' => $this->fp_packing,
        ];
    }
}
