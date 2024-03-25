<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;
use Carbon\Carbon;

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
            'customer' => 'string|required',
            'code' => 'string|required',
            'itemDescription' => 'string|required',
            'partNumber' => 'string|required',
            'location' => 'string|required',
            'beginning_inventory' => 'integer|required',
            'beginning_date' => 'date|required',
            'ending_inventory' => 'integer|nullable',
            'ending_date' => 'date|nullable',
            'fg_in' => 'integer|nullable',
            'fg_out' => 'integer|nullable',
        ];
    }

    /**
     * Get the validation data that apply to the request.
     *
     * @return array
     */
    public function validationData()
    {
        $data = parent::validationData();

        // Modify beginning_date and ending_date formats using Carbon
        if (isset($data['beginning_date'])) {
            $data['beginning_date'] = Carbon::parse($data['beginning_date'])->toDateTimeString();
        }

        if (isset($data['ending_date'])) {
            $data['ending_date'] = Carbon::parse($data['ending_date'])->toDateTimeString();
        }

        // Add the token to the validation data
        $token = $this->header('Authorization');
        if ($token) {
            $data['token'] = $token;
        }

        return $data;
    }
}
