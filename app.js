/**
 * PetPiano - Sistema de Organização, Contagem e Gestão de Mercadorias
 * Suporta ciclo de contagem de 48h (2 dias), Loja vs. Estoque, Alertas de Ruptura e Previsão de Entregas.
 */

// ============================================================================
// CONSTANTES & DADOS DEMONSTRATIVOS INICIAIS
// ============================================================================

const STORAGE_KEYS = {
  PRODUCTS: 'petpiano_products_v1',
  DELIVERIES: 'petpiano_deliveries_v1',
  CYCLE: 'petpiano_cycle_v1',
  CYCLE_HISTORY: 'petpiano_cycle_history_v1',
  SETTINGS: 'petpiano_settings_v1',
};

const INITIAL_PRODUCTS = [
  {
    id: 'prod-001',
    sku: '7896000701123',
    name: 'Ração Premier Formula Cães Adultos 15kg',
    category: 'Rações & Alimentos',
    brand: 'Premier Pet',
    supplier: 'Distribuidora PetBrasil',
    qtyLoja: 4,
    qtyEstoque: 14,
    minStock: 8,
    leadTimeDays: 3,
    location: 'Corredor 1 - Prateleira A',
    lastCountAt: new Date(Date.now() - 3600000 * 12).toISOString(),
    checkedInCycle: true,
    baselineTotal: 18,
    divergenceReason: ''
  },
  {
    id: 'prod-002',
    sku: '7891000201456',
    name: 'Ração Royal Canin Mini Adult 2.5kg',
    category: 'Rações & Alimentos',
    brand: 'Royal Canin',
    supplier: 'Distribuidora Central Pet',
    qtyLoja: 3,
    qtyEstoque: 5,
    minStock: 6,
    leadTimeDays: 4,
    location: 'Corredor 1 - Prateleira B',
    lastCountAt: new Date(Date.now() - 3600000 * 20).toISOString(),
    checkedInCycle: true,
    baselineTotal: 8,
    divergenceReason: ''
  },
  {
    id: 'prod-003',
    sku: '7898000451890',
    name: 'Ração Golden Gatos Castrados Frango 10kg',
    category: 'Rações & Alimentos',
    brand: 'PremieRpet Golden',
    supplier: 'Distribuidora PetBrasil',
    qtyLoja: 2,
    qtyEstoque: 1,
    minStock: 5, // Abaixo do mínimo!
    leadTimeDays: 3,
    location: 'Corredor 2 - Prateleira A',
    lastCountAt: new Date(Date.now() - 3600000 * 48).toISOString(),
    checkedInCycle: false,
    baselineTotal: 4,
    divergenceReason: ''
  },
  {
    id: 'prod-004',
    sku: '7891234500987',
    name: 'Antipulgas Bravecto Cães 10 a 20kg (1 comp)',
    category: 'Farmácia & Medicamentos',
    brand: 'MSD Saúde Animal',
    supplier: 'FarmaPet Distribuição',
    qtyLoja: 1,
    qtyEstoque: 1,
    minStock: 4, // Crítico!
    leadTimeDays: 2,
    location: 'Balcão Farmácia - Gaveta 3',
    lastCountAt: new Date(Date.now() - 3600000 * 18).toISOString(),
    checkedInCycle: false,
    baselineTotal: 2,
    divergenceReason: ''
  },
  {
    id: 'prod-005',
    sku: '7896541209341',
    name: 'NexGard Spectra Antipulgas Cães 7.5 a 15kg',
    category: 'Farmácia & Medicamentos',
    brand: 'Boehringer Ingelheim',
    supplier: 'FarmaPet Distribuição',
    qtyLoja: 4,
    qtyEstoque: 8,
    minStock: 5,
    leadTimeDays: 2,
    location: 'Balcão Farmácia - Gaveta 2',
    lastCountAt: new Date(Date.now() - 3600000 * 6).toISOString(),
    checkedInCycle: true,
    baselineTotal: 12,
    divergenceReason: ''
  },
  {
    id: 'prod-006',
    sku: '7897890123001',
    name: 'Areia Sanitária Pipicat Classic 4kg',
    category: 'Higiene & Areia',
    brand: 'Kelco Pet Care',
    supplier: 'Distribuidora PetBrasil',
    qtyLoja: 3,
    qtyEstoque: 2,
    minStock: 10, // Crítico!
    leadTimeDays: 3,
    location: 'Corredor 4 - Prateleira C',
    lastCountAt: new Date(Date.now() - 3600000 * 30).toISOString(),
    checkedInCycle: false,
    baselineTotal: 6,
    divergenceReason: ''
  },
  {
    id: 'prod-007',
    sku: '7893334445556',
    name: 'Tapete Higiênico Chalesco 30 unidades',
    category: 'Higiene & Areia',
    brand: 'Chalesco',
    supplier: 'Distribuidora Central Pet',
    qtyLoja: 6,
    qtyEstoque: 18,
    minStock: 8,
    leadTimeDays: 4,
    location: 'Corredor 4 - Pallet Frontal',
    lastCountAt: new Date(Date.now() - 3600000 * 10).toISOString(),
    checkedInCycle: true,
    baselineTotal: 24,
    divergenceReason: ''
  },
  {
    id: 'prod-008',
    sku: '7891011121314',
    name: 'Petisco Dreamies Salmão para Gatos 40g',
    category: 'Petiscos & Bifinhos',
    brand: 'Mars Petcare',
    supplier: 'Distribuidora Express Pet',
    qtyLoja: 12,
    qtyEstoque: 24,
    minStock: 10,
    leadTimeDays: 2,
    location: 'Gôndola Checkout',
    lastCountAt: new Date(Date.now() - 3600000 * 14).toISOString(),
    checkedInCycle: true,
    baselineTotal: 36,
    divergenceReason: ''
  },
  {
    id: 'prod-009',
    sku: '7895556667778',
    name: 'Bifinho Keldog Carne 500g',
    category: 'Petiscos & Bifinhos',
    brand: 'Kelco Pet Care',
    supplier: 'Distribuidora PetBrasil',
    qtyLoja: 5,
    qtyEstoque: 0, // Alerta: estoque zerado, só tem na loja!
    minStock: 6,
    leadTimeDays: 3,
    location: 'Corredor 3 - Prateleira B',
    lastCountAt: new Date(Date.now() - 3600000 * 5).toISOString(),
    checkedInCycle: false,
    baselineTotal: 5,
    divergenceReason: ''
  },
  {
    id: 'prod-010',
    sku: '7899998887776',
    name: 'Brinquedo Mordedor Kong Classic Vermelho M',
    category: 'Brinquedos',
    brand: 'KONG Company',
    supplier: 'Importadora PetPlay',
    qtyLoja: 2,
    qtyEstoque: 4,
    minStock: 3,
    leadTimeDays: 5,
    location: 'Painel Acessórios C',
    lastCountAt: new Date(Date.now() - 3600000 * 22).toISOString(),
    checkedInCycle: true,
    baselineTotal: 6,
    divergenceReason: ''
  },
  {
    id: 'prod-011',
    sku: '7894443332221',
    name: 'Coleira e Guia Antipuxão Zee.Dog Gotham G',
    category: 'Acessórios & Coleiras',
    brand: 'Zee.Dog',
    supplier: 'Distribuidora Zee Lifestyle',
    qtyLoja: 3,
    qtyEstoque: 3,
    minStock: 4,
    leadTimeDays: 4,
    location: 'Painel Boutique Zee',
    lastCountAt: new Date(Date.now() - 3600000 * 8).toISOString(),
    checkedInCycle: true,
    baselineTotal: 6,
    divergenceReason: ''
  },
  {
    id: 'prod-012',
    sku: '7891112223334',
    name: 'Shampoo Neutro Petbrilho 500ml',
    category: 'Higiene & Areia',
    brand: 'Petbrilho',
    supplier: 'Distribuidora PetBrasil',
    qtyLoja: 4,
    qtyEstoque: 12,
    minStock: 6,
    leadTimeDays: 3,
    location: 'Corredor 4 - Prateleira A',
    lastCountAt: new Date(Date.now() - 3600000 * 16).toISOString(),
    checkedInCycle: true,
    baselineTotal: 16,
    divergenceReason: ''
  }
];

