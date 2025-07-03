<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Admin extends Model
{
    protected $fillable = [
        'user_id', 'permissions', 'last_login'
    ];

    public function user()
    {
        return $this->belongsTo(User::class);
    }
}
