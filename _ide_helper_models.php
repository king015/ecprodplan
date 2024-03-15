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
 * @property-read \App\Models\User|null $user
 * @method static \Illuminate\Database\Eloquent\Builder|ActivityLog newModelQuery()
 * @method static \Illuminate\Database\Eloquent\Builder|ActivityLog newQuery()
 * @method static \Illuminate\Database\Eloquent\Builder|ActivityLog query()
 */
	class ActivityLog extends \Eloquent {}
}

namespace App\Models{
/**
 * 
 *
 * @property int $id
 * @property string|null $customer
 * @property string|null $code
 * @property string|null $itemDescription
 * @property string|null $partNumber
 * @property int|null $weekly_requisites
 * @property int|null $mon
 * @property int|null $tues
 * @property int|null $wed
 * @property int|null $thurs
 * @property int|null $fri
 * @property int|null $sat
 * @property int|null $fg
 * @property int|null $creaser
 * @property int|null $flexo_print
 * @property int|null $printer_slotter
 * @property int|null $slotting
 * @property int|null $clapper
 * @property int|null $diecut
 * @property int|null $stitching
 * @property int|null $detach
 * @property int|null $gluing
 * @property int|null $pre_assembly
 * @property int|null $manual_slotting
 * @property int|null $packing
 * @property int|null $pallet_assembly
 * @property int|null $manual_printing
 * @property int|null $manual_cutting
 * @property int|null $laminating
 * @property int|null $box_assembly
 * @property int|null $fp_manual_cutting
 * @property int|null $fp_diecut
 * @property int|null $bandsaw
 * @property int|null $skiving
 * @property int|null $fp_detach
 * @property int|null $heating_plate
 * @property int|null $hotmelt
 * @property int|null $assembly_heating
 * @property int|null $fp_manual_printing
 * @property int|null $sealing
 * @property int|null $fp_packing
 * @property string|null $location
 * @property int|null $beginning_inventory
 * @property string|null $beginning_date
 * @property int|null $ending_inventory
 * @property string|null $ending_date
 * @property int|null $fg_in
 * @property int|null $fg_out
 * @property \Illuminate\Support\Carbon|null $created_at
 * @property \Illuminate\Support\Carbon|null $updated_at
 * @method static \Illuminate\Database\Eloquent\Builder|Finished newModelQuery()
 * @method static \Illuminate\Database\Eloquent\Builder|Finished newQuery()
 * @method static \Illuminate\Database\Eloquent\Builder|Finished query()
 * @method static \Illuminate\Database\Eloquent\Builder|Finished whereAssemblyHeating($value)
 * @method static \Illuminate\Database\Eloquent\Builder|Finished whereBandsaw($value)
 * @method static \Illuminate\Database\Eloquent\Builder|Finished whereBeginningDate($value)
 * @method static \Illuminate\Database\Eloquent\Builder|Finished whereBeginningInventory($value)
 * @method static \Illuminate\Database\Eloquent\Builder|Finished whereBoxAssembly($value)
 * @method static \Illuminate\Database\Eloquent\Builder|Finished whereClapper($value)
 * @method static \Illuminate\Database\Eloquent\Builder|Finished whereCode($value)
 * @method static \Illuminate\Database\Eloquent\Builder|Finished whereCreaser($value)
 * @method static \Illuminate\Database\Eloquent\Builder|Finished whereCreatedAt($value)
 * @method static \Illuminate\Database\Eloquent\Builder|Finished whereCustomer($value)
 * @method static \Illuminate\Database\Eloquent\Builder|Finished whereDetach($value)
 * @method static \Illuminate\Database\Eloquent\Builder|Finished whereDiecut($value)
 * @method static \Illuminate\Database\Eloquent\Builder|Finished whereEndingDate($value)
 * @method static \Illuminate\Database\Eloquent\Builder|Finished whereEndingInventory($value)
 * @method static \Illuminate\Database\Eloquent\Builder|Finished whereFg($value)
 * @method static \Illuminate\Database\Eloquent\Builder|Finished whereFgIn($value)
 * @method static \Illuminate\Database\Eloquent\Builder|Finished whereFgOut($value)
 * @method static \Illuminate\Database\Eloquent\Builder|Finished whereFlexoPrint($value)
 * @method static \Illuminate\Database\Eloquent\Builder|Finished whereFpDetach($value)
 * @method static \Illuminate\Database\Eloquent\Builder|Finished whereFpDiecut($value)
 * @method static \Illuminate\Database\Eloquent\Builder|Finished whereFpManualCutting($value)
 * @method static \Illuminate\Database\Eloquent\Builder|Finished whereFpManualPrinting($value)
 * @method static \Illuminate\Database\Eloquent\Builder|Finished whereFpPacking($value)
 * @method static \Illuminate\Database\Eloquent\Builder|Finished whereFri($value)
 * @method static \Illuminate\Database\Eloquent\Builder|Finished whereGluing($value)
 * @method static \Illuminate\Database\Eloquent\Builder|Finished whereHeatingPlate($value)
 * @method static \Illuminate\Database\Eloquent\Builder|Finished whereHotmelt($value)
 * @method static \Illuminate\Database\Eloquent\Builder|Finished whereId($value)
 * @method static \Illuminate\Database\Eloquent\Builder|Finished whereItemDescription($value)
 * @method static \Illuminate\Database\Eloquent\Builder|Finished whereLaminating($value)
 * @method static \Illuminate\Database\Eloquent\Builder|Finished whereLocation($value)
 * @method static \Illuminate\Database\Eloquent\Builder|Finished whereManualCutting($value)
 * @method static \Illuminate\Database\Eloquent\Builder|Finished whereManualPrinting($value)
 * @method static \Illuminate\Database\Eloquent\Builder|Finished whereManualSlotting($value)
 * @method static \Illuminate\Database\Eloquent\Builder|Finished whereMon($value)
 * @method static \Illuminate\Database\Eloquent\Builder|Finished wherePacking($value)
 * @method static \Illuminate\Database\Eloquent\Builder|Finished wherePalletAssembly($value)
 * @method static \Illuminate\Database\Eloquent\Builder|Finished wherePartNumber($value)
 * @method static \Illuminate\Database\Eloquent\Builder|Finished wherePreAssembly($value)
 * @method static \Illuminate\Database\Eloquent\Builder|Finished wherePrinterSlotter($value)
 * @method static \Illuminate\Database\Eloquent\Builder|Finished whereSat($value)
 * @method static \Illuminate\Database\Eloquent\Builder|Finished whereSealing($value)
 * @method static \Illuminate\Database\Eloquent\Builder|Finished whereSkiving($value)
 * @method static \Illuminate\Database\Eloquent\Builder|Finished whereSlotting($value)
 * @method static \Illuminate\Database\Eloquent\Builder|Finished whereStitching($value)
 * @method static \Illuminate\Database\Eloquent\Builder|Finished whereThurs($value)
 * @method static \Illuminate\Database\Eloquent\Builder|Finished whereTues($value)
 * @method static \Illuminate\Database\Eloquent\Builder|Finished whereUpdatedAt($value)
 * @method static \Illuminate\Database\Eloquent\Builder|Finished whereWed($value)
 * @method static \Illuminate\Database\Eloquent\Builder|Finished whereWeeklyRequisites($value)
 */
	class Finished extends \Eloquent {}
}

