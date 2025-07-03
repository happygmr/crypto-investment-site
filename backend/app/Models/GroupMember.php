<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class GroupMember extends Model
{
    protected $fillable = [
        'group_id', 'user_id', 'status', 'joined_at'
    ];

    public function group()
    {
        return $this->belongsTo(CopyGroup::class, 'group_id');
    }

    public function user()
    {
        return $this->belongsTo(User::class);
    }
}
