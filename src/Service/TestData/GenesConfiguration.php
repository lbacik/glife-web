<?php

declare(strict_types=1);

namespace App\Service\TestData;

class GenesConfiguration
{
    public function __construct(
        public int $maxGeneration,
        public int $genotypeLength,
        public int $startPopulationSize,
        public int $createPercentage,
        public float $mutationProbability,
        public int $selectionIndividualsToChoose,
        public string $crossoverType,
        public int $crossoverPopulationSize,
        public int $crossoverChildrenPerPair,
    ){
    }
}
