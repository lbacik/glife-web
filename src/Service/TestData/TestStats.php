<?php

declare(strict_types=1);

namespace App\Service\TestData;

use ArrayIterator;
use IteratorAggregate;

class TestStats implements IteratorAggregate
{
    public array $items;
    public float $bestAssessment;

    public function __construct(TestStatsItem ...$items)
    {
        $this->items = $items;
        $this->bestAssessment = max(array_map(fn (TestStatsItem $item) => $item->max, $items));
    }

    public function getIterator(): ArrayIterator
    {
        return new ArrayIterator($this->items);
    }
}
