<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class UpdateFinishedGoodsRequest extends FormRequest
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
            'itemDescription'=>'required|string',
            'partNumber'=>'required|string',
            'location'=>'required|string',
            'beginning_inventory'=>'required|integer',
            'beginning_date'=>'required|date',
            'ending_inventory'=>'required|integer',
            'ending_date'=>'required|date',
            'fg_in'=>'required|integer',
            'fg_out'=>'required|integer',
        ];
    }
}
