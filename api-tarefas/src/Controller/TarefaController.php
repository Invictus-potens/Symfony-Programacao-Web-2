<?php

declare(strict_types=1);

namespace App\Controller;

use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\JsonResponse;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\Routing\Attribute\Route;

#[Route('/api/tarefas')]
class TarefaController extends AbstractController
{
    private string $arquivo = __DIR__.'/../../var/tarefas.json';

    #[Route('', methods: ['OPTIONS'])]
    public function preflight(): JsonResponse
    {
        return new JsonResponse(null, 204, [
            'Access-Control-Allow-Origin' => '*',
            'Access-Control-Allow-Methods' => 'GET, POST, OPTIONS',
            'Access-Control-Allow-Headers' => 'Content-Type, Accept',
        ]);
    }

    #[Route('', methods: ['GET'])]
    public function listar(): JsonResponse
    {
        return $this->json($this->ler(), 200, [
            'Access-Control-Allow-Origin' => '*',
        ]);
    }

    /**
     * @return array<int, array{id: int, titulo: string}>
     */
    private function ler(): array
    {
        if (!file_exists($this->arquivo)) {
            return [];
        }

        $conteudo = file_get_contents($this->arquivo);
        if ($conteudo === false) {
            return [];
        }

        /** @var array<int, array{id: int, titulo: string}>|null $dados */
        $dados = json_decode($conteudo, true);

        return is_array($dados) ? $dados : [];
    }

    #[Route('', methods: ['POST'])]
    public function criar(Request $request): JsonResponse
    {
        $dados = json_decode($request->getContent(), true);

        // Guard clause: validação do campo obrigatório
        if (empty($dados['titulo']) || !is_string($dados['titulo'])) {
            return $this->json(
                ['erro' => 'Envie o campo titulo'],
                400,
                ['Access-Control-Allow-Origin' => '*']
            );
        }

        $tarefas = $this->ler();
        $nova = [
            'id' => count($tarefas) + 1,
            'titulo' => trim($dados['titulo'])
        ];
        $tarefas[] = $nova;

        $diretorio = dirname($this->arquivo);
        if (!is_dir($diretorio)) {
            mkdir($diretorio, 0777, true);
        }

        file_put_contents($this->arquivo, json_encode($tarefas, JSON_PRETTY_PRINT | JSON_UNESCAPED_UNICODE));

        return $this->json($nova, 201, [
            'Access-Control-Allow-Origin' => '*',
        ]);
    }
}
