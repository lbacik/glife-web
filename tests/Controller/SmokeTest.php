<?php

declare(strict_types=1);

namespace App\Tests\Controller;

use PHPUnit\Framework\Attributes\DataProvider;
use Symfony\Bundle\FrameworkBundle\Test\WebTestCase;

class SmokeTest extends WebTestCase
{
    public static function pages(): iterable
    {
        yield 'glife' => ['/'];
        yield 'about' => ['/about'];
    }

    #[DataProvider('pages')]
    public function testPageRenders(string $path): void
    {
        $client = static::createClient();
        $client->request('GET', $path);

        self::assertResponseIsSuccessful();
    }
}