namespace App\Models{
/**
 * 
 *
 * @property int $id
 * @property int|null $production_plan_id
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
 * @property-read \App\Models\ProductionPlan|null $productionPlan
 * @property-read \App\Models\WorkInProcess|null $workInProcess
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
 * @method static \Illuminate\Database\Eloquent\Builder|FinishedGoods whereProductionPlanId($value)
 * @method static \Illuminate\Database\Eloquent\Builder|FinishedGoods whereUpdatedAt($value)
 */
	class FinishedGoods extends \Eloquent {}
}

namespace App\Models{
/**
 * 
 *
 * @property int $id
 * @property string|null $customer
 * @property string|null $code
 * @property string|null $itemDescription
 * @property string|null $partNumber
 * @property int|null $weekly_requisites
 * @property int|null $mon
 * @property int|null $tues
 * @property int|null $wed
 * @property int|null $thurs
 * @property int|null $fri
 * @property int|null $sat
 * @property int|null $fg
 * @property int|null $creaser
 * @property int|null $flexo_print
 * @property int|null $printer_slotter
 * @property int|null $slotting
 * @property int|null $clapper
 * @property int|null $diecut
 * @property int|null $stitching
 * @property int|null $detach
 * @property int|null $gluing
 * @property int|null $pre_assembly
 * @property int|null $manual_slotting
 * @property int|null $packing
 * @property int|null $pallet_assembly
 * @property int|null $manual_printing
 * @property int|null $manual_cutting
 * @property int|null $laminating
 * @property int|null $box_assembly
 * @property int|null $fp_manual_cutting
 * @property int|null $fp_diecut
 * @property int|null $bandsaw
 * @property int|null $skiving
 * @property int|null $fp_detach
 * @property int|null $heating_plate
 * @property int|null $hotmelt
 * @property int|null $assembly_heating
 * @property int|null $fp_manual_printing
 * @property int|null $sealing
 * @property int|null $fp_packing
 * @property string|null $location
 * @property int|null $beginning_inventory
 * @property string|null $beginning_date
 * @property int|null $ending_inventory
 * @property string|null $ending_date
 * @property int|null $fg_in
 * @property int|null $fg_out
 * @property \Illuminate\Support\Carbon|null $created_at
 * @property \Illuminate\Support\Carbon|null $updated_at
 * @method static \Illuminate\Database\Eloquent\Builder|Production newModelQuery()
 * @method static \Illuminate\Database\Eloquent\Builder|Production newQuery()
 * @method static \Illuminate\Database\Eloquent\Builder|Production query()
 * @method static \Illuminate\Database\Eloquent\Builder|Production whereAssemblyHeating($value)
 * @method static \Illuminate\Database\Eloquent\Builder|Production whereBandsaw($value)
 * @method static \Illuminate\Database\Eloquent\Builder|Production whereBeginningDate($value)
 * @method static \Illuminate\Database\Eloquent\Builder|Production whereBeginningInventory($value)
 * @method static \Illuminate\Database\Eloquent\Builder|Production whereBoxAssembly($value)
 * @method static \Illuminate\Database\Eloquent\Builder|Production whereClapper($value)
 * @method static \Illuminate\Database\Eloquent\Builder|Production whereCode($value)
 * @method static \Illuminate\Database\Eloquent\Builder|Production whereCreaser($value)
 * @method static \Illuminate\Database\Eloquent\Builder|Production whereCreatedAt($value)
 * @method static \Illuminate\Database\Eloquent\Builder|Production whereCustomer($value)
 * @method static \Illuminate\Database\Eloquent\Builder|Production whereDetach($value)
 * @method static \Illuminate\Database\Eloquent\Builder|Production whereDiecut($value)
 * @method static \Illuminate\Database\Eloquent\Builder|Production whereEndingDate($value)
 * @method static \Illuminate\Database\Eloquent\Builder|Production whereEndingInventory($value)
 * @method static \Illuminate\Database\Eloquent\Builder|Production whereFg($value)
 * @method static \Illuminate\Database\Eloquent\Builder|Production whereFgIn($value)
 * @method static \Illuminate\Database\Eloquent\Builder|Production whereFgOut($value)
 * @method static \Illuminate\Database\Eloquent\Builder|Production whereFlexoPrint($value)
 * @method static \Illuminate\Database\Eloquent\Builder|Production whereFpDetach($value)
 * @method static \Illuminate\Database\Eloquent\Builder|Production whereFpDiecut($value)
 * @method static \Illuminate\Database\Eloquent\Builder|Production whereFpManualCutting($value)
 * @method static \Illuminate\Database\Eloquent\Builder|Production whereFpManualPrinting($value)
 * @method static \Illuminate\Database\Eloquent\Builder|Production whereFpPacking($value)
 * @method static \Illuminate\Database\Eloquent\Builder|Production whereFri($value)
 * @method static \Illuminate\Database\Eloquent\Builder|Production whereGluing($value)
 * @method static \Illuminate\Database\Eloquent\Builder|Production whereHeatingPlate($value)
 * @method static \Illuminate\Database\Eloquent\Builder|Production whereHotmelt($value)
 * @method static \Illuminate\Database\Eloquent\Builder|Production whereId($value)
 * @method static \Illuminate\Database\Eloquent\Builder|Production whereItemDescription($value)
 * @method static \Illuminate\Database\Eloquent\Builder|Production whereLaminating($value)
 * @method static \Illuminate\Database\Eloquent\Builder|Production whereLocation($value)
 * @method static \Illuminate\Database\Eloquent\Builder|Production whereManualCutting($value)
 * @method static \Illuminate\Database\Eloquent\Builder|Production whereManualPrinting($value)
 * @method static \Illuminate\Database\Eloquent\Builder|Production whereManualSlotting($value)
 * @method static \Illuminate\Database\Eloquent\Builder|Production whereMon($value)
 * @method static \Illuminate\Database\Eloquent\Builder|Production wherePacking($value)
 * @method static \Illuminate\Database\Eloquent\Builder|Production wherePalletAssembly($value)
 * @method static \Illuminate\Database\Eloquent\Builder|Production wherePartNumber($value)
 * @method static \Illuminate\Database\Eloquent\Builder|Production wherePreAssembly($value)
 * @method static \Illuminate\Database\Eloquent\Builder|Production wherePrinterSlotter($value)
 * @method static \Illuminate\Database\Eloquent\Builder|Production whereSat($value)
 * @method static \Illuminate\Database\Eloquent\Builder|Production whereSealing($value)
 * @method static \Illuminate\Database\Eloquent\Builder|Production whereSkiving($value)
 * @method static \Illuminate\Database\Eloquent\Builder|Production whereSlotting($value)
 * @method static \Illuminate\Database\Eloquent\Builder|Production whereStitching($value)
 * @method static \Illuminate\Database\Eloquent\Builder|Production whereThurs($value)
 * @method static \Illuminate\Database\Eloquent\Builder|Production whereTues($value)
 * @method static \Illuminate\Database\Eloquent\Builder|Production whereUpdatedAt($value)
 * @method static \Illuminate\Database\Eloquent\Builder|Production whereWed($value)
 * @method static \Illuminate\Database\Eloquent\Builder|Production whereWeeklyRequisites($value)
 */
	class Production extends \Eloquent {}
}

