<?php

declare(strict_types=1);

namespace App\Service;

use App\Service\TestData\Mapper\InputDataMapper;
use App\Service\TestData\TestDataCollection;

class TestDataService
{
    public function __construct(
        private readonly InputDataMapper $mapper,
    ) {
    }

    public function map(TestDataSource $source, array $data): TestDataCollection
    {
        return new TestDataCollection(...array_map(
            fn (array $item) => $this->mapper->map($source, $item),
            $data
        ));
    }
}
