<?php

declare(strict_types=1);

namespace App\Service;

use JsonHub\SDK\Client;
use JsonHub\SDK\Entity;
use JsonHub\SDK\FilterCriteria;

class JsonHubService
{
    public function __construct(
        public readonly string $testResultV1Definition,
        private readonly Client $client,
    ) {
    }

    public function getAllTests(
        int $limit,
        int $page,
    ): array {
        $criteria = new FilterCriteria(
            page: $page,
            limit: $limit,
            definitionUuid: $this->testResultV1Definition,
        );

        return $this->client
            ->getEntities($criteria)
            ->toArray();
    }

    public function getTest(string $uuid): Entity
    {
        return $this->client
            ->getEntity($uuid);
    }

    public function getProject(string $projectUuid): Entity
    {
        return $this->client->getEntity($projectUuid);
    }

    public function getLastQueryCount(): int
    {
        return $this->client->getLastQueryCount();
    }
}
