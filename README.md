# 🎹 PetPiano — Sistema Profissional de Gestão de Estoque & Varejo

<p align="center">
 

<p align="center">
  <strong>Sistema operacional de varejo para pet shop com contagem física a cada 48h, separação entre gôndola e depósito, gestão de entregas com validação de recebimento, prevenção de ruptura e arquitetura desacoplada para futuro e-commerce.</strong>
</p>

<p align="center">
  <a href="#-visão-geral">Visão Geral</a> •
  <a href="#-design-system-petpiano-modern-retail">Design System</a> •
  <a href="#-módulos-do-sistema">Módulos</a> •
  <a href="#-arquitetura--preparação-para-e-commerce">E-Commerce</a> •
  <a href="#-como-executar">Como Executar</a> •
  <a href="#-regras-de-integridade">Integridade</a> •
  <a href="#-licença">Licença</a>
</p>

<p align="center">
  <img src="https://img.shields.io/badge/Versão-2.0.0_Redesign-244C3A?style=for-the-badge" alt="Versão">
  <img src="https://img.shields.io/badge/Paleta-Forest_Green_%26_Ivory-244C3A?style=for-the-badge" alt="Paleta">
  <img src="https://img.shields.io/badge/Frontend-ES6_Modular-F7DF1E?style=for-the-badge&logo=javascript&logoColor=black" alt="JS">
  <img src="https://img.shields.io/badge/CSS3-Tokens_%26_Design_System-1572B6?style=for-the-badge&logo=css3&logoColor=white" alt="CSS">
  <img src="https://img.shields.io/badge/Vite-6.x-646CFF?style=for-the-badge&logo=vite&logoColor=white" alt="Vite">
</p>

---

## 📌 Visão Geral

O **PetPiano** foi redesenhado como um sistema profissional de retaguarda operacional para pet shops. O foco da plataforma é garantir a precisão do estoque físico, organizar a circulação de mercadorias entre a **frente de loja (gôndola)** e a **retaguarda (depósito/almoxarifado)**, agilizar a contagem física quinzenal/a cada 2 dias (48h) e impedir a ruptura de mercadorias críticas (rações, medicamentos e itens de alto giro).

A plataforma foi projetada sob a ótica de **Modern Retail Software**, combinando sofisticação visual, densidade de dados e rapidez de uso em tablets e celulares pelos operadores de loja.

---

## 🎨 Design System: PetPiano Modern Retail

A interface segue uma identidade visual proprietária baseada em tokens CSS:

- **Verde-floresta (`#244C3A`)**: Cor institucional primária, botões de ação principal e elementos de destaque da marca.
- **Marfim (`#F7F5EF`)**: Fundo principal acolhedor e descansado para os olhos de operadores em jornadas longas.
- **Branco Puro (`#FFFFFF`)**: Superfície de tabelas, cartões operacionais e formulários.
- **Grafite (`#252722`)**: Tipografia principal de alta legibilidade.
- **Cinza Neutro (`#77786F`)**: Rótulos secundários, metadados e legendas.
- **Terracota (`#CF7658`)**: Alertas de atenção preventiva, divergências de saldo e pontos de ressuprimento.
- **Vermelho Funcional (`#D32F2F`)**: Situações críticas de ruptura ou estoque zerado.
- **Verde Funcional (`#2E7D32`)**: Confirmações de auditoria e status de estoque saudável.
- **Tipografia**: `Manrope` e `Inter` (Google Fonts), com `font-variant-numeric: tabular-nums` para alinhamento perfeito de algarismos, códigos de barras e saldos.

---

## 🚀 Módulos do Sistema

### 1. 📊 Dashboard Principal (Painel Operacional com Prioridades)
- **Indicadores Dinâmicos em Tempo Real**:
  - Total de produtos cadastrados (com totalizador de Loja vs. Depósito).
  - Itens com estoque crítico ou zerado.
  - Produtos abaixo do estoque mínimo.
  - Contagens pendentes no ciclo de 48h.
  - Remessas de fornecedor em trânsito.
  - Divergências encontradas no inventário rotativo.
- **Área de Prioridades Operacionais**: Cartões de ação imediata para o operador com links diretos:
  - *Conferir produtos pendentes* (com atalho para a contagem expressa).
  - *Registrar entrada de mercadorias*.
  - *Verificar entregas próximas ou atrasadas*.
  - *Consultar produtos críticos em ruptura*.
- **Feed de Atividades**: Resumo das últimas movimentações físicas registradas no dia.

### 2. 📦 Gestão de Produtos & Volumes
- Tabela operacional responsiva com suporte a ordenação por Nome, Menor Saldo, Maior Saldo, Mais Críticos e Última Conferência.
- Filtros simultâneos por categoria e por situação do estoque (Saudável, Abaixo do Mínimo, Crítico, Zerado).
- Ações protegidas contra cliques acidentais: modais de ajuste de saldo, transferência e edição cadastral.

### 3. ⏱️ Contagem Expressa (Ciclo de 48 Horas)
- Otimizada especificamente para uso em smartphones e tablets durante a circulação pelas gôndolas e prateleiras.
- Botões táteis com alvo de toque acessível (`+1`, `+5`, `+10`, `-1`) e campos numéricos diretos.
- **Detecção Imediata de Divergência**: Compara o saldo físico apurado com o saldo contábil inicial da rodada.
- **Conferência com 1 Toque**: Marca o item como auditado, carimba data/hora e emite feedback sonoro harmônico.
- **Fechamento de Rodada**: Arquiva a taxa de acurácia no histórico e inicia o novo ciclo de 48h.

