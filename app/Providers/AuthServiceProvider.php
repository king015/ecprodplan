<?php
namespace App\Providers;

use Illuminate\Foundation\Support\Providers\AuthServiceProvider as ServiceProvider;
use Illuminate\Support\Facades\Gate;
use App\Models\FinishedGoods;
use App\Policies\FinishedGoodsPolicy;

class AuthServiceProvider extends ServiceProvider
{
    protected $policies = [
        FinishedGoods::class => FinishedGoodsPolicy::class,
    ];

    public function boot()
    {
        $this->registerPolicies();

        // Additional policy definitions or gate definitions can be added here
    }
}
