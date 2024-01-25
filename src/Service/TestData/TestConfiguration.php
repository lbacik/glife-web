<?php

declare(strict_types=1);

namespace App\Service\TestData;

class TestConfiguration
{
    public function __construct(
        public GLifeConfiguration $glife,
        public GenesConfiguration $genes,
    ) {
    }
}
