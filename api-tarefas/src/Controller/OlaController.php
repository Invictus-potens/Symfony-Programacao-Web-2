<?php

declare(strict_types=1);

namespace App\Controller;

use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\JsonResponse;
use Symfony\Component\Routing\Attribute\Route;

class OlaController extends AbstractController
{
    #[Route('/ola/{nome}', methods: ['GET', 'OPTIONS'])]
    public function ola(string $nome): JsonResponse
    {
        return $this->json(
            ['mensagem' => "Oi, $nome!"],
            200,
            [
                'Access-Control-Allow-Origin' => '*',
                'Access-Control-Allow-Methods' => 'GET, OPTIONS',
                'Access-Control-Allow-Headers' => 'Content-Type, Accept',
            ]
        );
    }
}
