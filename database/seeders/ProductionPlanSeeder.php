<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use App\Models\ProductionPlan;
use Faker\Factory as Faker;

class ProductionPlanSeeder extends Seeder
{
    /**
     * Seed the application's database with production plan data.
     *
     * @return void
     */
    public function run()
    {
        $faker = Faker::create();

        // Define the number of production plans you want to generate
        $numberOfPlans = 10;

        // Generate production plan data
        for ($i = 0; $i < $numberOfPlans; $i++) {
            ProductionPlan::create([
                'weekly_requisites' => $faker->randomNumber(2),
                'mon' => $faker->randomDigit,
                'tues' => $faker->randomDigit,
                'wed' => $faker->randomDigit,
                'thurs' => $faker->randomDigit,
                'fri' => $faker->randomDigit,
                'sat' => $faker->randomDigit,
                'fg' => $faker->randomDigit
            ]);
        }
    }
}
