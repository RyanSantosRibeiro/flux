# Documentação do Projeto: Aplicativo de Vendas B2B (Fábrica de Tintas)

## 1. Visão Geral do Projeto
O sistema é uma plataforma de vendas B2B (Business-to-Business) focada em otimizar o processo de captação de pedidos para uma fábrica de tintas. Ele substitui processos manuais por uma solução digital rápida, organizada e segura.
A solução é dividida em duas frentes:
- **Aplicativo Vendedor (Mobile First)**: Voltado para os vendedores externos, permitindo consultar catálogo, gerenciar clientes, montar carrinho e emitir pedidos.
- **Painel Administrativo (Web)**: Voltado para a equipe interna da fábrica gerenciar produtos, estoques, clientes e o fluxo de produção/expedição dos pedidos.

**Stack Tecnológico:**
- **Frontend / API Routes**: Next.js (React)
- **BaaS (Backend as a Service)**: Supabase (PostgreSQL, Authentication, Storage, Row Level Security)
- **Estilização**: Tailwind CSS (recomendado) ou CSS Modules.

---

## 2. Atores do Sistema

- **Vendedor (Usuário do App)**: Funcionário externo responsável por visitar clientes (lojas, construtoras, etc.), apresentar o catálogo, negociar e inserir o pedido no sistema através do aplicativo mobile.
- **Administrador / Fábrica (Usuário do Painel)**: Funcionário interno que faz o recebimento dos pedidos, atualiza o status de produção/entrega, gerencia o estoque, cadastra novos produtos e gerencia os acessos dos vendedores e cartela de clientes globais.

---

## 3. Entidades Principais (Modelo de Dados - Supabase)

Para estruturar o banco de dados relacional no Supabase (PostgreSQL), as seguintes tabelas são essenciais:

### 3.1. `users` (ou `profiles`)
Gerencia os dados estendidos dos usuários autenticados via Supabase Auth.
- `id` (UUID, PK) - Referência ao `auth.users` do Supabase.
- `role` (Enum: 'vendedor', 'admin')
- `nome` (String)
- `email` (String)
- `telefone` (String)
- `avatar_url` (String, Opcional)
- `created_at` (Timestamp)

### 3.2. `clientes`
Armazena os dados dos clientes finais (empresas, lojas) que farão as compras.
- `id` (UUID, PK)
- `razao_social_nome` (String)
- `cnpj_cpf` (String, Unique)
- `endereco_rua` (String)
- `endereco_numero` (String)
- `endereco_bairro` (String)
- `endereco_cidade` (String)
- `endereco_estado` (String)
- `endereco_cep` (String)
- `telefone` (String)
- `email` (String)
- `vendedor_id` (UUID, FK para `users` - caso a carteira seja restrita por vendedor)
- `created_at` (Timestamp)

### 3.3. `produtos`
Catálogo de itens comercializados pela fábrica.
- `id` (UUID, PK)
- `codigo` (String, Unique) - SKU
- `nome` (String)
- `descricao` (Text)
- `categoria` (String) - ex: Tintas Internas, Externas, Vernizes
- `tamanho_embalagem` (String) - ex: 18L, 3.6L, 25kg
- `preco` (Decimal)
- `quantidade_estoque` (Integer)
- `imagem_url` (String) - URL da imagem no Supabase Storage
- `status` (Boolean) - Ativo/Inativo
- `created_at` (Timestamp)

