<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Vendor extends Model
{
    use HasFactory;
    protected $fillable = [
        'vendorID',
        'userID', 
        'fullName', 
        'businessName', 
        'mobile', 
        'address', 
        'productDes', 
        'profilePic', 
        'nic', 
        'isVerified'
    ];
    public function user() {
        return $this->belongsTo(User::class, 'userID');
    }
}
