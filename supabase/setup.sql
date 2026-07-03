-- ==============================================================================
-- SCHEMA INICIAL PARA APLICATIVO B2B DE TINTAS (Supabase / PostgreSQL)
-- ==============================================================================

-- Habilita a extensão para geração de UUIDs, caso não esteja habilitada
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- ==========================================
-- 1. CRIAÇÃO DAS TABELAS
-- ==========================================

-- Tabela de Usuários (Vendedores e Admins)
-- Nota: No Supabase real, essa tabela geralmente é criada em 'public' e 
-- usa um trigger no esquema 'auth.users' para ser populada automaticamente,
-- mas para facilitar os testes, estamos criando-a standalone com FK para auth (idealmente).
CREATE TABLE public.users (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    role VARCHAR(50) NOT NULL CHECK (role IN ('vendedor', 'admin')),
    nome VARCHAR(255) NOT NULL,
    email VARCHAR(255) UNIQUE NOT NULL,
    telefone VARCHAR(50),
    avatar_url TEXT,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now())
);

-- Tabela de Clientes
CREATE TABLE public.clientes (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    razao_social_nome VARCHAR(255) NOT NULL,
    cnpj_cpf VARCHAR(20) UNIQUE NOT NULL,
    endereco_rua VARCHAR(255),
    endereco_numero VARCHAR(50),
    endereco_bairro VARCHAR(100),
    endereco_cidade VARCHAR(100),
    endereco_estado VARCHAR(2),
    endereco_cep VARCHAR(20),
    telefone VARCHAR(50),
    email VARCHAR(255),
    vendedor_id UUID REFERENCES public.users(id), -- Caso o cliente seja da carteira de um vendedor
    created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()),
    ultima_compra TIMESTAMP WITH TIME ZONE -- Útil para o "Alerta de inatividade"
);

-- Tabela de Produtos
CREATE TABLE public.produtos (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    codigo VARCHAR(50) UNIQUE NOT NULL,
    nome VARCHAR(255) NOT NULL,
    descricao TEXT,
    categoria VARCHAR(100),
    tamanho_embalagem VARCHAR(50),
    preco DECIMAL(10, 2) NOT NULL,
    quantidade_estoque INTEGER DEFAULT 0,
    imagem_url TEXT,
    status BOOLEAN DEFAULT TRUE,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now())
);

-- Tabela de Pedidos
CREATE TABLE public.pedidos (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    numero_pedido SERIAL UNIQUE,
    vendedor_id UUID REFERENCES public.users(id) NOT NULL,
    cliente_id UUID REFERENCES public.clientes(id) NOT NULL,
    subtotal DECIMAL(10, 2) NOT NULL,
    desconto DECIMAL(10, 2) DEFAULT 0,
    total DECIMAL(10, 2) NOT NULL,
    forma_pagamento VARCHAR(100),
    status VARCHAR(50) DEFAULT 'Pedido Recebido' CHECK (status IN ('Pedido Recebido', 'Em Produção', 'Em Separação', 'Faturado', 'Em Transporte', 'Entregue', 'Cancelado')),
    observacoes TEXT,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now())
);

-- Tabela de Itens do Pedido
CREATE TABLE public.itens_pedido (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    pedido_id UUID REFERENCES public.pedidos(id) ON DELETE CASCADE,
    produto_id UUID REFERENCES public.produtos(id),
    quantidade INTEGER NOT NULL,
    preco_unitario DECIMAL(10, 2) NOT NULL,
    preco_total DECIMAL(10, 2) NOT NULL,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now())
);

-- ==========================================
-- 2. DADOS DE TESTE (SEED)
-- ==========================================

-- 2.1. Inserir Usuários de Teste (1 Vendedor, 1 Admin)
INSERT INTO public.users (id, role, nome, email, telefone) VALUES
('11111111-1111-1111-1111-111111111111', 'vendedor', 'João Vendedor', 'vendedor@tintas.com.br', '(11) 99999-9999'),
('22222222-2222-2222-2222-222222222222', 'admin', 'Maria Admin', 'admin@tintas.com.br', '(11) 98888-8888');

