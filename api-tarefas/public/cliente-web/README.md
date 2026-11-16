# Frontend Desacoplado &middot; Cliente Web Symfony

Este diretório contém a interface gráfica web criada para interagir de forma visual, didática e intuitiva com a API REST construída em **Symfony 7 (PHP 8.2+)**.

---

## 🎯 Objetivo da Demonstração
Exemplificar o padrão de arquitetura **Cliente-Servidor Desacoplado**:
- **Servidor (Backend):** Projeto Symfony com endpoints REST (`/ola/{nome}` e `/api/tarefas`), persistência em `var/tarefas.json` e serialização JSON.
- **Cliente (Frontend):** Aplicação Web Vanilla (HTML5 semântico, CSS moderno e JavaScript ES6+ assíncrono com `fetch`) que consome os serviços HTTP do Symfony e inspeciona o tráfego em tempo real.

---

## 🚀 Como Executar Localmente

### Opção 1: Abertura Direta no Navegador (Mais Rápida)
Basta dar **duplo clique** no arquivo [`index.html`](index.html) para abri-lo em qualquer navegador moderno (Chrome, Edge, Firefox, Brave).

> **💡 Nota sobre o Modo Simulação (Offline):**
> O cliente inclui um interruptor **"Modo Simulação (Offline/Demo)"**. Se a API Symfony ainda não foi iniciada no terminal (`symfony server:start --no-tls`), o modo simulação permite testar toda a navegação, formulários, persistência em memória e o console de inspeção HTTP instantaneamente.

### Opção 2: Servidor Estático Local
Se preferir rodar com um servidor local:
- **Via VS Code:** Clique com o botão direito em `index.html` e escolha *"Open with Live Server"*.
- **Via Node.js:** Dentro desta pasta, execute:
  ```bash
  npx serve .
  ```
- **Via Python:**
  ```bash
  python -m http.server 3000
  ```

---

## 🔗 Comunicação com o Servidor Symfony (Porta 8000)

Quando o servidor Symfony for iniciado na porta padrão:
```bash
cd api-tarefas
symfony server:start --no-tls
```
A API estará escutando em `http://127.0.0.1:8000`.

### 🛡️ Tratamento de CORS (Cross-Origin Resource Sharing)
Como o frontend roda em uma origem (`file:///` ou `http://localhost:3000`) diferente da API Symfony (`http://127.0.0.1:8000`), os navegadores modernos realizam checagens de CORS.

Para liberar o acesso no Symfony de forma nativa e sem bibliotecas externas:
1. **Adicionar cabeçalhos de resposta nas rotas do Symfony:**
   No controller `TarefaController.php` e `OlaController.php`, passe os headers CORS no `$this->json(...)`:
   ```php
   return $this->json($dados, 200, [
       'Access-Control-Allow-Origin' => '*',
       'Access-Control-Allow-Methods' => 'GET, POST, OPTIONS',
       'Access-Control-Allow-Headers' => 'Content-Type, Accept',
   ]);
   ```
2. **Ou copiar os arquivos do frontend para a pasta `public/` do Symfony:**
   Ao colocar o `index.html`, `style.css` e `app.js` dentro da pasta `public/` do projeto Symfony, o frontend e a API passam a compartilhar a mesma origem (`http://127.0.0.1:8000/index.html`), eliminando qualquer restrição de CORS automaticamente.
