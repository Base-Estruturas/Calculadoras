/* ============================================
   BASE Estruturas — controle da interface
   ============================================ */

const nav = document.getElementById('nav');
const search = document.getElementById('search');
const frame = document.getElementById('frame');
const welcome = document.getElementById('welcome');
const topbarTitle = document.getElementById('topbar-title');
const btnReload = document.getElementById('btn-reload');
const btnMenu = document.getElementById('btn-menu');
const sidebar = document.querySelector('.sidebar');
const backdrop = document.getElementById('backdrop');

let calculadoraAtiva = null;

// === Monta lista de calculadoras agrupadas por categoria ===
function montarLista() {
  nav.innerHTML = '';
  if (CALCULADORAS.length === 0) {
    nav.innerHTML = '<div class="nav-empty">Nenhuma calculadora cadastrada.<br>Edite <code>assets/calculadoras.js</code>.</div>';
    return;
  }

  // Agrupar por categoria
  const grupos = {};
  CALCULADORAS.forEach(c => {
    const cat = c.categoria || 'Outros';
    if (!grupos[cat]) grupos[cat] = [];
    grupos[cat].push(c);
  });

  // Renderizar na ordem definida (ORDEM_CATEGORIAS) + qualquer categoria extra ao final
  const ordemFinal = [...ORDEM_CATEGORIAS];
  Object.keys(grupos).forEach(cat => {
    if (!ordemFinal.includes(cat)) ordemFinal.push(cat);
  });

  ordemFinal.forEach(cat => {
    if (!grupos[cat] || grupos[cat].length === 0) return;

    // Cabeçalho da categoria
    const header = document.createElement('div');
    header.className = 'nav-category';
    header.textContent = cat;
    nav.appendChild(header);

    // Itens da categoria
    grupos[cat].forEach(c => {
      const btn = document.createElement('button');
      btn.className = 'nav-item';
      btn.dataset.id = c.id;
      btn.dataset.categoria = cat;
      btn.textContent = c.nome;
      btn.title = c.descricao || c.nome;
      btn.addEventListener('click', () => {
        abrir(c);
        fecharMenuMobile();
      });
      nav.appendChild(btn);
    });
  });
}

// === Abre uma calculadora no iframe ===
function abrir(calc) {
  calculadoraAtiva = calc;

  document.querySelectorAll('.nav-item').forEach(el => {
    el.classList.toggle('active', el.dataset.id === calc.id);
  });

  topbarTitle.textContent = calc.nome;
  btnReload.disabled = false;

  frame.src = `calculadoras/${calc.arquivo}`;
  frame.classList.remove('hidden');
  welcome.classList.add('hidden');

  // Atualiza hash da URL para permitir compartilhar link direto
  history.replaceState(null, '', '#' + calc.id);
}

// === Busca/filtro ===
search.addEventListener('input', () => {
  const termo = search.value.toLowerCase().trim();

  // Filtrar itens
  document.querySelectorAll('.nav-item').forEach(el => {
    const calc = CALCULADORAS.find(c => c.id === el.dataset.id);
    const match = !termo
      || calc.nome.toLowerCase().includes(termo)
      || (calc.descricao && calc.descricao.toLowerCase().includes(termo))
      || (calc.categoria && calc.categoria.toLowerCase().includes(termo));
    el.classList.toggle('hidden', !match);
  });

  // Esconder cabeçalhos de categorias que ficaram sem itens visíveis
  document.querySelectorAll('.nav-category').forEach(header => {
    const cat = header.textContent;
    const itensVisiveis = Array.from(document.querySelectorAll(`.nav-item[data-categoria="${cat}"]`))
      .some(el => !el.classList.contains('hidden'));
    header.classList.toggle('hidden', !itensVisiveis);
  });
});

// === Recarregar calculadora ativa ===
btnReload.addEventListener('click', () => {
  if (calculadoraAtiva) {
    const src = frame.src;
    frame.src = 'about:blank';
    setTimeout(() => { frame.src = src; }, 50);
  }
});

// === Menu mobile ===
function abrirMenuMobile() {
  sidebar.classList.add('open');
  backdrop.classList.add('visible');
}
function fecharMenuMobile() {
  sidebar.classList.remove('open');
  backdrop.classList.remove('visible');
}
btnMenu.addEventListener('click', () => {
  sidebar.classList.contains('open') ? fecharMenuMobile() : abrirMenuMobile();
});
backdrop.addEventListener('click', fecharMenuMobile);

// === Atalhos de teclado ===
document.addEventListener('keydown', (e) => {
  if ((e.ctrlKey || e.metaKey) && e.key.toLowerCase() === 'k') {
    e.preventDefault();
    search.focus();
    search.select();
  }
  if (e.key === 'Escape') {
    if (document.activeElement === search) {
      search.value = '';
      search.dispatchEvent(new Event('input'));
      search.blur();
    } else if (sidebar.classList.contains('open')) {
      fecharMenuMobile();
    }
  }
});

// === Abertura automática via hash da URL ===
function abrirPeloHash() {
  const hash = window.location.hash.slice(1);
  if (hash) {
    const calc = CALCULADORAS.find(c => c.id === hash);
    if (calc) abrir(calc);
  }
}

// === Inicialização ===
montarLista();
abrirPeloHash();
