/**
 * PETPIANO — RETAIL STOCK ENGINE & GESTÃO OPERACIONAL
 * Arquitetura de Gestão de Estoque, Ciclo de 48h, Movimentações Físicas e Preparação para E-Commerce.
 */

// ============================================================================
// CHAVES DE ARMAZENAMENTO (LOCAL STORAGE)
// ============================================================================

const STORAGE_KEYS = {
  PRODUCTS: 'petpiano_products_v2',
  DELIVERIES: 'petpiano_deliveries_v2',
  CYCLE: 'petpiano_cycle_v2',
  CYCLE_HISTORY: 'petpiano_cycle_history_v2',
  MOVEMENTS: 'petpiano_movements_v2',
  SETTINGS: 'petpiano_settings_v2',
};

// ============================================================================
// DADOS DEMONSTRATIVOS INICIAIS (SEED REALISTA DE PET SHOP)
// ============================================================================

const INITIAL_PRODUCTS = [
  {
    id: 'prod-001',
    sku: '7896000701123',
    name: 'Ração Premier Formula Cães Adultos 15kg',
    category: 'Rações & Alimentos',
    brand: 'Premier Pet',
    supplier: 'Distribuidora PetBrasil',
    costPrice: 165.00,
    salePrice: 249.90,
    qtyLoja: 4,
    qtyEstoque: 14,
    minStock: 8,
    leadTimeDays: 3,
    location: 'Corredor 1 - Prateleira A',
    lastCountAt: new Date(Date.now() - 3600000 * 12).toISOString(),
    checkedInCycle: true,
    baselineTotal: 18,
    divergenceReason: '',
    statusEcom: 'active'
  },
  {
    id: 'prod-002',
    sku: '7891000201456',
    name: 'Ração Royal Canin Mini Adult 2.5kg',
    category: 'Rações & Alimentos',
    brand: 'Royal Canin',
    supplier: 'Distribuidora Central Pet',
    costPrice: 89.50,
    salePrice: 139.90,
    qtyLoja: 3,
    qtyEstoque: 5,
    minStock: 6,
    leadTimeDays: 4,
    location: 'Corredor 1 - Prateleira B',
    lastCountAt: new Date(Date.now() - 3600000 * 20).toISOString(),
    checkedInCycle: true,
    baselineTotal: 8,
    divergenceReason: '',
    statusEcom: 'active'
  },
  {
    id: 'prod-003',
    sku: '7898000451890',
    name: 'Ração Golden Gatos Castrados Frango 10kg',
    category: 'Rações & Alimentos',
    brand: 'PremieRpet Golden',
    supplier: 'Distribuidora PetBrasil',
    costPrice: 110.00,
    salePrice: 174.90,
    qtyLoja: 2,
    qtyEstoque: 1,
    minStock: 5, // Abaixo do mínimo!
    leadTimeDays: 3,
    location: 'Corredor 2 - Prateleira A',
    lastCountAt: new Date(Date.now() - 3600000 * 48).toISOString(),
    checkedInCycle: false,
    baselineTotal: 4,
    divergenceReason: '',
    statusEcom: 'active'
  },
  {
    id: 'prod-004',
    sku: '7891234500987',
    name: 'Antipulgas Bravecto Cães 10 a 20kg (1 comp)',
    category: 'Farmácia & Medicamentos',
    brand: 'MSD Saúde Animal',
    supplier: 'FarmaPet Distribuição',
    costPrice: 178.00,
    salePrice: 249.90,
    qtyLoja: 1,
    qtyEstoque: 1,
    minStock: 4, // Crítico!
    leadTimeDays: 2,
    location: 'Balcão Farmácia - Gaveta 3',
    lastCountAt: new Date(Date.now() - 3600000 * 18).toISOString(),
    checkedInCycle: false,
    baselineTotal: 2,
    divergenceReason: '',
    statusEcom: 'active'
  },
  {
    id: 'prod-005',
    sku: '7896541209341',
    name: 'NexGard Spectra Antipulgas Cães 7.5 a 15kg',
    category: 'Farmácia & Medicamentos',
    brand: 'Boehringer Ingelheim',
    supplier: 'FarmaPet Distribuição',
    costPrice: 85.00,
    salePrice: 129.90,
    qtyLoja: 4,
    qtyEstoque: 8,
    minStock: 5,
    leadTimeDays: 2,
    location: 'Balcão Farmácia - Gaveta 2',
    lastCountAt: new Date(Date.now() - 3600000 * 6).toISOString(),
    checkedInCycle: true,
    baselineTotal: 12,
    divergenceReason: '',
    statusEcom: 'active'
  },
  {
    id: 'prod-006',
    sku: '7897890123001',
    name: 'Areia Sanitária Pipicat Classic 4kg',
    category: 'Higiene & Areia',
    brand: 'Kelco Pet Care',
    supplier: 'Distribuidora PetBrasil',
    costPrice: 12.00,
    salePrice: 21.90,
    qtyLoja: 3,
    qtyEstoque: 2,
    minStock: 10, // Crítico!
    leadTimeDays: 3,
    location: 'Corredor 4 - Prateleira C',
    lastCountAt: new Date(Date.now() - 3600000 * 30).toISOString(),
    checkedInCycle: false,
    baselineTotal: 6,
    divergenceReason: '',
    statusEcom: 'active'
  },
  {
    id: 'prod-007',
    sku: '7893334445556',
    name: 'Tapete Higiênico Chalesco 30 unidades',
    category: 'Higiene & Areia',
    brand: 'Chalesco',
    supplier: 'Distribuidora Central Pet',
    costPrice: 42.00,
    salePrice: 69.90,
    qtyLoja: 6,
    qtyEstoque: 18,
    minStock: 8,
    leadTimeDays: 4,
    location: 'Corredor 4 - Pallet Frontal',
    lastCountAt: new Date(Date.now() - 3600000 * 10).toISOString(),
    checkedInCycle: true,
    baselineTotal: 24,
    divergenceReason: '',
    statusEcom: 'active'
  },
  {
    id: 'prod-008',
    sku: '7891011121314',
    name: 'Petisco Dreamies Salmão para Gatos 40g',
    category: 'Petiscos & Bifinhos',
    brand: 'Mars Petcare',
    supplier: 'Distribuidora Express Pet',
    costPrice: 3.80,
    salePrice: 6.90,
    qtyLoja: 12,
    qtyEstoque: 24,
    minStock: 10,
    leadTimeDays: 2,
    location: 'Gôndola Checkout',
    lastCountAt: new Date(Date.now() - 3600000 * 14).toISOString(),
    checkedInCycle: true,
    baselineTotal: 36,
    divergenceReason: '',
    statusEcom: 'active'
  },
  {
    id: 'prod-009',
    sku: '7895556667778',
    name: 'Bifinho Keldog Carne 500g',
    category: 'Petiscos & Bifinhos',
    brand: 'Kelco Pet Care',
    supplier: 'Distribuidora PetBrasil',
    costPrice: 15.00,
    salePrice: 26.90,
    qtyLoja: 1, // Loja baixa, depósito zerado -> Ruptura!
    qtyEstoque: 0,
    minStock: 6,
    leadTimeDays: 3,
    location: 'Corredor 3 - Prateleira B',
    lastCountAt: new Date(Date.now() - 3600000 * 5).toISOString(),
    checkedInCycle: false,
    baselineTotal: 1,
    divergenceReason: '',
    statusEcom: 'active'
  },
  {
    id: 'prod-010',
    sku: '7899998887776',
    name: 'Brinquedo Mordedor Kong Classic Vermelho M',
    category: 'Brinquedos',
    brand: 'KONG Company',
    supplier: 'Importadora PetPlay',
    costPrice: 65.00,
    salePrice: 119.90,
    qtyLoja: 1,
    qtyEstoque: 4, // Loja baixa, mas tem estoque no depósito! Sugestão de transferência
    minStock: 3,
    leadTimeDays: 5,
    location: 'Painel Acessórios C',
    lastCountAt: new Date(Date.now() - 3600000 * 22).toISOString(),
    checkedInCycle: true,
    baselineTotal: 5,
    divergenceReason: '',
    statusEcom: 'active'
  },
  {
    id: 'prod-011',
    sku: '7894443332221',
    name: 'Coleira e Guia Antipuxão Zee.Dog Gotham G',
    category: 'Acessórios & Coleiras',
    brand: 'Zee.Dog',
    supplier: 'Distribuidora Zee Lifestyle',
    costPrice: 72.00,
    salePrice: 129.00,
    qtyLoja: 3,
    qtyEstoque: 3,
    minStock: 4,
    leadTimeDays: 4,
    location: 'Painel Boutique Zee',
    lastCountAt: new Date(Date.now() - 3600000 * 8).toISOString(),
    checkedInCycle: true,
    baselineTotal: 6,
    divergenceReason: '',
    statusEcom: 'active'
  },
  {
    id: 'prod-012',
    sku: '7891112223334',
    name: 'Shampoo Neutro Petbrilho 500ml',
    category: 'Higiene & Areia',
    brand: 'Petbrilho',
    supplier: 'Distribuidora PetBrasil',
    costPrice: 11.50,
    salePrice: 22.90,
    qtyLoja: 4,
    qtyEstoque: 12,
    minStock: 6,
    leadTimeDays: 3,
    location: 'Corredor 4 - Prateleira A',
    lastCountAt: new Date(Date.now() - 3600000 * 16).toISOString(),
    checkedInCycle: true,
    baselineTotal: 16,
    divergenceReason: '',
    statusEcom: 'active'
  }
];

const INITIAL_DELIVERIES = [
  {
    id: 'deliv-001',
    productId: 'prod-004', // Bravecto
    supplier: 'FarmaPet Distribuição',
    orderNumber: 'PED-2026-948',
    orderedQuantity: 10,
    receivedQuantity: 0,
    difference: 0,
    orderDate: new Date(Date.now() - 86400000 * 2).toISOString().split('T')[0],
    expectedDate: new Date(Date.now() + 86400000 * 2).toISOString().split('T')[0], // Em 2 dias
    status: 'in_transit',
    createdAt: new Date().toISOString()
  },
  {
    id: 'deliv-002',
    productId: 'prod-006', // Pipicat
    supplier: 'Distribuidora PetBrasil',
    orderNumber: 'PED-2026-952',
    orderedQuantity: 25,
    receivedQuantity: 0,
    difference: 0,
    orderDate: new Date(Date.now() - 86400000 * 3).toISOString().split('T')[0],
    expectedDate: new Date(Date.now() + 86400000 * 1).toISOString().split('T')[0], // Amanhã
    status: 'in_transit',
    createdAt: new Date().toISOString()
  },
  {
    id: 'deliv-003',
    productId: 'prod-003', // Golden Gatos
    supplier: 'Distribuidora PetBrasil',
    orderNumber: 'PED-2026-955',
    orderedQuantity: 8,
    receivedQuantity: 0,
    difference: 0,
    orderDate: new Date(Date.now() - 86400000 * 4).toISOString().split('T')[0],
    expectedDate: new Date(Date.now() - 86400000 * 1).toISOString().split('T')[0], // Atrasado há 1 dia!
    status: 'delayed',
    createdAt: new Date().toISOString()
  }
];

const INITIAL_MOVEMENTS = [
  {
    id: 'mov-001',
    productId: 'prod-007',
    productName: 'Tapete Higiênico Chalesco 30 unidades',
    type: 'Transferência Interna',
    quantity: 6,
    origin: 'Depósito (Estoque)',
    destination: 'Loja (Gôndola)',
    prevOriginQty: 24,
    newOriginQty: 18,
    prevDestQty: 0,
    newDestQty: 6,
    notes: 'Reposição inicial de gôndola',
    timestamp: new Date(Date.now() - 3600000 * 10).toISOString()
  },
  {
    id: 'mov-002',
    productId: 'prod-001',
    productName: 'Ração Premier Formula Cães Adultos 15kg',
    type: 'Entrada por Fornecedor',
    quantity: 10,
    origin: 'Fornecedor Distribuidora PetBrasil',
    destination: 'Depósito (Estoque)',
    prevOriginQty: 0,
    newOriginQty: 0,
    prevDestQty: 4,
    newDestQty: 14,
    notes: 'Recebimento NF-e 8812',
    timestamp: new Date(Date.now() - 3600000 * 28).toISOString()
  },
  {
    id: 'mov-003',
    productId: 'prod-008',
    productName: 'Petisco Dreamies Salmão para Gatos 40g',
    type: 'Ajuste de Inventário',
    quantity: 2,
    origin: 'Loja (Gôndola)',
    destination: 'Ajuste de Quebra',
    prevOriginQty: 14,
    newOriginQty: 12,
    prevDestQty: 0,
    newDestQty: 0,
    notes: 'Embalagem perfurada descartada',
    timestamp: new Date(Date.now() - 3600000 * 36).toISOString()
  }
];

const INITIAL_CYCLE_HISTORY = [
  {
    id: 'cycle-hist-1',
    completedAt: new Date(Date.now() - 86400000 * 2).toLocaleDateString('pt-BR') + ' 18:00',
    totalSkus: 12,
    checkedSkus: 12,
    divergentCount: 1,
    accuracyRate: '91.7%'
  },
  {
    id: 'cycle-hist-2',
    completedAt: new Date(Date.now() - 86400000 * 4).toLocaleDateString('pt-BR') + ' 18:00',
    totalSkus: 12,
    checkedSkus: 12,
    divergentCount: 0,
    accuracyRate: '100%'
  }
];

// ============================================================================
// SINTETIZADOR WEB AUDIO - PIANO PETPIANO (PRESERVADO)
// ============================================================================

