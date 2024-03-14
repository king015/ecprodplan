<?php

namespace Database\Seeders;

use App\Models\Production;
use Illuminate\Database\Seeder;
use Illuminate\Support\Str;

class ProductionSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        // Define the number of records to generate
        $numberOfRecords = 50;

        // Generate and insert sample data into the Production model
        for ($i = 0; $i < $numberOfRecords; $i++) {
            Production::create([
                'customer' => 'Customer ' . ($i + 1),
                'code' => 'CODE-' . ($i + 1),
                'itemDescription' => 'Product ' . ($i + 1),
                'partNumber' => 'PART-' . ($i + 1),
                'weekly_requisites' => rand(50, 200),
                'mon' => rand(0, 10),
                'tues' => rand(0, 10),
                'wed' => rand(0, 10),
                'thurs' => rand(0, 10),
                'fri' => rand(0, 10),
                'sat' => rand(0, 10),
                'fg' => rand(0, 10),
                'creaser' => rand(0, 10),
                'flexo_print' => rand(0, 10),
                'printer_slotter' => rand(0, 10),
                'slotting' => rand(0, 10),
                'clapper' => rand(0, 10),
                'diecut' => rand(0, 10),
                'stitching' => rand(0, 10),
                'detach' => rand(0, 10),
                'gluing' => rand(0, 10),
                'pre_assembly' => rand(0, 10),
                'manual_slotting' => rand(0, 10),
                'packing' => rand(0, 10),
                'pallet_assembly' => rand(0, 10),
                'manual_printing' => rand(0, 10),
                'manual_cutting' => rand(0, 10),
                'laminating' => rand(0, 10),
                'box_assembly' => rand(0, 10),
                'fp_manual_cutting' => rand(0, 10),
                'fp_diecut' => rand(0, 10),
                'bandsaw' => rand(0, 10),
                'skiving' => rand(0, 10),
                'fp_detach' => rand(0, 10),
                'heating_plate' => rand(0, 10),
                'hotmelt' => rand(0, 10),
                'assembly_heating' => rand(0, 10),
                'fp_manual_printing' => rand(0, 10),
                'sealing' => rand(0, 10),
                'fp_packing' => rand(0, 10),
                'beginning_inventory' => rand(0, 100),
                'beginning_date' => now()->subDays(rand(0, 365)),
                'ending_inventory' => rand(0, 100),
                'ending_date' => now()->addDays(rand(0, 365)),
                'fg_in' => rand(0, 100),
                'fg_out' => rand(0, 100),
                'created_at' => now()->subDays(rand(0, 365)), // Random creation timestamp within the past year
                'updated_at' => now(), // Current timestamp for updated_at
            ]);
        }
    }
}
