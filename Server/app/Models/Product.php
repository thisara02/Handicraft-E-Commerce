<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Product extends Model
{
    use HasFactory;
    protected $fillable = [
        'venID', 
        'description', 
        'prodName', 
        'price', 
        'category'
    ];
    public function vendor() {
        return $this->belongsTo(Vendor::class, 'venID');
    }
    public function images() {
        return $this->hasMany(ProductImage::class, 'prodID');
    }


}
