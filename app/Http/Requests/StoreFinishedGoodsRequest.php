<?php

namespace App\Http\Requests;

use App\Models\FinishedGoods;
use Illuminate\Foundation\Http\FormRequest;
use Carbon\Carbon;

class StoreFinishedGoodsRequest extends FormRequest
{
    /**
     * Determine if the user is authorized to make this request.
     */
    public function authorize(): bool
    {
        // Check if the user is authenticated
        if ($this->user()) {
            return $this->user()->can('create', FinishedGoods::class);
        }

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
            'customer' => 'nullable|string',
            'code' => 'nullable|string',
            'itemDescription' => 'nullable|string',
            'partNumber' => 'nullable|string',
            'location' => 'nullable|string',
            'beginning_inventory' => 'nullable|integer',
            'beginning_date' => 'nullable|date',
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
