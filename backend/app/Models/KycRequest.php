<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class KycRequest extends Model
{
    protected $fillable = [
        'user_id', 'document_type', 'document_url', 'status', 'reviewed_by', 'reviewed_at'
    ];

    public function user()
    {
        return $this->belongsTo(User::class);
    }

    public function reviewer()
    {
        return $this->belongsTo(Admin::class, 'reviewed_by');
    }
}
