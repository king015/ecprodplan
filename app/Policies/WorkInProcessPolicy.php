<?php

namespace App\Policies;

use App\Models\User;
use App\Models\WorkInProcess;
use Illuminate\Auth\Access\HandlesAuthorization;

class WorkInProcessPolicy
{
    use HandlesAuthorization;

    /**
     * Determine whether the user can store new work in process.
     *
     * @param  \App\Models\User  $user
     * @return bool
     */
    public function store(User $user)
    {
        // Implement your authorization logic here.
        // For example, if you want to allow only users with a specific role to store new work in process:
        // return $user->hasRole('admin');

        // If you want to allow all authenticated users to store new work in process, simply return true:
        return true;
    }
}
