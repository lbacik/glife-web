<?php

declare(strict_types=1);

namespace App\Service\TestData\Mapper;

use App\Service\TestData\GenerationAssessment;
use App\Service\TestData\GenesConfiguration;
use App\Service\TestData\GenotypeAssessment;
use App\Service\TestData\GLifeConfiguration;
use App\Service\TestData\TestConfiguration;
use App\Service\TestData\TestData;
use App\Service\TestData\TestStats;
use App\Service\TestData\TestStatsItem;
use App\Service\TestDataSource;

class InputDataMapper
{
    public function map(TestDataSource $source, array $item): TestData
    {
        $data = $item['data'];

        return new TestData(
            $data['test_url'],
            $item['id'],
            $this->prepareStats($data['stats']),
            $this->prepareAssessment($data['last_generation']),
            new TestConfiguration(
                new GLifeConfiguration(
                    width: $data['test_config']['glife']['width'],
                    height: $data['test_config']['glife']['height'],
                    colonyX: $data['test_config']['glife']['colony_x'],
                    colonyY: $data['test_config']['glife']['colony_y'],
                    colonyWidth: $data['test_config']['glife']['colony_width'],
                    maxGeneration: $data['test_config']['glife']['max_generation'],
                ),
                new GenesConfiguration(
                    maxGeneration: $data['test_config']['genes']['max_generation'],
                    genotypeLength: $data['test_config']['genes']['genotype_length'],
                    startPopulationSize: $data['test_config']['genes']['start_population'],
                    createPercentage: $data['test_config']['genes']['create_percentage'],
                    mutationProbability: $data['test_config']['genes']['mutation']['probability'],
                    selectionIndividualsToChoose: $data['test_config']['genes']['selection']['creatures_to_choose'],
                    crossoverType: $data['test_config']['genes']['crossover']['type'],
                    crossoverPopulationSize: $data['test_config']['genes']['crossover']['population_size'],
                    crossoverChildrenPerPair: $data['test_config']['genes']['crossover']['children_per_pair'],
                ),
            ),
        );
    }

    private function prepareStats(array $stats): TestStats
    {
        return new TestStats(
            ...array_map(
                fn (array $item) => new TestStatsItem(
                    avg: $item['avr'],
                    min: $item['min'],
                    max: $item['max'],
                    individuals: $item['individuals'],
                ),
                $stats
            )
        );
    }

    private function prepareAssessment(array $assessment): GenerationAssessment
    {
        return new GenerationAssessment(
            ...array_map(
                fn (array $item) => new GenotypeAssessment(
                    genotype: $item['genotype'],
                    assessment: $item['fitness'],
                ),
                $assessment
            )
        );
    }
}
