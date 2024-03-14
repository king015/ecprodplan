<?php

namespace App\Policies;

use App\Models\FinishedGoods;
use App\Models\User;
use Illuminate\Auth\Access\Response;

class FinishedGoodsPolicy
{
    /**
     * Determine whether the user can view any models.
     */
    public function viewAny(User $user): bool
    {
        return true; // Allow all users to view any finished goods
    }

    /**
     * Determine whether the user can view the model.
     */
    public function view(User $user, FinishedGoods $finishedGoods): bool
    {
        return true; // Allow all users to view a specific finished goods
    }

    /**
     * Determine whether the user can create models.
     */
    public function create(User $user): bool
    {
        return $user->tokenCan('create'); // Check if the token has the 'create' scope
    }

    /**
     * Determine whether the user can update the model.
     */
    public function update(User $user, FinishedGoods $finishedGoods): bool
    {
        return $user->tokenCan('update'); // Check if the token has the 'update' scope
    }

    /**
     * Determine whether the user can delete the model.
     */
    public function delete(User $user, FinishedGoods $finishedGoods): bool
    {
        return $user->tokenCan('delete'); // Check if the token has the 'delete' scope
    }

    /**
     * Determine whether the user can restore the model.
     */
    public function restore(User $user, FinishedGoods $finishedGoods): bool
    {
        return $user->tokenCan('restore'); // Check if the token has the 'restore' scope
    }

    /**
     * Determine whether the user can permanently delete the model.
     */
    public function forceDelete(User $user, FinishedGoods $finishedGoods): bool
    {
        return $user->tokenCan('forceDelete'); // Check if the token has the 'forceDelete' scope
    }
}
