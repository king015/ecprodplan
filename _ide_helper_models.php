<?php

// @formatter:off
// phpcs:ignoreFile
/**
 * A helper file for your Eloquent Models
 * Copy the phpDocs from this file to the correct Model,
 * And remove them from this file, to prevent double declarations.
 *
 * @author Barry vd. Heuvel <barryvdh@gmail.com>
 */


namespace App\Models{
/**
 * 
 *
 * @property int $id
 * @property int|null $wip_id
 * @property string $customer
 * @property string $code
 * @property string $itemDescription
 * @property string $partNumber
 * @property string $location
 * @property int $beginning_inventory
 * @property string $beginning_date
 * @property int $ending_inventory
 * @property string $ending_date
 * @property int $fg_in
 * @property int $fg_out
 * @property \Illuminate\Support\Carbon|null $created_at
 * @property \Illuminate\Support\Carbon|null $updated_at
 * @property int $work_in_process_id
 * @property-read \App\Models\ProductionPlan|null $productionPlan
 * @method static \Database\Factories\FinishedGoodsFactory factory($count = null, $state = [])
 * @method static \Illuminate\Database\Eloquent\Builder|FinishedGoods newModelQuery()
 * @method static \Illuminate\Database\Eloquent\Builder|FinishedGoods newQuery()
 * @method static \Illuminate\Database\Eloquent\Builder|FinishedGoods query()
 * @method static \Illuminate\Database\Eloquent\Builder|FinishedGoods whereBeginningDate($value)
 * @method static \Illuminate\Database\Eloquent\Builder|FinishedGoods whereBeginningInventory($value)
 * @method static \Illuminate\Database\Eloquent\Builder|FinishedGoods whereCode($value)
 * @method static \Illuminate\Database\Eloquent\Builder|FinishedGoods whereCreatedAt($value)
 * @method static \Illuminate\Database\Eloquent\Builder|FinishedGoods whereCustomer($value)
 * @method static \Illuminate\Database\Eloquent\Builder|FinishedGoods whereEndingDate($value)
 * @method static \Illuminate\Database\Eloquent\Builder|FinishedGoods whereEndingInventory($value)
 * @method static \Illuminate\Database\Eloquent\Builder|FinishedGoods whereFgIn($value)
 * @method static \Illuminate\Database\Eloquent\Builder|FinishedGoods whereFgOut($value)
 * @method static \Illuminate\Database\Eloquent\Builder|FinishedGoods whereId($value)
 * @method static \Illuminate\Database\Eloquent\Builder|FinishedGoods whereItemDescription($value)
 * @method static \Illuminate\Database\Eloquent\Builder|FinishedGoods whereLocation($value)
 * @method static \Illuminate\Database\Eloquent\Builder|FinishedGoods wherePartNumber($value)
 * @method static \Illuminate\Database\Eloquent\Builder|FinishedGoods whereUpdatedAt($value)
 * @method static \Illuminate\Database\Eloquent\Builder|FinishedGoods whereWipId($value)
 * @method static \Illuminate\Database\Eloquent\Builder|FinishedGoods whereWorkInProcessId($value)
 */
	class FinishedGoods extends \Eloquent {}
}

