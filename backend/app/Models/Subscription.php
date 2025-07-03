<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Subscription extends Model
{
    protected $fillable = [
        'user_id', 'trader_id', 'group_id', 'type', 'status', 'started_at', 'ended_at'
    ];

    public function user()
    {
        return $this->belongsTo(User::class);
    }

    public function trader()
    {
        return $this->belongsTo(Trader::class);
    }

    public function group()
    {
        return $this->belongsTo(CopyGroup::class, 'group_id');
    }
}
