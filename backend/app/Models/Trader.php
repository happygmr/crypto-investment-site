<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Trader extends Model
{
    protected $fillable = [
        'user_id', 'bio', 'performance_stats', 'is_public', 'subscription_fee', 'profit_share_percent', 'status'
    ];

    public function user()
    {
        return $this->belongsTo(User::class);
    }

    public function copyGroups()
    {
        return $this->hasMany(CopyGroup::class);
    }

    public function trades()
    {
        return $this->hasMany(Trade::class);
    }
}
