<?php

declare(strict_types=1);

namespace App\Service\TestData;

class GLifeConfiguration
{
    public function __construct(
        public int $width,
        public int $height,
        public int $colonyX,
        public int $colonyY,
        public int $colonyWidth,
        public int $maxGeneration,
        public array $rules = [],
    ) {
    }
}
