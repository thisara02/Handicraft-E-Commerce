<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Order extends Model
{
    use HasFactory;
    
    protected $fillable = [
        'ordID',
        'cusID',
        'totalAmount',
        'status',
        'date',
    ];

    protected $primaryKey = 'id';

    public function customer() {
        return $this->belongsTo(Customer::class, 'cusID');
    }

    public function orderItems()
    {
        return $this->hasMany(OrderItem::class);
    }

    public function payment()
    {
        return $this->hasOne(Payment::class);
    }
}