namespace App\Models{
/**
 * 
 *
 * @property int $id
 * @property string $customer
 * @property string $code
 * @property string $item_description
 * @property string $part_number
 * @property string $weekly_requisites
 * @property int $mon
 * @property int $tues
 * @property int $wed
 * @property int $thurs
 * @property int $fri
 * @property int $sat
 * @property int $finished_goods
 * @property int $creaser
 * @property int $flexo_print
 * @property int $printer_slotter
 * @property int $slotting
 * @property int $clapper
 * @property int $diecut
 * @property int $stitching
 * @property int $detach
 * @property int $gluing
 * @property int $pre_assembly
 * @property int $manual_slotting
 * @property int $packing
 * @property int $pallet_assembly
 * @property int $manual_printing
 * @property int $manual_cutting
 * @property int $laminating
 * @property int $box_assembly
 * @property int $fp_manual_cutting
 * @property int $fp_diecut
 * @property int $bandsaw
 * @property int $skiving
 * @property int $fp_detach
 * @property int $heating_plate
 * @property int $hotmelt
 * @property int $assembly_heating
 * @property int $fp_manual_printing
 * @property int $sealing
 * @property int $fp_packing
 * @property string $location
 * @property int $beginning_inventory
 * @property string $beginning_date
 * @property int $ending_inventory
 * @property string $ending_date
 * @property int $fg_in
 * @property int $fg_out
 * @property \Illuminate\Support\Carbon|null $created_at
 * @property \Illuminate\Support\Carbon|null $updated_at
 * @property-read \Illuminate\Database\Eloquent\Collection<int, \App\Models\FinishedGoods> $finishedGoods
 * @property-read int|null $finished_goods_count
 * @property-read \Illuminate\Database\Eloquent\Collection<int, \App\Models\WorkInProcess> $workInProcess
 * @property-read int|null $work_in_process_count
 * @method static \Database\Factories\ProductionPlanFactory factory($count = null, $state = [])
 * @method static \Illuminate\Database\Eloquent\Builder|ProductionPlan newModelQuery()
 * @method static \Illuminate\Database\Eloquent\Builder|ProductionPlan newQuery()
 * @method static \Illuminate\Database\Eloquent\Builder|ProductionPlan query()
 * @method static \Illuminate\Database\Eloquent\Builder|ProductionPlan whereAssemblyHeating($value)
 * @method static \Illuminate\Database\Eloquent\Builder|ProductionPlan whereBandsaw($value)
 * @method static \Illuminate\Database\Eloquent\Builder|ProductionPlan whereBeginningDate($value)
 * @method static \Illuminate\Database\Eloquent\Builder|ProductionPlan whereBeginningInventory($value)
 * @method static \Illuminate\Database\Eloquent\Builder|ProductionPlan whereBoxAssembly($value)
 * @method static \Illuminate\Database\Eloquent\Builder|ProductionPlan whereClapper($value)
 * @method static \Illuminate\Database\Eloquent\Builder|ProductionPlan whereCode($value)
 * @method static \Illuminate\Database\Eloquent\Builder|ProductionPlan whereCreaser($value)
 * @method static \Illuminate\Database\Eloquent\Builder|ProductionPlan whereCreatedAt($value)
 * @method static \Illuminate\Database\Eloquent\Builder|ProductionPlan whereCustomer($value)
 * @method static \Illuminate\Database\Eloquent\Builder|ProductionPlan whereDetach($value)
 * @method static \Illuminate\Database\Eloquent\Builder|ProductionPlan whereDiecut($value)
 * @method static \Illuminate\Database\Eloquent\Builder|ProductionPlan whereEndingDate($value)
 * @method static \Illuminate\Database\Eloquent\Builder|ProductionPlan whereEndingInventory($value)
 * @method static \Illuminate\Database\Eloquent\Builder|ProductionPlan whereFgIn($value)
 * @method static \Illuminate\Database\Eloquent\Builder|ProductionPlan whereFgOut($value)
 * @method static \Illuminate\Database\Eloquent\Builder|ProductionPlan whereFinishedGoods($value)
 * @method static \Illuminate\Database\Eloquent\Builder|ProductionPlan whereFlexoPrint($value)
 * @method static \Illuminate\Database\Eloquent\Builder|ProductionPlan whereFpDetach($value)
 * @method static \Illuminate\Database\Eloquent\Builder|ProductionPlan whereFpDiecut($value)
 * @method static \Illuminate\Database\Eloquent\Builder|ProductionPlan whereFpManualCutting($value)
 * @method static \Illuminate\Database\Eloquent\Builder|ProductionPlan whereFpManualPrinting($value)
 * @method static \Illuminate\Database\Eloquent\Builder|ProductionPlan whereFpPacking($value)
 * @method static \Illuminate\Database\Eloquent\Builder|ProductionPlan whereFri($value)
 * @method static \Illuminate\Database\Eloquent\Builder|ProductionPlan whereGluing($value)
 * @method static \Illuminate\Database\Eloquent\Builder|ProductionPlan whereHeatingPlate($value)
 * @method static \Illuminate\Database\Eloquent\Builder|ProductionPlan whereHotmelt($value)
 * @method static \Illuminate\Database\Eloquent\Builder|ProductionPlan whereId($value)
 * @method static \Illuminate\Database\Eloquent\Builder|ProductionPlan whereItemDescription($value)
 * @method static \Illuminate\Database\Eloquent\Builder|ProductionPlan whereLaminating($value)
 * @method static \Illuminate\Database\Eloquent\Builder|ProductionPlan whereLocation($value)
 * @method static \Illuminate\Database\Eloquent\Builder|ProductionPlan whereManualCutting($value)
 * @method static \Illuminate\Database\Eloquent\Builder|ProductionPlan whereManualPrinting($value)
 * @method static \Illuminate\Database\Eloquent\Builder|ProductionPlan whereManualSlotting($value)
 * @method static \Illuminate\Database\Eloquent\Builder|ProductionPlan whereMon($value)
 * @method static \Illuminate\Database\Eloquent\Builder|ProductionPlan wherePacking($value)
 * @method static \Illuminate\Database\Eloquent\Builder|ProductionPlan wherePalletAssembly($value)
 * @method static \Illuminate\Database\Eloquent\Builder|ProductionPlan wherePartNumber($value)
 * @method static \Illuminate\Database\Eloquent\Builder|ProductionPlan wherePreAssembly($value)
 * @method static \Illuminate\Database\Eloquent\Builder|ProductionPlan wherePrinterSlotter($value)
 * @method static \Illuminate\Database\Eloquent\Builder|ProductionPlan whereSat($value)
 * @method static \Illuminate\Database\Eloquent\Builder|ProductionPlan whereSealing($value)
 * @method static \Illuminate\Database\Eloquent\Builder|ProductionPlan whereSkiving($value)
 * @method static \Illuminate\Database\Eloquent\Builder|ProductionPlan whereSlotting($value)
 * @method static \Illuminate\Database\Eloquent\Builder|ProductionPlan whereStitching($value)
 * @method static \Illuminate\Database\Eloquent\Builder|ProductionPlan whereThurs($value)
 * @method static \Illuminate\Database\Eloquent\Builder|ProductionPlan whereTues($value)
 * @method static \Illuminate\Database\Eloquent\Builder|ProductionPlan whereUpdatedAt($value)
 * @method static \Illuminate\Database\Eloquent\Builder|ProductionPlan whereWed($value)
 * @method static \Illuminate\Database\Eloquent\Builder|ProductionPlan whereWeeklyRequisites($value)
 */
	class ProductionPlan extends \Eloquent {}
}