class PetPianoAudio {
  constructor() {
    this.ctx = null;
    this.soundEnabled = true;
  }

  init() {
    if (!this.ctx) {
      const AudioCtx = window.AudioContext || window.webkitAudioContext;
      if (AudioCtx) this.ctx = new AudioCtx();
    }
    if (this.ctx && this.ctx.state === 'suspended') {
      this.ctx.resume();
    }
  }

  playNote(frequency, duration = 0.45, volume = 0.2) {
    if (!this.soundEnabled) return;
    try {
      this.init();
      if (!this.ctx) return;

      const osc = this.ctx.createOscillator();
      const gainNode = this.ctx.createGain();

      osc.type = 'triangle';
      osc.frequency.setValueAtTime(frequency, this.ctx.currentTime);

      gainNode.gain.setValueAtTime(0.001, this.ctx.currentTime);
      gainNode.gain.exponentialRampToValueAtTime(volume, this.ctx.currentTime + 0.02);
      gainNode.gain.exponentialRampToValueAtTime(0.0001, this.ctx.currentTime + duration);

      osc.connect(gainNode);
      gainNode.connect(this.ctx.destination);

      osc.start();
      osc.stop(this.ctx.currentTime + duration);
    } catch (e) {
      console.warn('Audio note error:', e);
    }
  }

  playStepUp() {
    this.playNote(523.25, 0.18, 0.15); // C5
  }

  playStepDown() {
    this.playNote(440.00, 0.18, 0.15); // A4
  }

  playCheck() {
    this.playNote(523.25, 0.12, 0.15);
    setTimeout(() => this.playNote(783.99, 0.28, 0.2), 80);
  }

  playSuccessChord() {
    const notes = [523.25, 659.25, 783.99, 1046.50];
    notes.forEach((freq, idx) => {
      setTimeout(() => this.playNote(freq, 0.45, 0.2), idx * 70);
    });
  }

  playAlertChord() {
    const notes = [440, 466.16, 440];
    notes.forEach((freq, idx) => {
      setTimeout(() => this.playNote(freq, 0.25, 0.15), idx * 110);
    });
  }
}

const audio = new PetPianoAudio();

// ============================================================================
// CLASSE PRINCIPAL DO SISTEMA: PETPIANO RETAIL ENGINE
// ============================================================================

class PetPianoApp {
  constructor() {
    this.products = [];
    this.deliveries = [];
    this.movements = [];
    this.cycle = null;
    this.cycleHistory = [];
    this.activeTab = 'tab-dashboard';
    
    // Filtros de Estoque
    this.stockFilterSearch = '';
    this.stockFilterCategory = '';
    this.stockFilterStatus = '';
    this.stockSortBy = 'name_asc';

    // Filtros de Contagem
    this.countFilter = 'all';
    this.countSearchTerm = '';
    this.countCategory = '';

    // Filtros de Entregas
    this.deliveryFilterStatus = '';

    this.init();
  }

  init() {
    this.loadState();
    this.setupEventListeners();
    this.startClock();
    this.startCycleTimer();
    this.checkNotificationStatus();
    this.renderAll();
  }

  // ==========================================================================
  // CARREGAMENTO E PERSISTÊNCIA (LOCALSTORAGE)
  // ==========================================================================

  loadState() {
    const savedProducts = localStorage.getItem(STORAGE_KEYS.PRODUCTS);
    this.products = savedProducts ? JSON.parse(savedProducts) : INITIAL_PRODUCTS;

    const savedDeliveries = localStorage.getItem(STORAGE_KEYS.DELIVERIES);
    this.deliveries = savedDeliveries ? JSON.parse(savedDeliveries) : INITIAL_DELIVERIES;

    const savedMovements = localStorage.getItem(STORAGE_KEYS.MOVEMENTS);
    this.movements = savedMovements ? JSON.parse(savedMovements) : INITIAL_MOVEMENTS;

    const savedCycle = localStorage.getItem(STORAGE_KEYS.CYCLE);
    if (savedCycle) {
      this.cycle = JSON.parse(savedCycle);
    } else {
      this.startNewCycle(false);
    }

    const savedHistory = localStorage.getItem(STORAGE_KEYS.CYCLE_HISTORY);
    this.cycleHistory = savedHistory ? JSON.parse(savedHistory) : INITIAL_CYCLE_HISTORY;

    const savedSettings = localStorage.getItem(STORAGE_KEYS.SETTINGS);
    if (savedSettings) {
      const settings = JSON.parse(savedSettings);
      audio.soundEnabled = settings.soundEnabled ?? true;
    }
    this.updateSoundButtonUI();
  }

  saveProducts() {
    localStorage.setItem(STORAGE_KEYS.PRODUCTS, JSON.stringify(this.products));
    this.renderMetricsAndBadges();
  }

  saveDeliveries() {
    localStorage.setItem(STORAGE_KEYS.DELIVERIES, JSON.stringify(this.deliveries));
    this.renderMetricsAndBadges();
  }

  saveMovements() {
    localStorage.setItem(STORAGE_KEYS.MOVEMENTS, JSON.stringify(this.movements));
  }

  saveCycle() {
    localStorage.setItem(STORAGE_KEYS.CYCLE, JSON.stringify(this.cycle));
  }

  saveHistory() {
    localStorage.setItem(STORAGE_KEYS.CYCLE_HISTORY, JSON.stringify(this.cycleHistory));
  }

  saveSettings() {
    localStorage.setItem(STORAGE_KEYS.SETTINGS, JSON.stringify({
      soundEnabled: audio.soundEnabled
    }));
  }

  // Registra movimentação no log de auditoria
  logMovement({ productId, productName, type, quantity, origin, destination, prevOriginQty, newOriginQty, prevDestQty, newDestQty, notes }) {
    const movement = {
      id: 'mov-' + Date.now() + '-' + Math.floor(Math.random() * 1000),
      productId,
      productName,
      type,
      quantity: Number(quantity),
      origin,
      destination,
      prevOriginQty: Number(prevOriginQty || 0),
      newOriginQty: Number(newOriginQty || 0),
      prevDestQty: Number(prevDestQty || 0),
      newDestQty: Number(newDestQty || 0),
      notes: notes || 'Movimentação operacional',
      timestamp: new Date().toISOString()
    };

    this.movements.unshift(movement);
    if (this.movements.length > 200) this.movements.pop(); // Mantém os últimos 200 registros
    this.saveMovements();
    this.renderAuditTable();
    this.renderDashboardRecentMovements();
  }

  // Inicia um novo ciclo de 48 horas
  startNewCycle(showToastNotice = true) {
    const now = new Date();
    const expires = new Date(now.getTime() + (48 * 60 * 60 * 1000));

    this.cycle = {
      id: 'cycle-' + Date.now(),
      startedAt: now.toISOString(),
      expiresAt: expires.toISOString(),
      status: 'active'
    };

    this.products = this.products.map(p => ({
      ...p,
      checkedInCycle: false,
      baselineTotal: (Number(p.qtyLoja) || 0) + (Number(p.qtyEstoque) || 0),
      divergenceReason: ''
    }));

    this.saveCycle();
    this.saveProducts();

    if (showToastNotice) {
      audio.playSuccessChord();
      this.showToast('Novo ciclo de contagem de 48h iniciado!', 'success');
      this.renderAll();
    }
  }

  // ==========================================================================
  // CONFIGURAÇÃO DE LISTENERS & NAVEGAÇÃO
  // ==========================================================================

  setupEventListeners() {
    // Navegação Sidebar
    document.querySelectorAll('.sidebar-nav .nav-item').forEach(btn => {
      btn.addEventListener('click', () => {
        const targetTab = btn.dataset.tab;
        this.switchTab(targetTab);
        this.closeMobileSidebar();
      });
    });

    // Mobile Sidebar Drawer
    const btnMenuMobile = document.getElementById('btnMenuMobile');
    const btnSidebarClose = document.getElementById('btnSidebarClose');
    const backdrop = document.getElementById('sidebarBackdrop');

    if (btnMenuMobile) {
      btnMenuMobile.addEventListener('click', () => this.openMobileSidebar());
    }
    if (btnSidebarClose) {
      btnSidebarClose.addEventListener('click', () => this.closeMobileSidebar());
    }
    if (backdrop) {
      backdrop.addEventListener('click', () => this.closeMobileSidebar());
    }

    // Busca Global no Topbar
    const globalSearch = document.getElementById('globalSearchInput');
    if (globalSearch) {
      globalSearch.addEventListener('input', (e) => {
        const val = e.target.value.toLowerCase().trim();
        if (val) {
          // Se o usuário digitar na busca global, direciona para produtos
          if (this.activeTab !== 'tab-stock' && this.activeTab !== 'tab-count') {
            this.switchTab('tab-stock');
          }
          this.stockFilterSearch = val;
          const stockInput = document.getElementById('stockFilterSearch');
          if (stockInput) stockInput.value = val;
          this.renderStockTable();
        }
      });
    }

    // Botões de Som e Notificações
    const btnSound = document.getElementById('btnSoundToggle');
    if (btnSound) {
      btnSound.addEventListener('click', () => {
        audio.soundEnabled = !audio.soundEnabled;
        this.saveSettings();
        this.updateSoundButtonUI();
        if (audio.soundEnabled) {
          audio.playStepUp();
          this.showToast('Sons operacionais ativados 🎹', 'info');
        } else {
          this.showToast('Sons operacionais silenciados 🔇', 'info');
        }
      });
    }

    const btnNotif = document.getElementById('btnNotificationsPermission');
    if (btnNotif) {
      btnNotif.addEventListener('click', () => this.requestNotificationPermission());
    }

    // Botão Novo Ciclo
    const btnNewCycle = document.getElementById('btnNewCycleTopbar');
    if (btnNewCycle) {
      btnNewCycle.addEventListener('click', () => {
        if (confirm('Deseja iniciar uma nova rodada de 48 horas? Os status de conferência dos produtos voltarão para pendente.')) {
          this.startNewCycle(true);
        }
      });
    }

    // Botão Transferência Rápida no Topbar
    const btnQuickTf = document.getElementById('btnOpenTransferQuick');
    if (btnQuickTf) {
      btnQuickTf.addEventListener('click', () => this.openTransferModal(null));
    }

    // Filtros de Estoque
    const filterSearch = document.getElementById('stockFilterSearch');
    if (filterSearch) {
      filterSearch.addEventListener('input', (e) => {
        this.stockFilterSearch = e.target.value.toLowerCase().trim();
        this.renderStockTable();
      });
    }

    const filterCategory = document.getElementById('stockFilterCategory');
    if (filterCategory) {
      filterCategory.addEventListener('change', (e) => {
        this.stockFilterCategory = e.target.value;
        this.renderStockTable();
      });
    }

    const filterStatus = document.getElementById('stockFilterStatus');
    if (filterStatus) {
      filterStatus.addEventListener('change', (e) => {
        this.stockFilterStatus = e.target.value;
        this.renderStockTable();
      });
    }

    const sortBy = document.getElementById('stockSortBy');
    if (sortBy) {
      sortBy.addEventListener('change', (e) => {
        this.stockSortBy = e.target.value;
        this.renderStockTable();
      });
    }

    // Filtros de Contagem Express
    const countPills = document.getElementById('countPillsContainer');
    if (countPills) {
      countPills.addEventListener('click', (e) => {
        const btn = e.target.closest('.pill-btn');
        if (btn && btn.dataset.filter) {
          countPills.querySelectorAll('.pill-btn').forEach(b => b.classList.remove('active'));
          btn.classList.add('active');
          this.countFilter = btn.dataset.filter;
          this.renderCountCards();
        }
      });
    }

    const countSearch = document.getElementById('countSearchInput');
    if (countSearch) {
      countSearch.addEventListener('input', (e) => {
        this.countSearchTerm = e.target.value.toLowerCase().trim();
        this.renderCountCards();
      });
    }

    const countCat = document.getElementById('countCategoryFilter');
    if (countCat) {
      countCat.addEventListener('change', (e) => {
        this.countCategory = e.target.value;
        this.renderCountCards();
      });
    }

    // Filtro de Entregas
    const delivStatusFilter = document.getElementById('deliveryFilterStatus');
    if (delivStatusFilter) {
      delivStatusFilter.addEventListener('change', (e) => {
        this.deliveryFilterStatus = e.target.value;
        this.renderDeliveries();
      });
    }

    // Ações de Exportação e Impressão
    const btnExpStock = document.getElementById('btnExportStockCSV');
    if (btnExpStock) btnExpStock.addEventListener('click', () => this.exportCSV('stock'));

    const btnExpAudit = document.getElementById('btnExportAuditCSV');
    if (btnExpAudit) btnExpAudit.addEventListener('click', () => this.exportCSV('audit'));

    const btnPrintSheet = document.getElementById('btnPrintCountSheet');
    if (btnPrintSheet) btnPrintSheet.addEventListener('click', () => window.print());

    const btnFinishCycle = document.getElementById('btnFinishCycleModal');
    if (btnFinishCycle) btnFinishCycle.addEventListener('click', () => this.openFinishCycleModal());

    const btnConfirmFinish = document.getElementById('btnConfirmFinishCycle');
    if (btnConfirmFinish) btnConfirmFinish.addEventListener('click', () => this.confirmFinishCycle());

    const btnResetDemo = document.getElementById('btnResetDemoData');
    if (btnResetDemo) {
      btnResetDemo.addEventListener('click', () => {
        if (confirm('Restaurar o catálogo e as movimentações para os dados demonstrativos de varejo do PetPiano?')) {
          localStorage.clear();
          this.loadState();
          this.renderAll();
          this.showToast('Dados demonstrativos restaurados com sucesso!', 'info');
        }
      });
    }

    // Configuração dos Modais e Formulários
    this.setupModalsAndForms();
  }

