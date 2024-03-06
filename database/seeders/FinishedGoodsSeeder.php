<?php

namespace Database\Seeders;

use App\Models\FinishedGoods;
use Illuminate\Database\Seeder;
use Faker\Factory as Faker;

class FinishedGoodsSeeder extends Seeder
{
    /**
     * Seed the application's database with production plan data.
     *
     * @return void
     */
    public function run()
    {
        // Create Faker instance
        $faker = Faker::create();

        // Generate and insert random production plan data into the database
        for ($i = 0; $i < 10; $i++) {
            FinishedGoods::create([
                'customer' => $faker->company,
                'code' => $faker->unique()->ean8,
                'itemDescription' => $faker->sentence,
                'partNumber' => $faker->ean13,
                'location' => $faker->address,
                'beginning_inventory' => $faker->numberBetween(100, 1000),
                'beginning_date' => $faker->dateTimeBetween('-1 year', 'now'),
                'ending_inventory' => $faker->numberBetween(100, 1000),
                'ending_date' => $faker->dateTimeBetween('now', '+1 year'),
                'fg_in' => $faker->numberBetween(0, 10),
                'fg_out' => $faker->numberBetween(0, 10),
            ]);
        }
    }
}