### 3.4. `pedidos`
Armazena os cabeçalhos dos pedidos realizados.
- `id` (UUID, PK)
- `numero_pedido` (Serial/Integer, Unique) - Número sequencial legível (ex: #1026)
- `vendedor_id` (UUID, FK para `users`)
- `cliente_id` (UUID, FK para `clientes`)
- `subtotal` (Decimal)
- `desconto` (Decimal)
- `total` (Decimal)
- `forma_pagamento` (String) - ex: Faturado 30 dias
- `status` (Enum: 'Pedido Recebido', 'Em Produção', 'Em Separação', 'Faturado', 'Em Transporte', 'Entregue', 'Cancelado')
- `observacoes` (Text)
- `created_at` (Timestamp)
- `updated_at` (Timestamp)

### 3.5. `itens_pedido`
Armazena os produtos que compõem um pedido específico.
- `id` (UUID, PK)
- `pedido_id` (UUID, FK para `pedidos`)
- `produto_id` (UUID, FK para `produtos`)
- `quantidade` (Integer)
- `preco_unitario` (Decimal) - Preço congelado no momento da compra
- `preco_total` (Decimal) - (quantidade * preco_unitario)

---

## 4. Funcionalidades Detalhadas

### 4.1. Aplicativo do Vendedor (Mobile)

1. **Autenticação e Perfil:**
   - Login com e-mail e senha (integração com Supabase Auth).
   - Tela de perfil para visualização de dados, configurações, notificações e botão de logout.

2. **Dashboard (Tela Inicial):**
   - Saudação ao usuário.
   - Acesso rápido a módulos (Novo Pedido, Catálogo, Clientes, Histórico, Promoções).
   - Lista reduzida de "Pedidos recentes" exibindo número, cliente, valor e status simplificado.

3. **Catálogo de Produtos:**
   - Listagem completa de produtos com indicativo de estoque ("Em estoque" / "Sem estoque").
   - Busca textual e Filtros horizontais por categorias.
   - Botão rápido (+) no card do produto para adicionar 1 unidade ao carrinho de imediato.

4. **Detalhes do Produto:**
   - Visualização ampliada (carrossel de imagens, código do produto).
   - Descrição rica do produto.
   - Seletor de quantidade manual e botão de "Adicionar ao carrinho".

5. **Carrinho de Compras (Gerenciamento de Estado):**
   - Lista interativa de itens adicionados.
   - Capacidade de alterar a quantidade via botões (+ / -) ou remover o item.
   - Campo para inserção de "Observações do pedido".
   - Cálculo automático em tempo real de Subtotal, Desconto e Total.

6. **Checkout (Finalizar Pedido):**
   - Seleção/Alteração do **Cliente** vinculado ao pedido.
   - Exibição de Resumo de Itens.
   - Seleção de **Forma de Pagamento**.
   - Ação de envio do pedido que grava os dados na tabela `pedidos` e `itens_pedido` no Supabase e esvazia o carrinho local.

7. **Fluxo de Confirmação:**
   - Tela de sucesso com checkmark verde.
   - Exibição do número gerado para o pedido e status inicial de "Pedido Recebido".
   - Ações de voltar ao início ou acompanhar no histórico.

8. **Histórico de Pedidos:**
   - Listagem de todos os pedidos já feitos pelo vendedor.
   - Filtros de status no topo (Todos, Em andamento, Finalizados).
   - Sistema de tags visuais por cores representando o Status atual de cada pedido.

9. **Gestão de Clientes:**
   - Lista geral de clientes e barra de pesquisa.
   - Formulário para adição (+) de um novo cliente, coletando CNPJ, razão social e endereço.

### 4.2. Painel Administrativo da Fábrica (Web / Backoffice)
*(Funcionalidades complementares para o projeto funcionar no ecossistema)*

1. **Gestão de Produtos:** CRUD completo. Possibilidade de fazer upload das imagens dos baldes de tinta diretamente para o Supabase Storage. Controle de estoque.
2. **Gestão do Ciclo do Pedido:** Visão Kanban ou Tabela onde a fábrica recebe o pedido (Status: Pedido Recebido) e o movimenta (Em Produção -> Faturado -> Entregue). Essa mudança reflete em tempo real no app do vendedor.
3. **Controle de Acessos:** Capacidade de criar contas de vendedores, definir suas regiões ou carteira de clientes.

---

## 5. Diferenciais (Recursos Inteligentes e CRM)

Para elevar o nível do aplicativo e torná-lo uma ferramenta ativa de vendas e relacionamento, os seguintes diferenciais serão implementados:

1. **Alerta de Inatividade do Cliente:**
   - O sistema monitora automaticamente a data da última compra de cada cliente.
   - O vendedor recebe notificações e alertas visuais no Dashboard (ex: "O Cliente XYZ não faz pedidos há mais de 30 dias").
   - Isso permite uma atuação proativa para reativação da base de clientes e fidelização.

2. **Histórico Inteligente e Estatísticas do Cliente:**
   - Na página de detalhes de cada cliente, o vendedor terá acesso a um mini-dashboard individual (CRM).
   - **Métricas:** Valor total comprado, ticket médio e tempo médio entre compras.
   - **Estatísticas Rápidas:** Lista dos itens mais comprados (Top 5) e acesso direto aos últimos pedidos, facilitando o "repetir pedido" para itens recorrentes.

3. **Assistente de Pedidos Inteligente com IA (Integração Gemini API):**
   - Na tela de Novo Pedido, haverá uma opção de "Pedido via Texto Inteligente".
   - O vendedor pode digitar, colar ou ditar uma mensagem informal. Exemplo: *"O João da Silva quer 5 latas da tinta acrílica premium branco neve e 2 massas corridas de 25kg."*
   - O sistema, utilizando a **API do Google Gemini**, processa o texto, identifica a intenção de compra, cruza as informações com o banco de clientes e catálogo de produtos.
   - O carrinho de compras é montado automaticamente na tela (produtos, quantidades e preços), bastando apenas o vendedor revisar e confirmar o envio do pedido, reduzindo drasticamente o tempo de digitação.

---

## 6. Estratégia de Desenvolvimento e Arquitetura

1. **Next.js Features:**
   - Utilizar a **App Router** (`/app`) para roteamento.
   - Usar Server Components para buscar dados do Supabase que não precisam de interatividade pesada.
   - Client Components para o Carrinho de Compras e formulários complexos.
2. **Gerenciamento de Estado do Carrinho:**
   - Sugestão: Utilizar `Zustand` ou `React Context` com `localStorage` para manter o carrinho salvo caso o vendedor feche o app no meio de um pedido.
3. **Segurança (RLS - Row Level Security no Supabase):**
   - Configurar políticas onde o `vendedor` só tem permissão de `SELECT` e `INSERT` em pedidos onde `vendedor_id = auth.uid()`.
   - O `vendedor` só pode ler `produtos` e `clientes`.
4. **Design System:**
   - Criar uma paleta de cores baseada no layout (Azul Escuro, Verde Sucesso, Laranja Alerta, Cinza Neutro).
   - Criar componentes reutilizáveis: `Button`, `Input`, `ProductCard`, `OrderCard`, `StatusBadge`, `BottomNavigation`.