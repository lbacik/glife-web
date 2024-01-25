<?php

declare(strict_types=1);

namespace App\Controller;

use App\Service\JsonHubService;
use App\Service\TestData\TestStats;
use App\Service\TestDataService;
use App\Service\TestDataSource;
use Pagerfanta\Adapter\FixedAdapter;
use Pagerfanta\Pagerfanta;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\Routing\Annotation\Route;
use Symfony\UX\Chartjs\Builder\ChartBuilderInterface;
use Symfony\UX\Chartjs\Model\Chart;

class TestsJsonHubController extends AbstractController
{

    public function __construct(
        private readonly JsonHubService $jsonHubService,
        private readonly TestDataService $testDataService,
        private readonly ChartBuilderInterface $chartBuilder,
    ) {
    }

    #[Route('/tests/jsonhub', name: 'app_tests_jsonhub')]
    public function index(Request $request): Response
    {
        $limit = $request->query->getInt('limit', 10);
        $page = $request->query->getInt('page', 1);

        $tests = $this->jsonHubService->getAllTests(
            limit: $limit,
            page: $page,
        );

        $total = $this->jsonHubService->getLastQueryCount();

        $data = $this->testDataService->map(TestDataSource::TEST_RESULT_V1, $tests);

        $adapter = new FixedAdapter($total, $data->toArray());
        $pagerfanta = new Pagerfanta($adapter);

        $pagerfanta->setMaxPerPage($limit);
        $pagerfanta->setCurrentPage($page);

        return $this->render('tests_json_hub/index.html.twig', [
            'tests' => $pagerfanta,
        ]);
    }

    #[Route('/tests/jsonhub/{uuid}', name: 'app_tests_jsonhub_show')]
    public function show(string $uuid): Response
    {
        $test = $this->jsonHubService->getTest($uuid);
        $data = $this->testDataService->map(TestDataSource::TEST_RESULT_V1, [(array) $test]);

        $test = $data->toArray()[0];

        return $this->render('tests_json_hub/show.html.twig', [
            'test' => $test,
            'chart' => $this->buildTestChart($test->stats),
        ]);
    }

    private function buildTestChart(TestStats $stats): Chart
    {
        $chart = $this->chartBuilder->createChart(Chart::TYPE_LINE);

        $result = array_reduce(
            $stats->items,
            function ($carry, $item) {
                $carry['avg'][] = $item->avg;
                $carry['min'][] = $item->min;
                $carry['max'][] = $item->max;
                $carry['individuals'][] = $item->individuals;
                return $carry;
            },
            [
                'avg' => [],
                'min' => [],
                'max' => [],
                'individuals' => [],
            ]
        );

        $chart->setData([
            'labels' => range(0, count($stats->items) - 1),
            'datasets' => [
                [
                    'label' => 'Average',
                    'backgroundColor' => 'rgb(255, 99, 132)',
                    'borderColor' => 'rgb(255, 99, 132)',
                    'data' => $result['avg'],
                ],
                [
                    'label' => 'Min',
                    'backgroundColor' => 'rgb(54, 162, 235)',
                    'borderColor' => 'rgb(54, 162, 235)',
                    'data' => $result['min'],
                ],
                [
                    'label' => 'Max',
                    'backgroundColor' => 'rgb(75, 192, 192)',
                    'borderColor' => 'rgb(75, 192, 192)',
                    'data' => $result['max'],
                ],
                [
                    'label' => 'Individuals',
                    'backgroundColor' => 'rgb(153, 102, 255)',
                    'borderColor' => 'rgb(153, 102, 255)',
                    'data' => $result['individuals'],
                ],
            ],
        ]);

        $chart->setOptions([
            'datasets' => [
                'line' => [
                    'tension' => 0.4,
                    'pointStyle' => 'circle',
                ],
            ],
        ]);

        return $chart;
    }
}
