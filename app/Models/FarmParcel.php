<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class FarmParcel extends Model
{
    use HasFactory, SoftDeletes;

    protected $table = 'farm_parcels';

    protected $fillable = [
        'farm_profile_id',
        'parcel_number',
        'barangay',
        'tenure_type',
        'ownership_document_number',
        'is_ancestral_domain',
        'is_agrarian_reform_beneficiary',
        'farm_type',
        'is_organic_practitioner',
        'farm_area',
        'remarks',
        'created_at',
        'updated_at'
    ];

    protected $casts = [
        'is_ancestral_domain' => 'boolean',
        'is_agrarian_reform_beneficiary' => 'boolean',
        'is_organic_practitioner' => 'boolean',
        'farm_area' => 'decimal:2',
        'created_at' => 'datetime',
        'updated_at' => 'datetime'
    ];

    // Enums
    const TENURE_TYPES = ['registered_owner', 'tenant', 'lessee'];
    const FARM_TYPES = ['irrigated', 'rainfed_upland', 'rainfed_lowland'];

    // Relationships
    public function farmProfile(): BelongsTo
    {
        return $this->belongsTo(FarmProfile::class, 'farm_profile_id');
    }

    public function beneficiary(): BelongsTo
    {
        return $this->belongsTo(BeneficiaryDetails::class, 'farm_profile_id', 'beneficiary_id');
    }

    // Scopes
    public function scopeByFarmProfile($query, $farmProfileId)
    {
        return $query->where('farm_profile_id', $farmProfileId);
    }

    public function scopeByBarangay($query, $barangay)
    {
        return $query->where('barangay', $barangay);
    }

    public function scopeByTenureType($query, $tenureType)
    {
        return $query->where('tenure_type', $tenureType);
    }

    public function scopeByFarmType($query, $farmType)
    {
        return $query->where('farm_type', $farmType);
    }

    public function scopeOrganicPractitioners($query)
    {
        return $query->where('is_organic_practitioner', true);
    }

    public function scopeAncestralDomain($query)
    {
        return $query->where('is_ancestral_domain', true);
    }

    public function scopeAgrarianReform($query)
    {
        return $query->where('is_agrarian_reform_beneficiary', true);
    }

    // Accessors
    public function getTenureTypeDisplayAttribute(): string
    {
        $typeMap = [
            'registered_owner' => 'Registered Owner',
            'tenant' => 'Tenant',
            'lessee' => 'Lessee'
        ];

        return $typeMap[$this->tenure_type] ?? $this->tenure_type;
    }

    public function getFarmTypeDisplayAttribute(): string
    {
        $typeMap = [
            'irrigated' => 'Irrigated',
            'rainfed_upland' => 'Rainfed Upland',
            'rainfed_lowland' => 'Rainfed Lowland'
        ];

        return $typeMap[$this->farm_type] ?? $this->farm_type;
    }

    public function getFarmAreaHectaresAttribute(): float
    {
        return $this->farm_area;
    }

    public function getFarmAreaSquareMetersAttribute(): float
    {
        return $this->farm_area * 10000; // Convert hectares to square meters
    }

    // Methods
    public function isOwned(): bool
    {
        return $this->tenure_type === 'registered_owner';
    }

    public function isRented(): bool
    {
        return in_array($this->tenure_type, ['tenant', 'lessee']);
    }

    public function hasDocumentation(): bool
    {
        return !empty($this->ownership_document_number);
    }

    public function getTotalValue(): float
    {
        // This could be calculated based on farm area and crop type
        // For now, returning farm area as placeholder
        return $this->farm_area;
    }
}