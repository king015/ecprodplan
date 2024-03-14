<?php

namespace App\Http\Requests;

use Carbon\Carbon;
use Illuminate\Foundation\Http\FormRequest;

class StoreWorkInProcessRequest extends FormRequest
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
            'creaser'=>'integer',
            'flexo_print'=>'integer',
            'printer_slotter'=>'integer',
            'slotting'=>'integer',
            'clapper'=>'integer',
            'diecut'=>'integer',
            'stitching'=>'integer',
            'detach'=>'integer',
            'gluing'=>'integer',
            'pre_assembly'=>'integer',
            'manual_slotting'=>'integer',
            'packing'=>'integer',
            'pallet_assembly'=>'integer',
            'manual_printing'=>'integer',
            'manual_cutting'=>'integer',
            'laminating'=>'integer',
            'box_assembly'=>'integer',
            'fp_manual_cutting'=>'integer',
            'fp_diecut'=>'integer',
            'bandsaw'=>'integer',
            'skiving'=>'integer',
            'fp_detach'=>'integer',
            'heating_plate' => 'integer',
            'hotmelt'=>'integer',
            'assembly_heating'=>'integer',
            'fp_manual_printing'=>'integer',
            'sealing'=>'integer',
            'fp_packing'=>'integer',
        ];
    }

    public function validationData()
    {
        $data = parent::validationData();

        // Add the token to the validation data
        $token = $this->header('Authorization');
        if ($token) {
            $data['token'] = $token;
        }

        return $data;
    }
}
