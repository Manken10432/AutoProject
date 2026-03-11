<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Builder;

class Vehicle extends Model
{
    protected $fillable = [
        'brand',
        'model',
        'year',
        'price',
        'down_payment',
        'monthly_payment',
        'mileage',
        'fuel_type',
        'transmission',
        'color',
        'description',
        'featured',
        'status',
        'images',
    ];

    protected $appends = ['first_image'];

    protected $casts = [
        'images' => 'array',
        'featured' => 'boolean',
        'price' => 'decimal:2',
        'down_payment' => 'decimal:2',
        'monthly_payment' => 'decimal:2',
    ];

    public function scopeFeatured(Builder $query): Builder
    {
        return $query->where('featured', true);
    }

    public function scopeAvailable(Builder $query): Builder
    {
        return $query->where('status', 'available');
    }

    public function getFirstImageAttribute(): string
    {
        if (!empty($this->images) && is_array($this->images) && count($this->images) > 0) {
            return $this->images[0];
        }
        return 'https://placehold.co/800x600/333/fff?text=' . urlencode($this->brand . '+' . $this->model);
    }

    public function contacts()
    {
        return $this->hasMany(Contact::class);
    }
}
