<?php

declare(strict_types=1);

namespace App\Service\TestData;

use ArrayIterator;
use IteratorAggregate;

class TestDataCollection implements IteratorAggregate
{
    public array $items;

    public function __construct(TestData ...$items)
    {
        $this->items = $items;
    }

    public function getIterator(): ArrayIterator
    {
        return new ArrayIterator($this->items);
    }

    public function toArray(): array
    {
        return $this->items;
    }
}