  openMobileSidebar() {
    const sidebar = document.getElementById('appSidebar');
    const backdrop = document.getElementById('sidebarBackdrop');
    if (sidebar) sidebar.classList.add('open');
    if (backdrop) backdrop.classList.add('open');
  }

  closeMobileSidebar() {
    const sidebar = document.getElementById('appSidebar');
    const backdrop = document.getElementById('sidebarBackdrop');
    if (sidebar) sidebar.classList.remove('open');
    if (backdrop) backdrop.classList.remove('open');
  }

  switchTab(tabId) {
    document.querySelectorAll('.sidebar-nav .nav-item').forEach(btn => {
      btn.classList.toggle('active', btn.dataset.tab === tabId);
    });

    document.querySelectorAll('.view-panel').forEach(panel => {
      panel.classList.toggle('active', panel.id === tabId);
    });

    this.activeTab = tabId;

    if (tabId === 'tab-dashboard') this.renderDashboard();
    else if (tabId === 'tab-stock') this.renderStockTable();
    else if (tabId === 'tab-count') this.renderCountCards();
    else if (tabId === 'tab-transfer') this.renderTransferView();
    else if (tabId === 'tab-deliveries') this.renderDeliveries();
    else if (tabId === 'tab-alerts') this.renderAlerts();
    else if (tabId === 'tab-audit') this.renderAuditTable();
    else if (tabId === 'tab-ecommerce') this.renderEcommerceCatalog();

    window.scrollTo({ top: 0, behavior: 'smooth' });
  }

  updateSoundButtonUI() {
    const icon = document.getElementById('soundIcon');
    if (icon) {
      icon.textContent = audio.soundEnabled ? '🔊' : '🔇';
    }
  }

  startClock() {
    const update = () => {
      const el = document.getElementById('dashboardClock');
      if (el) {
        const now = new Date();
        el.textContent = now.toLocaleDateString('pt-BR', { weekday: 'short', day: '2-digit', month: '2-digit' }) + ' • ' + now.toLocaleTimeString('pt-BR', { hour: '2-digit', minute: '2-digit' });
      }
    };
    update();
    setInterval(update, 10000);
  }

  startCycleTimer() {
    const update = () => {
      if (!this.cycle) return;
      const now = new Date();
      const expires = new Date(this.cycle.expiresAt);
      const diffMs = expires.getTime() - now.getTime();

      const hoursLeft = Math.max(0, Math.floor(diffMs / (1000 * 60 * 60)));
      const minutesLeft = Math.max(0, Math.floor((diffMs % (1000 * 60 * 60)) / (1000 * 60)));

      const sidebarHours = document.getElementById('sidebarCycleHours');
      const countTimer = document.getElementById('countCycleTimerText');
      const topbarLabel = document.getElementById('topbarCycleLabel');

      if (diffMs <= 0) {
        if (sidebarHours) sidebarHours.textContent = 'Expirado';
        if (countTimer) countTimer.textContent = 'Ciclo de 48h expirou. Conclua para registrar histórico.';
        if (topbarLabel) topbarLabel.textContent = 'Ciclo 48h finalizado (Aguardando encerramento)';
      } else {
        const txt = `${hoursLeft}h ${minutesLeft}m restantes`;
        if (sidebarHours) sidebarHours.textContent = `${hoursLeft}h rest.`;
        if (countTimer) countTimer.textContent = `Prazo do ciclo: ${txt}`;
        if (topbarLabel) topbarLabel.textContent = `Ciclo 48h ativo (${hoursLeft}h restantes)`;
      }
    };

    update();
    setInterval(update, 30000);
  }

  // ==========================================================================
  // CONFIGURAÇÃO DE MODAIS (<dialog>) E FORMULÁRIOS
  // ==========================================================================

  setupModalsAndForms() {
    // Fechamento genérico de botões com data-close-dialog
    document.querySelectorAll('[data-close-dialog]').forEach(btn => {
      btn.addEventListener('click', () => {
        const dialogId = btn.dataset.closeDialog;
        const dialog = document.getElementById(dialogId);
        if (dialog) dialog.close();
      });
    });

    // Form de Produto
    const formProduct = document.getElementById('formProduct');
    if (formProduct) {
      formProduct.addEventListener('submit', (e) => {
        e.preventDefault();
        this.saveProductForm();
      });
    }

    // Form de Ajuste de Saldo
    const formAdjust = document.getElementById('formAdjustQuantity');
    if (formAdjust) {
      formAdjust.addEventListener('submit', (e) => {
        e.preventDefault();
        this.saveQuantityAdjustment();
      });
    }

    // Steppers de Ajuste (+1, -1, +5, -5)
    document.querySelectorAll('.btn-step').forEach(btn => {
      btn.addEventListener('click', () => {
        const targetId = btn.dataset.stepTarget;
        const step = parseInt(btn.dataset.step, 10);
        const input = document.getElementById(targetId);
        if (input) {
          const cur = parseInt(input.value, 10) || 0;
          input.value = Math.max(0, cur + step);
          if (step > 0) audio.playStepUp();
          else audio.playStepDown();
        }
      });
    });

    // Form de Transferência Direta (Aba de Transferência)
    const formTfDirect = document.getElementById('formTransferDirect');
    if (formTfDirect) {
      formTfDirect.addEventListener('submit', (e) => {
        e.preventDefault();
        this.saveDirectTransfer();
      });
    }

    // Listener de Mudança no Select de Produto ou Sentido de Transferência
    const tfProdSelect = document.getElementById('tfProductSelect');
    const tfDirSelect = document.getElementById('tfDirection');
    const tfQtyInput = document.getElementById('tfQuantity');

    if (tfProdSelect) tfProdSelect.addEventListener('change', () => this.updateTransferPreview());
    if (tfDirSelect) tfDirSelect.addEventListener('change', () => this.updateTransferPreview());
    if (tfQtyInput) tfQtyInput.addEventListener('input', () => this.updateTransferPreview());

    // Form de Transferência Modal
    const formTfModal = document.getElementById('formTransferStockModal');
    if (formTfModal) {
      formTfModal.addEventListener('submit', (e) => {
        e.preventDefault();
        this.saveModalTransfer();
      });
    }

    const modalTfDir = document.getElementById('modalTfDirection');
    const modalTfQty = document.getElementById('modalTfQuantity');
    if (modalTfDir) modalTfDir.addEventListener('change', () => this.updateModalTransferPreview());
    if (modalTfQty) modalTfQty.addEventListener('input', () => this.updateModalTransferPreview());

    // Form de Nova Entrega
    const formNewDelivery = document.getElementById('formNewDelivery');
    if (formNewDelivery) {
      formNewDelivery.addEventListener('submit', (e) => {
        e.preventDefault();
        this.saveNewDelivery();
      });
    }

    // Form de Recebimento de Entrega com Validação
    const formRcvDelivery = document.getElementById('formReceiveDelivery');
    if (formRcvDelivery) {
      formRcvDelivery.addEventListener('submit', (e) => {
        e.preventDefault();
        this.confirmReceiveDelivery();
      });
    }

    const rcvQtyInput = document.getElementById('rcvQuantityInput');
    if (rcvQtyInput) {
      rcvQtyInput.addEventListener('input', () => this.updateReceiveDifferenceHint());
    }
  }

  // ==========================================================================
  // RENDERIZAÇÃO GERAL E MÉTRICAS
  // ==========================================================================

  renderAll() {
    this.renderMetricsAndBadges();
    this.renderDashboard();
    this.renderStockTable();
    this.renderCountCards();
    this.renderTransferView();
    this.renderDeliveries();
    this.renderAlerts();
    this.renderAuditTable();
    this.renderEcommerceCatalog();
  }

  // Atualiza indicadores métricos no Dashboard, Sidebar e Topbar
  renderMetricsAndBadges() {
    let totalLoja = 0;
    let totalEstoque = 0;
    let criticalCount = 0;
    let belowMinCount = 0;
    let checkedCount = 0;

    const totalSkus = this.products.length;

    this.products.forEach(p => {
      const qLoja = Number(p.qtyLoja) || 0;
      const qEstoque = Number(p.qtyEstoque) || 0;
      const total = qLoja + qEstoque;
      const min = Number(p.minStock) || 0;

      totalLoja += qLoja;
      totalEstoque += qEstoque;

      if (total <= min) {
        belowMinCount++;
      }

      if (total <= Math.ceil(min / 2) || total === 0) {
        criticalCount++;
      }

      if (p.checkedInCycle) {
        checkedCount++;
      }
    });

    const pendingCount = totalSkus - checkedCount;
    const progressPercent = totalSkus > 0 ? Math.round((checkedCount / totalSkus) * 100) : 0;

    const divergentItems = this.products.filter(p => {
      const curTotal = (Number(p.qtyLoja) || 0) + (Number(p.qtyEstoque) || 0);
      return p.checkedInCycle && curTotal !== p.baselineTotal;
    });

    const accuracyRate = checkedCount > 0
      ? Math.round(((checkedCount - divergentItems.length) / checkedCount) * 100)
      : 100;

    const inTransitDeliveries = this.deliveries.filter(d => d.status === 'in_transit' || d.status === 'today' || d.status === 'delayed').length;

    // Métricas do Dashboard Principal
    const elDashTotal = document.getElementById('dashTotalSkus');
    const elDashLoja = document.getElementById('dashTotalLoja');
    const elDashEstoque = document.getElementById('dashTotalEstoque');
    const elDashCritical = document.getElementById('dashCriticalSkus');
    const elDashCriticalSub = document.getElementById('dashCriticalSub');
    const elDashBelowMin = document.getElementById('dashBelowMinSkus');
    const elDashPending = document.getElementById('dashPendingCount');
    const elDashPendingSub = document.getElementById('dashPendingSub');
    const elDashDeliv = document.getElementById('dashDeliveriesCount');
    const elDashDelivSub = document.getElementById('dashDeliveriesSub');
    const elDashDivergent = document.getElementById('dashDivergenceCount');
    const elDashAccuracySub = document.getElementById('dashAccuracySub');

    if (elDashTotal) elDashTotal.textContent = totalSkus;
    if (elDashLoja) elDashLoja.textContent = totalLoja;
    if (elDashEstoque) elDashEstoque.textContent = totalEstoque;
    if (elDashCritical) elDashCritical.textContent = criticalCount;
    if (elDashCriticalSub) elDashCriticalSub.textContent = `${criticalCount} itens em risco iminente de falta`;
    if (elDashBelowMin) elDashBelowMin.textContent = belowMinCount;
    if (elDashPending) elDashPending.textContent = pendingCount;
    if (elDashPendingSub) elDashPendingSub.textContent = `${checkedCount} de ${totalSkus} itens auditados (${progressPercent}%)`;
    if (elDashDeliv) elDashDeliv.textContent = inTransitDeliveries;
    if (elDashDelivSub) elDashDelivSub.textContent = `${inTransitDeliveries} remessas a caminho`;
    if (elDashDivergent) elDashDivergent.textContent = divergentItems.length;
    if (elDashAccuracySub) elDashAccuracySub.textContent = `Acurácia da rodada: ${accuracyRate}%`;

    // Badges da Sidebar
    const bTotal = document.getElementById('badgeTotalSkus');
    const bPending = document.getElementById('badgePendingCount');
    const bDeliv = document.getElementById('badgeDeliveriesActive');
    const bAlerts = document.getElementById('badgeCriticalAlerts');

    if (bTotal) bTotal.textContent = totalSkus;
    if (bPending) bPending.textContent = pendingCount;
    if (bDeliv) bDeliv.textContent = inTransitDeliveries;
    if (bAlerts) bAlerts.textContent = criticalCount;

    // Mini Widget do Ciclo na Sidebar
    const sBar = document.getElementById('sidebarCycleBar');
    const sText = document.getElementById('sidebarCycleText');
    if (sBar) sBar.style.width = `${progressPercent}%`;
    if (sText) sText.textContent = `${checkedCount} de ${totalSkus} conferidos (${progressPercent}%)`;

    // Banner da Aba de Contagem
    const cBar = document.getElementById('countCycleProgressBar');
    const cItemsRatio = document.getElementById('countCycleItemsRatio');
    const cPercent = document.getElementById('countCyclePercent');
    const cDivergences = document.getElementById('countCycleDivergences');
    const cAccuracy = document.getElementById('countCycleAccuracy');

    if (cBar) cBar.style.width = `${progressPercent}%`;
    if (cItemsRatio) cItemsRatio.textContent = `${checkedCount} de ${totalSkus} itens conferidos`;
    if (cPercent) cPercent.textContent = `${progressPercent}%`;
    if (cDivergences) cDivergences.textContent = divergentItems.length;
    if (cAccuracy) cAccuracy.textContent = `${accuracyRate}%`;

    // Pills da Contagem
    const pillAll = document.getElementById('pillCountAll');
    const pillPend = document.getElementById('pillCountPending');
    const pillCheck = document.getElementById('pillCountChecked');
    const pillDiv = document.getElementById('pillCountDivergent');
    const pillCrit = document.getElementById('pillCountCritical');

    if (pillAll) pillAll.textContent = totalSkus;
    if (pillPend) pillPend.textContent = pendingCount;
    if (pillCheck) pillCheck.textContent = checkedCount;
    if (pillDiv) pillDiv.textContent = divergentItems.length;
    if (pillCrit) pillCrit.textContent = criticalCount;
  }