namespace App\Models{
/**
 * 
 *
 * @property int $id
 * @property string $weekly_requisites
 * @property int $mon
 * @property int $tues
 * @property int $wed
 * @property int $thurs
 * @property int $fri
 * @property int $sat
 * @property int $fg
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
 * @method static \Illuminate\Database\Eloquent\Builder|ProductionPlan whereCreatedAt($value)
 * @method static \Illuminate\Database\Eloquent\Builder|ProductionPlan whereFg($value)
 * @method static \Illuminate\Database\Eloquent\Builder|ProductionPlan whereFri($value)
 * @method static \Illuminate\Database\Eloquent\Builder|ProductionPlan whereId($value)
 * @method static \Illuminate\Database\Eloquent\Builder|ProductionPlan whereMon($value)
 * @method static \Illuminate\Database\Eloquent\Builder|ProductionPlan whereSat($value)
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
 * @property string|null $customer
 * @property string|null $code
 * @property string|null $itemDescription
 * @property string|null $partNumber
 * @property int|null $weekly_requisites
 * @property int|null $mon
 * @property int|null $tues
 * @property int|null $wed
 * @property int|null $thurs
 * @property int|null $fri
 * @property int|null $sat
 * @property int|null $fg
 * @property int|null $creaser
 * @property int|null $flexo_print
 * @property int|null $printer_slotter
 * @property int|null $slotting
 * @property int|null $clapper
 * @property int|null $diecut
 * @property int|null $stitching
 * @property int|null $detach
 * @property int|null $gluing
 * @property int|null $pre_assembly
 * @property int|null $manual_slotting
 * @property int|null $packing
 * @property int|null $pallet_assembly
 * @property int|null $manual_printing
 * @property int|null $manual_cutting
 * @property int|null $laminating
 * @property int|null $box_assembly
 * @property int|null $fp_manual_cutting
 * @property int|null $fp_diecut
 * @property int|null $bandsaw
 * @property int|null $skiving
 * @property int|null $fp_detach
 * @property int|null $heating_plate
 * @property int|null $hotmelt
 * @property int|null $assembly_heating
 * @property int|null $fp_manual_printing
 * @property int|null $sealing
 * @property int|null $fp_packing
 * @property string|null $location
 * @property int|null $beginning_inventory
 * @property string|null $beginning_date
 * @property int|null $ending_inventory
 * @property string|null $ending_date
 * @property int|null $fg_in
 * @property int|null $fg_out
 * @property \Illuminate\Support\Carbon|null $created_at
 * @property \Illuminate\Support\Carbon|null $updated_at
 * @method static \Illuminate\Database\Eloquent\Builder|Wip newModelQuery()
 * @method static \Illuminate\Database\Eloquent\Builder|Wip newQuery()
 * @method static \Illuminate\Database\Eloquent\Builder|Wip query()
 * @method static \Illuminate\Database\Eloquent\Builder|Wip whereAssemblyHeating($value)
 * @method static \Illuminate\Database\Eloquent\Builder|Wip whereBandsaw($value)
 * @method static \Illuminate\Database\Eloquent\Builder|Wip whereBeginningDate($value)
 * @method static \Illuminate\Database\Eloquent\Builder|Wip whereBeginningInventory($value)
 * @method static \Illuminate\Database\Eloquent\Builder|Wip whereBoxAssembly($value)
 * @method static \Illuminate\Database\Eloquent\Builder|Wip whereClapper($value)
 * @method static \Illuminate\Database\Eloquent\Builder|Wip whereCode($value)
 * @method static \Illuminate\Database\Eloquent\Builder|Wip whereCreaser($value)
 * @method static \Illuminate\Database\Eloquent\Builder|Wip whereCreatedAt($value)
 * @method static \Illuminate\Database\Eloquent\Builder|Wip whereCustomer($value)
 * @method static \Illuminate\Database\Eloquent\Builder|Wip whereDetach($value)
 * @method static \Illuminate\Database\Eloquent\Builder|Wip whereDiecut($value)
 * @method static \Illuminate\Database\Eloquent\Builder|Wip whereEndingDate($value)
 * @method static \Illuminate\Database\Eloquent\Builder|Wip whereEndingInventory($value)
 * @method static \Illuminate\Database\Eloquent\Builder|Wip whereFg($value)
 * @method static \Illuminate\Database\Eloquent\Builder|Wip whereFgIn($value)
 * @method static \Illuminate\Database\Eloquent\Builder|Wip whereFgOut($value)
 * @method static \Illuminate\Database\Eloquent\Builder|Wip whereFlexoPrint($value)
 * @method static \Illuminate\Database\Eloquent\Builder|Wip whereFpDetach($value)
 * @method static \Illuminate\Database\Eloquent\Builder|Wip whereFpDiecut($value)
 * @method static \Illuminate\Database\Eloquent\Builder|Wip whereFpManualCutting($value)
 * @method static \Illuminate\Database\Eloquent\Builder|Wip whereFpManualPrinting($value)
 * @method static \Illuminate\Database\Eloquent\Builder|Wip whereFpPacking($value)
 * @method static \Illuminate\Database\Eloquent\Builder|Wip whereFri($value)
 * @method static \Illuminate\Database\Eloquent\Builder|Wip whereGluing($value)
 * @method static \Illuminate\Database\Eloquent\Builder|Wip whereHeatingPlate($value)
 * @method static \Illuminate\Database\Eloquent\Builder|Wip whereHotmelt($value)
 * @method static \Illuminate\Database\Eloquent\Builder|Wip whereId($value)
 * @method static \Illuminate\Database\Eloquent\Builder|Wip whereItemDescription($value)
 * @method static \Illuminate\Database\Eloquent\Builder|Wip whereLaminating($value)
 * @method static \Illuminate\Database\Eloquent\Builder|Wip whereLocation($value)
 * @method static \Illuminate\Database\Eloquent\Builder|Wip whereManualCutting($value)
 * @method static \Illuminate\Database\Eloquent\Builder|Wip whereManualPrinting($value)
 * @method static \Illuminate\Database\Eloquent\Builder|Wip whereManualSlotting($value)
 * @method static \Illuminate\Database\Eloquent\Builder|Wip whereMon($value)
 * @method static \Illuminate\Database\Eloquent\Builder|Wip wherePacking($value)
 * @method static \Illuminate\Database\Eloquent\Builder|Wip wherePalletAssembly($value)
 * @method static \Illuminate\Database\Eloquent\Builder|Wip wherePartNumber($value)
 * @method static \Illuminate\Database\Eloquent\Builder|Wip wherePreAssembly($value)
 * @method static \Illuminate\Database\Eloquent\Builder|Wip wherePrinterSlotter($value)
 * @method static \Illuminate\Database\Eloquent\Builder|Wip whereSat($value)
 * @method static \Illuminate\Database\Eloquent\Builder|Wip whereSealing($value)
 * @method static \Illuminate\Database\Eloquent\Builder|Wip whereSkiving($value)
 * @method static \Illuminate\Database\Eloquent\Builder|Wip whereSlotting($value)
 * @method static \Illuminate\Database\Eloquent\Builder|Wip whereStitching($value)
 * @method static \Illuminate\Database\Eloquent\Builder|Wip whereThurs($value)
 * @method static \Illuminate\Database\Eloquent\Builder|Wip whereTues($value)
 * @method static \Illuminate\Database\Eloquent\Builder|Wip whereUpdatedAt($value)
 * @method static \Illuminate\Database\Eloquent\Builder|Wip whereWed($value)
 * @method static \Illuminate\Database\Eloquent\Builder|Wip whereWeeklyRequisites($value)
 */
	class Wip extends \Eloquent {}
}

