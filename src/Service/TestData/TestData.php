<?php

declare(strict_types=1);

namespace App\Service\TestData;

class TestData
{
    public string $testUrl;

    public function __construct(
        string $testUrl,
        public string $id,
        public TestStats $stats,
        public GenerationAssessment $lastGeneration,
        public TestConfiguration $testConfiguration,
    ) {
        $this->testUrl = explode('?', trim($testUrl))[0];
    }
}
