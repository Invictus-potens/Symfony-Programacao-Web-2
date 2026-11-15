<?php

namespace App\Controller;

use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\JsonResponse;
use Symfony\Component\Routing\Attribute\Route;

class OlaController extends AbstractController
{
    #[Route('/ola/{nome}', methods: ['GET'])]
    public function ola(string $nome): JsonResponse
    {
        return $this->json(['mensagem' => "Oi, $nome!"]);
    }
}