namespace App\Models{
/**
 * 
 *
 * @property int $id
 * @property int|null $finished_goods_id
 * @property int|null $creaser
 * @property int|null $flexo_print
 * @property int|null $printer_slotter
 * @property int|null $slotting
 * @property int|null $clapper
 * @property int|null $diecut
 * @property int|null $stitching
 * @property int|null $detach
 * @property int|null $gluing
 * @property int|null $pre_assembly
 * @property int|null $manual_slotting
 * @property int|null $pallet_assembly
 * @property int|null $manual_printing
 * @property int|null $manual_cutting
 * @property int|null $laminating
 * @property int|null $box_assembly
 * @property int|null $fp_manual_cutting
 * @property int|null $fp_diecut
 * @property int|null $bandsaw
 * @property int|null $skiving
 * @property int|null $fp_detach
 * @property int|null $heating_plate
 * @property int|null $hotmelt
 * @property int|null $assembly_heating
 * @property int|null $fp_manual_printing
 * @property int|null $sealing
 * @property int|null $fp_packing
 * @property \Illuminate\Support\Carbon|null $created_at
 * @property \Illuminate\Support\Carbon|null $updated_at
 * @property-read \App\Models\FinishedGoods|null $finishedGoods
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
 * @method static \Illuminate\Database\Eloquent\Builder|WorkInProcess whereFinishedGoodsId($value)
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
 * @method static \Illuminate\Database\Eloquent\Builder|WorkInProcess wherePalletAssembly($value)
 * @method static \Illuminate\Database\Eloquent\Builder|WorkInProcess wherePreAssembly($value)
 * @method static \Illuminate\Database\Eloquent\Builder|WorkInProcess wherePrinterSlotter($value)
 * @method static \Illuminate\Database\Eloquent\Builder|WorkInProcess whereSealing($value)
 * @method static \Illuminate\Database\Eloquent\Builder|WorkInProcess whereSkiving($value)
 * @method static \Illuminate\Database\Eloquent\Builder|WorkInProcess whereSlotting($value)
 * @method static \Illuminate\Database\Eloquent\Builder|WorkInProcess whereStitching($value)
 * @method static \Illuminate\Database\Eloquent\Builder|WorkInProcess whereUpdatedAt($value)
 * @method static \Illuminate\Database\Eloquent\Builder|WorkInProcess withAttributes(array $attributes)
 */
	class WorkInProcess extends \Eloquent {}
}

