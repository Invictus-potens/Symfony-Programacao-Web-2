<p align="center">
  <img src="https://symfony.com/logos/symfony_black_03.svg" alt="Symfony Logo" width="120" />
</p>

<h1 align="center">PHP Symfony</h1>

O **Symfony** é um dos frameworks mais robustos, populares e influentes do PHP, criado em 2005 pela empresa **SensioLabs** (uma empresa francesa de consultoria de PHP) para suprir um vazio no mercado.

Antes do Symfony, o ecossistema de PHP era dominado por programações misturadas com código HTML e frameworks primitivos que eram mais uma coleção de funções prontas do que um framework consolidado, então a criação de sistemas grandes era muito caótica, difícil de manter e propenso a falhas de segurança.

A filosofia criada pela equipe da SensioLabs era a seguinte: usar as melhores práticas já utilizadas pelas principais linguagens corporativas do mercado na época (**Java com Spring** e **Ruby com Ruby on Rails**). O objetivo era parar de tentar inventar a roda; no lugar de escrever um sistema de autenticação, roteamento e manipulação do banco de dados do zero, os desenvolvedores poderiam usar componentes prontos.

---

## Evolução do Symfony

* **Symfony 1.x (2005 a 2011):** Focado em velocidade de desenvolvimento e fortemente inspirado em Ruby on Rails. Ganhou muita tração, mas sofria de problemas de performance em certas partes.
* **Symfony 2 (Lançado em 2011):** A SensioLabs reescreveu o framework do zero, adotando o conceito de frameworks independentes e abraçando o padrão do **PHP-FIG**. Essa mudança foi de tão grande sucesso que outros projetos gigantes da comunidade (**Laravel, Drupal, Magento/Adobe Commerce e PrestaShop**) passaram a adotar os componentes do Symfony por debaixo do capô.

---

## Como o Symfony se destaca?

### Arquitetura baseada em componentes
O Symfony não é um framework monolítico; ele é um conjunto com mais de 30 componentes reutilizáveis e desacoplados (`Routing`, `EventDispatcher`, `Form`, `Validator`, etc.). Você pode usar o framework completo ou importar somente os componentes que deseja usar.

### Reutilização e o Ecossistema PHP
Grandes empresas do mercado escolhem o Symfony por ele servir de base para outros grandes frameworks:
* **Laravel:** construiu grande parte da sua arquitetura interna (como roteamento, gerenciamento de requisições e console) utilizando componentes do Symfony.
* **Drupal (versão 8 em diante) e Magento 2:** usam o núcleo do Symfony para estruturar suas arquiteturas.

### Estabilidade, Longevidade e Versionamento Semântico
* O Symfony tem uma política rigorosa de retrocompatibilidade: se sua aplicação foi construída em uma versão antiga, atualizar para uma versão mais nova é um processo previsível e seguro.
* Versões **LTS (Long Term Support)** garantem que o Symfony receba suporte e correções durante anos, o que acaba sendo crucial para empresas de grande e médio porte.

### Alta Performance e Flexibilidade
Com o passar dos anos, a SensioLabs investiu fortemente em otimização de desempenho. Atualmente, o Symfony conta com recursos avançados como o **Symfony Runtime** e integração nativa com **RoadRunner** ou **FrankenPHP** (servidores de aplicação), fazendo com que as aplicações rodem em servidores de longa execução.

### Ferramentas de Produtividade (CLI e MakerBundle)
* **Symfony CLI:** ferramenta de linha de comando que gerencia servidores de desenvolvimento locais, certificados TLS, variáveis de ambiente e executa testes.
* **MakerBundle:** gera rapidamente esqueletos de código para *controllers*, entidades, formulários e testes, reduzindo o trabalho repetitivo.

### Sistemas de Testes e Qualidade
O Symfony foi desenhado desde o início para ser facilmente testável. Ele possui nativamente integrações com ferramentas para testes como **PHPUnit** e **Panther**, permitindo testes automatizados extremamente confiáveis.

---
Instalando PHP, Composer que é o gerenciador de dependências do PHP, como o “node” no javascript, além disso a instalação do symfony CLI.
1 - windows
```sh
irm get.scoop.sh | iex  
```
    \-  **Instala** o scoop que é o gerenciador de pacotes para windows parecido com o apt do ubuntu



```sh
scoop install php composer symfony-cli 
```
- Usa o Scoop para instalar as tres ferramentas que vamos usar no tutorial -> php, composer e o symfony-cli.
2 - Ubuntu
```
sudo apt install php-cli php-xml php-curl unzip composer
```
O `apt` é o gerenciador de pacotes do Ubuntu, e o `sudo` dá permissão de administrador para instalar. Esse comando instala cinco pacotes:
php-cli, php-xml, php-curl, composer e unzip.
```
curl -sS https://get.symfony.com/cli/installer | bash
```
       Esse comando instala o Symfony CLI, que não vem no `apt` padrão do Ubuntu.