  // ==========================================================================
  // SEÇÃO 1: DASHBOARD OPERACIONAL & PRIORIDADES
  // ==========================================================================

  renderDashboard() {
    this.renderDashboardPriorities();
    this.renderDashboardRecentMovements();
    this.renderDashboardUpcomingDeliveries();
  }

  // Renderiza a área de prioridades com ações claras e ordenadas por urgência
  renderDashboardPriorities() {
    const container = document.getElementById('dashboardPrioritiesGrid');
    if (!container) return;

    const criticalItems = this.products.filter(p => {
      const total = (Number(p.qtyLoja) || 0) + (Number(p.qtyEstoque) || 0);
      return total <= Math.ceil((Number(p.minStock) || 0) / 2) || total === 0;
    });

    const pendingItems = this.products.filter(p => !p.checkedInCycle);
    const activeDeliveries = this.deliveries.filter(d => d.status === 'in_transit' || d.status === 'today' || d.status === 'delayed');
    const delayedDeliveries = this.deliveries.filter(d => d.status === 'delayed');

    const priorities = [
      {
        urgency: criticalItems.length > 0 ? 'high' : 'normal',
        icon: '🚨',
        title: `${criticalItems.length} Produtos em Risco de Ruptura`,
        desc: criticalItems.length > 0
          ? `Itens como "${criticalItems[0].name}" estão esgotados ou próximos do fim.`
          : 'Nenhum produto em nível crítico no momento.',
        actionLabel: 'Ver Produtos Críticos',
        actionFn: "app.switchTab('tab-alerts')"
      },
      {
        urgency: pendingItems.length > 0 ? 'high' : 'normal',
        icon: '⏱️',
        title: `${pendingItems.length} Itens Pendentes no Ciclo 48h`,
        desc: pendingItems.length > 0
          ? 'Conferência física obrigatória a cada 2 dias para manter a acurácia.'
          : 'Parabéns! Todos os produtos foram auditados nesta rodada.',
        actionLabel: 'Conferir Produtos Pendentes',
        actionFn: "app.filterCount('pending')"
      },
      {
        urgency: delayedDeliveries.length > 0 ? 'high' : 'normal',
        icon: '🚚',
        title: `${activeDeliveries.length} Entregas Previstas`,
        desc: delayedDeliveries.length > 0
          ? `Atenção: ${delayedDeliveries.length} pedido(s) constam como atrasados.`
          : 'Acompanhe as datas estimadas de chegada dos fornecedores.',
        actionLabel: 'Verificar Entregas & Pedidos',
        actionFn: "app.switchTab('tab-deliveries')"
      },
      {
        urgency: 'normal',
        icon: '🔄',
        title: 'Reposição de Gôndola',
        desc: 'Transfira caixas do depósito para a frente de loja para evitar prateleira vazia.',
        actionLabel: 'Fazer Transferência Interna',
        actionFn: "app.switchTab('tab-transfer')"
      }
    ];

    container.innerHTML = priorities.map(item => `
      <div class="priority-action-card">
        <div class="priority-card-top">
          <span class="priority-icon">${item.icon}</span>
          <div>
            <h4 class="priority-card-title">${item.title}</h4>
            <p class="priority-card-desc">${item.desc}</p>
          </div>
        </div>
        <button class="btn btn-sm ${item.urgency === 'high' ? 'btn-primary' : 'btn-outline'}" onclick="${item.actionFn}">
          ${item.actionLabel} →
        </button>
      </div>
    `).join('');
  }

  filterCount(filterMode) {
    this.switchTab('tab-count');
    const pills = document.getElementById('countPillsContainer');
    if (pills) {
      const btn = pills.querySelector(`[data-filter="${filterMode}"]`);
      if (btn) btn.click();
    }
  }

  renderDashboardRecentMovements() {
    const tbody = document.getElementById('dashRecentMovementsBody');
    if (!tbody) return;

    const recent = this.movements.slice(0, 5);
    if (recent.length === 0) {
      tbody.innerHTML = `<tr><td colspan="4" class="text-muted" style="text-align: center; padding: 1.5rem;">Nenhuma movimentação registrada recentemente.</td></tr>`;
      return;
    }

    tbody.innerHTML = recent.map(m => `
      <tr>
        <td><strong>${m.productName}</strong></td>
        <td><span class="badge-tag badge-tag-forest">${m.type}</span></td>
        <td class="td-num font-mono"><strong>${m.quantity > 0 ? '+' : ''}${m.quantity}</strong> un</td>
        <td class="text-secondary">${new Date(m.timestamp).toLocaleDateString('pt-BR')} ${new Date(m.timestamp).toLocaleTimeString('pt-BR', { hour: '2-digit', minute: '2-digit' })}</td>
      </tr>
    `).join('');
  }

  renderDashboardUpcomingDeliveries() {
    const container = document.getElementById('dashUpcomingDeliveriesList');
    if (!container) return;

    const active = this.deliveries.filter(d => d.status !== 'delivered').slice(0, 4);
    if (active.length === 0) {
      container.innerHTML = `<div class="text-muted" style="text-align: center; padding: 1.5rem;">Nenhuma entrega pendente no momento.</div>`;
      return;
    }

    container.innerHTML = active.map(d => {
      const prod = this.products.find(p => p.id === d.productId) || { name: 'Item Encomendado' };
      const daysLeft = this.calculateDaysLeft(d.expectedDate);

      return `
        <div class="delivery-quick-item">
          <div>
            <div style="font-weight: 700; font-size: 0.85rem;">${prod.name}</div>
            <div style="font-size: 0.72rem; color: var(--color-text-secondary);">${d.supplier} • ${d.orderedQuantity} un</div>
          </div>
          <div style="text-align: right;">
            <span class="badge-tag ${d.status === 'delayed' ? 'badge-tag-danger' : 'badge-tag-forest'}">${daysLeft}</span>
            <div style="font-size: 0.68rem; color: var(--color-text-muted); margin-top: 0.15rem;">${this.formatDate(d.expectedDate)}</div>
          </div>
        </div>
      `;
    }).join('');
  }

  // ==========================================================================
  // SEÇÃO 2: GESTÃO DE PRODUTOS & VOLUMES (TABELA OPERACIONAL)
  // ==========================================================================

  renderStockTable() {
    const tbody = document.getElementById('stockTableBody');
    if (!tbody) return;

    let items = [...this.products];

    // Filtro por texto
    if (this.stockFilterSearch) {
      const q = this.stockFilterSearch;
      items = items.filter(p => 
        p.name.toLowerCase().includes(q) ||
        (p.sku || '').toLowerCase().includes(q) ||
        (p.supplier || '').toLowerCase().includes(q) ||
        (p.brand || '').toLowerCase().includes(q)
      );
    }

    // Filtro por Categoria
    if (this.stockFilterCategory) {
      items = items.filter(p => p.category === this.stockFilterCategory);
    }

    // Filtro por Situação de Estoque
    if (this.stockFilterStatus) {
      items = items.filter(p => {
        const total = (Number(p.qtyLoja) || 0) + (Number(p.qtyEstoque) || 0);
        const min = Number(p.minStock) || 0;
        if (this.stockFilterStatus === 'healthy') return total > min;
        if (this.stockFilterStatus === 'low') return total <= min && total > Math.ceil(min / 2);
        if (this.stockFilterStatus === 'critical') return total <= Math.ceil(min / 2) && total > 0;
        if (this.stockFilterStatus === 'zero') return total === 0;
        return true;
      });
    }

    // Ordenação
    items.sort((a, b) => {
      const totA = (Number(a.qtyLoja) || 0) + (Number(a.qtyEstoque) || 0);
      const totB = (Number(b.qtyLoja) || 0) + (Number(b.qtyEstoque) || 0);
      const minA = Number(a.minStock) || 0;
      const minB = Number(b.minStock) || 0;

      if (this.stockSortBy === 'name_asc') return a.name.localeCompare(b.name);
      if (this.stockSortBy === 'total_asc') return totA - totB;
      if (this.stockSortBy === 'total_desc') return totB - totA;
      if (this.stockSortBy === 'last_count') return new Date(b.lastCountAt || 0) - new Date(a.lastCountAt || 0);
      if (this.stockSortBy === 'status_urgency') {
        const critA = totA <= Math.ceil(minA / 2) ? 2 : totA <= minA ? 1 : 0;
        const critB = totB <= Math.ceil(minB / 2) ? 2 : totB <= minB ? 1 : 0;
        return critB - critA;
      }
      return 0;
    });

    if (items.length === 0) {
      tbody.innerHTML = `
        <tr>
          <td colspan="9" style="text-align: center; padding: 2.5rem; color: var(--color-text-secondary);">
            Nenhum produto corresponde aos filtros informados.
          </td>
        </tr>
      `;
      return;
    }

    tbody.innerHTML = items.map(p => {
      const qLoja = Number(p.qtyLoja) || 0;
      const qEstoque = Number(p.qtyEstoque) || 0;
      const total = qLoja + qEstoque;
      const min = Number(p.minStock) || 0;

      let statusBadge = '<span class="badge-tag badge-tag-healthy">🟢 Saudável</span>';
      if (total === 0) {
        statusBadge = '<span class="badge-tag badge-tag-danger">⚫ Zerado</span>';
      } else if (total <= Math.ceil(min / 2)) {
        statusBadge = '<span class="badge-tag badge-tag-danger">🔴 Crítico</span>';
      } else if (total <= min) {
        statusBadge = '<span class="badge-tag badge-tag-warning">🟡 Abaixo do Mín.</span>';
      }

      return `
        <tr>
          <td>
            <div class="product-meta-cell">
              <span class="prod-main-name">${p.name}</span>
              <span class="prod-sub-meta">${p.brand || ''} • SKU: ${p.sku || '--'}</span>
            </div>
          </td>
          <td><span style="font-size: 0.8rem; color: var(--color-text-secondary);">${p.category}</span></td>
          <td class="td-num"><span class="vol-badge vol-loja">${qLoja}</span></td>
          <td class="td-num"><span class="vol-badge vol-deposito">${qEstoque}</span></td>
          <td class="td-num">
            <span class="vol-badge ${total <= min ? 'vol-total-danger' : 'vol-total-healthy'}">${total}</span>
          </td>
          <td class="td-num font-mono text-muted">${min}</td>
          <td>${statusBadge}</td>
          <td style="font-size: 0.78rem; color: var(--color-text-secondary);">${this.formatLastCount(p.lastCountAt)}</td>
          <td class="td-actions">
            <button class="btn btn-xs btn-outline" onclick="app.openTransferModal('${p.id}')" title="Transferência de saldo entre Loja e Depósito">
              Transferir
            </button>
            <button class="btn btn-xs btn-outline" onclick="app.openAdjustModal('${p.id}')" title="Ajuste fino de saldo físico e estoque mínimo">
              Ajustar
            </button>
            <button class="btn btn-xs btn-ghost" onclick="app.openProductModal('${p.id}')" title="Editar dados cadastrais">
              ✏️
            </button>
          </td>
        </tr>
      `;
    }).join('');
  }

  // ==========================================================================
  // SEÇÃO 3: CONTAGEM EXPRESSA (CICLO DE 48 HORAS)
  // ==========================================================================

