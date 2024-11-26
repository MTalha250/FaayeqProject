<?php

namespace App\Models;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Foundation\Auth\User as Authenticatable;
use Illuminate\Notifications\Notifiable;
use Illuminate\Database\Eloquent\Model;
use Laravel\Sanctum\HasApiTokens;

class User extends Model
{
    use HasFactory, HasApiTokens;

    // Define the table name explicitly if it's different from the default
    protected $table = 'users';

    // Define the fillable properties (ensure only the allowed fields can be mass-assigned)
    protected $fillable = [
        'firstName',
        'lastName',
        'email',
        'phone',
        'role',
        'password',
    ];

    // Optionally, hide sensitive attributes like the password when retrieving user data
    protected $hidden = [
        'password',
        'remember_token',
    ];

    // Define the data type for dates to be cast as Carbon instances
    protected $dates = [
        'created_at',
        'updated_at',
    ];
}