O que vamos construir: uma lista de tarefas.
cliente.php -> script php usando httpClient do symfony.  
API symfony Get e Post em /api/tarefas, na porta 8000  
tarefas.json -> arquivo em var que guarda dados  
cliente e servidor são programas separados, eles só conversam por http, trocando json.
Para o servidor usaremos os comandos via terminal:
```
symfony new api-tarefas --version=lts
```
Usa o Symfony CLI para criar uma pasta chamada `api-tarefas` já com um projeto Symfony mínimo dentro.
`--version=lts` pede a versão com suporte longo, a 7.4, que funciona com PHP 8.2 ou mais novo.
Por baixo, ele chama o Composer para baixar as bibliotecas.
`cd api-tarefas`
Entra na pasta criada. o comando seguinte (subir o servidor, `php bin/console`) são rodados de dentro dela.
```
composer create-project symfony/skeleton:"7.4.\*" api-tarefas
```

o que será criado:
![](data:image/png;base64,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)
criando o arquivo do controller: src/Controller/TarefaController.php -> que recebe os métodos (GET e POST)
```php
<?php
namespace App\\Controller;
 
use Symfony\\Bundle\\FrameworkBundle\\Controller\\AbstractController;
use Symfony\\Component\\HttpFoundation\\JsonResponse;
use Symfony\\Component\\HttpFoundation\\Request;
use Symfony\\Component\\Routing\\Attribute\\Route;
 
#\[Route('/api/tarefas')]
class TarefaController extends AbstractController
{
    private string $arquivo = \_\_DIR\_\_.'/../../var/tarefas.json';
 
}
```
O namespace funciona como o “endereço” da classe, parecido com uma pasta. O Symfony liga `App\\` à pasta `src/`, então `App\\Controller` corresponde a `src/Controller/`. Por isso o nome e o lugar do arquivo precisam bater com o namespace.
As quatro linhas use
AbstractController: a classe-base dos controllers. É dela que vem o `$this->json()`.
JsonResponse: o tipo de resposta que os métodos devolvem, uma resposta HTTP com JSON.
Request: o objeto com os dados da requisição. O método POST usa ele para ler o que o cliente enviou.
Route: o atributo que liga uma URL a um método.
```php
#\[Route('/api/tarefas')] 
```
-> É um atributo, uma etiqueta que o Symfony lê. Colocado em cima da classe, ele vira o prefixo de todas as rotas dela.
```php
class TarefaController extends AbstractController  
```
-> Cria a classe do controller. O `extends` faz ela herdar os recursos prontos do `AbstractController`. O nome termina em “Controller” por convenção do Symfony.

Dentro da classe TarefaController existirá dois métodos `TarefaController`: `listar()`, que responde ao GET, e `ler()`, que é um auxiliar.
```php
#\[Route('', methods: \['GET'])] // rota do método - o caminho vazio é somado ao prefixo da classe então a url final é api/tarefas
public function listar(): JsonResponse
{
    return this->json(this->ler());
}
 
// Lê o arquivo; se ainda não existe, a lista está vazia
private function ler(): array
{
    if (!file\_exists($this->arquivo)) {
        return \[];
    }
    return json\_decode(file\_get\_contents($this->arquivo), true);
}
```
```php
public function listar(): JsonResponse 
```
`public`: o Symfony precisa conseguir chamar o método de fora da classe.
`listar()`: o nome do método. Pode ser qualquer um, porque quem liga a URL a ele é o `#\[Route]`.
`JsonResponse`: indica que o método sempre devolve uma resposta JSON.
```php
return this->json(this->ler()); 
```
`$this->ler() busca a lista de tarefas salva no arquivo.`
`$this->json(...), que vem do AbstractController, transforma essa lista em JSON e monta a resposta HTTP com status 200.`
```php
private function ler(): array 
```
`private`: só a própria classe usa. Como não tem `#\[Route]`, nenhuma URL chega nele.
`: array`: devolve sempre uma lista.
Ele existe porque o `listar()` e o `criar()` precisam ler o arquivo, e assim o código não se repete.
```php
if (!file\_exists($this->arquivo)) { return \[]; } 
```
`$this->arquivo` é o caminho do `var/tarefas.json`, definido no slide anterior.
Na primeira vez que a API roda, esse arquivo ainda não existe. O `!` inverte o teste: “se o arquivo não existe”, devolve uma lista vazia `\[]`.
Sem essa verificação, a primeira requisição daria erro.
```php
 return json\_decode(file\_get\_contents($this->arquivo), true); 
```
`file\_get\_contents(...)` lê o conteúdo do arquivo como texto.
`json\_decode(..., true)` converte esse texto JSON num array do PHP. O `true` pede um array; sem ele, o PHP devolveria objetos.
O caminho completo de um GET: o cliente chama `GET /api/tarefas`, o Symfony encontra o `listar()`, que chama o `ler()`. O `ler()` lê o arquivo e devolve o array, e o `json()` manda esse array de volta como JSON.
```php
#\[Route('', methods: \['POST'])] // método post para criação da tarefa
public function criar(Request $request): JsonResponse
{
    dados=jsondecode(request->getContent(), true);
    if (empty($dados\['titulo'])) {
        return $this->json(\['erro' => 'Envie o campo titulo'], 400);
    }
    $tarefas = $this->ler();
    nova=\['id'=>count(tarefas) + 1, 'titulo' => $dados\['titulo']];
    $tarefas\[] = $nova;
    file\_put\_contents(this->arquivo,jsonencode(tarefas));
    return this->json(nova, 201);
}
```
`Esse é o método criar(), que recebe uma tarefa nova do cliente, confere se ela tem título e salva no arquivo.`
```php
public function criar(Request $request): JsonResponse 
```
Como o método pede um parâmetro do tipo `Request`, o Symfony entrega automaticamente o objeto da requisição. É por ele que chegam os dados enviados pelo cliente.
```php
dados=jsondecode(request->getContent(), true); 
```
`$request->getContent() pega o corpo da requisição, o texto JSON que o cliente mandou, por exemplo {"titulo":"Estudar Symfony"}.`
`json\_decode(..., true) transforma esse texto num array do PHP. Agora $dados\['titulo'] vale "Estudar Symfony".`
```php
if (empty($dados\['titulo'])) { return $this->json(\['erro' => 'Envie o campo titulo'], 400); } 
```
`empty() é verdadeiro quando o título não veio, veio vazio ou o corpo nem era JSON.`
`Nesse caso o método para ali, com o return, e responde com status 400 (Bad Request, “requisição inválida”) e uma mensagem de erro.`
 `Nova tarefa`

