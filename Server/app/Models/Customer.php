<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Customer extends Model
{
    use HasFactory;

    protected $fillable = [
        'cusID',
        'userID', 
        'profilePIC', 
        'cusName', 
        'cusContact', 
        'ship_Addr'
    ];
    protected $primaryKey = 'cusID';

    public function user() {
        return $this->belongsTo(User::class, 'userID');
    }
}
