<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class StoreProductionPlanRequest extends FormRequest
{
    /**
     * Determine if the user is authorized to make this request.
     */
    public function authorize(): bool
    {
        return true;
    }

    /**
     * Get the validation rules that apply to the request.
     *
     * @return array<string, \Illuminate\Contracts\Validation\ValidationRule|array<mixed>|string>
     */
    public function rules(): array
    {
        return [
            'customer'=>'required|string',
            'code'=>'required|string',
            'item_description'=>'required|string',
            'part_number'=>'required|string',
            'weekly_requisites'=>'required|string',
            'mon'=>'required|integer',
            'tues'=>'required|integer',
            'wed'=>'required|integer',
            'thurs'=>'required|integer',
            'fri'=>'required|integer',
            'sat'=>'required|integer',
            'finished_goods'=>'required|integer',
            'creaser'=>'required|integer',
            'flexo_print'=>'required|integer',
            'printer_slotter'=>'required|integer',
            'slotting'=>'required|integer',
            'clapper'=>'required|integer',
            'diecut'=>'required|integer',
            'stitching'=>'required|integer',
            'detach'=>'required|integer',
            'gluing'=>'required|integer',
            'pre_assembly'=>'required|integer',
            'manual_slotting'=>'required|integer',
            'packing'=>'required|integer',
            'pallet_assembly'=>'required|integer',
            'manual_printing'=>'required|integer',
            'manual_cutting'=>'required|integer',
            'laminating'=>'required|integer',
            'box_assembly'=>'required|integer',
            'fp_manual_cutting'=>'required|integer',
            'fp_diecut'=>'required|integer',
            'bandsaw'=>'required|integer',
            'skiving'=>'required|integer',
            'fp_detach'=>'required|integer',
            'heating_plate	'=>'required|integer',
            'hotmelt'=>'required|integer',
            'assembly_heating'=>'required|integer',
            'fp_manual_printing'=>'required|integer',
            'sealing'=>'required|integer',
            'fp_packing'=>'required|integer',
        ];
    }
}