  renderCountCards() {
    const container = document.getElementById('countCardsContainer');
    const emptyState = document.getElementById('countEmptyState');
    if (!container) return;

    let items = [...this.products];

    // Filtro por busca
    if (this.countSearchTerm) {
      const q = this.countSearchTerm;
      items = items.filter(p => 
        p.name.toLowerCase().includes(q) ||
        (p.sku || '').toLowerCase().includes(q) ||
        (p.brand || '').toLowerCase().includes(q)
      );
    }

    // Filtro por Categoria
    if (this.countCategory) {
      items = items.filter(p => p.category === this.countCategory);
    }

    // Filtros de status do ciclo
    if (this.countFilter === 'pending') {
      items = items.filter(p => !p.checkedInCycle);
    } else if (this.countFilter === 'checked') {
      items = items.filter(p => p.checkedInCycle);
    } else if (this.countFilter === 'divergent') {
      items = items.filter(p => {
        const cur = (Number(p.qtyLoja) || 0) + (Number(p.qtyEstoque) || 0);
        return p.checkedInCycle && cur !== p.baselineTotal;
      });
    } else if (this.countFilter === 'critical') {
      items = items.filter(p => {
        const cur = (Number(p.qtyLoja) || 0) + (Number(p.qtyEstoque) || 0);
        return cur <= Math.ceil((Number(p.minStock) || 0) / 2) || cur === 0;
      });
    }

    if (items.length === 0) {
      container.innerHTML = '';
      if (emptyState) emptyState.style.display = 'block';
      return;
    }

    if (emptyState) emptyState.style.display = 'none';

    container.innerHTML = items.map(p => {
      const qLoja = Number(p.qtyLoja) || 0;
      const qEstoque = Number(p.qtyEstoque) || 0;
      const total = qLoja + qEstoque;
      const isDivergent = p.checkedInCycle && total !== p.baselineTotal;
      const diff = total - p.baselineTotal;

      let cardClass = 'count-card';
      if (p.checkedInCycle) cardClass += ' is-checked';
      if (isDivergent) cardClass += ' is-divergent';

      return `
        <div class="${cardClass}">
          <div class="count-card-header">
            <div>
              <span class="badge-tag badge-tag-forest">${p.category}</span>
              <h3 class="count-card-name" style="margin-top: 0.35rem;">${p.name}</h3>
              <div class="count-card-meta">${p.brand || ''} • SKU: ${p.sku || '--'}</div>
            </div>
            <div>
              ${p.checkedInCycle 
                ? '<span class="badge-tag badge-tag-healthy">✓ Conferido</span>' 
                : '<span class="badge-tag badge-tag-warning">⏳ Pendente</span>'}
            </div>
          </div>

          <div class="count-zones-split">
            <!-- Zona Frente de Loja -->
            <div class="count-zone-box">
              <span class="zone-tag-title">Loja (Gôndola)</span>
              <div class="zone-counter-stepper">
                <button type="button" class="btn-count-adjust" onclick="app.adjustCount('${p.id}', 'loja', -1)">-1</button>
                <input type="number" class="count-qty-input" value="${qLoja}" min="0" onchange="app.setCountDirect('${p.id}', 'loja', this.value)">
                <button type="button" class="btn-count-adjust" onclick="app.adjustCount('${p.id}', 'loja', 1)">+1</button>
              </div>
              <div class="count-quick-row">
                <button type="button" class="btn-quick-step" onclick="app.adjustCount('${p.id}', 'loja', 5)">+5</button>
                <button type="button" class="btn-quick-step" onclick="app.adjustCount('${p.id}', 'loja', 10)">+10</button>
              </div>
            </div>

            <!-- Zona Depósito -->
            <div class="count-zone-box">
              <span class="zone-tag-title">Depósito</span>
              <div class="zone-counter-stepper">
                <button type="button" class="btn-count-adjust" onclick="app.adjustCount('${p.id}', 'estoque', -1)">-1</button>
                <input type="number" class="count-qty-input" value="${qEstoque}" min="0" onchange="app.setCountDirect('${p.id}', 'estoque', this.value)">
                <button type="button" class="btn-count-adjust" onclick="app.adjustCount('${p.id}', 'estoque', 1)">+1</button>
              </div>
              <div class="count-quick-row">
                <button type="button" class="btn-quick-step" onclick="app.adjustCount('${p.id}', 'estoque', 5)">+5</button>
                <button type="button" class="btn-quick-step" onclick="app.adjustCount('${p.id}', 'estoque', 10)">+10</button>
              </div>
            </div>
          </div>

          <div class="count-card-footer">
            <div>
              <div style="font-weight: 700; font-family: var(--font-mono);">
                Total Físico: ${total} un (Mín: ${p.minStock})
              </div>
              ${isDivergent ? `
                <div class="count-diff-badge">
                  Divergência: ${diff > 0 ? '+' + diff : diff} un vs início
                </div>
              ` : `
                <div style="color: var(--color-text-secondary); font-size: 0.7rem;">
                  ${this.formatLastCount(p.lastCountAt)}
                </div>
              `}
            </div>

            <div style="display: flex; gap: 0.35rem;">
              <button class="btn btn-xs btn-outline" onclick="app.openAdjustModal('${p.id}')" title="Ajustar com justificativa">
                ⚙️
              </button>
              <button class="btn btn-xs ${p.checkedInCycle ? 'btn-outline' : 'btn-primary'}" onclick="app.toggleCheckItem('${p.id}')">
                ${p.checkedInCycle ? 'Reabrir' : '✓ Conferir'}
              </button>
            </div>
          </div>
        </div>
      `;
    }).join('');
  }

  adjustCount(productId, zone, delta) {
    const p = this.products.find(item => item.id === productId);
    if (!p) return;

    const oldTotal = (Number(p.qtyLoja) || 0) + (Number(p.qtyEstoque) || 0);

    if (zone === 'loja') {
      p.qtyLoja = Math.max(0, (Number(p.qtyLoja) || 0) + delta);
    } else {
      p.qtyEstoque = Math.max(0, (Number(p.qtyEstoque) || 0) + delta);
    }

    const newTotal = (Number(p.qtyLoja) || 0) + (Number(p.qtyEstoque) || 0);
    p.lastCountAt = new Date().toISOString();
    p.checkedInCycle = true;

    if (delta > 0) audio.playStepUp();
    else audio.playStepDown();

    // Se houve divergência no total, registra no histórico
    if (newTotal !== oldTotal) {
      this.logMovement({
        productId: p.id,
        productName: p.name,
        type: 'Contagem Física (48h)',
        quantity: delta,
        origin: zone === 'loja' ? 'Loja' : 'Depósito',
        destination: 'Conferência Física',
        prevOriginQty: oldTotal,
        newOriginQty: newTotal,
        notes: `Ajuste rápido de ${delta > 0 ? '+' : ''}${delta} na contagem física`
      });
    }

    this.checkStockWarning(p);
    this.saveProducts();
    this.renderMetricsAndBadges();
    this.renderCountCards();
    this.renderStockTable();
  }

  setCountDirect(productId, zone, val) {
    const p = this.products.find(item => item.id === productId);
    if (!p) return;

    const num = Math.max(0, parseInt(val, 10) || 0);
    const oldQty = zone === 'loja' ? (Number(p.qtyLoja) || 0) : (Number(p.qtyEstoque) || 0);

    if (zone === 'loja') p.qtyLoja = num;
    else p.qtyEstoque = num;

    p.lastCountAt = new Date().toISOString();
    p.checkedInCycle = true;

    audio.playStepUp();

    if (num !== oldQty) {
      this.logMovement({
        productId: p.id,
        productName: p.name,
        type: 'Contagem Física (48h)',
        quantity: num - oldQty,
        origin: zone === 'loja' ? 'Loja' : 'Depósito',
        destination: 'Conferência Direta',
        prevOriginQty: oldQty,
        newOriginQty: num,
        notes: `Conferência digitada diretamente: de ${oldQty} para ${num}`
      });
    }

    this.checkStockWarning(p);
    this.saveProducts();
    this.renderMetricsAndBadges();
    this.renderCountCards();
    this.renderStockTable();
  }

  toggleCheckItem(productId) {
    const p = this.products.find(item => item.id === productId);
    if (!p) return;

    p.checkedInCycle = !p.checkedInCycle;
    p.lastCountAt = new Date().toISOString();

    if (p.checkedInCycle) {
      audio.playCheck();
      this.showToast(`"${p.name}" conferido na rodada atual!`, 'success');
    } else {
      audio.playStepDown();
    }

    this.saveProducts();
    this.renderMetricsAndBadges();
    this.renderCountCards();
    this.renderStockTable();
  }

  openFinishCycleModal() {
    const dialog = document.getElementById('modalFinishCycle');
    if (!dialog) return;

    const total = this.products.length;
    const checked = this.products.filter(p => p.checkedInCycle).length;
    const divergent = this.products.filter(p => {
      const cur = (Number(p.qtyLoja) || 0) + (Number(p.qtyEstoque) || 0);
      return p.checkedInCycle && cur !== p.baselineTotal;
    }).length;

    const accuracy = checked > 0 ? Math.round(((checked - divergent) / checked) * 100) : 100;

    document.getElementById('finishTotalSkus').textContent = total;
    document.getElementById('finishCheckedSkus').textContent = checked;
    document.getElementById('finishDivergentSkus').textContent = divergent;
    document.getElementById('finishAccuracyRate').textContent = `${accuracy}%`;

    dialog.showModal();
  }

  confirmFinishCycle() {
    const dialog = document.getElementById('modalFinishCycle');
    if (dialog) dialog.close();

    const total = this.products.length;
    const checked = this.products.filter(p => p.checkedInCycle).length;
    const divergent = this.products.filter(p => {
      const cur = (Number(p.qtyLoja) || 0) + (Number(p.qtyEstoque) || 0);
      return p.checkedInCycle && cur !== p.baselineTotal;
    }).length;
    const accuracy = checked > 0 ? Math.round(((checked - divergent) / checked) * 100) : 100;

    // Arquiva no histórico
    this.cycleHistory.unshift({
      id: 'cycle-hist-' + Date.now(),
      completedAt: new Date().toLocaleDateString('pt-BR') + ' ' + new Date().toLocaleTimeString('pt-BR', { hour: '2-digit', minute: '2-digit' }),
      totalSkus: total,
      checkedSkus: checked,
      divergentCount: divergent,
      accuracyRate: `${accuracy}%`
    });

    this.saveHistory();
    this.startNewCycle(false);
    audio.playSuccessChord();
    this.showToast('Ciclo de 48h arquivado no histórico com sucesso!', 'success');
    this.renderAll();
  }

  // ==========================================================================
  // SEÇÃO 4: TRANSFERÊNCIA ENTRE LOJA E DEPÓSITO (BIDIRECIONAL & AUDITADA)
  // ==========================================================================

  renderTransferView() {
    const select = document.getElementById('tfProductSelect');
    if (select) {
      select.innerHTML = this.products.map(p => `
        <option value="${p.id}">
          ${p.name} (Loja: ${p.qtyLoja} un | Depósito: ${p.qtyEstoque} un)
        </option>
      `).join('');
    }

    this.updateTransferPreview();
    this.renderRepositionSuggestions();
  }

  updateTransferPreview() {
    const prodId = document.getElementById('tfProductSelect')?.value;
    const dir = document.getElementById('tfDirection')?.value;
    const qtyInput = document.getElementById('tfQuantity');
    const qty = Math.max(1, parseInt(qtyInput?.value, 10) || 1);

    const p = this.products.find(item => item.id === prodId);
    if (!p) return;

    const originName = document.getElementById('tfOriginName');
    const destName = document.getElementById('tfDestName');
    const originBefore = document.getElementById('tfOriginBefore');
    const originAfter = document.getElementById('tfOriginAfter');
    const destBefore = document.getElementById('tfDestBefore');
    const destAfter = document.getElementById('tfDestAfter');

    if (dir === 'deposito_para_loja') {
      if (originName) originName.textContent = 'Depósito';
      if (destName) destName.textContent = 'Frente de Loja';
      const curOrigin = Number(p.qtyEstoque) || 0;
      const curDest = Number(p.qtyLoja) || 0;

      if (originBefore) originBefore.textContent = curOrigin;
      if (destBefore) destBefore.textContent = curDest;

      const newOrigin = Math.max(0, curOrigin - qty);
      const newDest = curDest + (curOrigin >= qty ? qty : 0);

      if (originAfter) originAfter.textContent = newOrigin;
      if (destAfter) destAfter.textContent = newDest;
    } else {
      if (originName) originName.textContent = 'Frente de Loja';
      if (destName) destName.textContent = 'Depósito';
      const curOrigin = Number(p.qtyLoja) || 0;
      const curDest = Number(p.qtyEstoque) || 0;

      if (originBefore) originBefore.textContent = curOrigin;
      if (destBefore) destBefore.textContent = curDest;

      const newOrigin = Math.max(0, curOrigin - qty);
      const newDest = curDest + (curOrigin >= qty ? qty : 0);

      if (originAfter) originAfter.textContent = newOrigin;
      if (destAfter) destAfter.textContent = newDest;
    }
  }

  stepTransferInput(step) {
    const input = document.getElementById('tfQuantity');
    if (!input) return;
    const cur = parseInt(input.value, 10) || 1;
    input.value = Math.max(1, cur + step);
    this.updateTransferPreview();
  }

  saveDirectTransfer() {
    const prodId = document.getElementById('tfProductSelect')?.value;
    const dir = document.getElementById('tfDirection')?.value;
    const qty = parseInt(document.getElementById('tfQuantity')?.value, 10) || 0;
    const notes = document.getElementById('tfNotes')?.value.trim();

    const p = this.products.find(item => item.id === prodId);
    if (!p) return;

    if (qty <= 0) {
      alert('Informe uma quantidade maior que zero.');
      return;
    }

    if (dir === 'deposito_para_loja') {
      if (qty > p.qtyEstoque) {
        alert(`Saldo insuficiente no Depósito (${p.qtyEstoque} un disponíveis).`);
        return;
      }

      const prevOrigin = p.qtyEstoque;
      const prevDest = p.qtyLoja;

      p.qtyEstoque -= qty;
      p.qtyLoja += qty;
      p.lastCountAt = new Date().toISOString();

      this.logMovement({
        productId: p.id,
        productName: p.name,
        type: 'Transferência (Depósito ➡️ Loja)',
        quantity: qty,
        origin: 'Depósito (Estoque)',
        destination: 'Frente de Loja',
        prevOriginQty: prevOrigin,
        newOriginQty: p.qtyEstoque,
        prevDestQty: prevDest,
        newDestQty: p.qtyLoja,
        notes: notes || 'Reposição de gôndola'
      });
    } else {
      if (qty > p.qtyLoja) {
        alert(`Saldo insuficiente na Loja (${p.qtyLoja} un disponíveis).`);
        return;
      }

      const prevOrigin = p.qtyLoja;
      const prevDest = p.qtyEstoque;

      p.qtyLoja -= qty;
      p.qtyEstoque += qty;
      p.lastCountAt = new Date().toISOString();

      this.logMovement({
        productId: p.id,
        productName: p.name,
        type: 'Transferência (Loja ➡️ Depósito)',
        quantity: qty,
        origin: 'Frente de Loja',
        destination: 'Depósito (Estoque)',
        prevOriginQty: prevOrigin,
        newOriginQty: p.qtyLoja,
        prevDestQty: prevDest,
        newDestQty: p.qtyEstoque,
        notes: notes || 'Recolhimento para retaguarda'
      });
    }

    audio.playSuccessChord();
    this.saveProducts();
    this.renderAll();
    this.showToast(`${qty} unidade(s) de "${p.name}" transferidas com sucesso!`, 'success');

    // Reseta form
    document.getElementById('tfQuantity').value = 1;
    document.getElementById('tfNotes').value = '';
    this.updateTransferPreview();
  }

