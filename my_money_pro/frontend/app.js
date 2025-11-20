// Configuration
const API_URL = 'http://localhost:8000';
let isDarkMode = false;
let hideAmounts = false;
let currentView = 'overview';

// DOM Elements
const els = {
    header: document.getElementById('main-header'),
    tabContainer: document.getElementById('tab-container'),
    statsContainer: document.getElementById('stats-container'),
    insightsContainer: document.getElementById('insights-container'),
    budgetsList: document.getElementById('budgets-list'),
    transactionsList: document.getElementById('transactions-list'),
    modal: document.getElementById('modal-add'),
    form: document.getElementById('form-add')
};

// State
let dashboardData = null;

// Initialization
document.addEventListener('DOMContentLoaded', async () => {
    lucide.createIcons();
    setupTheme();
    setupEventListeners();
    await loadDashboard();
    setupTabs();
});

// 1. Data Fetching
async function loadDashboard() {
    try {
        const res = await fetch(`${API_URL}/dashboard`);
        dashboardData = await res.json();
        renderStats();
        renderCharts();
        renderBudgets();
        loadInsights();
        loadTransactions();
    } catch (err) {
        console.error("API Error", err);
    }
}

async function loadInsights() {
    const res = await fetch(`${API_URL}/insights`);
    const data = await res.json();
    els.insightsContainer.innerHTML = data.map(i => `
        <div class="p-3 rounded-xl border ${i.type === 'warning' ? 'bg-orange-50 border-orange-200 text-orange-800' : i.type === 'success' ? 'bg-green-50 border-green-200 text-green-800' : 'bg-blue-50 border-blue-200 text-blue-800'}">
            <h4 class="font-bold text-sm">${i.title}</h4>
            <p class="text-xs mt-1 opacity-90">${i.message}</p>
        </div>
    `).join('');
}

async function loadTransactions() {
    const res = await fetch(`${API_URL}/transactions`);
    const txs = await res.json();
    
    els.transactionsList.innerHTML = txs.map(t => `
        <div class="flex items-center justify-between p-4 border-b dark:border-gray-700 last:border-0">
            <div class="flex items-center gap-4">
                <div class="p-3 rounded-xl ${t.type === 'income' ? 'bg-green-100 text-green-600' : 'bg-red-100 text-red-600'}">
                    <i data-lucide="${t.type === 'income' ? 'arrow-up' : 'arrow-down'}" class="w-5 h-5"></i>
                </div>
                <div>
                    <p class="font-bold">${t.merchant}</p>
                    <p class="text-xs opacity-60">${t.category} • ${t.date}</p>
                </div>
            </div>
            <div class="text-right">
                <p class="font-bold ${t.type === 'income' ? 'text-green-600' : 'text-red-600'} ${hideAmounts ? 'blur-text' : ''}">
                    ${t.type === 'income' ? '+' : '-'}₹${t.amount}
                </p>
            </div>
        </div>
    `).join('');
    lucide.createIcons();
}

// 2. Rendering Logic
function formatMoney(amount) {
    if (hideAmounts) return '₹•••';
    return `₹${amount.toLocaleString('en-IN')}`;
}

function renderStats() {
    const { total_income, total_expense, net_savings } = dashboardData;
    const cards = [
        { label: 'Total Balance', val: net_savings, color: 'text-blue-600', icon: 'wallet' },
        { label: 'Income', val: total_income, color: 'text-green-600', icon: 'trending-up' },
        { label: 'Expenses', val: total_expense, color: 'text-red-600', icon: 'trending-down' },
        { label: 'Savings Rate', val: total_income ? ((net_savings/total_income)*100).toFixed(1) + '%' : '0%', color: 'text-purple-600', icon: 'percent' }
    ];

    els.statsContainer.innerHTML = cards.map(c => `
        <div class="card p-6 relative overflow-hidden">
            <div class="relative z-10">
                <p class="text-sm opacity-60 font-medium mb-1">${c.label}</p>
                <p class="text-2xl font-bold ${c.color} ${c.label !== 'Savings Rate' && hideAmounts ? 'blur-text' : ''}">
                    ${c.label === 'Savings Rate' ? c.val : formatMoney(c.val)}
                </p>
            </div>
            <i data-lucide="${c.icon}" class="absolute bottom-4 right-4 w-8 h-8 opacity-10 ${c.color}"></i>
        </div>
    `).join('');
    lucide.createIcons();
}

function renderBudgets() {
    els.budgetsList.innerHTML = dashboardData.category_split.map(c => {
        // Mock limits based on category for demo visualization (since aggregate doesn't return limit yet)
        const limit = c.name === 'Food' ? 12000 : 10000; 
        const pct = Math.min((c.value / limit) * 100, 100);
        return `
        <div>
            <div class="flex justify-between text-sm mb-1">
                <span class="font-medium">${c.name}</span>
                <span class="${pct > 90 ? 'text-red-500' : 'text-green-500'} font-bold">${pct.toFixed(0)}%</span>
            </div>
            <div class="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2.5">
                <div class="h-2.5 rounded-full transition-all duration-500 ${pct > 90 ? 'bg-red-500' : 'bg-blue-500'}" style="width: ${pct}%"></div>
            </div>
        </div>
    `}).join('');
}

// 3. Charts (Chart.js)
let charts = {};

