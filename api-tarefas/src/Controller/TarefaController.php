<?php
namespace App\Controller;

use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\JsonResponse;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\Routing\Attribute\Route;

#[Route('/api/tarefas')]
class TarefaController extends AbstractController
{
    private string $arquivo = __DIR__.'/../../var/tarefas.json';

    #[Route('', methods: ['GET'])]
    public function listar(): JsonResponse
    {
        return $this->json($this->ler());
    }

    private function ler(): array
    {
        if (!file_exists($this->arquivo)) {
            return [];
        }
        return json_decode(file_get_contents($this->arquivo), true);
    }

    #[Route('', methods: ['POST'])]
    public function criar(Request $request): JsonResponse
    {
        $dados = json_decode($request->getContent(), true);
        if (empty($dados['titulo'])) {
            return $this->json(['erro' => 'Envie o campo titulo'], 400);
        }
        $tarefas = $this->ler();
        $nova = ['id' => count($tarefas) + 1, 'titulo' => $dados['titulo']];
        $tarefas[] = $nova;
        file_put_contents($this->arquivo, json_encode($tarefas));
        return $this->json($nova, 201);
    }
}
