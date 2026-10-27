<?php

declare(strict_types=1);

namespace App\Tests\Controller;

use Symfony\Bundle\FrameworkBundle\Test\WebTestCase;

class JsonHubDisabledTest extends WebTestCase
{
    public function testJsonHubPagesAreNotFoundWhenNotConfigured(): void
    {
        $client = static::createClient();

        $client->request('GET', '/tests/jsonhub');
        self::assertResponseStatusCodeSame(404);

        $client->request('GET', '/tests/jsonhub/test-uuid');
        self::assertResponseStatusCodeSame(404);

        $client->request('GET', '/');
        self::assertResponseIsSuccessful();
    }
}