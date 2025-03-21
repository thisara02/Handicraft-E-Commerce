<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Slug extends Model
{
    use HasFactory;
    protected $fillable = [
        'prodID', 
        'slug'
    ];
    public function product() {
        return $this->belongsTo(Product::class, 'prodID');
    }//
}
