<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class UserGroup extends Model
{
    use HasFactory;

    protected $fillable = [
        'user_id',
        'group_id',
        'role',
    ];

    public $timestamps = false; // Disable timestamps if not needed

    /**
     * Define relationship with User.
     */
    public function user()
    {
        return $this->belongsTo(User::class);
    }

    /**
     * Define relationship with Group.
     */
    public function group()
    {
        return $this->belongsTo(Group::class);
    }
}