  // Sugestões de Reposição Imediata
  renderRepositionSuggestions() {
    const container = document.getElementById('repositionSuggestionsList');
    if (!container) return;

    // Produtos com gôndola baixa (<= 2) mas que têm estoque no depósito
    const suggestions = this.products.filter(p => p.qtyLoja <= 2 && p.qtyEstoque > 0);

    if (suggestions.length === 0) {
      container.innerHTML = `<div class="text-secondary" style="font-size: 0.82rem; padding: 1rem; text-align: center;">Nenhuma gôndola necessitando de transferência emergencial.</div>`;
      return;
    }

    container.innerHTML = suggestions.map(p => {
      const suggestQty = Math.min(p.qtyEstoque, 5);
      return `
        <div class="reposition-item-card">
          <div>
            <div style="font-weight: 700; font-size: 0.85rem;">${p.name}</div>
            <div style="font-size: 0.72rem; color: var(--color-text-secondary);">
              Loja: <strong class="text-danger">${p.qtyLoja} un</strong> | Depósito: <strong class="text-forest">${p.qtyEstoque} un</strong>
            </div>
          </div>
          <button class="btn btn-xs btn-primary" onclick="app.quickReposition('${p.id}', ${suggestQty})">
            Repor ${suggestQty} un
          </button>
        </div>
      `;
    }).join('');
  }

  quickReposition(productId, quantity) {
    const p = this.products.find(item => item.id === productId);
    if (!p || p.qtyEstoque < quantity) return;

    const prevOrigin = p.qtyEstoque;
    const prevDest = p.qtyLoja;

    p.qtyEstoque -= quantity;
    p.qtyLoja += quantity;
    p.lastCountAt = new Date().toISOString();

    this.logMovement({
      productId: p.id,
      productName: p.name,
      type: 'Transferência Rápida (Depósito ➡️ Loja)',
      quantity,
      origin: 'Depósito (Estoque)',
      destination: 'Frente de Loja',
      prevOriginQty: prevOrigin,
      newOriginQty: p.qtyEstoque,
      prevDestQty: prevDest,
      newDestQty: p.qtyLoja,
      notes: 'Reposição rápida de gôndola zerada'
    });

    audio.playSuccessChord();
    this.saveProducts();
    this.renderAll();
    this.showToast(`+${quantity} un de "${p.name}" repostas na gôndola!`, 'success');
  }

  // Modal de Transferência dedicado
  openTransferModal(productId = null) {
    const dialog = document.getElementById('modalTransferStock');
    if (!dialog) return;

    const targetProduct = productId ? this.products.find(p => p.id === productId) : this.products[0];
    if (!targetProduct) return;

    document.getElementById('modalTfProductId').value = targetProduct.id;
    document.getElementById('transferModalTitle').textContent = `Transferir: ${targetProduct.name}`;
    document.getElementById('transferModalSubtitle').textContent = `Código: ${targetProduct.sku || '--'} | Categoria: ${targetProduct.category}`;

    document.getElementById('modalTfQuantity').value = Math.min(targetProduct.qtyEstoque > 0 ? targetProduct.qtyEstoque : 1, 5);

    this.updateModalTransferPreview();
    dialog.showModal();
  }

  updateModalTransferPreview() {
    const prodId = document.getElementById('modalTfProductId')?.value;
    const p = this.products.find(item => item.id === prodId);
    if (!p) return;

    const dir = document.getElementById('modalTfDirection')?.value;
    const qty = parseInt(document.getElementById('modalTfQuantity')?.value, 10) || 0;

    const origLabel = document.getElementById('modalTfOriginLabel');
    const destLabel = document.getElementById('modalTfDestLabel');
    const origBefore = document.getElementById('modalTfOriginBefore');
    const origAfter = document.getElementById('modalTfOriginAfter');
    const destBefore = document.getElementById('modalTfDestBefore');
    const destAfter = document.getElementById('modalTfDestAfter');
    const maxHint = document.getElementById('modalTfMaxHint');

    if (dir === 'deposito_para_loja') {
      if (origLabel) origLabel.textContent = 'Depósito';
      if (destLabel) destLabel.textContent = 'Loja';
      if (origBefore) origBefore.textContent = `${p.qtyEstoque} un`;
      if (destBefore) destBefore.textContent = `${p.qtyLoja} un`;
      if (origAfter) origAfter.textContent = `${Math.max(0, p.qtyEstoque - qty)} un`;
      if (destAfter) destAfter.textContent = `${p.qtyLoja + (p.qtyEstoque >= qty ? qty : 0)} un`;
      if (maxHint) maxHint.textContent = `Máximo no depósito: ${p.qtyEstoque} unidades`;
    } else {
      if (origLabel) origLabel.textContent = 'Loja';
      if (destLabel) destLabel.textContent = 'Depósito';
      if (origBefore) origBefore.textContent = `${p.qtyLoja} un`;
      if (destBefore) destBefore.textContent = `${p.qtyEstoque} un`;
      if (origAfter) origAfter.textContent = `${Math.max(0, p.qtyLoja - qty)} un`;
      if (destAfter) destAfter.textContent = `${p.qtyEstoque + (p.qtyLoja >= qty ? qty : 0)} un`;
      if (maxHint) maxHint.textContent = `Máximo na loja: ${p.qtyLoja} unidades`;
    }
  }

  saveModalTransfer() {
    const prodId = document.getElementById('modalTfProductId')?.value;
    const dir = document.getElementById('modalTfDirection')?.value;
    const qty = parseInt(document.getElementById('modalTfQuantity')?.value, 10) || 0;
    const notes = document.getElementById('modalTfNotes')?.value.trim();

    const p = this.products.find(item => item.id === prodId);
    if (!p) return;

    if (qty <= 0) {
      alert('Informe uma quantidade maior que zero.');
      return;
    }

    if (dir === 'deposito_para_loja') {
      if (qty > p.qtyEstoque) {
        alert(`Saldo insuficiente no Depósito (${p.qtyEstoque} un disponíveis).`);
        return;
      }
      p.qtyEstoque -= qty;
      p.qtyLoja += qty;
    } else {
      if (qty > p.qtyLoja) {
        alert(`Saldo insuficiente na Loja (${p.qtyLoja} un disponíveis).`);
        return;
      }
      p.qtyLoja -= qty;
      p.qtyEstoque += qty;
    }

    p.lastCountAt = new Date().toISOString();

    this.logMovement({
      productId: p.id,
      productName: p.name,
      type: dir === 'deposito_para_loja' ? 'Transferência (Depósito ➡️ Loja)' : 'Transferência (Loja ➡️ Depósito)',
      quantity: qty,
      origin: dir === 'deposito_para_loja' ? 'Depósito' : 'Loja',
      destination: dir === 'deposito_para_loja' ? 'Loja' : 'Depósito',
      notes: notes || 'Transferência realizada via modal'
    });

    const dialog = document.getElementById('modalTransferStock');
    if (dialog) dialog.close();

    audio.playSuccessChord();
    this.saveProducts();
    this.renderAll();
    this.showToast(`Transferência de ${qty} un efetivada com sucesso!`, 'success');
  }

  // ==========================================================================
  // SEÇÃO 5: ENTREGAS & FORNECEDORES (RECEBIMENTO AUDITADO)
  // ==========================================================================

  renderDeliveries() {
    const container = document.getElementById('deliveriesCardsContainer');
    const statsList = document.getElementById('supplierStatsList');
    if (!container) return;

    let items = [...this.deliveries];

    if (this.deliveryFilterStatus) {
      items = items.filter(d => d.status === this.deliveryFilterStatus);
    }

    if (items.length === 0) {
      container.innerHTML = `
        <div class="card panel-card" style="text-align: center; padding: 2.5rem;">
          <div style="font-size: 2.5rem; margin-bottom: 0.5rem;">🚚</div>
          <h3 style="font-weight: 800;">Nenhum pedido de compra localizado</h3>
          <p class="text-secondary" style="font-size: 0.85rem; margin-top: 0.25rem;">Cadastre novas previsões de entrega para acompanhar os prazos dos fornecedores.</p>
        </div>
      `;
    } else {
      container.innerHTML = items.map(d => {
        const prod = this.products.find(p => p.id === d.productId) || { name: 'Item Encomendado' };
        const daysLeft = this.calculateDaysLeft(d.expectedDate);
        const isDelivered = d.status === 'delivered';

        let statusTag = '<span class="badge-tag badge-tag-forest">Em Trânsito</span>';
        if (d.status === 'delayed') statusTag = '<span class="badge-tag badge-tag-danger">Atrasado</span>';
        if (d.status === 'today') statusTag = '<span class="badge-tag badge-tag-warning">Chega Hoje</span>';
        if (d.status === 'delivered') statusTag = '<span class="badge-tag badge-tag-healthy">Recebido</span>';
        if (d.status === 'partial') statusTag = '<span class="badge-tag badge-tag-warning">Recebido Parcial</span>';

        return `
          <div class="delivery-order-card">
            <div class="delivery-order-top">
              <div>
                <span class="deliv-order-sku">Pedido ${d.orderNumber || 'S/N'}</span>
                <h3 class="deliv-order-prod">${prod.name}</h3>
                <div style="font-size: 0.75rem; color: var(--color-text-secondary);">Fornecedor: <strong>${d.supplier}</strong></div>
              </div>
              <div>${statusTag}</div>
            </div>

            <div class="delivery-metrics-row">
              <div class="deliv-stat-item">
                <span class="deliv-stat-label">Encomendado</span>
                <span class="deliv-stat-val">+${d.orderedQuantity} un</span>
              </div>
              <div class="deliv-stat-item">
                <span class="deliv-stat-label">Recebido</span>
                <span class="deliv-stat-val">${isDelivered || d.status === 'partial' ? d.receivedQuantity + ' un' : '--'}</span>
              </div>
              <div class="deliv-stat-item">
                <span class="deliv-stat-label">Data Prevista</span>
                <span class="deliv-stat-val">${this.formatDate(d.expectedDate)}</span>
              </div>
              <div class="deliv-stat-item">
                <span class="deliv-stat-label">Prazo</span>
                <span class="deliv-stat-val ${d.status === 'delayed' ? 'text-danger' : 'text-forest'}">${daysLeft}</span>
              </div>
            </div>

            <div class="delivery-order-footer">
              <span style="font-size: 0.72rem; color: var(--color-text-muted);">
                Emitido em: ${this.formatDate(d.orderDate || d.createdAt)}
              </span>

              <div>
                ${!isDelivered ? `
                  <button class="btn btn-sm btn-primary" onclick="app.openReceiveDeliveryModal('${d.id}')">
                    Confirmar Recebimento (Dar Entrada)
                  </button>
                ` : `
                  <span class="badge-tag badge-tag-healthy">✓ Saldo creditado no depósito</span>
                `}
              </div>
            </div>
          </div>
        `;
      }).join('');
    }

    // Métricas na Lateral
    if (statsList) {
      const supplierCounts = {};
      this.products.forEach(p => {
        const s = p.supplier || 'Outros';
        supplierCounts[s] = (supplierCounts[s] || 0) + 1;
      });

      statsList.innerHTML = Object.entries(supplierCounts).map(([sup, count]) => `
        <div class="supplier-stat-row">
          <span>${sup}</span>
          <span class="nav-badge">${count} itens</span>
        </div>
      `).join('');
    }
  }

  // Modal para confirmar recebimento físico de mercadoria
  openReceiveDeliveryModal(deliveryId) {
    const d = this.deliveries.find(item => item.id === deliveryId);
    if (!d) return;

    const prod = this.products.find(p => p.id === d.productId) || { name: 'Item' };

    document.getElementById('rcvDeliveryId').value = d.id;
    document.getElementById('rcvProductName').textContent = prod.name;
    document.getElementById('rcvSupplier').textContent = d.supplier;
    document.getElementById('rcvOrderedQty').textContent = `${d.orderedQuantity} unidades`;

    const input = document.getElementById('rcvQuantityInput');
    input.value = d.orderedQuantity;

    this.updateReceiveDifferenceHint();

    const dialog = document.getElementById('modalReceiveDelivery');
    if (dialog) dialog.showModal();
  }

  updateReceiveDifferenceHint() {
    const delivId = document.getElementById('rcvDeliveryId')?.value;
    const d = this.deliveries.find(item => item.id === delivId);
    if (!d) return;

    const rcvQty = parseInt(document.getElementById('rcvQuantityInput')?.value, 10) || 0;
    const diff = rcvQty - d.orderedQuantity;
    const hint = document.getElementById('rcvDifferenceHint');

    if (hint) {
      if (diff === 0) {
        hint.textContent = 'Entrega 100% integral (sem divergência de pedido).';
        hint.style.color = 'var(--color-primary)';
      } else if (diff < 0) {
        hint.textContent = `Atenção: Entrega parcial (${Math.abs(diff)} un a menos que o pedido).`;
        hint.style.color = 'var(--color-warning)';
      } else {
        hint.textContent = `Entrega excedente (+${diff} un acima do pedido original).`;
        hint.style.color = 'var(--color-primary)';
      }
    }
  }

