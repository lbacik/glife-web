<?php

declare(strict_types=1);

namespace App\Controller;

use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\Routing\Annotation\Route;
use Symfony\Component\Routing\Generator\UrlGeneratorInterface;
use Throwable;

class GlifeController extends AbstractController
{
    #[Route('/glife', name: 'app_glife')]
    public function index(Request $request): Response
    {
        $width = $request->query->get('width', 20);
        $height = $request->query->get('height', 20);
        $cellSize = $request->query->get('cellSize', 30);
        $rules = $request->query->get('rules', '0011,0001');
        $play = (bool) $request->query->get('play', false);
        $interval = $request->query->get('interval', 1000);
        $initX = $request->query->get('initX', 0);
        $initY = $request->query->get('initY', 0);
        $initWidth = $request->query->get('initWidth', 10);
        $initData = $request->query->get('initData', null);

        $rulesDecoded = $this->decodeRules($rules);

        dump($request->query->all());
        dump($rulesDecoded);

        try {
            assert($width > 0, 'Width must be greater than 0');
            assert($width <= 1000, 'Width must be less than 1000');
            assert($height > 0, 'Height must be greater than 0');
            assert($height <= 1000, 'Height must be less than 1000');
            assert($cellSize > 0, 'Cell size must be greater than 0');
            assert($cellSize <= 100, 'Cell size must be less than 100');
            assert($interval > 0, 'Interval must be greater than 0');
            assert($interval <= 10000, 'Interval must be less than 10000');
            assert($initX >= 0, 'Init X must be greater than or equal to 0');
            assert($initX < $width,'Init X must be less than width');
            assert($initY >= 0, 'Init Y must be greater than or equal to 0');
            assert($initY < $height, 'Init Y must be less than height');
            assert($initWidth > 0, 'Init width must be greater than 0');
            assert($initX + $initWidth <= $width, 'Init X + init width must be less than or equal to width');
            assert($play === true || $play === false, 'Play must be true or false');
            assert($initData === null || is_string($initData), 'Init data must be null or string');
            assert(is_string($rules), 'Rules must be string');

        } catch (Throwable $exception) {
            return $this->render('glife/error.html.twig', [
                'message' => $exception->getMessage(),
            ]);
        }

        return $this->render('glife/index.html.twig', [
            'controller_name' => 'GlifeController',
            'boardWidth' => $width,
            'boardHeight' => $height,
            'boardCellSize' => $cellSize,
            'rules' => $rulesDecoded,
            'play' => $play,
            'interval' => $interval,
            'initX' => $initX,
            'initY' => $initY,
            'initWidth' => $initWidth,
            'initData' => $initData,
            'url' => $this->generateUrl('app_glife', [], UrlGeneratorInterface::ABSOLUTE_URL)
        ]);
    }

    private function decodeRules(string $rules): array
    {
        $rulesArray = explode(',', $rules);
        $survive = array_map(fn($i) => (int) $i, str_split($rulesArray[0]));
        $reproduction = array_map(fn($i) => (int) $i, str_split($rulesArray[1]));

        if (count($survive) !== 9) {
            $survive = array_merge($survive, array_fill(0, 9 - count($survive), 0));
        }

        if (count($reproduction) !== 9) {
            $reproduction = array_merge($reproduction, array_fill(0, 9 - count($reproduction), 0));
        }

        return [
            'survive' => $survive,
            'reproduction' => $reproduction,
        ];
    }
}
