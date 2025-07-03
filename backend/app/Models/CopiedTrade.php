<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class CopiedTrade extends Model
{
    protected $fillable = [
        'trade_id', 'copier_id', 'amount', 'price', 'status', 'copied_at'
    ];

    public function trade()
    {
        return $this->belongsTo(Trade::class);
    }

    public function copier()
    {
        return $this->belongsTo(User::class, 'copier_id');
    }
}
