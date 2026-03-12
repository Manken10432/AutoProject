<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Contact extends Model
{
    protected $fillable = [
        'name',
        'email',
        'phone',
        'vehicle_id',
        'message',
        'read_at',
        'replied_at',
    ];

    protected $casts = [
        'read_at'    => 'datetime',
        'replied_at' => 'datetime',
    ];

    public function getIsReadAttribute(): bool
    {
        return $this->read_at !== null;
    }

    public function getIsRepliedAttribute(): bool
    {
        return $this->replied_at !== null;
    }

    public function vehicle()
    {
        return $this->belongsTo(Vehicle::class);
    }
}
