<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use App\Models\FinishedGoods;
use App\Models\WorkInProcess;
use App\Models\ProductionPlan;
use Illuminate\Support\Facades\DB;
use Faker\Factory as Faker;

class CombinedDataSeeder extends Seeder
{
    /**
     * Seed the application's database with combined data.
     *
     * @return void
     */
    public function run()
    {
        $faker = Faker::create();

        // Ensure that the database is in a clean state
        DB::statement('SET FOREIGN_KEY_CHECKS=0');
        FinishedGoods::truncate();
        WorkInProcess::truncate();
        ProductionPlan::truncate();
        DB::statement('SET FOREIGN_KEY_CHECKS=1');


        for ($i = 0; $i < 10; $i++) {

            $workInProcess = WorkInProcess::create([
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
            ]);

            // Create finished goods data
            $finishedGoods = FinishedGoods::create([
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
                'work_in_process_id' => $workInProcess->id,
            ]);

            // Create production plan data
            ProductionPlan::create([
                // Add production plan fields here
                // For example:
                'work_in_process_id' => $workInProcess->id,
                'finished_goods_id' => $finishedGoods->id,
            ]);

            // Output the combined data
            $this->command->info('Combined Data for Production Plan ID: ' . $i);
            $this->command->info('Work In Process: ' . $workInProcess);
            $this->command->info('Finished Goods: ' . $finishedGoods);
        }
    }
}