const INITIAL_DELIVERIES = [
  {
    id: 'deliv-001',
    productId: 'prod-004', // Bravecto
    supplier: 'FarmaPet Distribuição',
    orderNumber: 'PED-2026-948',
    quantity: 10,
    expectedDate: new Date(Date.now() + 86400000 * 2).toISOString().split('T')[0], // Daqui a 2 dias
    status: 'in_transit',
    createdAt: new Date().toISOString()
  },
  {
    id: 'deliv-002',
    productId: 'prod-006', // Pipicat
    supplier: 'Distribuidora PetBrasil',
    orderNumber: 'PED-2026-952',
    quantity: 25,
    expectedDate: new Date(Date.now() + 86400000 * 1).toISOString().split('T')[0], // Amanhã
    status: 'in_transit',
    createdAt: new Date().toISOString()
  },
  {
    id: 'deliv-003',
    productId: 'prod-003', // Golden Gatos
    supplier: 'Distribuidora PetBrasil',
    orderNumber: 'PED-2026-955',
    quantity: 8,
    expectedDate: new Date(Date.now() + 86400000 * 3).toISOString().split('T')[0], // Daqui a 3 dias
    status: 'in_transit',
    createdAt: new Date().toISOString()
  }
];

const INITIAL_CYCLE_HISTORY = [
  {
    id: 'cycle-hist-1',
    completedAt: new Date(Date.now() - 86400000 * 2).toLocaleDateString('pt-BR'),
    totalSkus: 12,
    checkedSkus: 12,
    divergentCount: 1,
    accuracyRate: '91.7%'
  },
  {
    id: 'cycle-hist-2',
    completedAt: new Date(Date.now() - 86400000 * 4).toLocaleDateString('pt-BR'),
    totalSkus: 12,
    checkedSkus: 12,
    divergentCount: 0,
    accuracyRate: '100%'
  }
];

// ============================================================================
// SINTETIZADOR WEB AUDIO - PIANO PETPIANO
// ============================================================================

class PetPianoAudio {
  constructor() {
    this.ctx = null;
    this.soundEnabled = true;
  }

  init() {
    if (!this.ctx) {
      const AudioContext = window.AudioContext || window.webkitAudioContext;
      if (AudioContext) {
        this.ctx = new AudioContext();
      }
    }
    if (this.ctx && this.ctx.state === 'suspended') {
      this.ctx.resume();
    }
  }

