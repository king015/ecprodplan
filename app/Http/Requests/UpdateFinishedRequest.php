<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class StoreFinishedRequest extends FormRequest
{
    /**
     * Determine if the user is authorized to make this request.
     */
    public function authorize(): bool
    {
        return true; // Change to true if you want to authorize all users to make this request
    }

    /**
     * Get the validation rules that apply to the request.
     *
     * @return array<string, \Illuminate\Contracts\Validation\ValidationRule|array<mixed>|string>
     */
    public function rules(): array
    {
        return [
            'customer' => 'required|string',
            'code' => 'required|string',
            'itemDescription' => 'required|string',
            'partNumber' => 'required|string',
            'weekly_requisites' => 'required|integer',
            'beginning_inventory' => 'nullable|integer',
            'beginning_date' => 'nullable|date',
            'ending_inventory' => 'nullable|integer',
            'ending_date' => 'nullable|date',
            'fg_in' => 'nullable|integer',
            'fg_out' => 'nullable|integer',
        ];
    }
}
