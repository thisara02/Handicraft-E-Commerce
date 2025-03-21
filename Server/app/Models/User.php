<?php

namespace App\Models;

// use Illuminate\Contracts\Auth\MustVerifyEmail;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Foundation\Auth\User as Authenticatable;
use Illuminate\Notifications\Notifiable;

class User extends Authenticatable
{
    use HasFactory;
    protected $fillable = [
        'userID',
        'email', 
        'username', 
        'password'];
    public function tokens() {
        return $this->hasMany(Token::class, 'userID');
    }
    public function groups() {
        return $this->hasMany(UserGroup::class, 'userID');
    }
    public function customer() {
        return $this->hasOne(Customer::class, 'userID');
    }
    public function vendor() {
        return $this->hasOne(Vendor::class, 'userID');
    }
}
