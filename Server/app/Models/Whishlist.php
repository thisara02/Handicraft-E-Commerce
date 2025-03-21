<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Whishlist extends Model
{
    use HasFactory;
    protected $fillable = [
        'cusID', 
        'prodID'
    ];
    public function customer() {
        return $this->belongsTo(Customer::class, 'cusID');
    }
    public function product() {
        return $this->belongsTo(Product::class, 'prodID');
    }
}
