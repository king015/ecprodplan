<?php

namespace Database\Factories;

use App\Models\ProductionPlan;
use Illuminate\Database\Eloquent\Factories\Factory;

class ProductionPlanFactory extends Factory
{
    /**
     * The name of the factory's corresponding model.
     *
     * @var string
     */
    protected $model = ProductionPlan::class;

    /**
     * Define the model's default state.
     *
     * @return array
     */
    public function definition()
    {
        return [
            // Define the structure of the production plan data
            // Adjust these attributes based on your model's structure
            'attribute1' => $this->faker->attribute1,
            'attribute2' => $this->faker->attribute2,
            // Add more attributes as needed
        ];
    }
}