function renderCharts() {
    const ctxTrend = document.getElementById('chart-trend').getContext('2d');
    const ctxPie = document.getElementById('chart-pie').getContext('2d');
    const ctxRadar = document.getElementById('chart-radar').getContext('2d');

    // Destroy old charts if re-rendering
    Object.values(charts).forEach(c => c.destroy());

    // Trend Area Chart
    charts.trend = new Chart(ctxTrend, {
        type: 'line',
        data: {
            labels: dashboardData.spending_trend.map(d => d.month),
            datasets: [{
                label: 'Spending',
                data: dashboardData.spending_trend.map(d => d.spending),
                borderColor: '#ef4444',
                backgroundColor: 'rgba(239, 68, 68, 0.1)',
                fill: true,
                tension: 0.4
            }, {
                label: 'Savings',
                data: dashboardData.spending_trend.map(d => d.savings),
                borderColor: '#10b981',
                backgroundColor: 'rgba(16, 185, 129, 0.1)',
                fill: true,
                tension: 0.4
            }]
        },
        options: { responsive: true, maintainAspectRatio: false, plugins: { legend: { display: false } } }
    });

    // Category Pie
    charts.pie = new Chart(ctxPie, {
        type: 'doughnut',
        data: {
            labels: dashboardData.category_split.map(d => d.name),
            datasets: [{
                data: dashboardData.category_split.map(d => d.value),
                backgroundColor: ['#f97316', '#3b82f6', '#ec4899', '#8b5cf6'],
                borderWidth: 0
            }]
        },
        options: { responsive: true, maintainAspectRatio: false }
    });

    // Health Radar
    const healthData = dashboardData.health_score_data;
    charts.radar = new Chart(ctxRadar, {
        type: 'radar',
        data: {
            labels: healthData.map(d => d.subject),
            datasets: [{
                label: 'Health Score',
                data: healthData.map(d => d.A),
                backgroundColor: 'rgba(59, 130, 246, 0.2)',
                borderColor: '#3b82f6',
                pointBackgroundColor: '#3b82f6'
            }]
        },
        options: { 
            responsive: true, 
            scales: { r: { min: 0, max: 100, grid: { color: isDarkMode ? '#334155' : '#e2e8f0' } } }
        }
    });
}

// 4. UI Interactions
function setupTheme() {
    const toggle = document.getElementById('toggle-theme');
    toggle.addEventListener('click', () => {
        isDarkMode = !isDarkMode;
        document.body.className = isDarkMode ? 'dark' : 'light';
        // Re-render charts for color update
        if(dashboardData) renderCharts();
    });
}

function setupEventListeners() {
    // Mask Amounts
    document.getElementById('toggle-amounts').addEventListener('click', () => {
        hideAmounts = !hideAmounts;
        renderStats();
        loadTransactions(); // Re-render list
    });

    // Modal Logic
    const modal = document.getElementById('modal-add');
    document.getElementById('btn-quick-add').addEventListener('click', () => modal.classList.add('active'));
    document.getElementById('close-modal').addEventListener('click', () => modal.classList.remove('active'));

    // Form Submission
    els.form.addEventListener('submit', async (e) => {
        e.preventDefault();
        const typeBtn = document.querySelector('.type-btn.active-type');
        const type = typeBtn.dataset.type;
        
        const payload = {
            type: type,
            amount: parseFloat(document.getElementById('inp-amount').value),
            merchant: document.getElementById('inp-merchant').value,
            category: document.getElementById('inp-category').value,
            date: document.getElementById('inp-date').value,
            time: new Date().toLocaleTimeString(),
            tags: "",
            recurring: false
        };

        await fetch(`${API_URL}/transactions`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(payload)
        });

        modal.classList.remove('active');
        els.form.reset();
        await loadDashboard(); // Refresh data
    });

    // Type Toggle in Form
    document.querySelectorAll('.type-btn').forEach(btn => {
        btn.addEventListener('click', (e) => {
            document.querySelectorAll('.type-btn').forEach(b => {
                b.classList.remove('active-type', 'bg-red-500', 'bg-green-500', 'text-white');
            });
            e.target.classList.add('active-type', 'text-white', e.target.dataset.type === 'expense' ? 'bg-red-500' : 'bg-green-500');
        });
    });
}

function setupTabs() {
    const tabs = [
        { id: 'overview', label: 'Overview', icon: 'home' },
        { id: 'transactions', label: 'Transactions', icon: 'receipt' },
        { id: 'budgets', label: 'Budgets', icon: 'target' },
    ];

    els.tabContainer.innerHTML = tabs.map(t => `
        <button class="tab-btn flex flex-col items-center justify-center py-2 rounded-xl transition ${currentView === t.id ? 'bg-gradient-to-r from-blue-600 to-purple-600 text-white shadow-lg' : 'text-gray-500 hover:bg-gray-100 dark:hover:bg-gray-800'}" onclick="switchTab('${t.id}')">
            <i data-lucide="${t.icon}" class="w-5 h-5 mb-1"></i>
            <span class="text-xs font-medium">${t.label}</span>
        </button>
    `).join('');
    lucide.createIcons();
}

window.switchTab = (tabId) => {
    currentView = tabId;
    setupTabs(); // Re-render active state
    
    // Simple visibility logic
    if(tabId === 'overview') {
        document.getElementById('view-overview').classList.remove('hidden');
        document.getElementById('view-transactions').classList.add('hidden');
    } else if (tabId === 'transactions') {
        document.getElementById('view-overview').classList.add('hidden');
        document.getElementById('view-transactions').classList.remove('hidden');
    }
};
