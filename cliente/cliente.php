<?php
require __DIR__.'/vendor/autoload.php';
use Symfony\Component\HttpClient\HttpClient;

$client = HttpClient::create();
$url = 'http://127.0.0.1:8000/api/tarefas';

// 1. Envia uma nova tarefa (POST)
$titulo = $argv[1] ?? 'Estudar Symfony';
$resposta = $client->request('POST', $url, [
    'json' => ['titulo' => $titulo],
]);
echo 'Criada! Status: '.$resposta->getStatusCode().PHP_EOL;

// 2. Busca a lista completa (GET)
$tarefas = $client->request('GET', $url)->toArray();
echo 'Tarefas no servidor:'.PHP_EOL;
foreach ($tarefas as $t) {
    echo " #{$t['id']} {$t['titulo']}".PHP_EOL;
}
