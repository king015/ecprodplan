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
     * @return array
     */
    public function rules(): array
    {
        return [
            'customer' => 'required|string',
            'code' => 'required|string',
            'itemDescription' => 'required|string',
            'partNumber' => 'required|string',
            'location' => 'required|string',
            'beginning_inventory' => 'required|integer',
            'beginning_date' => 'required|date',
            'ending_inventory' => 'nullable|integer',
            'ending_date' => 'nullable|date',
            'fg_in' => 'nullable|integer',
            'fg_out' => 'nullable|integer',
        ];
    }

    /**
     * Get the validation data that apply to the request.
     *
     * @return array
     */
    public function validationData(): array
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