namespace App\Models{
/**
 * 
 *
 * @property int $id
 * @property string $name
 * @property string $email
 * @property \Illuminate\Support\Carbon|null $email_verified_at
 * @property mixed $password
 * @property string|null $remember_token
 * @property \Illuminate\Support\Carbon|null $created_at
 * @property \Illuminate\Support\Carbon|null $updated_at
 * @property-read \Illuminate\Notifications\DatabaseNotificationCollection<int, \Illuminate\Notifications\DatabaseNotification> $notifications
 * @property-read int|null $notifications_count
 * @property-read \Illuminate\Database\Eloquent\Collection<int, \Laravel\Sanctum\PersonalAccessToken> $tokens
 * @property-read int|null $tokens_count
 * @method static \Database\Factories\UserFactory factory($count = null, $state = [])
 * @method static \Illuminate\Database\Eloquent\Builder|User newModelQuery()
 * @method static \Illuminate\Database\Eloquent\Builder|User newQuery()
 * @method static \Illuminate\Database\Eloquent\Builder|User query()
 * @method static \Illuminate\Database\Eloquent\Builder|User whereCreatedAt($value)
 * @method static \Illuminate\Database\Eloquent\Builder|User whereEmail($value)
 * @method static \Illuminate\Database\Eloquent\Builder|User whereEmailVerifiedAt($value)
 * @method static \Illuminate\Database\Eloquent\Builder|User whereId($value)
 * @method static \Illuminate\Database\Eloquent\Builder|User whereName($value)
 * @method static \Illuminate\Database\Eloquent\Builder|User wherePassword($value)
 * @method static \Illuminate\Database\Eloquent\Builder|User whereRememberToken($value)
 * @method static \Illuminate\Database\Eloquent\Builder|User whereUpdatedAt($value)
 */
	class User extends \Eloquent {}
}

