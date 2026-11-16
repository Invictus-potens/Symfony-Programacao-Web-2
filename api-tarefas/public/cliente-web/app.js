
'use strict';

(() => {

  const state = {
    apiBaseUrl: 'http://127.0.0.1:8000',
    isMockMode: false,
    mockTarefas: [
      { id: 1, titulo: 'Apresentar trabalho de Programação Web 2' },
      { id: 2, titulo: 'Demonstrar rotas e controllers do Symfony' }
    ]
  };

const dom = {

    inputBaseUrl: document.getElementById('api-base-url'),
    btnTestarConexao: document.getElementById('btn-testar-conexao'),
    toggleMock: document.getElementById('toggle-mock'),
    statusDot: document.getElementById('status-dot'),
    statusLabel: document.getElementById('status-label'),

    formOla: document.getElementById('form-ola'),
    inputNome: document.getElementById('nome-saudacao'),
    boxRespostaOla: document.getElementById('box-resposta-ola'),

    formCriarTarefa: document.getElementById('form-criar-tarefa'),
    inputTituloTarefa: document.getElementById('titulo-nova-tarefa'),
    btnRecarregarTarefas: document.getElementById('btn-recarregar-tarefas'),
    listaTarefas: document.getElementById('lista-tarefas'),

    inspectorBadge: document.getElementById('inspector-status-badge'),
    inspectorRequest: document.getElementById('inspector-request'),
    inspectorResponse: document.getElementById('inspector-response')
  };

  const escapeHTML = (str) => {
    if (typeof str !== 'string') return '';
    return str
      .replace(/&/g, '&amp;')
      .replace(/</g, '&lt;')
      .replace(/>/g, '&gt;')
      .replace(/"/g, '&quot;')
      .replace(/'/g, '&#039;');
  };

  const atualizarStatusConexao = (status, mensagem) => {
    dom.statusDot.className = 'status-indicator';
    dom.statusDot.classList.add(`status-${status}`);
    dom.statusLabel.textContent = mensagem;
  };

  const logInspecaoHTTP = (metodo, url, payload, statusCode, dadosResposta, isSuccess = true) => {

    dom.inspectorBadge.textContent = `Status: ${statusCode}`;
    dom.inspectorBadge.className = 'badge-status-code';
    dom.inspectorBadge.classList.add(isSuccess ? 'badge-status-success' : 'badge-status-error');


    const requestDetails = {
      metodo,
      url,
      timestamp: new Date().toLocaleTimeString('pt-BR'),
      headers: {
        'Accept': 'application/json',
        ...(payload ? { 'Content-Type': 'application/json' } : {})
      },
      corpo: payload ?? '(vazio)'
    };

    dom.inspectorRequest.textContent = JSON.stringify(requestDetails, null, 2);
    dom.inspectorResponse.textContent = JSON.stringify(dadosResposta, null, 2);
  };


  const executarRequisicao = async (endpoint, options = {}, silenciarInspecao = false) => {
    const url = `${state.apiBaseUrl}${endpoint}`;
    const metodo = options.method || 'GET';
    const bodyObj = options.body ? JSON.parse(options.body) : null;

    // Guard Clause: Tratamento do Modo Simulação (Offline/Demo)
    if (state.isMockMode) {
      return processarRequisicaoMock(endpoint, metodo, bodyObj);
    }

    try {
      const response = await fetch(url, {
        ...options,
        headers: {
          'Accept': 'application/json',
          ...(options.body ? { 'Content-Type': 'application/json' } : {}),
          ...options.headers
        }
      });

      const data = await response.json().catch(() => ({}));

      if (!silenciarInspecao) {
        logInspecaoHTTP(metodo, url, bodyObj, response.status, data, response.ok);
      }
      atualizarStatusConexao('online', `Conectado ao Symfony (${response.status} OK)`);

      return {
        ok: response.ok,
        status: response.status,
        data
      };
    } catch (erro) {
      const respostaErro = {
        erro: 'Não foi possível se comunicar com o backend Symfony.',
        detalhes: erro.message,
        sugestao: 'Verifique se o comando "symfony server:start --no-tls" está rodando ou ative o Modo Simulação.'
      };

      logInspecaoHTTP(metodo, url, bodyObj, 'ERR_CONEXAO', respostaErro, false);
      atualizarStatusConexao('offline', 'Servidor Symfony Inacessível (Offline)');

      return {
        ok: false,
        status: 0,
        data: respostaErro
      };
    }
  };


  const processarRequisicaoMock = (endpoint, metodo, bodyObj) => {
    if (endpoint.startsWith('/ola/')) {
      const nomeDecodificado = decodeURIComponent(endpoint.replace('/ola/', ''));
      const mockData = { mensagem: `Oi, ${nomeDecodificado}! (Simulação Symfony)` };
      logInspecaoHTTP(metodo, `[MOCK] ${endpoint}`, null, 200, mockData, true);
      return { ok: true, status: 200, data: mockData };
    }

    if (endpoint === '/api/tarefas' && metodo === 'GET') {
      const mockData = [...state.mockTarefas];
      logInspecaoHTTP(metodo, `[MOCK] ${endpoint}`, null, 200, mockData, true);
      return { ok: true, status: 200, data: mockData };
    }

    if (endpoint === '/api/tarefas' && metodo === 'POST') {
      if (!bodyObj || !bodyObj.titulo) {
        const erroData = { erro: 'Envie o campo titulo' };
        logInspecaoHTTP(metodo, `[MOCK] ${endpoint}`, bodyObj, 400, erroData, false);
        return { ok: false, status: 400, data: erroData };
      }

      const novaTarefa = {
        id: state.mockTarefas.length + 1,
        titulo: bodyObj.titulo
      };
      state.mockTarefas.push(novaTarefa);

      logInspecaoHTTP(metodo, `[MOCK] ${endpoint}`, bodyObj, 201, novaTarefa, true);
      return { ok: true, status: 201, data: novaTarefa };
    }

    return { ok: false, status: 404, data: { erro: 'Rota não encontrada' } };
  };


  const testarConexaoBackend = async () => {
    atualizarStatusConexao('checking', 'Testando rota de saúde...');
    const resultado = await executarRequisicao('/api/tarefas', { method: 'GET' });
    
    if (resultado.ok) {
      renderizarListaTarefas(resultado.data);
    }
  };

  const lidarEnvioOla = async (evento) => {
    evento.preventDefault();

    const nome = dom.inputNome.value.trim();

    // Guard Clause: Validação de campo obrigatório
    if (!nome) {
      dom.boxRespostaOla.innerHTML = '<span class="response-placeholder" style="color: var(--color-warning);">Por favor, informe um nome.</span>';
      dom.inputNome.focus();
      return;
    }

    dom.boxRespostaOla.innerHTML = '<span class="response-placeholder">Consultando OlaController...</span>';

    const endpoint = `/ola/${encodeURIComponent(nome)}`;
    const resultado = await executarRequisicao(endpoint, { method: 'GET' });

    if (!resultado.ok) {
      dom.boxRespostaOla.innerHTML = `<span style="color: var(--color-danger);">Erro: ${escapeHTML(resultado.data.erro || 'Falha na resposta')}</span>`;
      return;
    }

    dom.boxRespostaOla.innerHTML = `
      <p class="response-message">
        <strong>Resposta do Symfony:</strong> "${escapeHTML(resultado.data.mensagem)}"
      </p>
    `;
  };


  const carregarTarefas = async (silenciarInspecao = false) => {
    dom.listaTarefas.innerHTML = '<li class="empty-state">Carregando tarefas do Symfony...</li>';

    const resultado = await executarRequisicao('/api/tarefas', { method: 'GET' }, silenciarInspecao);

    // Guard Clause: Em caso de erro na resposta
    if (!resultado.ok) {
      dom.listaTarefas.innerHTML = `
        <li class="empty-state" style="color: var(--color-danger);">
          Não foi possível carregar as tarefas. Ative o modo simulação ou ligue o servidor Symfony.
        </li>
      `;
      return;
    }

    renderizarListaTarefas(resultado.data);
  };

  const renderizarListaTarefas = (tarefas) => {
    // Guard Clause: Lista vazia
    if (!Array.isArray(tarefas) || tarefas.length === 0) {
      dom.listaTarefas.innerHTML = '<li class="empty-state">Nenhuma tarefa cadastrada no arquivo tarefas.json.</li>';
      return;
    }

    const itensHTML = tarefas.map((tarefa) => `
      <li class="task-item">
        <span class="task-badge">#${escapeHTML(String(tarefa.id))}</span>
        <span class="task-title">${escapeHTML(tarefa.titulo)}</span>
      </li>
    `).join('');

    dom.listaTarefas.innerHTML = itensHTML;
  };


  const lidarCriarTarefa = async (evento) => {
    evento.preventDefault();

    const titulo = dom.inputTituloTarefa.value.trim();

    // Guard Clause: Validação de entrada
    if (!titulo) {
      alert('Por favor, informe o título da tarefa.');
      dom.inputTituloTarefa.focus();
      return;
    }

    const payload = JSON.stringify({ titulo });
    const resultado = await executarRequisicao('/api/tarefas', {
      method: 'POST',
      body: payload
    });

    if (!resultado.ok) {
      alert(`Falha ao criar tarefa: ${resultado.data.erro || 'Erro no servidor'}`);
      return;
    }


    dom.inputTituloTarefa.value = '';
    await carregarTarefas(true);
  };

  const registrarEventos = () => {
    dom.inputBaseUrl.addEventListener('change', (e) => {
      state.apiBaseUrl = e.target.value.replace(/\/+$/, '');
    });


    dom.btnTestarConexao.addEventListener('click', testarConexaoBackend);

    dom.toggleMock.addEventListener('change', (e) => {
      state.isMockMode = e.target.checked;
      if (state.isMockMode) {
        atualizarStatusConexao('mock', 'Modo Simulação Ativo (Demo)');
      } else {
        atualizarStatusConexao('checking', 'Verificando API Symfony...');
        testarConexaoBackend();
      }
    });

    dom.formOla.addEventListener('submit', lidarEnvioOla);
    dom.formCriarTarefa.addEventListener('submit', lidarCriarTarefa);
    dom.btnRecarregarTarefas.addEventListener('click', carregarTarefas);
  };


  const inicializar = () => {
    registrarEventos();
    testarConexaoBackend();
  };

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', inicializar);
  } else {
    inicializar();
  }
})();