### 4. 🔄 Transferência entre Loja e Depósito (Bidirecional)
- Movimentação formal de volumes com duas direções possíveis:
  - `Depósito ➡️ Loja`: Reposição de gôndola.
  - `Loja ➡️ Depósito`: Recolhimento para retaguarda.
- **Quadro Comparativo em Tempo Real**: Exibe o saldo anterior e o saldo posterior simulado da origem e do destino antes da confirmação.
- **Validação Estrita**: Impede transferências maiores que a quantidade disponível e bloqueia saldos negativos.
- Gravação automática na trilha de auditoria.

### 5. 🚚 Entregas & Fornecedores (Validação de Recebimento)
- Gestão de pedidos de compra em trânsito com status visuais:
  - *Pedido realizado*, *Em trânsito*, *Previsto para hoje*, *Atrasado*, *Recebido parcialmente* e *Recebido*.
- **Conferência Física de Chegada**: Modal que exige validação da quantidade real entregue contra a quantidade encomendada original.
- **Entrada sem Duplicidade**: Credita apenas a quantidade efetivamente recebida no depósito e registra a diferença.

### 6. ⚠️ Prevenção de Ruptura & Estoque Mínimo
- Painel analítico de produtos abaixo da margem de segurança.
- Cálculo de sugestão de compra inteligente com base no consumo e no *lead time* (prazo de entrega) de cada fornecedor.
- Notificações do navegador (Web Notification API) com alertas discretos na área de trabalho.

### 7. 📜 Histórico & Trilha de Auditoria
- Registro cronológico imutável de todas as movimentações:
  - Data e hora exatas.
  - Produto movimentado.
  - Tipo de movimentação (Transferência, Entrada por Fornecedor, Ajuste de Inventário, Contagem Física).
  - Quantidade, Origem, Destino e Motivo/Observação informada pelo operador.
- Histórico dos ciclos de 48h anteriores com taxa percentual de acurácia.
- Exportação em formato `.csv` de todo o inventário e do histórico de movimentações.

---

## 🌐 Arquitetura & Preparação para E-Commerce

Embora o foco imediato do PetPiano seja a **gestão operacional interna**, a arquitetura de dados foi estruturada conceitualmente para alimentar uma futura loja virtual integrada:

```
┌─────────────────────────────────────────────────────────────┐
│              FUTURA LOJA VIRTUAL PÚBLICA                    │
│      (Catálogo, Vitrine, Preço de Venda, Carrinho)          │
└──────────────────────────────▲──────────────────────────────┘
                               │ (Apenas dados públicos)
┌──────────────────────────────┴──────────────────────────────┐
│            CAMADA DE DADOS PETPIANO (ENGINE)                │
│  - Nome Comercial, Categoria, Marca, Preço de Venda        │
│  - Saldo Unificado para Venda Online (Loja + Depósito)      │
└──────────────────────────────┬──────────────────────────────┘
                               │ (Dados protegidos de retaguarda)
┌──────────────────────────────▼──────────────────────────────┐
│           RETAGUARDA OPERACIONAL & GESTÃO INTERNA           │
│  - Fornecedores, Lead Times e Preços de Custo               │
│  - Localização Física (Corredores/Gôndolas)                 │
│  - Contagem de 48h, Quebras, Avarias e Divergências         │
│  - Trilha de Auditoria e Movimentações Internas             │
└─────────────────────────────────────────────────────────────┘
```

- **Camada Pública**: Consumirá apenas a projeção sanitizada do catálogo (nome, categoria, foto, preço comercial e disponibilidade unificada).
- **Camada Administrativa**: Mantém preços de custo, fornecedores, histórico de notas fiscais e contagens de gôndola estritamente protegidos.
- **Preparação Backend**: As funções de modelo em `app.js` foram escritas de forma desacoplada da interface, prontas para serem mapeadas para rotas de uma API REST ou GraphQL (Node.js/PostgreSQL) quando for implementado o backend compartilhado.

---

## 🚀 Como Executar Localmente

### Pré-requisitos
- [Node.js](https://nodejs.org/) versão 18+ instalado.

### Execução

```bash
# 1. Instalar as dependências do Vite
npm install

# 2. Iniciar o servidor de desenvolvimento
npm run dev

# 3. Acessar no navegador:
# http://localhost:5173/
```

### Build de Produção
```bash
npm run build
```
Os arquivos minificados e otimizados serão gerados na pasta `dist/`.

---

## 🛡️ Regras de Integridade Operacional

1. **Sem Saldos Negativos**: O sistema valida e impede que transferências ou ajustes gerem quantidades inferiores a zero.
2. **Sem Entrada Duplicada**: Pedidos de compra recebidos são travados no histórico e seu crédito é adicionado uma única vez ao depósito.
3. **Auditoria de Divergência**: Toda divergência detectada na contagem física é registrada com carimbo de tempo para controle gerencial de perdas.
4. **Persistência Segura**: Os dados operacionais são persistidos localmente no `LocalStorage` do navegador, com botão para restaurar dados de demonstração a qualquer momento.

---

## 📄 Licença

Distribuído sob a licença **MIT**. Consulte o arquivo [LICENSE](LICENSE) para obter mais informações.

<p align="center">
  Desenvolvido com padrão de excelência para o <strong>PetPiano 🐾🎹</strong>
</p>
