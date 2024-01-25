<?php

declare(strict_types=1);

namespace App\Service\TestData;

class TestStatsItem
{
    public function __construct(
        public float $avg,
        public float $min,
        public float $max,
        public float $individuals,
    ) {
    }
}