`$tarefas = $this->ler(); carrega a lista que já existe, usando o mesmo ler() do slide anterior.`
`$nova=\['id'=>count($tarefas) + 1, 'titulo' => $dados\['titulo']]; cria a tarefa como um array com duas chaves. O id é o tamanho da lista mais um: com duas tarefas salvas, a nova recebe o id 3.`
`$tarefas\[] = $nova; adiciona a tarefa no fim da lista. Os \[] vazios significam “coloque no final”.`
`Salvar`  
`file\_put\_contents($this->arquivo,jso{n}\_{e}ncode($tarefas));`
`json\_encode faz o caminho inverso do json\_decode: transforma o array em texto JSON.`
`file\_put\_contents grava esse texto no var/tarefas.json, substituindo o conteúdo anterior pela lista atualizada.`
`Responder`
`return $this->json($nova, 201);`
`Devolve a tarefa criada, por exemplo {"id":3,"titulo":"..."}, com status 201 (Created, “criado”). Assim o cliente já recebe o id que o servidor gerou.`
`Subindo o servidor`
```
symfony server:start –no-tls
```
`em outra pasta fora da api,criaremos um cliente php com o httpclient do symfony`
```php
<?php
require \_\_DIR\_\_.'/vendor/autoload.php';
use Symfony\\Component\\HttpClient\\HttpClient;
 
$client = HttpClient::create();
$url = 'http://127.0.0.1:8000/api/tarefas';
 
// 1. Envia uma nova tarefa (POST)
$titulo = $argv\[1] ?? 'Estudar Symfony';
$resposta = $client->request('POST', $url, \[
    'json' => \['titulo' => $titulo],
]);
echo 'Criada! Status: '.$resposta->getStatusCode().PHP\_EOL;
```
```php
use Symfony\\Component\\HttpClient\\HttpClient; 
```
Importa a classe `HttpClient` para usar só o nome curto.
```php
$client = HttpClient::create(); 
```
Cria o objeto que faz as requisições. O `::` chama um método estático, ou seja, um método da classe e não de um objeto. É como abrir um “navegador” dentro do código.
```php
$url = 'http://127.0.0.1:8000/api/tarefas'; 
```
Guarda o endereço da API numa variável para usar nas duas requisições.
`127.0.0.1` é o próprio computador, também chamado de localhost.
`8000` é a porta onde o `symfony server:start` deixou o servidor rodando.
`/api/tarefas` é a rota do `TarefaController`
```php
$titulo = $argv\[1] ?? 'Estudar Symfony'; 
```
Define o título da tarefa.
`$argv` é a lista do que foi digitado no terminal. Em `php cliente.php "Apresentar o trabalho"`, `$argv\[0]` é `cliente.php` e `$argv\[1]` é `"Apresentar o trabalho"`.
O `??` dá um valor padrão: se você não passar nada depois de `cliente.php`, o título vira `'Estudar Symfony'`.
```php
$resposta = $client->request('POST', $url, \[ 'json' => \['titulo' => $titulo] ]); 
```
É aqui que o cliente conversa com o servidor:
`'POST'` é o método HTTP, então o servidor cai no método `criar()` do controller.
`$url` diz para onde a requisição vai.
A opção `'json'` pega o array `\['titulo' => $titulo]`, transforma em `{"titulo":"..."}` e envia no corpo da requisição. Ela também avisa o servidor de que o conteúdo é JSON.
No servidor, é exatamente isso que o `$request->getContent()` recebe.
