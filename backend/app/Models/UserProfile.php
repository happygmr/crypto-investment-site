<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class UserProfile extends Model
{
    protected $fillable = [
        'user_id', 'phone', 'address', 'kyc_status', 'date_of_birth', 'country', 'avatar'
    ];

    public function user()
    {
        return $this->belongsTo(User::class);
    }
}
