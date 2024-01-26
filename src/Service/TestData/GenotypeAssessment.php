<?php

declare(strict_types=1);

namespace App\Service\TestData;

class GenotypeAssessment
{
    public function __construct(
        public string $genotype,
        public float $assessment,
    ) {
    }
}