-- 2.2. Inserir Clientes de Teste
INSERT INTO public.clientes (id, razao_social_nome, cnpj_cpf, endereco_rua, endereco_numero, endereco_bairro, endereco_cidade, endereco_estado, endereco_cep, telefone, email, vendedor_id, ultima_compra) VALUES
('33333333-3333-3333-3333-333333333333', 'João da Silva (Loja Centro)', '12.345.678/0001-90', 'Rua das Flores', '123', 'Centro', 'São Paulo', 'SP', '01000-000', '(11) 97777-7777', 'contato@joaosilva.com.br', '11111111-1111-1111-1111-111111111111', NOW() - INTERVAL '15 days'),
('44444444-4444-4444-4444-444444444444', 'Construtora São Paulo', '11.222.333/0001-44', 'Av. Paulista', '1000', 'Bela Vista', 'São Paulo', 'SP', '01310-100', '(11) 96666-6666', 'compras@construtorasp.com.br', '11111111-1111-1111-1111-111111111111', NOW() - INTERVAL '45 days'); -- Este cliente estaria "inativo" e acionaria o alerta

-- 2.3. Inserir Produtos de Teste (Baseados nas imagens)
INSERT INTO public.produtos (id, codigo, nome, descricao, categoria, tamanho_embalagem, preco, quantidade_estoque, imagem_url) VALUES
('55555555-5555-5555-5555-555555555555', '7891234567890', 'Tinta Acrílica Premium', 'Tinta acrílica premium de alta qualidade. Excelente cobertura, rendimento e durabilidade. Indicada para áreas internas e externas.', 'Tintas Internas', 'Branco Neve - 18L', 258.90, 150, 'https://exemplo.com/images/tinta_premium_18l.jpg'),
('66666666-6666-6666-6666-666666666666', '7891234567891', 'Tinta Acrílica Fosca', 'Excelente acabamento fosco. Disfarça imperfeições.', 'Tintas Internas', 'Branco - 18L', 198.50, 85, 'https://exemplo.com/images/tinta_fosca_18l.jpg'),
('77777777-7777-7777-7777-777777777777', '7891234567892', 'Tinta Acrílica Semi Brilho', 'Fácil de limpar e resistente. Acabamento brilhante.', 'Tintas Internas', 'Branco - 18L', 210.90, 120, 'https://exemplo.com/images/tinta_semibrilho_18l.jpg'),
('88888888-8888-8888-8888-888888888888', '7891234567893', 'Massa Corrida PVA', 'Massa corrida para nivelamento de superfícies internas.', 'Massas', '25kg', 65.90, 200, 'https://exemplo.com/images/massa_corrida_25kg.jpg');

-- 2.4. Inserir um Pedido de Teste (Exatamente como na tela do aplicativo)
INSERT INTO public.pedidos (id, numero_pedido, vendedor_id, cliente_id, subtotal, desconto, total, forma_pagamento, status, observacoes) VALUES
('99999999-9999-9999-9999-999999999999', 1025, '11111111-1111-1111-1111-111111111111', '33333333-3333-3333-3333-333333333333', 1256.90, 0.00, 1256.90, 'Boleto', 'Em Produção', 'Favor ligar antes de entregar'),
('aaaaaaaa-aaaa-aaaa-aaaa-aaaaaaaaaaaa', 1026, '11111111-1111-1111-1111-111111111111', '33333333-3333-3333-3333-333333333333', 848.10, 0.00, 848.10, 'Faturado 30 dias', 'Pedido Recebido', '');

-- 2.5. Inserir Itens do Pedido de Teste (#1026)
INSERT INTO public.itens_pedido (pedido_id, produto_id, quantidade, preco_unitario, preco_total) VALUES
('aaaaaaaa-aaaa-aaaa-aaaa-aaaaaaaaaaaa', '55555555-5555-5555-5555-555555555555', 2, 258.90, 517.80), -- 2x Tinta Premium
('aaaaaaaa-aaaa-aaaa-aaaa-aaaaaaaaaaaa', '66666666-6666-6666-6666-666666666666', 1, 198.50, 198.50), -- 1x Tinta Fosca
('aaaaaaaa-aaaa-aaaa-aaaa-aaaaaaaaaaaa', '88888888-8888-8888-8888-888888888888', 2, 65.90, 131.80);  -- 2x Massa Corrida PVA

-- ==========================================
-- FIM DO SCRIPT
-- ==========================================
