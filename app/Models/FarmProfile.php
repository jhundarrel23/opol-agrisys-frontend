<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\HasMany;

class FarmProfile extends Model
{
    use HasFactory, SoftDeletes;

    protected $table = 'farm_profiles';

    protected $fillable = [
        'beneficiary_id',
        'livelihood_category_id',
        'created_at',
        'updated_at'
    ];

    protected $casts = [
        'created_at' => 'datetime',
        'updated_at' => 'datetime'
    ];

    // Relationships
    public function beneficiary(): BelongsTo
    {
        return $this->belongsTo(BeneficiaryDetails::class, 'beneficiary_id');
    }

    public function livelihoodCategory(): BelongsTo
    {
        return $this->belongsTo(LivelihoodCategory::class, 'livelihood_category_id');
    }

    public function farmParcels(): HasMany
    {
        return $this->hasMany(FarmParcel::class, 'farm_profile_id');
    }

    public function farmerDetails(): HasMany
    {
        return $this->hasMany(FarmerDetails::class, 'farm_profile_id');
    }

    public function fisherfolkDetails(): HasMany
    {
        return $this->hasMany(FisherfolkDetails::class, 'farm_profile_id');
    }

    public function farmworkerDetails(): HasMany
    {
        return $this->hasMany(FarmworkerDetails::class, 'farm_profile_id');
    }

    public function agriYouthDetails(): HasMany
    {
        return $this->hasMany(AgriYouthDetails::class, 'farm_profile_id');
    }

    public function rsbsaEnrollments(): HasMany
    {
        return $this->hasMany(RSBSAEnrollment::class, 'farm_profile_id');
    }

    // Scopes
    public function scopeByLivelihoodCategory($query, $categoryId)
    {
        return $query->where('livelihood_category_id', $categoryId);
    }

    public function scopeByBeneficiary($query, $beneficiaryId)
    {
        return $query->where('beneficiary_id', $beneficiaryId);
    }

    // Accessors
    public function getTotalFarmAreaAttribute(): float
    {
        return $this->farmParcels->sum('farm_area');
    }

    public function getParcelCountAttribute(): int
    {
        return $this->farmParcels->count();
    }

    public function getLivelihoodCategoryNameAttribute(): string
    {
        return $this->livelihoodCategory->name ?? 'Unknown';
    }
}