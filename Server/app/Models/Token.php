<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Token extends Model
{
    use HasFactory;

    protected $fillable = [
        'id',
        'user_id', 
        'token_type', 
        'token',
        'expired_at'
    ];

    protected $primaryKey = 'id';

    public function user()
    {
        return $this->belongsTo(User::class);
    }

}
