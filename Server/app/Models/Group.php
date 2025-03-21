<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Group extends Model
{
    use HasFactory;

    protected $fillable = [
        'id',
        'name',
        'description',
    ];

    protected $primaryKey = 'id';

    /**
     * Define a many-to-many relationship with User.
     */
    public function users()
    {
        return $this->belongsToMany(User::class, 'usergroups', 'group_id', 'user_id')->withTimestamps();
    }
}
