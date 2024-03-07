<?php

namespace Database\Factories;

use App\Models\WorkInProcess;
use Illuminate\Database\Eloquent\Factories\Factory;

class WorkInProcessFactory extends Factory
{
    /**
     * The name of the factory's corresponding model.
     *
     * @var string
     */
    protected $model = WorkInProcess::class;

    /**
     * Define the model's default state.
     *
     * @return array
     */
    public function definition()
    {
        return [
            // Define the structure of the work in process data
            // Adjust these attributes based on your model's structure
            'attribute1' => $this->faker->attribute1,
            'attribute2' => $this->faker->attribute2,
            // Add more attributes as needed
        ];
    }
}
