<?php
namespace App\Http\Requests;

use App\Models\FinishedGoods;
use Illuminate\Foundation\Http\FormRequest;

class StoreWorkInProcessRequest extends FormRequest
{
    /**
     * Determine if the user is authorized to make this request.
     */
    public function authorize(): bool
    {
        // Check if the user is authenticated
        if ($this->user()) {
            // Check if the user can create FinishedGoods
            return $this->user()->can('create', FinishedGoods::class);
        }

        return false;
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
            'itemDescription'=>'required|string',
            'partNumber'=>'required|string',
            'creaser'=>'nullable|integer',
            'flexo_print'=>'nullable|integer',
            'printer_slotter'=>'nullable|integer',
            'slotting'=>'nullable|integer',
            'clapper'=>'nullable|integer',
            'diecut'=>'nullable|integer',
            'stitching'=>'nullable|integer',
            'detach'=>'nullable|integer',
            'gluing'=>'nullable|integer',
            'pre_assembly'=>'nullable|integer',
            'manual_slotting'=>'nullable|integer',
            'packing'=>'nullable|integer',
            'pallet_assembly'=>'nullable|integer',
            'manual_printing'=>'nullable|integer',
            'manual_cutting'=>'nullable|integer',
            'laminating'=>'nullable|integer',
            'box_assembly'=>'nullable|integer',
            'fp_manual_cutting'=>'nullable|integer',
            'fp_diecut'=>'nullable|integer',
            'bandsaw'=>'nullable|integer',
            'skiving'=>'nullable|integer',
            'fp_detach'=>'nullable|integer',
            'heating_plate' => 'nullable|integer',
            'hotmelt'=>'nullable|integer',
            'assembly_heating'=>'nullable|integer',
            'fp_manual_printing'=>'nullable|integer',
            'sealing'=>'nullable|integer',
            'fp_packing'=>'nullable|integer',
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