  confirmReceiveDelivery() {
    const delivId = document.getElementById('rcvDeliveryId')?.value;
    const d = this.deliveries.find(item => item.id === delivId);
    if (!d) return;

    const rcvQty = Math.max(1, parseInt(document.getElementById('rcvQuantityInput')?.value, 10) || 1);
    const invoice = document.getElementById('rcvInvoiceNumber')?.value.trim();

    const prod = this.products.find(p => p.id === d.productId);
    if (prod) {
      const prevEstoque = Number(prod.qtyEstoque) || 0;
      prod.qtyEstoque = prevEstoque + rcvQty;
      prod.lastCountAt = new Date().toISOString();

      this.logMovement({
        productId: prod.id,
        productName: prod.name,
        type: 'Entrada por Fornecedor',
        quantity: rcvQty,
        origin: `Fornecedor: ${d.supplier} (${d.orderNumber})`,
        destination: 'Depósito (Estoque)',
        prevOriginQty: 0,
        newOriginQty: 0,
        prevDestQty: prevEstoque,
        newDestQty: prod.qtyEstoque,
        notes: invoice ? `Entrada Nota Fiscal ${invoice}` : `Recebimento pedido ${d.orderNumber}`
      });
    }

    d.receivedQuantity = rcvQty;
    d.difference = rcvQty - d.orderedQuantity;
    d.status = (rcvQty < d.orderedQuantity) ? 'partial' : 'delivered';
    d.deliveredAt = new Date().toISOString();

    const dialog = document.getElementById('modalReceiveDelivery');
    if (dialog) dialog.close();

    audio.playSuccessChord();
    this.saveProducts();
    this.saveDeliveries();
    this.renderAll();

    this.showToast(`Recebimento confirmado! +${rcvQty} unidades creditadas no Depósito de "${prod ? prod.name : 'Produto'}".`, 'success');
  }

  // Modal de Nova Entrega
  openNewDeliveryModal(preselectProductId = null) {
    const dialog = document.getElementById('modalNewDelivery');
    const select = document.getElementById('delivProductId');
    if (!dialog || !select) return;

    select.innerHTML = this.products.map(p => `
      <option value="${p.id}" ${p.id === preselectProductId ? 'selected' : ''}>
        ${p.name} (Saldo Total Atual: ${p.qtyLoja + p.qtyEstoque} un)
      </option>
    `).join('');

    const selectedProd = this.products.find(p => p.id === (preselectProductId || select.value));
    if (selectedProd) {
      document.getElementById('delivSupplier').value = selectedProd.supplier || 'Distribuidora Principal';
      const days = selectedProd.leadTimeDays || 3;
      const expected = new Date(Date.now() + 86400000 * days).toISOString().split('T')[0];
      document.getElementById('delivExpectedDate').value = expected;
    }

    document.getElementById('delivOrderNum').value = 'PED-' + new Date().getFullYear() + '-' + Math.floor(100 + Math.random() * 900);

    dialog.showModal();
  }

  saveNewDelivery() {
    const productId = document.getElementById('delivProductId')?.value;
    const supplier = document.getElementById('delivSupplier')?.value.trim();
    const quantity = Math.max(1, parseInt(document.getElementById('delivQty')?.value, 10) || 1);
    const expectedDate = document.getElementById('delivExpectedDate')?.value;
    const orderNumber = document.getElementById('delivOrderNum')?.value.trim();

    if (!productId || !expectedDate) return;

    const newDelivery = {
      id: 'deliv-' + Date.now(),
      productId,
      supplier,
      orderNumber,
      orderedQuantity: quantity,
      receivedQuantity: 0,
      difference: 0,
      orderDate: new Date().toISOString().split('T')[0],
      expectedDate,
      status: 'in_transit',
      createdAt: new Date().toISOString()
    };

    this.deliveries.unshift(newDelivery);

    const dialog = document.getElementById('modalNewDelivery');
    if (dialog) dialog.close();

    audio.playCheck();
    this.saveDeliveries();
    this.renderDeliveries();
    this.renderMetricsAndBadges();
    this.showToast(`Previsão de entrega para ${this.formatDate(expectedDate)} cadastrada!`, 'success');
  }

  // ==========================================================================
  // SEÇÃO 6: PREVENÇÃO DE RUPTURA & ALERTAS
  // ==========================================================================

  renderAlerts() {
    const container = document.getElementById('alertsCardsGrid');
    const title = document.getElementById('alertsTitleDynamic');
    const desc = document.getElementById('alertsDescDynamic');
    if (!container) return;

    const criticalItems = this.products.filter(p => {
      const total = (Number(p.qtyLoja) || 0) + (Number(p.qtyEstoque) || 0);
      return total <= (Number(p.minStock) || 0);
    });

    if (title) title.textContent = `${criticalItems.length} produtos em ponto de ressuprimento ou ruptura`;
    if (desc) desc.textContent = criticalItems.length > 0
      ? 'Abaixo estão os produtos com saldo total físico inferior ou igual ao estoque mínimo. Acompanhe se já há pedido feito ou emita compra imediata.'
      : 'Excelente! Todos os itens do catálogo estão com estoque saudável acima da margem de segurança.';

    if (criticalItems.length === 0) {
      container.innerHTML = `
        <div class="card panel-card" style="grid-column: 1 / -1; text-align: center; padding: 3rem;">
          <div style="font-size: 3rem; margin-bottom: 0.5rem;">🎉</div>
          <h3 style="color: var(--color-primary); font-size: 1.25rem; font-weight: 800;">Nenhum produto em risco de falta!</h3>
          <p class="text-secondary" style="max-width: 480px; margin: 0.5rem auto 0 auto; font-size: 0.85rem;">
            Todas as gôndolas e depósitos estão abastecidos de acordo com os estoques mínimos configurados.
          </p>
        </div>
      `;
      return;
    }

    container.innerHTML = criticalItems.map(p => {
      const qLoja = Number(p.qtyLoja) || 0;
      const qEstoque = Number(p.qtyEstoque) || 0;
      const total = qLoja + qEstoque;
      const min = Number(p.minStock) || 0;

      const activeDelivery = this.deliveries.find(d => d.productId === p.id && d.status !== 'delivered');
      const suggestedOrder = Math.max(min * 2 - total, 10);

      return `
        <div class="alert-item-card">
          <div>
            <div style="display: flex; justify-content: space-between; align-items: flex-start;">
              <div>
                <span class="badge-tag badge-tag-forest">${p.category}</span>
                <h3 style="font-size: 1.05rem; font-weight: 700; margin-top: 0.25rem;">${p.name}</h3>
                <div style="font-size: 0.72rem; color: var(--color-text-secondary);">Fornecedor: ${p.supplier || 'Não informado'} • Lead Time: ${p.leadTimeDays || 3} dias</div>
              </div>
              <span class="badge-tag ${total === 0 ? 'badge-tag-danger' : 'badge-tag-warning'}">
                ${total === 0 ? 'Esgotado' : 'Estoque Baixo'}
              </span>
            </div>

            <div style="display: grid; grid-template-columns: repeat(3, 1fr); gap: 0.5rem; background-color: var(--color-bg-app); padding: 0.75rem; border-radius: var(--radius-sm); margin: 0.85rem 0; text-align: center;">
              <div>
                <span style="font-size: 0.68rem; color: var(--color-text-muted); text-transform: uppercase;">Na Loja</span>
                <div style="font-weight: 800; font-family: var(--font-mono); color: var(--color-info);">${qLoja} un</div>
              </div>
              <div>
                <span style="font-size: 0.68rem; color: var(--color-text-muted); text-transform: uppercase;">No Depósito</span>
                <div style="font-weight: 800; font-family: var(--font-mono); color: var(--color-deposit);">${qEstoque} un</div>
              </div>
              <div>
                <span style="font-size: 0.68rem; color: var(--color-text-muted); text-transform: uppercase;">Mínimo Alerta</span>
                <div style="font-weight: 800; font-family: var(--font-mono); color: var(--color-danger);">${min} un</div>
              </div>
            </div>

            ${activeDelivery ? `
              <div style="padding: 0.65rem 0.85rem; background-color: var(--color-primary-light); border-radius: var(--radius-sm); font-size: 0.78rem; color: var(--color-primary-dark);">
                📦 Pedido em trânsito: <strong>${activeDelivery.orderedQuantity} un</strong> (Chegada prevista: <strong>${this.formatDate(activeDelivery.expectedDate)}</strong>)
              </div>
            ` : `
              <div style="padding: 0.65rem 0.85rem; background-color: var(--color-danger-bg); border-radius: var(--radius-sm); font-size: 0.78rem; color: var(--color-danger);">
                🚨 <strong>Sem pedido em aberto!</strong> Sugestão de compra: <strong>${suggestedOrder} unidades</strong> para cobrir a demanda.
              </div>
            `}
          </div>

          <div style="display: flex; gap: 0.5rem; justify-content: flex-end;">
            <button class="btn btn-xs btn-outline" onclick="app.openAdjustModal('${p.id}')">
              Ajustar Saldo
            </button>
            ${!activeDelivery ? `
              <button class="btn btn-xs btn-primary" onclick="app.openNewDeliveryModal('${p.id}')">
                Criar Pedido de Compra
              </button>
            ` : `
              <button class="btn btn-xs btn-primary" onclick="app.openReceiveDeliveryModal('${activeDelivery.id}')">
                Dar Entrada no Estoque
              </button>
            `}
          </div>
        </div>
      `;
    }).join('');
  }

  // ==========================================================================
  // SEÇÃO 7: HISTÓRICO & AUDITORIA
  // ==========================================================================

  renderAuditTable() {
    const tbody = document.getElementById('auditMovementsTableBody');
    const badge = document.getElementById('auditMovementsCountBadge');
    const cyclesTbody = document.getElementById('auditCyclesTableBody');

    if (badge) badge.textContent = `${this.movements.length} registros`;

    if (tbody) {
      if (this.movements.length === 0) {
        tbody.innerHTML = `<tr><td colspan="7" class="text-muted" style="text-align: center; padding: 2rem;">Nenhum registro de movimentação física no histórico.</td></tr>`;
      } else {
        tbody.innerHTML = this.movements.map(m => `
          <tr>
            <td style="font-size: 0.78rem; font-family: var(--font-mono);">${new Date(m.timestamp).toLocaleDateString('pt-BR')} ${new Date(m.timestamp).toLocaleTimeString('pt-BR', { hour: '2-digit', minute: '2-digit' })}</td>
            <td><strong>${m.productName}</strong></td>
            <td><span class="badge-tag badge-tag-forest">${m.type}</span></td>
            <td class="td-num font-mono"><strong>${m.quantity > 0 ? '+' : ''}${m.quantity}</strong> un</td>
            <td><span style="font-size: 0.78rem; color: var(--color-text-secondary);">${m.origin || '--'}</span></td>
            <td><span style="font-size: 0.78rem; color: var(--color-text-secondary);">${m.destination || '--'}</span></td>
            <td style="font-size: 0.78rem; color: var(--color-text-muted);">${m.notes || '--'}</td>
          </tr>
        `).join('');
      }
    }

    if (cyclesTbody) {
      if (this.cycleHistory.length === 0) {
        cyclesTbody.innerHTML = `<tr><td colspan="4" class="text-muted" style="text-align: center; padding: 1.5rem;">Nenhum ciclo anterior concluído ainda.</td></tr>`;
      } else {
        cyclesTbody.innerHTML = this.cycleHistory.map(h => `
          <tr>
            <td><strong>${h.completedAt}</strong></td>
            <td>${h.checkedSkus} de ${h.totalSkus} itens</td>
            <td style="color: ${h.divergentCount > 0 ? 'var(--color-warning)' : 'inherit'}; font-weight: 700;">${h.divergentCount}</td>
            <td style="color: var(--color-primary); font-weight: 800;">${h.accuracyRate}</td>
          </tr>
        `).join('');
      }
    }
  }

  // ==========================================================================
  // SEÇÃO 8: PREPARAÇÃO PARA E-COMMERCE
  // ==========================================================================

  renderEcommerceCatalog() {
    const container = document.getElementById('ecomCatalogPreviewGrid');
    if (!container) return;

    container.innerHTML = this.products.map(p => {
      const total = (Number(p.qtyLoja) || 0) + (Number(p.qtyEstoque) || 0);
      const isAvailable = total > 0;

      return `
        <div class="ecom-preview-card">
          <div>
            <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 0.4rem;">
              <span class="badge-tag badge-tag-forest">${p.category}</span>
              <span class="badge-tag ${isAvailable ? 'badge-tag-healthy' : 'badge-tag-danger'}">
                ${isAvailable ? `${total} un em estoque` : 'Esgotado'}
              </span>
            </div>
            <h4 class="ecom-prod-title">${p.name}</h4>
            <div style="font-size: 0.75rem; color: var(--color-text-secondary); margin-top: 0.2rem;">Marca: ${p.brand || 'PetPiano'}</div>
          </div>

          <div style="display: flex; justify-content: space-between; align-items: flex-end; padding-top: 0.65rem; border-top: 1px solid var(--color-border-subtle);">
            <div>
              <span style="font-size: 0.68rem; color: var(--color-text-muted); display: block;">Preço Comercial</span>
              <div class="ecom-prod-price">R$ ${(Number(p.salePrice) || 49.90).toFixed(2).replace('.', ',')}</div>
            </div>
            <button class="btn btn-xs btn-outline" style="pointer-events: none; opacity: 0.85;">
              Visualizar Vitrine
            </button>
          </div>
        </div>
      `;
    }).join('');
  }

  // ==========================================================================
  // MODAL DE REGULAR QUANTIDADE & ESTOQUE MÍNIMO
  // ==========================================================================

  openAdjustModal(productId) {
    const p = this.products.find(item => item.id === productId);
    if (!p) return;

    const dialog = document.getElementById('modalAdjustQuantity');
    if (!dialog) return;

    document.getElementById('adjustProductId').value = p.id;
    document.getElementById('adjustModalTitle').textContent = `Ajustar Saldo: ${p.name}`;
    document.getElementById('adjustModalSubtitle').textContent = `Código: ${p.sku || '--'} | Categoria: ${p.category}`;

    document.getElementById('adjustCurrentLoja').textContent = p.qtyLoja;
    document.getElementById('adjustCurrentEstoque').textContent = p.qtyEstoque;

    document.getElementById('adjustInputLoja').value = p.qtyLoja;
    document.getElementById('adjustInputEstoque').value = p.qtyEstoque;
    document.getElementById('adjustMinStock').value = p.minStock;

    dialog.showModal();
  }