namespace App\Models{
/**
 * 
 *
 * @property int $id
 * @property int $creaser
 * @property int $flexo_print
 * @property int $printer_slotter
 * @property int $slotting
 * @property int $clapper
 * @property int $diecut
 * @property int $stitching
 * @property int $detach
 * @property int $gluing
 * @property int $pre_assembly
 * @property int $manual_slotting
 * @property int $packing
 * @property int $pallet_assembly
 * @property int $manual_printing
 * @property int $manual_cutting
 * @property int $laminating
 * @property int $box_assembly
 * @property int $fp_manual_cutting
 * @property int $fp_diecut
 * @property int $bandsaw
 * @property int $skiving
 * @property int $fp_detach
 * @property int $heating_plate
 * @property int $hotmelt
 * @property int $assembly_heating
 * @property int $fp_manual_printing
 * @property int $sealing
 * @property int $fp_packing
 * @property \Illuminate\Support\Carbon|null $created_at
 * @property \Illuminate\Support\Carbon|null $updated_at
 * @property-read \App\Models\ProductionPlan|null $productionPlan
 * @method static \Database\Factories\WorkInProcessFactory factory($count = null, $state = [])
 * @method static \Illuminate\Database\Eloquent\Builder|WorkInProcess newModelQuery()
 * @method static \Illuminate\Database\Eloquent\Builder|WorkInProcess newQuery()
 * @method static \Illuminate\Database\Eloquent\Builder|WorkInProcess query()
 * @method static \Illuminate\Database\Eloquent\Builder|WorkInProcess whereAssemblyHeating($value)
 * @method static \Illuminate\Database\Eloquent\Builder|WorkInProcess whereBandsaw($value)
 * @method static \Illuminate\Database\Eloquent\Builder|WorkInProcess whereBoxAssembly($value)
 * @method static \Illuminate\Database\Eloquent\Builder|WorkInProcess whereClapper($value)
 * @method static \Illuminate\Database\Eloquent\Builder|WorkInProcess whereCreaser($value)
 * @method static \Illuminate\Database\Eloquent\Builder|WorkInProcess whereCreatedAt($value)
 * @method static \Illuminate\Database\Eloquent\Builder|WorkInProcess whereDetach($value)
 * @method static \Illuminate\Database\Eloquent\Builder|WorkInProcess whereDiecut($value)
 * @method static \Illuminate\Database\Eloquent\Builder|WorkInProcess whereFlexoPrint($value)
 * @method static \Illuminate\Database\Eloquent\Builder|WorkInProcess whereFpDetach($value)
 * @method static \Illuminate\Database\Eloquent\Builder|WorkInProcess whereFpDiecut($value)
 * @method static \Illuminate\Database\Eloquent\Builder|WorkInProcess whereFpManualCutting($value)
 * @method static \Illuminate\Database\Eloquent\Builder|WorkInProcess whereFpManualPrinting($value)
 * @method static \Illuminate\Database\Eloquent\Builder|WorkInProcess whereFpPacking($value)
 * @method static \Illuminate\Database\Eloquent\Builder|WorkInProcess whereGluing($value)
 * @method static \Illuminate\Database\Eloquent\Builder|WorkInProcess whereHeatingPlate($value)
 * @method static \Illuminate\Database\Eloquent\Builder|WorkInProcess whereHotmelt($value)
 * @method static \Illuminate\Database\Eloquent\Builder|WorkInProcess whereId($value)
 * @method static \Illuminate\Database\Eloquent\Builder|WorkInProcess whereLaminating($value)
 * @method static \Illuminate\Database\Eloquent\Builder|WorkInProcess whereManualCutting($value)
 * @method static \Illuminate\Database\Eloquent\Builder|WorkInProcess whereManualPrinting($value)
 * @method static \Illuminate\Database\Eloquent\Builder|WorkInProcess whereManualSlotting($value)
 * @method static \Illuminate\Database\Eloquent\Builder|WorkInProcess wherePacking($value)
 * @method static \Illuminate\Database\Eloquent\Builder|WorkInProcess wherePalletAssembly($value)
 * @method static \Illuminate\Database\Eloquent\Builder|WorkInProcess wherePreAssembly($value)
 * @method static \Illuminate\Database\Eloquent\Builder|WorkInProcess wherePrinterSlotter($value)
 * @method static \Illuminate\Database\Eloquent\Builder|WorkInProcess whereSealing($value)
 * @method static \Illuminate\Database\Eloquent\Builder|WorkInProcess whereSkiving($value)
 * @method static \Illuminate\Database\Eloquent\Builder|WorkInProcess whereSlotting($value)
 * @method static \Illuminate\Database\Eloquent\Builder|WorkInProcess whereStitching($value)
 * @method static \Illuminate\Database\Eloquent\Builder|WorkInProcess whereUpdatedAt($value)
 */
	class WorkInProcess extends \Eloquent {}
}

