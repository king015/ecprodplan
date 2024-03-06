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
                'customer' => $faker->company,
                'code' => $faker->unique()->ean8,
                'item_description' => $faker->sentence,
                'part_number' => $faker->ean13,
                'weekly_requisites' => $faker->randomNumber(2),
                'mon' => $faker->randomDigit,
                'tues' => $faker->randomDigit,
                'wed' => $faker->randomDigit,
                'thurs' => $faker->randomDigit,
                'fri' => $faker->randomDigit,
                'sat' => $faker->randomDigit,
                'finished_goods' => $faker->randomDigit,
                'creaser' => $faker->randomDigit,
                'flexo_print' => $faker->randomDigit,
                'printer_slotter' => $faker->randomDigit,
                'slotting' => $faker->randomDigit,
                'clapper' => $faker->randomDigit,
                'diecut' => $faker->randomDigit,
                'stitching' => $faker->randomDigit,
                'detach' => $faker->randomDigit,
                'gluing' => $faker->randomDigit,
                'pre_assembly' => $faker->randomDigit,
                'manual_slotting' => $faker->randomDigit,
                'packing' => $faker->randomDigit,
                'pallet_assembly' => $faker->randomDigit,
                'manual_printing' => $faker->randomDigit,
                'manual_cutting' => $faker->randomDigit,
                'laminating' => $faker->randomDigit,
                'box_assembly' => $faker->randomDigit,
                'fp_manual_cutting' => $faker->randomDigit,
                'fp_diecut' => $faker->randomDigit,
                'bandsaw' => $faker->randomDigit,
                'skiving' => $faker->randomDigit,
                'fp_detach' => $faker->randomDigit,
                'heating_plate' => $faker->randomDigit,
                'hotmelt' => $faker->randomDigit,
                'assembly_heating' => $faker->randomDigit,
                'fp_manual_printing' => $faker->randomDigit,
                'sealing' => $faker->randomDigit,
                'fp_packing' => $faker->randomDigit,
                'location' => $faker->address,
                'beginning_inventory' => $faker->randomDigit,
                'beginning_date'=> $faker->dateTimeThisMonth()->format('Y-m-d'),
                'ending_inventory' => $faker->randomDigit,
                'ending_date'=> $faker->dateTimeThisMonth()->format('Y-m-d'),
                'fg_in' => $faker->randomDigit,
                'fg_out' => $faker->randomDigit,
            ]);
        }
    }
}
