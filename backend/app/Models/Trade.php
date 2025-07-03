<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Trade extends Model
{
    protected $fillable = [
        'trader_id', 'symbol', 'type', 'amount', 'price', 'trade_time', 'status'
    ];

    public function trader()
    {
        return $this->belongsTo(Trader::class);
    }

    public function copiedTrades()
    {
        return $this->hasMany(CopiedTrade::class);
    }
}