  // Toca uma nota suave com decay estilo piano
  playNote(frequency, duration = 0.5, volume = 0.25) {
    if (!this.soundEnabled) return;
    try {
      this.init();
      if (!this.ctx) return;

      const osc = this.ctx.createOscillator();
      const gainNode = this.ctx.createGain();

      osc.type = 'triangle'; // Som suave como corda de piano
      osc.frequency.setValueAtTime(frequency, this.ctx.currentTime);

      // Envelope com ataque rápido e decaimento exponencial suave
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

  // Efeito sonoro de contagem positiva
  playStepUp() {
    this.playNote(523.25, 0.2, 0.2); // C5
  }

  // Efeito sonoro de diminuição
  playStepDown() {
    this.playNote(440.00, 0.2, 0.2); // A4
  }

  // Efeito sonoro de item conferido (Dó - Sol)
  playCheck() {
    this.playNote(523.25, 0.15, 0.2);
    setTimeout(() => this.playNote(783.99, 0.35, 0.25), 90);
  }

  // Acorde triunfante de conclusão de ciclo / recebimento (C - E - G - C)
  playSuccessChord() {
    const notes = [523.25, 659.25, 783.99, 1046.50];
    notes.forEach((freq, idx) => {
      setTimeout(() => this.playNote(freq, 0.5, 0.25), idx * 75);
    });
  }

  // Acorde de alerta suave (Ruptura iminente)
  playAlertChord() {
    const notes = [440, 466.16, 440];
    notes.forEach((freq, idx) => {
      setTimeout(() => this.playNote(freq, 0.3, 0.2), idx * 120);
    });
  }
}

const audio = new PetPianoAudio();

// ============================================================================
// GERENCIADOR DE ESTADO DA APLICAÇÃO
// ============================================================================

class PetPianoApp {
  constructor() {
    this.products = [];
    this.deliveries = [];
    this.cycle = null;
    this.cycleHistory = [];
    this.activeTab = 'tab-count';
    this.countFilter = 'all';
    this.countSearchTerm = '';
    this.countCategory = '';
    this.stockSearchTerm = '';
    this.stockCategory = '';
    this.stockStatusFilter = '';

    this.init();
  }

  init() {
    this.loadState();
    this.setupEventListeners();
    this.renderAll();
    this.startCycleTimer();
    this.checkNotificationStatus();
  }

  // Carrega ou inicializa o localStorage
  loadState() {
    const savedProducts = localStorage.getItem(STORAGE_KEYS.PRODUCTS);
    this.products = savedProducts ? JSON.parse(savedProducts) : INITIAL_PRODUCTS;

    const savedDeliveries = localStorage.getItem(STORAGE_KEYS.DELIVERIES);
    this.deliveries = savedDeliveries ? JSON.parse(savedDeliveries) : INITIAL_DELIVERIES;

    const savedCycle = localStorage.getItem(STORAGE_KEYS.CYCLE);
    if (savedCycle) {
      this.cycle = JSON.parse(savedCycle);
    } else {
      // Inicia um novo ciclo de 48h a partir de agora
      this.startNewCycle(false);
    }

    const savedHistory = localStorage.getItem(STORAGE_KEYS.CYCLE_HISTORY);
    this.cycleHistory = savedHistory ? JSON.parse(savedHistory) : INITIAL_CYCLE_HISTORY;

    const savedSettings = localStorage.getItem(STORAGE_KEYS.SETTINGS);
    if (savedSettings) {
      const settings = JSON.parse(savedSettings);
      audio.soundEnabled = settings.soundEnabled ?? true;
      this.updateSoundButtonUI();
    }
  }

  saveProducts() {
    localStorage.setItem(STORAGE_KEYS.PRODUCTS, JSON.stringify(this.products));
    this.updateStats();
  }

  saveDeliveries() {
    localStorage.setItem(STORAGE_KEYS.DELIVERIES, JSON.stringify(this.deliveries));
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

  // Inicia um ciclo novo de 48 horas
  startNewCycle(showToastNotice = true) {
    const now = new Date();
    const expires = new Date(now.getTime() + (48 * 60 * 60 * 1000)); // 48 horas

    this.cycle = {
      id: 'cycle-' + Date.now(),
      startedAt: now.toISOString(),
      expiresAt: expires.toISOString(),
      status: 'active'
    };

    // Reseta o status de conferido dos produtos para a nova rodada
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
      this.showToast('Novo ciclo de 48h iniciado com sucesso!', 'success');
      this.renderAll();
    }
  }

  // ==========================================================================
  // CONFIGURAÇÃO DE LISTENERS & EVENTOS
  // ==========================================================================

  setupEventListeners() {
    // Abas de Navegação
    document.querySelectorAll('.nav-tab').forEach(tab => {
      tab.addEventListener('click', (e) => {
        const tabTarget = tab.dataset.tab;
        this.switchTab(tabTarget);
      });
    });

    // Toggle de Som de Piano
    const btnSound = document.getElementById('btnSoundToggle');
    if (btnSound) {
      btnSound.addEventListener('click', () => {
        audio.soundEnabled = !audio.soundEnabled;
        this.saveSettings();
        this.updateSoundButtonUI();
        if (audio.soundEnabled) {
          audio.playStepUp();
          this.showToast('Sons de piano ativados 🎹', 'info');
        } else {
          this.showToast('Sons silenciados 🔇', 'info');
        }
      });
    }

    // Botão de Permissão de Notificações
    const btnNotif = document.getElementById('btnNotificationsPermission');
    if (btnNotif) {
      btnNotif.addEventListener('click', () => this.requestNotificationPermission());
    }

    // Botão Novo Ciclo Topbar
    const btnNewCycle = document.getElementById('btnNewCycle');
    if (btnNewCycle) {
      btnNewCycle.addEventListener('click', () => {
        if (confirm('Deseja iniciar um novo ciclo de contagem de 48 horas? Todos os itens voltarão ao status de pendente para nova conferência.')) {
          this.startNewCycle(true);
        }
      });
    }

    // Filtros de Contagem Rápida
    const filterGroup = document.getElementById('countFilterGroup');
    if (filterGroup) {
      filterGroup.addEventListener('click', (e) => {
        const btn = e.target.closest('.pill-btn');
        if (btn && btn.dataset.filter) {
          filterGroup.querySelectorAll('.pill-btn').forEach(b => b.classList.remove('active'));
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

    const countCategory = document.getElementById('countCategorySelect');
    if (countCategory) {
      countCategory.addEventListener('change', (e) => {
        this.countCategory = e.target.value;
        this.renderCountCards();
      });
    }

    // Filtros de Estoque Geral
    const stockSearch = document.getElementById('stockSearchInput');
    if (stockSearch) {
      stockSearch.addEventListener('input', (e) => {
        this.stockSearchTerm = e.target.value.toLowerCase().trim();
        this.renderStockTable();
      });
    }

    const stockCategory = document.getElementById('stockCategorySelect');
    if (stockCategory) {
      stockCategory.addEventListener('change', (e) => {
        this.stockCategory = e.target.value;
        this.renderStockTable();
      });
    }

    const stockStatus = document.getElementById('stockStatusFilter');
    if (stockStatus) {
      stockStatus.addEventListener('change', (e) => {
        this.stockStatusFilter = e.target.value;
        this.renderStockTable();
      });
    }

    // Atualizar Alertas
    const btnRefreshAlerts = document.getElementById('btnRefreshAlerts');
    if (btnRefreshAlerts) {
      btnRefreshAlerts.addEventListener('click', () => {
        this.renderAlerts();
        audio.playStepUp();
        this.showToast('Painel de alertas atualizado!', 'info');
      });
    }

    // Modais e Diálogos
    this.setupModals();

    // Exportação & Relatórios
    const btnExportCSV = document.getElementById('btnExportCSV');
    if (btnExportCSV) btnExportCSV.addEventListener('click', () => this.exportCSV());

    const btnPrint = document.getElementById('btnPrintReport');
    if (btnPrint) btnPrint.addEventListener('click', () => window.print());

    const btnResetDemo = document.getElementById('btnResetDemoData');
    if (btnResetDemo) {
      btnResetDemo.addEventListener('click', () => {
        if (confirm('Tem certeza que deseja restaurar os produtos e entregas para o exemplo inicial do PetPiano?')) {
          localStorage.clear();
          this.loadState();
          this.renderAll();
          this.showToast('Dados de demonstração restaurados!', 'info');
        }
      });
    }

    const btnOpenNewDelivery = document.getElementById('btnOpenNewDeliveryModal');
    if (btnOpenNewDelivery) {
      btnOpenNewDelivery.addEventListener('click', () => this.openNewDeliveryModal());
    }

    const btnCompleteCycleModal = document.getElementById('btnCompleteCycleModal');
    if (btnCompleteCycleModal) {
      btnCompleteCycleModal.addEventListener('click', () => this.openFinishCycleModal());
    }

    const btnConfirmFinishCycle = document.getElementById('btnConfirmFinishCycle');
    if (btnConfirmFinishCycle) {
      btnConfirmFinishCycle.addEventListener('click', () => this.confirmFinishCycle());
    }
  }

  // ==========================================================================
  // CONFIGURAÇÃO DE MODAIS (<dialog>)
  // ==========================================================================

  setupModals() {
    // Fechamento genérico de botões com data-close-dialog
    document.querySelectorAll('[data-close-dialog]').forEach(btn => {
      btn.addEventListener('click', () => {
        const dialogId = btn.dataset.closeDialog;
        const dialog = document.getElementById(dialogId);
        if (dialog) dialog.close();
      });
    });

    // Abrir Modal de Novo Produto
    const btnOpenProduct = document.getElementById('btnOpenNewProduct');
    if (btnOpenProduct) {
      btnOpenProduct.addEventListener('click', () => {
        this.openProductModal(null);
      });
    }

    // Submissão do Formulário de Produto
    const formProduct = document.getElementById('formProduct');
    if (formProduct) {
      formProduct.addEventListener('submit', (e) => {
        e.preventDefault();
        this.saveProductForm();
      });
    }

    // Submissão do Formulário de Ajuste de Quantidade
    const formAdjust = document.getElementById('formAdjustQuantity');
    if (formAdjust) {
      formAdjust.addEventListener('submit', (e) => {
        e.preventDefault();
        this.saveQuantityAdjustment();
      });
    }

    // Stepper botões no modal de ajuste (+1, -1, +5, -5)
    document.querySelectorAll('.btn-step').forEach(btn => {
      btn.addEventListener('click', () => {
        const targetId = btn.dataset.stepTarget;
        const step = parseInt(btn.dataset.step, 10);
        const input = document.getElementById(targetId);
        if (input) {
          const currentVal = parseInt(input.value, 10) || 0;
          const nextVal = Math.max(0, currentVal + step);
          input.value = nextVal;
          if (step > 0) audio.playStepUp();
          else audio.playStepDown();
        }
      });
    });

    // Submissão de Transferência (Estoque -> Loja)
    const formTransfer = document.getElementById('formTransferStock');
    if (formTransfer) {
      formTransfer.addEventListener('submit', (e) => {
        e.preventDefault();
        this.saveTransferStock();
      });
    }

    // Submissão de Nova Entrega
    const formNewDelivery = document.getElementById('formNewDelivery');
    if (formNewDelivery) {
      formNewDelivery.addEventListener('submit', (e) => {
        e.preventDefault();
        this.saveNewDelivery();
      });
    }
  }

  // Alterna entre abas
  switchTab(tabId) {
    document.querySelectorAll('.nav-tab').forEach(tab => {
      tab.classList.toggle('active', tab.dataset.tab === tabId);
    });

    document.querySelectorAll('.tab-content').forEach(content => {
      content.classList.toggle('active', content.id === tabId);
    });

    this.activeTab = tabId;

    if (tabId === 'tab-count') this.renderCountCards();
    else if (tabId === 'tab-stock') this.renderStockTable();
    else if (tabId === 'tab-alerts') this.renderAlerts();
    else if (tabId === 'tab-deliveries') this.renderDeliveries();
    else if (tabId === 'tab-reports') this.renderReports();
  }

  updateSoundButtonUI() {
    const btn = document.getElementById('btnSoundToggle');
    if (!btn) return;
    btn.innerHTML = audio.soundEnabled 
      ? '<span class="icon-sound">🔊</span>' 
      : '<span class="icon-sound">🔇</span>';
    btn.title = audio.soundEnabled 
      ? 'Efeitos Sonoros de Piano (Ativado)' 
      : 'Efeitos Sonoros Silenciados (Desativado)';
  }

  // ==========================================================================
  // RENDERIZAÇÃO GERAL
  // ==========================================================================

  renderAll() {
    this.updateStats();
    this.renderCycleBanner();
    this.renderCountCards();
    this.renderStockTable();
    this.renderAlerts();
    this.renderDeliveries();
    this.renderReports();
  }

  // Atualiza os contadores no Topbar e Stat Cards
  updateStats() {
    let totalLoja = 0;
    let totalEstoque = 0;
    let alertCount = 0;
    let checkedCount = 0;

    this.products.forEach(p => {
      const qLoja = Number(p.qtyLoja) || 0;
      const qEstoque = Number(p.qtyEstoque) || 0;
      const total = qLoja + qEstoque;

      totalLoja += qLoja;
      totalEstoque += qEstoque;

      if (total <= (Number(p.minStock) || 0)) {
        alertCount++;
      }

      if (p.checkedInCycle) {
        checkedCount++;
      }
    });

    const totalSkus = this.products.length;
    const progressPercent = totalSkus > 0 ? Math.round((checkedCount / totalSkus) * 100) : 0;

    // Stat Cards
    const elLoja = document.getElementById('statLojaCount');
    const elEstoque = document.getElementById('statEstoqueCount');
    const elConferidos = document.getElementById('statConferidosCount');
    const elConferidosSub = document.getElementById('statConferidosSub');
    const elAlertas = document.getElementById('statAlertasCount');

    if (elLoja) elLoja.textContent = totalLoja;
    if (elEstoque) elEstoque.textContent = totalEstoque;
    if (elConferidos) elConferidos.textContent = `${progressPercent}%`;
    if (elConferidosSub) elConferidosSub.textContent = `${totalSkus - checkedCount} pendentes de contagem`;
    if (elAlertas) elAlertas.textContent = alertCount;

    // Pills de Abas
    const pillCount = document.getElementById('tabPillCount');
    const pillStock = document.getElementById('tabPillStock');
    const pillAlerts = document.getElementById('tabPillAlerts');
    const pillDeliv = document.getElementById('tabPillDeliveries');

    if (pillCount) pillCount.textContent = `${checkedCount}/${totalSkus}`;
    if (pillStock) pillStock.textContent = totalSkus;
    if (pillAlerts) pillAlerts.textContent = alertCount;
    if (pillDeliv) pillDeliv.textContent = this.deliveries.filter(d => d.status === 'in_transit').length;

    // Contadores de filtro da aba de contagem
    const divergentCount = this.products.filter(p => {
      const currentTotal = (Number(p.qtyLoja) || 0) + (Number(p.qtyEstoque) || 0);
      return p.checkedInCycle && currentTotal !== p.baselineTotal;
    }).length;

    const criticalCount = this.products.filter(p => {
      const total = (Number(p.qtyLoja) || 0) + (Number(p.qtyEstoque) || 0);
      return total <= (Number(p.minStock) || 0);
    }).length;

    const elFAll = document.getElementById('filterAllCount');
    const elFPending = document.getElementById('filterPendingCount');
    const elFChecked = document.getElementById('filterCheckedCount');
    const elFDivergent = document.getElementById('filterDivergentCount');
    const elFCritical = document.getElementById('filterCriticalCount');

    if (elFAll) elFAll.textContent = totalSkus;
    if (elFPending) elFPending.textContent = totalSkus - checkedCount;
    if (elFChecked) elFChecked.textContent = checkedCount;
    if (elFDivergent) elFDivergent.textContent = divergentCount;
    if (elFCritical) elFCritical.textContent = criticalCount;
  }

  // Barra de progresso do Ciclo de 2 Dias
  renderCycleBanner() {
    const totalSkus = this.products.length;
    const checkedCount = this.products.filter(p => p.checkedInCycle).length;
    const progressPercent = totalSkus > 0 ? Math.round((checkedCount / totalSkus) * 100) : 0;

    const progressBar = document.getElementById('cycleProgressBar');
    const progressText = document.getElementById('cycleProgressText');

    if (progressBar) progressBar.style.width = `${progressPercent}%`;
    if (progressText) progressText.textContent = `${checkedCount} / ${totalSkus} itens (${progressPercent}%)`;
  }

  // Timer regressivo do ciclo de 48h
  startCycleTimer() {
    const update = () => {
      if (!this.cycle) return;
      const now = new Date();
      const expires = new Date(this.cycle.expiresAt);
      const diffMs = expires.getTime() - now.getTime();

      const note = document.getElementById('cycleTimerNote');
      const badge = document.getElementById('cycleStatusBadge');

      if (diffMs <= 0) {
        if (note) note.textContent = 'Ciclo de 48h expirou! Clique em "Novo Ciclo" para iniciar a próxima contagem.';
        if (badge) {
          badge.textContent = 'Tempo Expirado';
          badge.style.color = '#f43f5e';
          badge.style.background = 'rgba(244, 63, 94, 0.2)';
        }
      } else {
        const hours = Math.floor(diffMs / (1000 * 60 * 60));
        const minutes = Math.floor((diffMs % (1000 * 60 * 60)) / (1000 * 60));
        if (note) note.textContent = `Ciclo atual de 48h expira em ${hours}h ${minutes}min.`;
        if (badge) {
          badge.textContent = `${hours}h restantes`;
          badge.style.color = '#38bdf8';
          badge.style.background = 'rgba(56, 189, 248, 0.15)';
        }
      }
    };

    update();
    setInterval(update, 60000); // atualiza a cada 1 minuto
  }

  // ==========================================================================
  // ABA 1: CONTAGEM RÁPIDA (CARDS DE CONTAGEM EXPRESS)
  // ==========================================================================

  renderCountCards() {
    const container = document.getElementById('countCardsContainer');
    const emptyState = document.getElementById('countEmptyState');
    if (!container) return;

    // Filtra itens
    let filtered = this.products.filter(p => {
      // Busca
      if (this.countSearchTerm) {
        const term = this.countSearchTerm;
        const matchName = p.name.toLowerCase().includes(term);
        const matchBrand = (p.brand || '').toLowerCase().includes(term);
        const matchSku = (p.sku || '').toLowerCase().includes(term);
        if (!matchName && !matchBrand && !matchSku) return false;
      }

      // Categoria
      if (this.countCategory && p.category !== this.countCategory) {
        return false;
      }

      // Filtro de status
      const total = (Number(p.qtyLoja) || 0) + (Number(p.qtyEstoque) || 0);
      const isCritical = total <= (Number(p.minStock) || 0);
      const isDivergent = p.checkedInCycle && total !== p.baselineTotal;

      if (this.countFilter === 'pending' && p.checkedInCycle) return false;
      if (this.countFilter === 'checked' && !p.checkedInCycle) return false;
      if (this.countFilter === 'divergent' && !isDivergent) return false;
      if (this.countFilter === 'critical' && !isCritical) return false;

      return true;
    });

    if (filtered.length === 0) {
      container.innerHTML = '';
      if (emptyState) emptyState.style.display = 'block';
      return;
    }

    if (emptyState) emptyState.style.display = 'none';

    container.innerHTML = filtered.map(p => {
      const qLoja = Number(p.qtyLoja) || 0;
      const qEstoque = Number(p.qtyEstoque) || 0;
      const total = qLoja + qEstoque;
      const isCritical = total <= (Number(p.minStock) || 0);
      const isDivergent = p.checkedInCycle && total !== p.baselineTotal;
      const diff = total - p.baselineTotal;

      let cardClass = 'count-card';
      if (p.checkedInCycle) cardClass += ' is-checked';
      if (isDivergent) cardClass += ' is-divergent';
      if (isCritical) cardClass += ' is-critical';

      return `
        <div class="${cardClass}" data-product-id="${p.id}">
          <div class="count-card-header">
            <div class="count-card-meta">
              <span class="count-badge-cat">${p.category}</span>
              <h3 class="count-card-name">${p.name}</h3>
              <span class="count-card-sub">${p.brand || ''} • SKU: ${p.sku || '--'}</span>
            </div>
            <div class="count-status-badges">
              ${p.checkedInCycle 
                ? '<span class="badge-tag badge-tag-checked">✓ Conferido</span>' 
                : '<span class="badge-tag badge-tag-pending">⏳ Pendente</span>'}
              
              ${isCritical 
                ? '<span class="badge-tag badge-tag-critical">⚠️ Reposição</span>' 
                : ''}
              
              ${isDivergent 
                ? `<span class="badge-tag badge-tag-divergent">${diff > 0 ? '+' + diff : diff} divergência</span>` 
                : ''}
            </div>
          </div>

          <!-- Áreas de Contagem: Loja & Estoque -->
          <div class="count-zones-container">
            <!-- Zona Frente de Loja -->
            <div class="count-zone zone-loja">
              <div class="zone-header">
                <span class="zone-title zone-title-loja">Loja (Gôndola)</span>
              </div>
              <div class="zone-counter-row">
                <button type="button" class="btn-count-adjust" onclick="app.adjustCount('${p.id}', 'loja', -1)" title="Diminuir 1">-1</button>
                <input type="number" class="count-qty-input" value="${qLoja}" min="0" 
                  onchange="app.setCountDirect('${p.id}', 'loja', this.value)" 
                  aria-label="Quantidade na Loja">
                <button type="button" class="btn-count-adjust" onclick="app.adjustCount('${p.id}', 'loja', 1)" title="Adicionar 1">+1</button>
              </div>
              <div class="zone-quick-add">
                <button type="button" class="btn-quick-add" onclick="app.adjustCount('${p.id}', 'loja', 5)">+5</button>
                <button type="button" class="btn-quick-add" onclick="app.adjustCount('${p.id}', 'loja', 10)">+10</button>
              </div>
            </div>

            <!-- Zona Depósito / Estoque -->
            <div class="count-zone zone-estoque">
              <div class="zone-header">
                <span class="zone-title zone-title-estoque">Estoque (Depósito)</span>
              </div>
              <div class="zone-counter-row">
                <button type="button" class="btn-count-adjust" onclick="app.adjustCount('${p.id}', 'estoque', -1)" title="Diminuir 1">-1</button>
                <input type="number" class="count-qty-input" value="${qEstoque}" min="0" 
                  onchange="app.setCountDirect('${p.id}', 'estoque', this.value)" 
                  aria-label="Quantidade no Estoque">
                <button type="button" class="btn-count-adjust" onclick="app.adjustCount('${p.id}', 'estoque', 1)" title="Adicionar 1">+1</button>
              </div>
              <div class="zone-quick-add">
                <button type="button" class="btn-quick-add" onclick="app.adjustCount('${p.id}', 'estoque', 5)">+5</button>
                <button type="button" class="btn-quick-add" onclick="app.adjustCount('${p.id}', 'estoque', 10)">+10</button>
              </div>
            </div>
          </div>

          <!-- Rodapé do Card -->
          <div class="count-card-footer">
            <div class="count-totals-info">
              <span class="count-total-sum">Total: ${total} un (Mín: ${p.minStock})</span>
              <span class="count-last-check">${this.formatLastCount(p.lastCountAt)}</span>
            </div>

            <div class="count-card-actions">
              <button type="button" class="btn btn-sm btn-outline" onclick="app.openAdjustModal('${p.id}')" title="Ajuste Fino e Estoque Mínimo">
                ⚙️
              </button>
              <button type="button" class="btn-check-item ${p.checkedInCycle ? 'checked' : ''}" 
                onclick="app.toggleCheckItem('${p.id}')">
                ${p.checkedInCycle ? '✓ Conferido' : 'Bip / Conferir'}
              </button>
            </div>
          </div>
        </div>
      `;
    }).join('');
  }

  // Incrementa ou decrementa a quantidade no modo rápido
  adjustCount(productId, zone, delta) {
    const p = this.products.find(item => item.id === productId);
    if (!p) return;

    if (zone === 'loja') {
      p.qtyLoja = Math.max(0, (Number(p.qtyLoja) || 0) + delta);
    } else {
      p.qtyEstoque = Math.max(0, (Number(p.qtyEstoque) || 0) + delta);
    }

    p.lastCountAt = new Date().toISOString();
    p.checkedInCycle = true; // Ao alterar, já marca como conferido

    if (delta > 0) audio.playStepUp();
    else audio.playStepDown();

    this.checkStockWarning(p);
    this.saveProducts();
    this.renderCycleBanner();
    this.renderCountCards();
    this.renderStockTable();
  }

  // Define valor diretamente digitado
  setCountDirect(productId, zone, val) {
    const p = this.products.find(item => item.id === productId);
    if (!p) return;

    const num = Math.max(0, parseInt(val, 10) || 0);
    if (zone === 'loja') p.qtyLoja = num;
    else p.qtyEstoque = num;

    p.lastCountAt = new Date().toISOString();
    p.checkedInCycle = true;

    audio.playStepUp();
    this.checkStockWarning(p);
    this.saveProducts();
    this.renderCycleBanner();
    this.renderCountCards();
    this.renderStockTable();
  }

  // Alterna o status de conferido no ciclo atual
  toggleCheckItem(productId) {
    const p = this.products.find(item => item.id === productId);
    if (!p) return;

    p.checkedInCycle = !p.checkedInCycle;
    p.lastCountAt = new Date().toISOString();

    if (p.checkedInCycle) {
      audio.playCheck();
      this.showToast(`"${p.name}" marcado como conferido!`, 'success');
    } else {
      audio.playStepDown();
    }

    this.saveProducts();
    this.renderCycleBanner();
    this.renderCountCards();
    this.renderStockTable();
    this.renderReports();
  }

  formatLastCount(isoDateStr) {
    if (!isoDateStr) return 'Nunca conferido';
    const date = new Date(isoDateStr);
    const now = new Date();
    const diffHours = Math.round((now - date) / (1000 * 60 * 60));

    if (diffHours < 1) return 'Conferido há poucos minutos';
    if (diffHours === 1) return 'Conferido há 1 hora';
    if (diffHours < 24) return `Conferido há ${diffHours} horas`;
    const days = Math.round(diffHours / 24);
    return `Conferido há ${days} dia(s)`;
  }

  // ==========================================================================
  // ABA 2: LOJA & ESTOQUE (TABELA COMPLETA)
  // ==========================================================================

  renderStockTable() {
    const tbody = document.getElementById('inventoryTableBody');
    if (!tbody) return;

    let filtered = this.products.filter(p => {
      // Busca
      if (this.stockSearchTerm) {
        const term = this.stockSearchTerm;
        const matchName = p.name.toLowerCase().includes(term);
        const matchSku = (p.sku || '').toLowerCase().includes(term);
        const matchSupp = (p.supplier || '').toLowerCase().includes(term);
        if (!matchName && !matchSku && !matchSupp) return false;
      }

      // Categoria
      if (this.stockCategory && p.category !== this.stockCategory) {
        return false;
      }

      // Status
      const qLoja = Number(p.qtyLoja) || 0;
      const qEstoque = Number(p.qtyEstoque) || 0;
      const total = qLoja + qEstoque;
      const minStock = Number(p.minStock) || 0;

      if (this.stockStatusFilter === 'normal' && total <= minStock) return false;
      if (this.stockStatusFilter === 'low' && (total > minStock || total === 0)) return false;
      if (this.stockStatusFilter === 'critical' && total > Math.ceil(minStock / 2)) return false;
      if (this.stockStatusFilter === 'transfer' && (qLoja > 2 || qEstoque === 0)) return false;

      return true;
    });

    if (filtered.length === 0) {
      tbody.innerHTML = `
        <tr>
          <td colspan="9" style="text-align: center; padding: 2.5rem; color: var(--text-muted);">
            Nenhuma mercadoria corresponde aos filtros selecionados.
          </td>
        </tr>
      `;
      return;
    }

    tbody.innerHTML = filtered.map(p => {
      const qLoja = Number(p.qtyLoja) || 0;
      const qEstoque = Number(p.qtyEstoque) || 0;
      const total = qLoja + qEstoque;
      const minStock = Number(p.minStock) || 0;

      // Status do estoque
      let statusBadge = '<span class="badge-tag" style="background: rgba(16, 185, 129, 0.15); color: #10b981;">Normal</span>';
      if (total === 0) {
        statusBadge = '<span class="badge-tag badge-tag-critical">Esgotado</span>';
      } else if (total <= Math.ceil(minStock / 2)) {
        statusBadge = '<span class="badge-tag badge-tag-critical">Crítico</span>';
      } else if (total <= minStock) {
        statusBadge = '<span class="badge-tag badge-tag-divergent">Abaixo do Mín.</span>';
      }

      // Previsão de entrega vinculada
      const activeDelivery = this.deliveries.find(d => d.productId === p.id && d.status === 'in_transit');
      let deliveryCol = '<span class="delivery-none">Sem pedido</span>';
      if (activeDelivery) {
        const daysLeft = this.calculateDaysLeft(activeDelivery.expectedDate);
        deliveryCol = `
          <div class="delivery-eta-badge" title="Chegada prevista para ${this.formatDate(activeDelivery.expectedDate)}">
            📦 +${activeDelivery.quantity} un (${daysLeft})
          </div>
        `;
      }

      return `
        <tr>
          <td>
            <div class="prod-cell">
              <span class="prod-cell-name">${p.name}</span>
              <span class="prod-cell-meta">${p.brand || ''} • SKU: ${p.sku || '--'}</span>
            </div>
          </td>
          <td><span style="font-size: 0.8rem; color: var(--text-secondary);">${p.category}</span></td>
          <td class="td-center"><span class="qty-badge qty-loja">${qLoja}</span></td>
          <td class="td-center"><span class="qty-badge qty-estoque">${qEstoque}</span></td>
          <td class="td-center">
            <span class="qty-badge ${total <= minStock ? 'qty-total-danger' : 'qty-total'}">${total}</span>
          </td>
          <td class="td-center" style="font-family: var(--font-mono); color: var(--text-muted);">${minStock}</td>
          <td>${statusBadge}</td>
          <td>${deliveryCol}</td>
          <td class="td-actions">
            <button class="btn btn-sm btn-outline" onclick="app.openTransferModal('${p.id}')" title="Transferir do Depósito para a Loja">
              Repor Loja
            </button>
            <button class="btn btn-sm btn-outline" onclick="app.openAdjustModal('${p.id}')" title="Regular Quantidades e Estoque Mínimo">
              Regular
            </button>
            <button class="btn btn-sm btn-ghost" onclick="app.openProductModal('${p.id}')" title="Editar Cadastro">
              ✏️
            </button>
          </td>
        </tr>
      `;
    }).join('');
  }

  // ==========================================================================
  // ABA 3: ALERTAS DE RUPTURA & NOTIFICAÇÕES
  // ==========================================================================

  renderAlerts() {
    const container = document.getElementById('alertsContainer');
    const bannerTitle = document.getElementById('alertsBannerTitle');
    const bannerDesc = document.getElementById('alertsBannerDesc');
    if (!container) return;

    const criticalItems = this.products.filter(p => {
      const total = (Number(p.qtyLoja) || 0) + (Number(p.qtyEstoque) || 0);
      return total <= (Number(p.minStock) || 0);
    });

    if (bannerTitle) {
      bannerTitle.textContent = `${criticalItems.length} item(ns) prestes a acabar no PetPiano`;
    }

    if (bannerDesc) {
      bannerDesc.textContent = criticalItems.length > 0
        ? 'Estes produtos atingiram ou estão abaixo do estoque mínimo configurado. Recomendamos emitir pedido de reposição aos fornecedores.'
        : 'Excelente! Todos os produtos estão com níveis de estoque acima da margem de segurança configurada.';
    }

    if (criticalItems.length === 0) {
      container.innerHTML = `
        <div class="card" style="grid-column: 1 / -1; text-align: center; padding: 3rem;">
          <div style="font-size: 3rem; margin-bottom: 0.5rem;">🎉</div>
          <h3 style="color: #10b981; font-size: 1.25rem;">Nenhum alerta de ruptura no momento!</h3>
          <p style="color: var(--text-secondary); max-width: 450px; margin: 0.5rem auto 0 auto;">
            O estoque físico na loja e no depósito está totalmente suprido conforme os estoques mínimos cadastrados.
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

      // Verifica se já tem pedido a caminho
      const activeDelivery = this.deliveries.find(d => d.productId === p.id && d.status === 'in_transit');
      let forecastHtml = '';

      if (activeDelivery) {
        const daysLeft = this.calculateDaysLeft(activeDelivery.expectedDate);
        forecastHtml = `
          <div class="alert-forecast-box">
            <span>📦 Pedido em trânsito: <strong>${activeDelivery.quantity} unidades</strong> com chegada prevista para 
            <span class="forecast-highlight">${this.formatDate(activeDelivery.expectedDate)} (${daysLeft})</span>.</span>
          </div>
        `;
      } else {
        const suggestedOrder = Math.max(min * 2 - total, 10);
        forecastHtml = `
          <div class="alert-forecast-box" style="border-color: rgba(244, 63, 94, 0.4); background: rgba(244, 63, 94, 0.08);">
            <span style="color: #fda4af;">🚨 <strong>Sem pedido em aberto!</strong> Prazo médio do fornecedor (${p.supplier || 'Padrão'}): <strong>${p.leadTimeDays || 3} dias</strong>. Sugestão de compra: <strong>${suggestedOrder} un</strong>.</span>
          </div>
        `;
      }

      return `
        <div class="alert-card">
          <div class="alert-card-header">
            <div>
              <span class="count-badge-cat">${p.category}</span>
              <h4 class="alert-prod-name">${p.name}</h4>
              <span class="prod-cell-meta">Fornecedor: ${p.supplier || 'Não informado'}</span>
            </div>
            <span class="alert-status-pill">${total === 0 ? 'Zerado' : 'Estoque Baixo'}</span>
          </div>

          <div class="alert-stock-breakdown">
            <div>
              <span class="breakdown-label">Na Loja</span>
              <div class="breakdown-val" style="color: var(--accent-loja);">${qLoja}</div>
            </div>
            <div>
              <span class="breakdown-label">No Estoque</span>
              <div class="breakdown-val" style="color: var(--accent-estoque);">${qEstoque}</div>
            </div>
            <div>
              <span class="breakdown-label">Mín. Alerta</span>
              <div class="breakdown-val" style="color: var(--danger);">${min}</div>
            </div>
          </div>

          ${forecastHtml}

          <div style="display: flex; gap: 0.5rem; justify-content: flex-end;">
            <button class="btn btn-sm btn-outline" onclick="app.openAdjustModal('${p.id}')">
              Regular Quantia
            </button>
            ${!activeDelivery ? `
              <button class="btn btn-sm btn-primary" onclick="app.openNewDeliveryModal('${p.id}')">
                Criar Pedido Fornecedor
              </button>
            ` : `
              <button class="btn btn-sm btn-outline" onclick="app.receiveDelivery('${activeDelivery.id}')">
                Dar Entrada no Estoque
              </button>
            `}
          </div>
        </div>
      `;
    }).join('');
  }

  // ==========================================================================
  // ABA 4: PREVISÃO DE ENTREGAS & FORNECEDORES
  // ==========================================================================

  renderDeliveries() {
    const container = document.getElementById('deliveriesContainer');
    const suppliersList = document.getElementById('suppliersSummaryList');
    if (!container) return;

    if (this.deliveries.length === 0) {
      container.innerHTML = `
        <div class="card" style="text-align: center; padding: 2.5rem;">
          <div style="font-size: 2.5rem; margin-bottom: 0.5rem;">🚚</div>
          <h3>Nenhuma previsão de entrega cadastrada</h3>
          <p style="color: var(--text-secondary); margin-top: 0.25rem;">
            Registre novas previsões de pedidos para acompanhar os prazos e fornecedores do PetPiano.
          </p>
          <button class="btn btn-primary" style="margin-top: 1rem;" onclick="app.openNewDeliveryModal()">
            Cadastrar Nova Previsão
          </button>
        </div>
      `;
    } else {
      container.innerHTML = this.deliveries.map(deliv => {
        const prod = this.products.find(p => p.id === deliv.productId) || { name: 'Item Removido' };
        const daysLeft = this.calculateDaysLeft(deliv.expectedDate);
        const isDelivered = deliv.status === 'delivered';

        return `
          <div class="delivery-card">
            <div class="delivery-header">
              <div>
                <span class="count-badge-cat">Pedido: ${deliv.orderNumber || 'S/N'}</span>
                <h3 class="delivery-title">${prod.name}</h3>
                <span class="prod-cell-meta">Fornecedor: ${deliv.supplier}</span>
              </div>
              <span class="delivery-status-tag ${isDelivered ? 'tag-delivered' : 'tag-in-transit'}">
                ${isDelivered ? '✓ Entregue & Estocado' : '🚚 Em Trânsito'}
              </span>
            </div>

            <div class="delivery-grid-details">
              <div class="delivery-detail-item">
                <span class="detail-label">Qtd. Encomendada</span>
                <span class="detail-val">+${deliv.quantity} unidades</span>
              </div>
              <div class="delivery-detail-item">
                <span class="detail-label">Data Prevista</span>
                <span class="detail-val">${this.formatDate(deliv.expectedDate)}</span>
              </div>
              <div class="delivery-detail-item">
                <span class="detail-label">Previsão</span>
                <span class="detail-val" style="color: ${isDelivered ? '#10b981' : '#38bdf8'};">${daysLeft}</span>
              </div>
            </div>

            <div class="delivery-footer">
              <span style="font-size: 0.78rem; color: var(--text-muted);">
                Cadastrado em: ${new Date(deliv.createdAt).toLocaleDateString('pt-BR')}
              </span>

              <div>
                ${!isDelivered ? `
                  <button class="btn btn-sm btn-primary" onclick="app.receiveDelivery('${deliv.id}')">
                    Confirmar Recebimento (Dar Entrada)
                  </button>
                ` : `
                  <button class="btn btn-sm btn-ghost text-muted" onclick="app.deleteDelivery('${deliv.id}')">
                    Remover do Histórico
                  </button>
                `}
              </div>
            </div>
          </div>
        `;
      }).join('');
    }

    // Resumo de Fornecedores na Sidebar
    if (suppliersList) {
      const supplierCounts = {};
      this.products.forEach(p => {
        const s = p.supplier || 'Diversos';
        supplierCounts[s] = (supplierCounts[s] || 0) + 1;
      });

      suppliersList.innerHTML = Object.entries(supplierCounts).map(([sup, count]) => `
        <li class="supplier-item">
          <span>${sup}</span>
          <span class="tab-pill">${count} itens</span>
        </li>
      `).join('');
    }
  }

  // Recebe a mercadoria e joga a quantidade diretamente no estoque
  receiveDelivery(deliveryId) {
    const deliv = this.deliveries.find(d => d.id === deliveryId);
    if (!deliv) return;

    const prod = this.products.find(p => p.id === deliv.productId);
    if (prod) {
      prod.qtyEstoque = (Number(prod.qtyEstoque) || 0) + Number(deliv.quantity);
      prod.lastCountAt = new Date().toISOString();
    }

    deliv.status = 'delivered';
    deliv.deliveredAt = new Date().toISOString();

    audio.playSuccessChord();
    this.saveProducts();
    this.saveDeliveries();
    this.renderAll();

    this.showToast(`Mercadoria recebida! +${deliv.quantity} unidades somadas ao Estoque de "${prod ? prod.name : 'Produto'}".`, 'success');
  }

  deleteDelivery(deliveryId) {
    this.deliveries = this.deliveries.filter(d => d.id !== deliveryId);
    this.saveDeliveries();
    this.renderDeliveries();
    this.showToast('Registro de entrega removido.', 'info');
  }

  // ==========================================================================
  // ABA 5: HISTÓRICO & RELATÓRIOS DO CICLO
  // ==========================================================================

  renderReports() {
    const elStart = document.getElementById('auditCycleStart');
    const elEnd = document.getElementById('auditCycleEnd');
    const elChecked = document.getElementById('auditCheckedItems');
    const elDivergent = document.getElementById('auditDivergentCount');
    const elAccuracy = document.getElementById('auditAccuracyRate');
    const historyTbody = document.getElementById('historyTableBody');

    const totalSkus = this.products.length;
    const checkedSkus = this.products.filter(p => p.checkedInCycle).length;
    const divergentItems = this.products.filter(p => {
      const curTotal = (Number(p.qtyLoja) || 0) + (Number(p.qtyEstoque) || 0);
      return p.checkedInCycle && curTotal !== p.baselineTotal;
    });

    const accuracy = checkedSkus > 0 
      ? Math.round(((checkedSkus - divergentItems.length) / checkedSkus) * 100) 
      : 100;

    if (this.cycle) {
      if (elStart) elStart.textContent = new Date(this.cycle.startedAt).toLocaleString('pt-BR');
      if (elEnd) elEnd.textContent = new Date(this.cycle.expiresAt).toLocaleString('pt-BR');
    }

    if (elChecked) elChecked.textContent = `${checkedSkus} de ${totalSkus} (${totalSkus > 0 ? Math.round((checkedSkus / totalSkus) * 100) : 0}%)`;
    if (elDivergent) elDivergent.textContent = `${divergentItems.length} item(ns)`;
    if (elAccuracy) elAccuracy.textContent = `${accuracy}%`;

    // Histórico de ciclos passados
    if (historyTbody) {
      if (this.cycleHistory.length === 0) {
        historyTbody.innerHTML = `
          <tr>
            <td colspan="4" style="text-align: center; color: var(--text-muted); padding: 1.5rem;">
              Nenhum ciclo anterior registrado ainda.
            </td>
          </tr>
        `;
      } else {
        historyTbody.innerHTML = this.cycleHistory.map(h => `
          <tr>
            <td>${h.completedAt}</td>
            <td>${h.checkedSkus} / ${h.totalSkus}</td>
            <td style="color: ${h.divergentCount > 0 ? '#f59e0b' : 'inherit'}; font-weight: 700;">
              ${h.divergentCount}
            </td>
            <td style="color: #10b981; font-weight: 700;">${h.accuracyRate}</td>
          </tr>
        `).join('');
      }
    }
  }

  // Modal para fechar ciclo de 2 dias
  openFinishCycleModal() {
    const dialog = document.getElementById('modalFinishCycle');
    if (!dialog) return;

    const total = this.products.length;
    const checked = this.products.filter(p => p.checkedInCycle).length;
    const divergent = this.products.filter(p => {
      const curTotal = (Number(p.qtyLoja) || 0) + (Number(p.qtyEstoque) || 0);
      return p.checkedInCycle && curTotal !== p.baselineTotal;
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
      const curTotal = (Number(p.qtyLoja) || 0) + (Number(p.qtyEstoque) || 0);
      return p.checkedInCycle && curTotal !== p.baselineTotal;
    }).length;
    const accuracy = checked > 0 ? Math.round(((checked - divergent) / checked) * 100) : 100;

    // Registra no histórico
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
    this.showToast('Ciclo de 48h arquivado no histórico e novo ciclo aberto!', 'success');
    this.renderAll();
  }

  // ==========================================================================
  // OPERAÇÕES DE PRODUTO & MODAIS DE FORMULÁRIO
  // ==========================================================================

  // Abre Modal de Regular Quantidade
  openAdjustModal(productId) {
    const p = this.products.find(item => item.id === productId);
    if (!p) return;

    const dialog = document.getElementById('modalAdjustQuantity');
    if (!dialog) return;

    document.getElementById('adjustProductId').value = p.id;
    document.getElementById('adjustModalTitle').textContent = `Regular: ${p.name}`;
    document.getElementById('adjustModalSubtitle').textContent = `Categoria: ${p.category} | SKU: ${p.sku || '--'}`;

    document.getElementById('adjustCurrentLoja').textContent = p.qtyLoja;
    document.getElementById('adjustCurrentEstoque').textContent = p.qtyEstoque;

    document.getElementById('adjustInputLoja').value = p.qtyLoja;
    document.getElementById('adjustInputEstoque').value = p.qtyEstoque;
    document.getElementById('adjustMinStock').value = p.minStock;

    dialog.showModal();
  }

  saveQuantityAdjustment() {
    const id = document.getElementById('adjustProductId').value;
    const p = this.products.find(item => item.id === id);
    if (!p) return;

    const newLoja = Math.max(0, parseInt(document.getElementById('adjustInputLoja').value, 10) || 0);
    const newEstoque = Math.max(0, parseInt(document.getElementById('adjustInputEstoque').value, 10) || 0);
    const newMin = Math.max(1, parseInt(document.getElementById('adjustMinStock').value, 10) || 1);
    const reason = document.getElementById('adjustReason').value;

    p.qtyLoja = newLoja;
    p.qtyEstoque = newEstoque;
    p.minStock = newMin;
    p.divergenceReason = reason;
    p.lastCountAt = new Date().toISOString();
    p.checkedInCycle = true;

    const dialog = document.getElementById('modalAdjustQuantity');
    if (dialog) dialog.close();

    audio.playCheck();
    this.checkStockWarning(p);
    this.saveProducts();
    this.renderAll();

    this.showToast(`Quantidades e estoque mínimo de "${p.name}" regularizados!`, 'success');
  }

  // Modal de Transferência Estoque -> Loja
  openTransferModal(productId) {
    const p = this.products.find(item => item.id === productId);
    if (!p) return;

    const dialog = document.getElementById('modalTransferStock');
    if (!dialog) return;

    document.getElementById('transferProductId').value = p.id;
    document.getElementById('transferModalTitle').textContent = `Transferir para Loja: ${p.name}`;
    document.getElementById('transferEstoqueAvailable').textContent = `${p.qtyEstoque} un no depósito`;
    document.getElementById('transferLojaCurrent').textContent = `${p.qtyLoja} un na loja`;
    document.getElementById('transferMaxHint').textContent = `Máximo transferível: ${p.qtyEstoque} unidades`;

    const inputQty = document.getElementById('transferQuantityInput');
    inputQty.max = p.qtyEstoque;
    inputQty.value = Math.min(p.qtyEstoque, 5);

    dialog.showModal();
  }

  saveTransferStock() {
    const id = document.getElementById('transferProductId').value;
    const p = this.products.find(item => item.id === id);
    if (!p) return;

    const transferQty = parseInt(document.getElementById('transferQuantityInput').value, 10) || 0;
    if (transferQty <= 0) {
      alert('Informe uma quantidade maior que zero.');
      return;
    }

    if (transferQty > p.qtyEstoque) {
      alert(`Quantidade informada (${transferQty}) é maior que o saldo em depósito (${p.qtyEstoque}).`);
      return;
    }

    p.qtyEstoque -= transferQty;
    p.qtyLoja += transferQty;
    p.lastCountAt = new Date().toISOString();

    const dialog = document.getElementById('modalTransferStock');
    if (dialog) dialog.close();

    audio.playSuccessChord();
    this.saveProducts();
    this.renderAll();

    this.showToast(`${transferQty} unidades transferidas do Depósito para a Frente de Loja!`, 'success');
  }

  // Modal de Cadastro/Edição de Produto
  openProductModal(productId = null) {
    const dialog = document.getElementById('modalProduct');
    const form = document.getElementById('formProduct');
    if (!dialog || !form) return;

    form.reset();

    if (productId) {
      const p = this.products.find(item => item.id === productId);
      if (p) {
        document.getElementById('productModalTitle').textContent = 'Editar Mercadoria';
        document.getElementById('prodEditId').value = p.id;
        document.getElementById('prodName').value = p.name;
        document.getElementById('prodCategory').value = p.category;
        document.getElementById('prodSku').value = p.sku || '';
        document.getElementById('prodBrand').value = p.brand || '';
        document.getElementById('prodSupplier').value = p.supplier || '';
        document.getElementById('prodQtyLoja').value = p.qtyLoja;
        document.getElementById('prodQtyEstoque').value = p.qtyEstoque;
        document.getElementById('prodMinStock').value = p.minStock;
        document.getElementById('prodDeliveryDays').value = p.leadTimeDays || 3;
        document.getElementById('prodLocation').value = p.location || '';
      }
    } else {
      document.getElementById('productModalTitle').textContent = 'Cadastrar Novo Item';
      document.getElementById('prodEditId').value = '';
    }

    dialog.showModal();
  }

  saveProductForm() {
    const editId = document.getElementById('prodEditId').value;
    const name = document.getElementById('prodName').value.trim();
    const category = document.getElementById('prodCategory').value;
    const sku = document.getElementById('prodSku').value.trim();
    const brand = document.getElementById('prodBrand').value.trim();
    const supplier = document.getElementById('prodSupplier').value.trim();
    const qtyLoja = Math.max(0, parseInt(document.getElementById('prodQtyLoja').value, 10) || 0);
    const qtyEstoque = Math.max(0, parseInt(document.getElementById('prodQtyEstoque').value, 10) || 0);
    const minStock = Math.max(1, parseInt(document.getElementById('prodMinStock').value, 10) || 5);
    const leadTimeDays = Math.max(1, parseInt(document.getElementById('prodDeliveryDays').value, 10) || 3);
    const location = document.getElementById('prodLocation').value.trim();

    if (!name) return;

    if (editId) {
      // Edição
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
        p.leadTimeDays = leadTimeDays;
        p.location = location;
      }
      this.showToast(`"${name}" atualizado com sucesso!`, 'success');
    } else {
      // Criação
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
        leadTimeDays,
        location,
        lastCountAt: new Date().toISOString(),
        checkedInCycle: true,
        baselineTotal: qtyLoja + qtyEstoque,
        divergenceReason: ''
      };
      this.products.unshift(newProduct);
      this.showToast(`"${name}" adicionado ao inventário!`, 'success');
    }

    const dialog = document.getElementById('modalProduct');
    if (dialog) dialog.close();

    audio.playCheck();
    this.saveProducts();
    this.renderAll();
  }

  // Modal de Nova Entrega
  openNewDeliveryModal(preselectProductId = null) {
    const dialog = document.getElementById('modalNewDelivery');
    const select = document.getElementById('delivProductId');
    if (!dialog || !select) return;

    select.innerHTML = this.products.map(p => `
      <option value="${p.id}" ${p.id === preselectProductId ? 'selected' : ''}>
        ${p.name} (Atual: ${p.qtyLoja + p.qtyEstoque} un)
      </option>
    `).join('');

    // Preenche fornecedor padrão com base no produto selecionado
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
    const productId = document.getElementById('delivProductId').value;
    const supplier = document.getElementById('delivSupplier').value.trim();
    const quantity = Math.max(1, parseInt(document.getElementById('delivQty').value, 10) || 1);
    const expectedDate = document.getElementById('delivExpectedDate').value;
    const orderNumber = document.getElementById('delivOrderNum').value.trim();

    if (!productId || !expectedDate) return;

    const newDelivery = {
      id: 'deliv-' + Date.now(),
      productId,
      supplier,
      orderNumber,
      quantity,
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
    this.renderStockTable();
    this.renderAlerts();

    this.showToast(`Previsão de entrega para ${this.formatDate(expectedDate)} salva com sucesso!`, 'success');
  }

  // ==========================================================================
  // NOTIFICAÇÕES (BROWSER NOTIFICATIONS & TOASTS)
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
      if (notifDot) notifDot.style.display = 'block';
      if (notifBtn) notifBtn.title = 'Clique para ativar notificações no seu navegador';
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

  // Verifica se o item caiu abaixo do estoque mínimo para disparar aviso
  checkStockWarning(product) {
    const total = (Number(product.qtyLoja) || 0) + (Number(product.qtyEstoque) || 0);
    const min = Number(product.minStock) || 0;

    if (total <= min) {
      audio.playAlertChord();
      this.showToast(`Atenção: "${product.name}" está prestes a acabar (${total} un / Mínimo: ${min})!`, 'danger');
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
      toast.style.transform = 'translateX(100%)';
      toast.style.transition = 'all 0.3s ease';
      setTimeout(() => toast.remove(), 300);
    }, 4000);
  }

  // ==========================================================================
  // EXPORTAÇÃO CSV
  // ==========================================================================

  exportCSV() {
    const headers = ['SKU', 'Produto', 'Categoria', 'Marca', 'Fornecedor', 'Qtd_Loja', 'Qtd_Estoque', 'Qtd_Total', 'Estoque_Minimo', 'Status', 'Ultima_Contagem'];
    
    const rows = this.products.map(p => {
      const qLoja = Number(p.qtyLoja) || 0;
      const qEstoque = Number(p.qtyEstoque) || 0;
      const total = qLoja + qEstoque;
      const min = Number(p.minStock) || 0;
      const status = total <= min ? 'Abaixo do Minimo' : 'Normal';

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
        `"${status}"`,
        `"${p.lastCountAt || ''}"`
      ];
    });

    const csvContent = '\uFEFF' + [headers.join(';'), ...rows.map(r => r.join(';'))].join('\r\n');
    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.setAttribute('download', `PetPiano_Inventario_${new Date().toISOString().slice(0, 10)}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);

    this.showToast('Relatório de inventário CSV exportado!', 'success');
  }

  // Utilitários de Data
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
    if (parts.length === 3) {
      return `${parts[2]}/${parts[1]}/${parts[0]}`;
    }
    return new Date(dateStr).toLocaleDateString('pt-BR');
  }
}

// Inicializa a aplicação e expõe globalmente para os manipuladores de evento inline
const app = new PetPianoApp();
window.app = app;
