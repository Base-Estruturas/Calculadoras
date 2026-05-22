/* ============================================================
   LISTA DE CALCULADORAS — BASE Estruturas
   ============================================================

   COMO ADICIONAR UMA NOVA CALCULADORA:

   1. Coloque o arquivo .html dentro da pasta "calculadoras/"
   2. Adicione uma nova linha no array CALCULADORAS abaixo
      (basta copiar uma linha que já existe e ajustar)
   3. Salve e atualize a página (Ctrl+F5 para forçar)

   CAMPOS DE CADA LINHA:
     - categoria: "Vigas" | "Pilares" | "Lajes" | "Fundações" | "Escadas" | "Outros"
     - id:        identificador único (sem espaços nem acentos, use traços)
     - nome:      texto que aparece no botão da sidebar
     - arquivo:   nome do arquivo HTML dentro da pasta calculadoras/
     - descricao: (opcional) frase curta sobre a calculadora

   A ORDEM no menu segue a ordem desta lista dentro de cada categoria.

   PARA REMOVER: apague a linha ou comente colocando // no início.

   ============================================================ */

const CALCULADORAS = [

  // ===== VIGAS =====
  {
    categoria: 'Vigas',
    id: 'viga-flexao-cisalhamento',
    nome: 'Viga — Flexão e Cisalhamento',
    arquivo: 'calculadora_armadura_viga.html',
    descricao: 'Armadura longitudinal e transversal de vigas retangulares ou T conforme NBR 6118:2014.'
  },
 
   {
     categoria: 'Vigas',
     id: 'Espaçamento-Barras',
     nome: 'Viga — Espaçamento barras',
     arquivo: 'espacamento-barras-viga.html',
     descricao: 'Cálculo espamento entre barras long.'
   },

  // ===== PILARES =====
  // {
  //   categoria: 'Pilares',
  //   id: 'pilar-flexao-composta',
  //   nome: 'Pilar — Flexão composta normal',
  //   arquivo: 'calculadora_pilar.html',
  //   descricao: 'Dimensionamento de pilar com flexão composta.'
  // },

  // ===== LAJES =====
  // {
  //   categoria: 'Lajes',
  //   id: 'laje-macica',
  //   nome: 'Laje maciça',
  //   arquivo: 'calculadora_laje.html',
  //   descricao: 'Dimensionamento de laje maciça armada em duas direções.'
  // },

  // ===== FUNDAÇÕES =====
   {
     categoria: 'Fundações',
     id: 'sapata-associada',
    nome: 'Sapata associada',
     arquivo: 'calculadora_sapata_associadaa.html',
     descricao: 'Dimensionamento de sapata associada.'
   },

  // ===== ESCADAS =====
  // {
  //   categoria: 'Escadas',
  //   id: 'escada-helicoidal',
  //   nome: 'Escada helicoidal',
  //   arquivo: 'calculadora_escada.html',
  //   descricao: 'Dimensionamento de escada helicoidal.'
  // },

  // ===== OUTROS =====
  // {
  //   categoria: 'Outros',
  //   id: 'cargas-laje',
  //   nome: 'Cálculo de cargas em lajes',
  //   arquivo: 'calculadora_cargas.html',
  //   descricao: 'Cargas permanentes e variáveis em pisos.'
  // },

];

// Ordem das categorias no menu (não mexer a menos que queira mudar a ordem)
const ORDEM_CATEGORIAS = ['Vigas', 'Pilares', 'Lajes', 'Fundações', 'Escadas', 'Outros'];