  saveQuantityAdjustment() {
    const id = document.getElementById('adjustProductId')?.value;
    const p = this.products.find(item => item.id === id);
    if (!p) return;

    const newLoja = Math.max(0, parseInt(document.getElementById('adjustInputLoja')?.value, 10) || 0);
    const newEstoque = Math.max(0, parseInt(document.getElementById('adjustInputEstoque')?.value, 10) || 0);
    const newMin = Math.max(1, parseInt(document.getElementById('adjustMinStock')?.value, 10) || 1);
    const reason = document.getElementById('adjustReason')?.value;

    const oldTotal = (Number(p.qtyLoja) || 0) + (Number(p.qtyEstoque) || 0);
    const newTotal = newLoja + newEstoque;

    p.qtyLoja = newLoja;
    p.qtyEstoque = newEstoque;
    p.minStock = newMin;
    p.divergenceReason = reason;
    p.lastCountAt = new Date().toISOString();
    p.checkedInCycle = true;

    // Registra auditoria
    if (newTotal !== oldTotal) {
      this.logMovement({
        productId: p.id,
        productName: p.name,
        type: 'Ajuste de Inventário',
        quantity: newTotal - oldTotal,
        origin: `Loja (${p.qtyLoja}) / Depósito (${p.qtyEstoque})`,
        destination: 'Regularização de Saldo',
        prevOriginQty: oldTotal,
        newOriginQty: newTotal,
        notes: reason || 'Ajuste manual de inventário'
      });
    }

    const dialog = document.getElementById('modalAdjustQuantity');
    if (dialog) dialog.close();

    audio.playCheck();
    this.checkStockWarning(p);
    this.saveProducts();
    this.renderAll();

    this.showToast(`Saldos físicos de "${p.name}" atualizados com sucesso!`, 'success');
  }

  // ==========================================================================
  // MODAL DE CADASTRAR / EDITAR PRODUTO
  // ==========================================================================

  openProductModal(productId = null) {
    const dialog = document.getElementById('modalProduct');
    const form = document.getElementById('formProduct');
    if (!dialog || !form) return;

    form.reset();

    if (productId) {
      const p = this.products.find(item => item.id === productId);
      if (p) {
        document.getElementById('productModalTitle').textContent = 'Editar Dados do Produto';
        document.getElementById('prodEditId').value = p.id;
        document.getElementById('prodName').value = p.name;
        document.getElementById('prodCategory').value = p.category;
        document.getElementById('prodSku').value = p.sku || '';
        document.getElementById('prodBrand').value = p.brand || '';
        document.getElementById('prodSupplier').value = p.supplier || '';
        document.getElementById('prodQtyLoja').value = p.qtyLoja;
        document.getElementById('prodQtyEstoque').value = p.qtyEstoque;
        document.getElementById('prodMinStock').value = p.minStock;
        document.getElementById('prodCostPrice').value = p.costPrice || 0;
        document.getElementById('prodSalePrice').value = p.salePrice || 0;
        document.getElementById('prodLeadTime').value = p.leadTimeDays || 3;
        document.getElementById('prodLocation').value = p.location || '';
      }
    } else {
      document.getElementById('productModalTitle').textContent = 'Cadastrar Novo Item no Estoque';
      document.getElementById('prodEditId').value = '';
    }

    dialog.showModal();
  }

  saveProductForm() {
    const editId = document.getElementById('prodEditId')?.value;
    const name = document.getElementById('prodName')?.value.trim();
    const category = document.getElementById('prodCategory')?.value;
    const sku = document.getElementById('prodSku')?.value.trim();
    const brand = document.getElementById('prodBrand')?.value.trim();
    const supplier = document.getElementById('prodSupplier')?.value.trim();
    const qtyLoja = Math.max(0, parseInt(document.getElementById('prodQtyLoja')?.value, 10) || 0);
    const qtyEstoque = Math.max(0, parseInt(document.getElementById('prodQtyEstoque')?.value, 10) || 0);
    const minStock = Math.max(1, parseInt(document.getElementById('prodMinStock')?.value, 10) || 5);
    const costPrice = parseFloat(document.getElementById('prodCostPrice')?.value) || 0;
    const salePrice = parseFloat(document.getElementById('prodSalePrice')?.value) || 0;
    const leadTimeDays = Math.max(1, parseInt(document.getElementById('prodLeadTime')?.value, 10) || 3);
    const location = document.getElementById('prodLocation')?.value.trim();

    if (!name) return;

    if (editId) {
      const p = this.products.find(item => item.id === editId);
      if (p) {
        p.name = name;
        p.category = category;
        p.sku = sku;
        p.brand = brand;
        p.supplier = supplier;
        p.qtyLoja = qtyLoja;
        p.qtyEstoque = qtyEstoque;
        p.minStock = minStock;
        p.costPrice = costPrice;
        p.salePrice = salePrice;
        p.leadTimeDays = leadTimeDays;
        p.location = location;
      }
      this.showToast(`"${name}" atualizado com sucesso!`, 'success');
    } else {
      const newProduct = {
        id: 'prod-' + Date.now(),
        sku: sku || 'SKU-' + Math.floor(100000 + Math.random() * 900000),
        name,
        category,
        brand,
        supplier,
        qtyLoja,
        qtyEstoque,
        minStock,
        costPrice,
        salePrice,
        leadTimeDays,
        location,
        lastCountAt: new Date().toISOString(),
        checkedInCycle: true,
        baselineTotal: qtyLoja + qtyEstoque,
        divergenceReason: '',
        statusEcom: 'active'
      };

      this.products.unshift(newProduct);

      this.logMovement({
        productId: newProduct.id,
        productName: newProduct.name,
        type: 'Cadastro Inicial',
        quantity: qtyLoja + qtyEstoque,
        origin: 'Entrada Inicial de Estoque',
        destination: `Loja (${qtyLoja}) / Depósito (${qtyEstoque})`,
        prevOriginQty: 0,
        newOriginQty: qtyLoja + qtyEstoque,
        notes: 'Cadastro de novo produto'
      });

      this.showToast(`"${name}" cadastrado com sucesso!`, 'success');
    }

    const dialog = document.getElementById('modalProduct');
    if (dialog) dialog.close();

    audio.playCheck();
    this.saveProducts();
    this.renderAll();
  }

  // ==========================================================================
  // NOTIFICAÇÕES NATIVAS DO SISTEMA
  // ==========================================================================

  checkNotificationStatus() {
    const notifBtn = document.getElementById('btnNotificationsPermission');
    const notifDot = document.getElementById('notifDot');
    if (!('Notification' in window)) {
      if (notifBtn) notifBtn.style.display = 'none';
      return;
    }

    if (Notification.permission === 'granted') {
      if (notifDot) notifDot.style.display = 'none';
      if (notifBtn) notifBtn.title = 'Notificações de Ruptura Ativadas';
    } else {
      if (notifDot) notifDot.style.display = 'inline-block';
      if (notifBtn) notifBtn.title = 'Clique para ativar notificações no navegador';
    }
  }

  requestNotificationPermission() {
    if (!('Notification' in window)) {
      alert('Seu navegador não suporta notificações de área de trabalho.');
      return;
    }

    Notification.requestPermission().then(permission => {
      this.checkNotificationStatus();
      if (permission === 'granted') {
        this.showToast('Notificações de Ruptura habilitadas!', 'success');
        this.sendSystemNotification('PetPiano Alertas', 'Você será notificado sempre que um item estiver prestes a acabar.');
      } else {
        this.showToast('Permissão de notificação negada.', 'warning');
      }
    });
  }

  sendSystemNotification(title, body) {
    if ('Notification' in window && Notification.permission === 'granted') {
      try {
        new Notification(title, {
          body,
          icon: 'data:image/svg+xml,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100"><text y=".9em" font-size="90">🐾</text></svg>'
        });
      } catch (e) {
        console.warn('Notification error:', e);
      }
    }
  }

  checkStockWarning(product) {
    const total = (Number(product.qtyLoja) || 0) + (Number(product.qtyEstoque) || 0);
    const min = Number(product.minStock) || 0;

    if (total <= min) {
      audio.playAlertChord();
      this.showToast(`Atenção: "${product.name}" atingiu o nível crítico (${total} un / Mínimo: ${min})!`, 'danger');
      this.sendSystemNotification(
        '⚠️ Alerta de Estoque: PetPiano',
        `O item "${product.name}" atingiu o nível crítico (${total} un restantes). Considere emitir pedido de reposição.`
      );
    }
  }

  showToast(message, type = 'info') {
    const container = document.getElementById('toastContainer');
    if (!container) return;

    const toast = document.createElement('div');
    toast.className = `toast toast-${type}`;

    let icon = 'ℹ️';
    if (type === 'success') icon = '✅';
    else if (type === 'warning') icon = '⚠️';
    else if (type === 'danger') icon = '🚨';

    toast.innerHTML = `
      <span>${icon}</span>
      <span style="flex: 1;">${message}</span>
    `;

    container.appendChild(toast);

    setTimeout(() => {
      toast.style.opacity = '0';
      toast.style.transform = 'translateY(10px)';
      toast.style.transition = 'all 0.25s ease';
      setTimeout(() => toast.remove(), 250);
    }, 4000);
  }

  // ==========================================================================
  // EXPORTAÇÃO CSV
  // ==========================================================================

  exportCSV(type = 'stock') {
    if (type === 'stock') {
      const headers = ['SKU', 'Produto', 'Categoria', 'Marca', 'Fornecedor', 'Qtd_Loja', 'Qtd_Estoque', 'Qtd_Total', 'Estoque_Minimo', 'Preco_Custo', 'Preco_Venda', 'Situacao', 'Ultima_Conferencia'];
      const rows = this.products.map(p => {
        const qLoja = Number(p.qtyLoja) || 0;
        const qEstoque = Number(p.qtyEstoque) || 0;
        const total = qLoja + qEstoque;
        const min = Number(p.minStock) || 0;
        const status = total <= min ? 'Abaixo do Minimo' : 'Saudavel';

        return [
          `"${p.sku || ''}"`,
          `"${p.name.replace(/"/g, '""')}"`,
          `"${p.category}"`,
          `"${p.brand || ''}"`,
          `"${p.supplier || ''}"`,
          qLoja,
          qEstoque,
          total,
          min,
          p.costPrice || 0,
          p.salePrice || 0,
          `"${status}"`,
          `"${p.lastCountAt || ''}"`
        ];
      });

      const csvContent = '\uFEFF' + [headers.join(';'), ...rows.map(r => r.join(';'))].join('\r\n');
      this.downloadBlob(csvContent, `PetPiano_Inventario_${new Date().toISOString().slice(0, 10)}.csv`);
      this.showToast('Inventário exportado em formato CSV!', 'success');
    } else {
      const headers = ['Data_Hora', 'Produto', 'Tipo_Movimentacao', 'Quantidade', 'Origem', 'Destino', 'Motivo_Observacao'];
      const rows = this.movements.map(m => [
        `"${m.timestamp}"`,
        `"${m.productName.replace(/"/g, '""')}"`,
        `"${m.type}"`,
        m.quantity,
        `"${m.origin}"`,
        `"${m.destination}"`,
        `"${m.notes.replace(/"/g, '""')}"`
      ]);

      const csvContent = '\uFEFF' + [headers.join(';'), ...rows.map(r => r.join(';'))].join('\r\n');
      this.downloadBlob(csvContent, `PetPiano_Auditoria_Movimentacoes_${new Date().toISOString().slice(0, 10)}.csv`);
      this.showToast('Trilha de auditoria exportada em CSV!', 'success');
    }
  }

  downloadBlob(content, filename) {
    const blob = new Blob([content], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.setAttribute('download', filename);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  }

  // ==========================================================================
  // UTILITÁRIOS
  // ==========================================================================

  calculateDaysLeft(dateStr) {
    if (!dateStr) return 'Sem previsão';
    const target = new Date(dateStr + 'T00:00:00');
    const now = new Date();
    now.setHours(0, 0, 0, 0);

    const diffDays = Math.round((target - now) / (1000 * 60 * 60 * 24));
    if (diffDays === 0) return 'Chega hoje!';
    if (diffDays === 1) return 'Chega amanhã';
    if (diffDays > 1) return `Em ${diffDays} dias`;
    return `Atrasado há ${Math.abs(diffDays)} dia(s)`;
  }

  formatDate(dateStr) {
    if (!dateStr) return '--';
    const parts = dateStr.split('-');
    if (parts.length === 3) return `${parts[2]}/${parts[1]}/${parts[0]}`;
    return new Date(dateStr).toLocaleDateString('pt-BR');
  }

  formatLastCount(isoDateStr) {
    if (!isoDateStr) return 'Nunca conferido';
    const date = new Date(isoDateStr);
    const now = new Date();
    const diffHours = Math.round((now - date) / (1000 * 60 * 60));

    if (diffHours < 1) return 'Há poucos minutos';
    if (diffHours === 1) return 'Há 1 hora';
    if (diffHours < 24) return `Há ${diffHours} horas`;
    const days = Math.round(diffHours / 24);
    return `Há ${days} dia(s)`;
  }
}

// Inicializa a aplicação PetPiano
const app = new PetPianoApp();
window.app = app;
