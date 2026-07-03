// Mock data para prototipagem — substitua com chamadas Supabase reais

export const mockUser = {
  id: "11111111-1111-1111-1111-111111111111",
  nome: "João Vendedor",
  email: "vendedor@tintas.com.br",
  role: "vendedor",
};

export const mockProdutos = [
  {
    id: "55555555-5555-5555-5555-555555555555",
    codigo: "7891234567890",
    nome: "Tinta Acrílica Premium",
    descricao: "Tinta acrílica premium de alta qualidade. Excelente cobertura, rendimento e durabilidade. Indicada para áreas internas e externas.",
    categoria: "Tintas Internas",
    tamanho_embalagem: "Branco Neve - 18L",
    preco: 258.90,
    quantidade_estoque: 150,
    emoji: "🪣",
    cor: "#e3f2fd",
  },
  {
    id: "66666666-6666-6666-6666-666666666666",
    codigo: "7891234567891",
    nome: "Tinta Acrílica Fosca",
    descricao: "Excelente acabamento fosco. Disfarça imperfeições e proporciona acabamento uniforme.",
    categoria: "Tintas Internas",
    tamanho_embalagem: "Branco - 18L",
    preco: 198.50,
    quantidade_estoque: 85,
    emoji: "🫙",
    cor: "#f3e5f5",
  },
  {
    id: "77777777-7777-7777-7777-777777777777",
    codigo: "7891234567892",
    nome: "Tinta Acrílica Semi Brilho",
    descricao: "Fácil de limpar e resistente. Acabamento semi-brilho elegante.",
    categoria: "Tintas Internas",
    tamanho_embalagem: "Branco - 18L",
    preco: 210.90,
    quantidade_estoque: 120,
    emoji: "🪣",
    cor: "#e8f5e9",
  },
  {
    id: "88888888-8888-8888-8888-888888888888",
    codigo: "7891234567893",
    nome: "Massa Corrida PVA",
    descricao: "Massa corrida para nivelamento de superfícies internas. Fácil aplicação.",
    categoria: "Massas",
    tamanho_embalagem: "25kg",
    preco: 65.90,
    quantidade_estoque: 200,
    emoji: "🗑️",
    cor: "#fff8e1",
  },
  {
    id: "99999999-0000-0000-0000-000000000001",
    codigo: "7891234567894",
    nome: "Tinta Esmalte Sintético",
    descricao: "Esmalte sintético de alta qualidade para madeiras e metais.",
    categoria: "Tintas Externas",
    tamanho_embalagem: "Preto - 3.6L",
    preco: 89.90,
    quantidade_estoque: 0,
    emoji: "🫙",
    cor: "#fce4ec",
  },
];

export const mockClientes = [
  {
    id: "33333333-3333-3333-3333-333333333333",
    razao_social_nome: "João da Silva",
    cnpj_cpf: "12.345.678/0001-90",
    endereco_rua: "Rua das Flores",
    endereco_numero: "123",
    endereco_bairro: "Centro",
    endereco_cidade: "São Paulo",
    endereco_estado: "SP",
    telefone: "(11) 97777-7777",
    ultima_compra: new Date(Date.now() - 15 * 24 * 60 * 60 * 1000),
  },
  {
    id: "44444444-4444-4444-4444-444444444444",
    razao_social_nome: "Construtora São Paulo",
    cnpj_cpf: "11.222.333/0001-44",
    endereco_rua: "Av. Paulista",
    endereco_numero: "1000",
    endereco_bairro: "Bela Vista",
    endereco_cidade: "São Paulo",
    endereco_estado: "SP",
    telefone: "(11) 96666-6666",
    ultima_compra: new Date(Date.now() - 48 * 24 * 60 * 60 * 1000),
  },
  {
    id: "55555555-0000-0000-0000-000000000002",
    razao_social_nome: "Maria Oliveira",
    cnpj_cpf: "98.765.432/0001-10",
    endereco_rua: "Rua Augusta",
    endereco_numero: "450",
    endereco_bairro: "Jardim América",
    endereco_cidade: "São Paulo",
    endereco_estado: "SP",
    telefone: "(11) 95555-5555",
    ultima_compra: new Date(Date.now() - 8 * 24 * 60 * 60 * 1000),
  },
];

export const mockPedidos = [
  {
    id: "aaa",
    numero_pedido: 1026,
    cliente: "João da Silva",
    total: 848.10,
    status: "Pedido Recebido",
    created_at: new Date(Date.now() - 1 * 24 * 60 * 60 * 1000),
  },
  {
    id: "bbb",
    numero_pedido: 1025,
    cliente: "Maria Oliveira",
    total: 1256.90,
    status: "Em Produção",
    created_at: new Date(Date.now() - 3 * 24 * 60 * 60 * 1000),
  },
  {
    id: "ccc",
    numero_pedido: 1024,
    cliente: "Construtora São Paulo",
    total: 632.50,
    status: "Entregue",
    created_at: new Date(Date.now() - 7 * 24 * 60 * 60 * 1000),
  },
  {
    id: "ddd",
    numero_pedido: 1023,
    cliente: "João da Silva",
    total: 965.00,
    status: "Faturado",
    created_at: new Date(Date.now() - 14 * 24 * 60 * 60 * 1000),
  },
  {
    id: "eee",
    numero_pedido: 1022,
    cliente: "Maria Oliveira",
    total: 342.00,
    status: "Cancelado",
    created_at: new Date(Date.now() - 21 * 24 * 60 * 60 * 1000),
  },
];

export type Produto = typeof mockProdutos[0];
export type Cliente = typeof mockClientes[0];
export type Pedido = typeof mockPedidos[0];

export type CartItem = {
  produto: Produto;
  quantidade: number;
};
