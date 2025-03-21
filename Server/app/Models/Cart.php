<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Cart extends Model
{
    use HasFactory;
    
    protected $fillable = [
        'cartID',
        'cusID', 
        'prodID', 
        'quantity'
    ];

    protected $primaryKey = 'cartID';

    public function product() {
        return $this->belongsTo(Product::class, 'prodID');
    }
    public function customer() {
        return $this->belongsTo(Customer::class, 'cusID');
    }
}
