<?php

declare(strict_types=1);

namespace App\Controller;

use App\Type\GLifeConfig;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\Routing\Annotation\Route;
use Symfony\Component\Routing\Generator\UrlGeneratorInterface;
use Throwable;

class GLifeController extends AbstractController
{
    #[Route('/', name: 'app_glife')]
    public function index(Request $request): Response
    {
        try {
            $glifeConfig = new GLifeConfig(
                (int) $request->query->get('width', 20),
                (int) $request->query->get('height', 20),
                (int) $request->query->get('cellSize', 30),
                $this->decodeRules($request->query->get('rules', '0011,0001')),
                (bool) $request->query->get('play', false),
                (int) $request->query->get('interval', 1000),
                (int) $request->query->get('initX', 0),
                (int) $request->query->get('initY', 0),
                (int) $request->query->get('initWidth', 10),
                $request->query->get('initData', null),
            );
        } catch (Throwable $exception) {
            return $this->render('glife/error.html.twig', [
                'message' => $exception->getMessage(),
            ]);
        }

        return $this->render('glife/index.html.twig', [
            'config' => $glifeConfig,
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
