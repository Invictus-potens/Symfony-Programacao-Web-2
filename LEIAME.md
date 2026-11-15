# Código do tutorial Symfony (cliente e servidor)

1. Crie o projeto: `symfony new api-tarefas --version=lts`
2. Copie `api-tarefas/src/Controller/*.php` para a pasta `src/Controller/` do projeto.
3. Suba o servidor: `cd api-tarefas && symfony server:start --no-tls`
4. Em outro terminal: `mkdir cliente && cd cliente && composer require symfony/http-client`
5. Copie `cliente/cliente.php` para essa pasta e rode: `php cliente.php "Minha tarefa"`
