<?php

declare(strict_types=1);

namespace App\Service\TestData;

use ArrayIterator;
use IteratorAggregate;

class GenerationAssessment implements IteratorAggregate
{
    public array $genotypes;

    public function __construct(GenotypeAssessment ...$genotypes)
    {
        $this->genotypes = $genotypes;
    }

    public function getIterator(): ArrayIterator
    {
        return new ArrayIterator($this->genotypes);
    }
}
