<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class CopyGroup extends Model
{
    protected $fillable = [
        'trader_id', 'name', 'description', 'is_public'
    ];

    public function trader()
    {
        return $this->belongsTo(Trader::class);
    }

    public function members()
    {
        return $this->hasMany(GroupMember::class, 'group_id');
    }
}
