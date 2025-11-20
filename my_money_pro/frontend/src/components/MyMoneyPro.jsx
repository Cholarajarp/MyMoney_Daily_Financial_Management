import React, { useState } from 'react';
import { 
  Home, TrendingUp, Target, Bell, Search, Plus, 
  ArrowUpRight, ArrowDownRight, Wallet, CreditCard, 
  Filter, Download, Eye, EyeOff, Repeat, 
  AlertCircle, CheckCircle, BarChart3, Zap, Award,
  ShoppingBag, Utensils, Car, Briefcase, 
  Heart, Gamepad, Coffee, Gift, Plane, PiggyBank,
  TrendingDown, Moon, Sun, X, Share2, Settings,
  Receipt, DollarSign, Users, MapPin, Calendar
} from 'lucide-react';
import { LineChart, Line, BarChart, Bar, PieChart as RePieChart, Pie, Cell, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Area, AreaChart, RadarChart, PolarGrid, PolarAngleAxis, PolarRadiusAxis, Radar } from 'recharts';

export default function MyMoneyPro() {
  const [activeTab, setActiveTab] = useState('overview');
  const [showQuickAdd, setShowQuickAdd] = useState(false);
  const [darkMode, setDarkMode] = useState(false);
  const [hideAmounts, setHideAmounts] = useState(false);
  const [selectedPeriod, setSelectedPeriod] = useState('month');
  const [showAIInsights, setShowAIInsights] = useState(true);
  
  const [transactions, setTransactions] = useState([
    { id: 1, type: 'expense', category: 'Food', amount: 850, merchant: 'Starbucks', date: '2025-11-20', time: '09:30 AM', location: 'MG Road', recurring: false, tags: ['coffee', 'morning'] },
    { id: 2, type: 'income', category: 'Salary', amount: 85000, merchant: 'Tech Corp', date: '2025-11-18', time: '12:00 PM', location: 'Bank Transfer', recurring: true, tags: ['work', 'monthly'] },
    { id: 3, type: 'expense', category: 'Transport', amount: 450, merchant: 'Uber', date: '2025-11-19', time: '06:45 PM', location: 'HSR Layout', recurring: false, tags: ['ride', 'work'] },
    { id: 4, type: 'expense', category: 'Shopping', amount: 3200, merchant: 'Amazon', date: '2025-11-17', time: '08:20 PM', location: 'Online', recurring: false, tags: ['gadgets', 'tech'] },
    { id: 5, type: 'expense', category: 'Food', amount: 1250, merchant: 'Swiggy', date: '2025-11-19', time: '09:15 PM', location: 'Home Delivery', recurring: false, tags: ['dinner', 'delivery'] },
    { id: 6, type: 'income', category: 'Freelance', amount: 15000, merchant: 'Client X', date: '2025-11-15', time: '02:30 PM', location: 'PayPal', recurring: false, tags: ['web design', 'project'] },
  ]);

  const [budgets, setBudgets] = useState([
    { category: 'Food', limit: 12000, spent: 6850, icon: 'Utensils', color: '#f97316' },
    { category: 'Transport', limit: 5000, spent: 3450, icon: 'Car', color: '#3b82f6' },
    { category: 'Shopping', limit: 10000, spent: 7200, icon: 'ShoppingBag', color: '#ec4899' },
    { category: 'Entertainment', limit: 4000, spent: 2800, icon: 'Gamepad', color: '#8b5cf6' },
  ]);

  const [savingsGoals, setSavingsGoals] = useState([
    { id: 1, name: 'Emergency Fund', target: 200000, current: 125000, deadline: '2025-12-31', priority: 'high', icon: '🛡️' },
    { id: 2, name: 'Vacation to Goa', target: 60000, current: 42000, deadline: '2025-06-30', priority: 'medium', icon: '✈️' },
    { id: 3, name: 'New MacBook Pro', target: 150000, current: 95000, deadline: '2025-04-30', priority: 'high', icon: '💻' },
    { id: 4, name: 'Investment Portfolio', target: 500000, current: 180000, deadline: '2025-12-31', priority: 'medium', icon: '📈' },
  ]);

  const [bills, setBills] = useState([
    { id: 1, name: 'Netflix', amount: 649, dueDate: '2025-11-25', status: 'pending', category: 'Entertainment', auto: true },
    { id: 2, name: 'Electricity', amount: 1200, dueDate: '2025-11-22', status: 'pending', category: 'Utilities', auto: false },
    { id: 3, name: 'Internet', amount: 999, dueDate: '2025-11-28', status: 'pending', category: 'Utilities', auto: true },
    { id: 4, name: 'Mobile Recharge', amount: 599, dueDate: '2025-11-24', status: 'paid', category: 'Utilities', auto: true },
  ]);

  const [newTransaction, setNewTransaction] = useState({
    type: 'expense',
    category: '',
    amount: '',
    description: '',
    date: new Date().toISOString().split('T')[0]
  });

  const categoryIcons = {
    Food: Utensils, 
    Transport: Car, 
    Shopping: ShoppingBag, 
    Entertainment: Gamepad,
    Bills: Receipt, 
    Healthcare: Heart, 
    Salary: Briefcase,
    Freelance: Briefcase
  };

  const totalIncome = transactions.filter(t => t.type === 'income').reduce((sum, t) => sum + t.amount, 0);
  const totalExpense = transactions.filter(t => t.type === 'expense').reduce((sum, t) => sum + t.amount, 0);
  const netSavings = totalIncome - totalExpense;
  const savingsRate = totalIncome > 0 ? ((netSavings / totalIncome) * 100).toFixed(1) : 0;

  const spendingTrend = [
    { month: 'Jun', spending: 45000, budget: 50000, savings: 25000 },
    { month: 'Jul', spending: 52000, budget: 50000, savings: 18000 },
    { month: 'Aug', spending: 48000, budget: 50000, savings: 20000 },
    { month: 'Sep', spending: 55000, budget: 50000, savings: 20000 },
    { month: 'Oct', spending: 51000, budget: 50000, savings: 21000 },
    { month: 'Nov', spending: 47000, budget: 50000, savings: 38000 },
  ];

  const categoryBreakdown = budgets.map(b => ({ name: b.category, value: b.spent }));
  
  const financialHealthScore = [
    { subject: 'Savings', A: 85, fullMark: 100 },
    { subject: 'Budget', A: 72, fullMark: 100 },
    { subject: 'Spending', A: 68, fullMark: 100 },
    { subject: 'Goals', A: 90, fullMark: 100 },
    { subject: 'Bills', A: 95, fullMark: 100 },
  ];

  const COLORS = ['#f97316', '#3b82f6', '#ec4899', '#8b5cf6', '#10b981', '#ef4444'];

  const formatAmount = (amount) => {
    if (hideAmounts) return '₹••,•••';
    return `₹${amount.toLocaleString()}`;
  };

  const getProgressColor = (percentage) => {
    if (percentage >= 90) return 'from-red-500 to-red-600';
    if (percentage >= 75) return 'from-orange-500 to-orange-600';
    if (percentage >= 50) return 'from-yellow-500 to-yellow-600';
    return 'from-green-500 to-green-600';
  };

  const aiInsights = [
    { type: 'warning', icon: AlertCircle, title: 'Budget Alert', message: 'You have spent 72% of your Shopping budget this month', action: 'Review' },
    { type: 'success', icon: TrendingUp, title: 'Great Job!', message: 'Your savings increased by 15% compared to last month', action: 'Details' },
    { type: 'tip', icon: Zap, title: 'Smart Tip', message: 'You can save ₹2,400/month by cooking at home 3x per week', action: 'Learn More' },
  ];

  const handleAddTransaction = () => {
    if (newTransaction.category && newTransaction.amount) {
      const transaction = {
        id: transactions.length + 1,
        ...newTransaction,
        amount: parseFloat(newTransaction.amount),
        merchant: 'Manual Entry',
        time: new Date().toLocaleTimeString(),
        location: 'Unknown',
        recurring: false,
        tags: []
      };
      setTransactions([transaction, ...transactions]);
      setNewTransaction({
        type: 'expense',
        category: '',
        amount: '',
        description: '',
        date: new Date().toISOString().split('T')[0]
      });
      setShowQuickAdd(false);
    }
  };

  const theme = darkMode ? {
    bg: 'bg-slate-950',
    cardBg: 'bg-slate-900',
    text: 'text-slate-50',
    textSec: 'text-slate-400',
    border: 'border-slate-800',
    hover: 'hover:bg-slate-800',
    input: 'bg-slate-800 border-slate-700'
  } : {
    bg: 'bg-gradient-to-br from-slate-50 via-blue-50 to-purple-50',
    cardBg: 'bg-white',
    text: 'text-slate-900',
    textSec: 'text-slate-600',
    border: 'border-slate-200',
    hover: 'hover:bg-slate-50',
    input: 'bg-white border-slate-200'
  };

  return (
    <div className={`min-h-screen ${theme.bg} transition-all duration-300`}>
      {/* Premium Header */}
      <header className={`${theme.cardBg} backdrop-blur-xl bg-opacity-80 sticky top-0 z-50 border-b ${theme.border} shadow-lg`}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center space-x-4">
              <div className="relative">
                <div className="absolute inset-0 bg-gradient-to-r from-blue-600 to-purple-600 rounded-2xl blur-lg opacity-50"></div>
                <div className="relative bg-gradient-to-r from-blue-600 to-purple-600 p-2.5 rounded-2xl">
                  <Wallet className="w-6 h-6 text-white" />
                </div>
              </div>
              <div>
                <h1 className={`text-xl font-bold ${theme.text}`}>MyMoney Pro</h1>
                <p className={`text-xs ${theme.textSec}`}>Smart Financial Manager</p>
              </div>
            </div>

            <div className="flex items-center space-x-3">
              <div className="relative hidden md:block">
                <Search className={`w-4 h-4 ${theme.textSec} absolute left-3 top-1/2 transform -translate-y-1/2`} />
                <input
                  type="text"
                  placeholder="Search transactions..."
                  className={`pl-10 pr-4 py-2 ${theme.input} border rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm w-64`}
                />
              </div>
              
              <button className={`p-2 ${theme.hover} rounded-xl transition-all relative`}>
                <Bell className="w-5 h-5" />
                <span className="absolute top-1 right-1 w-2 h-2 bg-red-500 rounded-full animate-pulse"></span>
              </button>

              <button 
                onClick={() => setHideAmounts(!hideAmounts)}
                className={`p-2 ${theme.hover} rounded-xl transition-all`}
              >
                {hideAmounts ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
              </button>

              <button 
                onClick={() => setDarkMode(!darkMode)}
                className={`p-2 ${theme.hover} rounded-xl transition-all`}
              >
                {darkMode ? <Sun className="w-5 h-5" /> : <Moon className="w-5 h-5" />}
              </button>

              <button 
                onClick={() => setShowQuickAdd(!showQuickAdd)}
                className="bg-gradient-to-r from-blue-600 to-purple-600 text-white px-4 py-2 rounded-xl flex items-center space-x-2 hover:shadow-xl transition-all transform hover:scale-105"
              >
                <Plus className="w-5 h-5" />
                <span className="font-medium hidden sm:inline">Quick Add</span>
              </button>
            </div>
          </div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        {/* Tab Navigation */}
        <div className={`${theme.cardBg} rounded-2xl p-1.5 mb-6 shadow-lg ${theme.border} border`}>
          <div className="grid grid-cols-5 gap-1">
            {[
              { id: 'overview', label: 'Overview', icon: Home },
              { id: 'transactions', label: 'Transactions', icon: Receipt },
              { id: 'budgets', label: 'Budgets', icon: Target },
              { id: 'goals', label: 'Goals', icon: Award },
              { id: 'insights', label: 'AI Insights', icon: Zap }
            ].map((tab) => {
              const Icon = tab.icon;
              return (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`flex flex-col sm:flex-row items-center justify-center space-y-1 sm:space-y-0 sm:space-x-2 py-3 px-4 rounded-xl transition-all duration-300 ${
                    activeTab === tab.id
                      ? 'bg-gradient-to-r from-blue-600 to-purple-600 text-white shadow-lg transform scale-105'
                      : `${theme.textSec} ${theme.hover}`
                  }`}
                >
                  <Icon className="w-5 h-5" />
                  <span className="text-xs sm:text-sm font-medium">{tab.label}</span>
                </button>
              );
            })}
          </div>
        </div>

        {/* Overview Tab */}
        {activeTab === 'overview' && (
          <div className="space-y-6">
            {/* Financial Summary Cards */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              <div className="relative overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-br from-blue-600 to-purple-600 opacity-10 blur-3xl"></div>
                <div className={`relative ${theme.cardBg} rounded-2xl p-6 border ${theme.border} shadow-xl hover:shadow-2xl transition-all`}>
                  <div className="flex justify-between items-start mb-4">
                    <div>
                      <p className={`text-sm ${theme.textSec} mb-1 font-medium`}>Total Balance</p>
                      <p className={`text-3xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent`}>
                        {formatAmount(netSavings)}
                      </p>
                    </div>
                    <div className="bg-gradient-to-br from-blue-500 to-purple-500 p-3 rounded-xl">
                      <Wallet className="w-6 h-6 text-white" />
                    </div>
                  </div>
                  <div className="flex items-center text-green-600 text-sm font-medium">
                    <ArrowUpRight className="w-4 h-4 mr-1" />
                    <span>+12.5% this month</span>
                  </div>
                </div>
              </div>

              <div className={`${theme.cardBg} rounded-2xl p-6 border ${theme.border} shadow-xl hover:shadow-2xl transition-all`}>
                <div className="flex justify-between items-start mb-4">
                  <div>
                    <p className={`text-sm ${theme.textSec} mb-1 font-medium`}>Income</p>
                    <p className="text-3xl font-bold text-green-600">{formatAmount(totalIncome)}</p>
                  </div>
                  <div className="bg-green-100 p-3 rounded-xl">
                    <TrendingUp className="w-6 h-6 text-green-600" />
                  </div>
                </div>
                <div className="flex items-center text-green-600 text-sm font-medium">
                  <ArrowUpRight className="w-4 h-4 mr-1" />
                  <span>+8.2% from last month</span>
                </div>
              </div>

              <div className={`${theme.cardBg} rounded-2xl p-6 border ${theme.border} shadow-xl hover:shadow-2xl transition-all`}>
                <div className="flex justify-between items-start mb-4">
                  <div>
                    <p className={`text-sm ${theme.textSec} mb-1 font-medium`}>Expenses</p>
                    <p className="text-3xl font-bold text-red-600">{formatAmount(totalExpense)}</p>
                  </div>
                  <div className="bg-red-100 p-3 rounded-xl">
                    <TrendingDown className="w-6 h-6 text-red-600" />
                  </div>
                </div>
                <div className="flex items-center text-red-600 text-sm font-medium">
                  <ArrowDownRight className="w-4 h-4 mr-1" />
                  <span>-3.8% from last month</span>
                </div>
              </div>

              <div className={`${theme.cardBg} rounded-2xl p-6 border ${theme.border} shadow-xl hover:shadow-2xl transition-all`}>
                <div className="flex justify-between items-start mb-4">
                  <div>
                    <p className={`text-sm ${theme.textSec} mb-1 font-medium`}>Savings Rate</p>
                    <p className="text-3xl font-bold text-purple-600">{savingsRate}%</p>
                  </div>
                  <div className="bg-purple-100 p-3 rounded-xl">
                    <PiggyBank className="w-6 h-6 text-purple-600" />
                  </div>
                </div>
                <div className="flex items-center text-purple-600 text-sm font-medium">
                  <CheckCircle className="w-4 h-4 mr-1" />
                  <span>Healthy savings!</span>
                </div>
              </div>
            </div>

            {/* AI Insights Banner */}
            {showAIInsights && (
              <div className={`${theme.cardBg} rounded-2xl p-6 border ${theme.border} shadow-xl`}>
                <div className="flex justify-between items-center mb-4">
                  <div className="flex items-center space-x-3">
                    <div className="bg-gradient-to-r from-blue-600 to-purple-600 p-2 rounded-xl">
                      <Zap className="w-5 h-5 text-white" />
                    </div>
                    <h3 className={`text-lg font-bold ${theme.text}`}>AI-Powered Insights</h3>
                  </div>
                  <button onClick={() => setShowAIInsights(false)} className={theme.textSec}>
                    <X className="w-5 h-5" />
                  </button>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  {aiInsights.map((insight, idx) => {
                    const Icon = insight.icon;
                    return (
                      <div key={idx} className={`p-4 rounded-xl border ${theme.border} ${theme.hover} transition-all`}>
                        <div className="flex items-start space-x-3">
                          <Icon className={`w-5 h-5 mt-1 ${
                            insight.type === 'warning' ? 'text-orange-500' : 
                            insight.type === 'success' ? 'text-green-500' : 'text-blue-500'
                          }`} />
                          <div className="flex-1">
                            <h4 className={`font-semibold ${theme.text} text-sm mb-1`}>{insight.title}</h4>
                            <p className={`text-xs ${theme.textSec} mb-3`}>{insight.message}</p>
                            <button className="text-xs text-blue-600 hover:text-blue-700 font-medium">
                              {insight.action} →
                            </button>
                          </div>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            )}

            {/* Charts Section */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              <div className={`lg:col-span-2 ${theme.cardBg} rounded-2xl p-6 border ${theme.border} shadow-xl`}>
                <div className="flex justify-between items-center mb-6">
                  <h3 className={`text-xl font-bold ${theme.text}`}>Spending Trend</h3>
                  <div className="flex space-x-2">
                    {['week', 'month', 'year'].map((period) => (
                      <button
                        key={period}
                        onClick={() => setSelectedPeriod(period)}
                        className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-all ${
                          selectedPeriod === period
                            ? 'bg-gradient-to-r from-blue-600 to-purple-600 text-white shadow-md'
                            : `${theme.textSec} ${theme.hover}`
                        }`}
                      >
                        {period.charAt(0).toUpperCase() + period.slice(1)}
                      </button>
                    ))}
                  </div>
                </div>
                <ResponsiveContainer width="100%" height={280}>
                  <AreaChart data={spendingTrend}>
                    <defs>
                      <linearGradient id="colorSpending" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="5%" stopColor="#ef4444" stopOpacity={0.3}/>
                        <stop offset="95%" stopColor="#ef4444" stopOpacity={0}/>
                      </linearGradient>
                      <linearGradient id="colorSavings" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="5%" stopColor="#10b981" stopOpacity={0.3}/>
                        <stop offset="95%" stopColor="#10b981" stopOpacity={0}/>
                      </linearGradient>
                    </defs>
                    <CartesianGrid strokeDasharray="3 3" stroke={darkMode ? '#334155' : '#e2e8f0'} />
                    <XAxis dataKey="month" stroke={darkMode ? '#94a3b8' : '#64748b'} />
                    <YAxis stroke={darkMode ? '#94a3b8' : '#64748b'} />
                    <Tooltip 
                      contentStyle={{ 
                        backgroundColor: darkMode ? '#1e293b' : '#ffffff',
                        border: `1px solid ${darkMode ? '#334155' : '#e2e8f0'}`,
                        borderRadius: '12px'
                      }}
                    />
                    <Area type="monotone" dataKey="spending" stroke="#ef4444" strokeWidth={2} fillOpacity={1} fill="url(#colorSpending)" />
                    <Area type="monotone" dataKey="savings" stroke="#10b981" strokeWidth={2} fillOpacity={1} fill="url(#colorSavings)" />
                  </AreaChart>
                </ResponsiveContainer>
              </div>

              <div className={`${theme.cardBg} rounded-2xl p-6 border ${theme.border} shadow-xl`}>
                <h3 className={`text-xl font-bold ${theme.text} mb-6`}>Category Split</h3>
                <ResponsiveContainer width="100%" height={280}>
                  <RePieChart>
                    <Pie
                      data={categoryBreakdown}
                      cx="50%"
                      cy="50%"
                      innerRadius={60}
                      outerRadius={100}
                      paddingAngle={3}
                      dataKey="value"
                    >
                      {categoryBreakdown.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                      ))}
                    </Pie>
                    <Tooltip 
                      contentStyle={{ 
                        backgroundColor: darkMode ? '#1e293b' : '#ffffff',
                        border: `1px solid ${darkMode ? '#334155' : '#e2e8f0'}`,
                        borderRadius: '12px'
                      }}
                    />
                  </RePieChart>
                </ResponsiveContainer>
              </div>
            </div>

            {/* Budget Progress & Upcoming Bills */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <div className={`${theme.cardBg} rounded-2xl p-6 border ${theme.border} shadow-xl`}>
                <div className="flex justify-between items-center mb-6">
                  <h3 className={`text-xl font-bold ${theme.text}`}>Budget Overview</h3>
                  <button className="text-blue-600 hover:text-blue-700 text-sm font-medium">
                    Manage →
                  </button>
                </div>
                <div className="space-y-5">
                  {budgets.map((budget, idx) => {
                    const IconComponent = categoryIcons[budget.category] || Wallet;
                    const percentage = (budget.spent / budget.limit) * 100;
                    return (
                      <div key={idx} className={`p-4 rounded-xl border ${theme.border} ${theme.hover} transition-all`}>
                        <div className="flex items-center justify-between mb-3">
                          <div className="flex items-center space-x-3">
                            <div className="p-2 rounded-lg" style={{ backgroundColor: `${budget.color}20` }}>
                              <IconComponent className="w-5 h-5" style={{ color: budget.color }} />
                            </div>
                            <div>
                              <p className={`font-semibold ${theme.text}`}>{budget.category}</p>
                              <p className={`text-xs ${theme.textSec}`}>
                                ₹{budget.spent.toLocaleString()} of ₹{budget.limit.toLocaleString()}
                              </p>
                            </div>
                          </div>
                          <span className={`text-sm font-bold ${percentage > 90 ? 'text-red-600' : 'text-green-600'}`}>
                            {percentage.toFixed(0)}%
                          </span>
                        </div>
                        <div className="w-full bg-slate-200 dark:bg-slate-800 rounded-full h-2 overflow-hidden">
                          <div
                            className={`h-full rounded-full bg-gradient-to-r ${getProgressColor(percentage)} transition-all duration-500`}
                            style={{ width: `${Math.min(percentage, 100)}%` }}
                          ></div>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>

              <div className={`${theme.cardBg} rounded-2xl p-6 border ${theme.border} shadow-xl`}>
                <div className="flex justify-between items-center mb-6">
                  <h3 className={`text-xl font-bold ${theme.text}`}>Upcoming Bills</h3>
                  <button className="text-blue-600 hover:text-blue-700 text-sm font-medium">
                    View All →
                  </button>
                </div>
                <div className="space-y-3">
                  {bills.filter(b => b.status === 'pending').map((bill) => (
                    <div key={bill.id} className={`p-4 rounded-xl border ${theme.border} ${theme.hover} transition-all flex items-center justify-between`}>
                      <div className="flex items-center space-x-3">
                        <div className={`p-2 rounded-lg ${bill.auto ? 'bg-green-100' : 'bg-orange-100'}`}>
                          <Receipt className={`w-5 h-5 ${bill.auto ? 'text-green-600' : 'text-orange-600'}`} />
                        </div>
                        <div>
                          <p className={`font-semibold ${theme.text}`}>{bill.name}</p>
                          <p className={`text-xs ${theme.textSec}`}>Due: {bill.dueDate}</p>
                        </div>
                      </div>
                      <div className="text-right">
                        <p className={`font-bold ${theme.text}`}>₹{bill.amount}</p>
                        {bill.auto && (
                          <span className="text-xs text-green-600 font-medium">Auto-pay</span>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Savings Goals Section */}
            <div className={`${theme.cardBg} rounded-2xl p-6 border ${theme.border} shadow-xl`}>
              <div className="flex justify-between items-center mb-6">
                <h3 className={`text-xl font-bold ${theme.text}`}>Savings Goals</h3>
                <button className="text-blue-600 hover:text-blue-700 text-sm font-medium">
                  Add Goal →
                </button>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                {savingsGoals.map((goal) => {
                  const progress = (goal.current / goal.target) * 100;
                  return (
                    <div key={goal.id} className={`p-5 rounded-xl border ${theme.border} ${theme.hover} transition-all`}>
                      <div className="flex justify-between items-start mb-4">
                        <span className="text-3xl">{goal.icon}</span>
                        <span className={`text-xs px-2 py-1 rounded-full ${
                          goal.priority === 'high' ? 'bg-red-100 text-red-700' : 'bg-blue-100 text-blue-700'
                        }`}>
                          {goal.priority}
                        </span>
                      </div>
                      <h4 className={`font-bold ${theme.text} mb-1`}>{goal.name}</h4>
                      <p className={`text-xs ${theme.textSec} mb-4`}>Target: {goal.deadline}</p>
                      <div className="mb-3">
                        <div className="flex justify-between text-xs mb-1">
                          <span className={theme.textSec}>₹{goal.current.toLocaleString()}</span>
                          <span className={theme.textSec}>₹{goal.target.toLocaleString()}</span>
                        </div>
                        <div className="w-full bg-slate-200 dark:bg-slate-800 rounded-full h-2 overflow-hidden">
                          <div
                            className="h-full bg-gradient-to-r from-blue-500 to-purple-600 rounded-full transition-all duration-500"
                            style={{ width: `${Math.min(progress, 100)}%` }}
                          ></div>
                        </div>
                      </div>
                      <p className={`text-sm font-bold ${theme.text}`}>{progress.toFixed(0)}% Complete</p>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Recent Transactions */}
            <div className={`${theme.cardBg} rounded-2xl p-6 border ${theme.border} shadow-xl`}>
              <div className="flex justify-between items-center mb-6">
                <h3 className={`text-xl font-bold ${theme.text}`}>Recent Transactions</h3>
                <button onClick={() => setActiveTab('transactions')} className="text-blue-600 hover:text-blue-700 text-sm font-medium">
                  View All →
                </button>
              </div>
              <div className="space-y-3">
                {transactions.slice(0, 5).map((transaction) => {
                  const IconComponent = categoryIcons[transaction.category] || Wallet;
                  return (
                    <div key={transaction.id} className={`p-4 rounded-xl border ${theme.border} ${theme.hover} transition-all flex items-center justify-between`}>
                      <div className="flex items-center space-x-4">
                        <div className={`p-3 rounded-xl ${transaction.type === 'income' ? 'bg-green-100' : 'bg-red-100'}`}>
                          <IconComponent className={`w-5 h-5 ${transaction.type === 'income' ? 'text-green-600' : 'text-red-600'}`} />
                        </div>
                        <div>
                          <p className={`font-semibold ${theme.text}`}>{transaction.merchant}</p>
                          <p className={`text-xs ${theme.textSec}`}>{transaction.category} • {transaction.time}</p>
                        </div>
                      </div>
                      <div className="text-right">
                        <p className={`font-bold text-lg ${transaction.type === 'income' ? 'text-green-600' : 'text-red-600'}`}>
                          {transaction.type === 'income' ? '+' : '-'}₹{transaction.amount.toLocaleString()}
                        </p>
                        <p className={`text-xs ${theme.textSec}`}>{transaction.date}</p>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        )}

        {/* Transactions Tab */}
        {activeTab === 'transactions' && (
          <div className={`${theme.cardBg} rounded-2xl p-6 border ${theme.border} shadow-xl`}>
            <div className="flex justify-between items-center mb-6">
              <h2 className={`text-2xl font-bold ${theme.text}`}>All Transactions</h2>
              <div className="flex space-x-3">
                <button className={`px-4 py-2 border ${theme.border} rounded-xl ${theme.hover} transition-all flex items-center space-x-2`}>
                  <Filter className="w-4 h-4" />
                  <span className="text-sm">Filter</span>
                </button>
                <button className={`px-4 py-2 border ${theme.border} rounded-xl ${theme.hover} transition-all flex items-center space-x-2`}>
                  <Download className="w-4 h-4" />
                  <span className="text-sm">Export</span>
                </button>
              </div>
            </div>
            <div className="space-y-3">
              {transactions.map((transaction) => {
                const IconComponent = categoryIcons[transaction.category] || Wallet;
                return (
                  <div key={transaction.id} className={`p-5 rounded-xl border ${theme.border} ${theme.hover} transition-all`}>
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-4">
                        <div className={`p-3 rounded-xl ${transaction.type === 'income' ? 'bg-green-100' : 'bg-red-100'}`}>
                          <IconComponent className={`w-6 h-6 ${transaction.type === 'income' ? 'text-green-600' : 'text-red-600'}`} />
                        </div>
                        <div>
                          <div className="flex items-center space-x-2 mb-1">
                            <p className={`font-bold ${theme.text}`}>{transaction.merchant}</p>
                            {transaction.recurring && (
                              <span className="bg-blue-100 text-blue-700 text-xs px-2 py-0.5 rounded-full flex items-center">
                                <Repeat className="w-3 h-3 mr-1" />
                                Recurring
                              </span>
                            )}
                          </div>
                          <p className={`text-sm ${theme.textSec}`}>{transaction.category} • {transaction.location}</p>
                          <div className="flex items-center space-x-2 mt-1">
                            {transaction.tags.map((tag, idx) => (
                              <span key={idx} className={`text-xs ${theme.textSec} bg-slate-100 dark:bg-slate-800 px-2 py-0.5 rounded`}>
                                #{tag}
                              </span>
                            ))}
                          </div>
                        </div>
                      </div>
                      <div className="text-right">
                        <p className={`font-bold text-2xl ${transaction.type === 'income' ? 'text-green-600' : 'text-red-600'}`}>
                          {transaction.type === 'income' ? '+' : '-'}₹{transaction.amount.toLocaleString()}
                        </p>
                        <p className={`text-sm ${theme.textSec}`}>{transaction.date} • {transaction.time}</p>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        )}

        {/* Budgets Tab */}
        {activeTab === 'budgets' && (
          <div className="space-y-6">
            <div className={`${theme.cardBg} rounded-2xl p-6 border ${theme.border} shadow-xl`}>
              <h2 className={`text-2xl font-bold ${theme.text} mb-6`}>Budget Management</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {budgets.map((budget, idx) => {
                  const IconComponent = categoryIcons[budget.category] || Wallet;
                  const percentage = (budget.spent / budget.limit) * 100;
                  const remaining = budget.limit - budget.spent;
                  return (
                    <div key={idx} className={`p-6 rounded-2xl border ${theme.border} ${theme.hover} transition-all`}>
                      <div className="flex items-center justify-between mb-4">
                        <div className="flex items-center space-x-3">
                          <div className="p-3 rounded-xl" style={{ backgroundColor: `${budget.color}20` }}>
                            <IconComponent className="w-6 h-6" style={{ color: budget.color }} />
                          </div>
                          <div>
                            <h3 className={`font-bold text-lg ${theme.text}`}>{budget.category}</h3>
                            <p className={`text-xs ${theme.textSec}`}>Monthly Budget</p>
                          </div>
                        </div>
                        <button className={`p-2 ${theme.hover} rounded-lg`}>
                          <Settings className="w-5 h-5" />
                        </button>
                      </div>
                      
                      <div className="mb-4">
                        <div className="flex justify-between mb-2">
                          <span className={`text-2xl font-bold ${theme.text}`}>₹{budget.spent.toLocaleString()}</span>
                          <span className={`text-sm ${theme.textSec}`}>of ₹{budget.limit.toLocaleString()}</span>
                        </div>
                        <div className="w-full bg-slate-200 dark:bg-slate-800 rounded-full h-3 overflow-hidden">
                          <div
                            className={`h-full rounded-full bg-gradient-to-r ${getProgressColor(percentage)} transition-all duration-500`}
                            style={{ width: `${Math.min(percentage, 100)}%` }}
                          ></div>
                        </div>
                      </div>

                      <div className="flex items-center justify-between pt-4 border-t border-slate-200 dark:border-slate-800">
                        <div>
                          <p className={`text-xs ${theme.textSec} mb-1`}>Remaining</p>
                          <p className={`font-bold ${remaining > 0 ? 'text-green-600' : 'text-red-600'}`}>
                            ₹{Math.abs(remaining).toLocaleString()}
                          </p>
                        </div>
                        <div>
                          <p className={`text-xs ${theme.textSec} mb-1`}>Progress</p>
                          <p className={`font-bold ${percentage > 90 ? 'text-red-600' : 'text-green-600'}`}>
                            {percentage.toFixed(0)}%
                          </p>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        )}

        {/* Goals Tab */}
        {activeTab === 'goals' && (
          <div className="space-y-6">
            <div className={`${theme.cardBg} rounded-2xl p-6 border ${theme.border} shadow-xl`}>
              <div className="flex justify-between items-center mb-6">
                <h2 className={`text-2xl font-bold ${theme.text}`}>Savings Goals</h2>
                <button className="bg-gradient-to-r from-blue-600 to-purple-600 text-white px-4 py-2 rounded-xl flex items-center space-x-2">
                  <Plus className="w-4 h-4" />
                  <span>New Goal</span>
                </button>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {savingsGoals.map((goal) => {
                  const progress = (goal.current / goal.target) * 100;
                  const remaining = goal.target - goal.current;
                  return (
                    <div key={goal.id} className={`p-6 rounded-2xl border ${theme.border} ${theme.hover} transition-all`}>
                      <div className="flex justify-between items-start mb-4">
                        <div className="flex items-center space-x-3">
                          <span className="text-4xl">{goal.icon}</span>
                          <div>
                            <h3 className={`font-bold text-lg ${theme.text}`}>{goal.name}</h3>
                            <p className={`text-xs ${theme.textSec}`}>Target: {goal.deadline}</p>
                          </div>
                        </div>
                        <span className={`text-xs px-3 py-1 rounded-full font-medium ${
                          goal.priority === 'high' 
                            ? 'bg-red-100 text-red-700' 
                            : 'bg-blue-100 text-blue-700'
                        }`}>
                          {goal.priority} priority
                        </span>
                      </div>

                      <div className="mb-4">
                        <div className="flex justify-between mb-2">
                          <span className={`text-2xl font-bold ${theme.text}`}>₹{goal.current.toLocaleString()}</span>
                          <span className={`text-sm ${theme.textSec}`}>of ₹{goal.target.toLocaleString()}</span>
                        </div>
                        <div className="w-full bg-slate-200 dark:bg-slate-800 rounded-full h-3 overflow-hidden">
                          <div
                            className="h-full bg-gradient-to-r from-blue-500 to-purple-600 rounded-full transition-all duration-500"
                            style={{ width: `${Math.min(progress, 100)}%` }}
                          ></div>
                        </div>
                      </div>

                      <div className="flex items-center justify-between pt-4 border-t border-slate-200 dark:border-slate-800">
                        <div>
                          <p className={`text-xs ${theme.textSec} mb-1`}>Remaining</p>
                          <p className={`font-bold text-orange-600`}>₹{remaining.toLocaleString()}</p>
                        </div>
                        <div>
                          <p className={`text-xs ${theme.textSec} mb-1`}>Completed</p>
                          <p className={`font-bold text-green-600`}>{progress.toFixed(1)}%</p>
                        </div>
                        <button className="bg-blue-100 text-blue-700 px-4 py-2 rounded-lg text-sm font-medium hover:bg-blue-200 transition-colors">
                          Add Funds
                        </button>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        )}

        {/* AI Insights Tab */}
        {activeTab === 'insights' && (
          <div className="space-y-6">
            <div className={`${theme.cardBg} rounded-2xl p-6 border ${theme.border} shadow-xl`}>
              <h2 className={`text-2xl font-bold ${theme.text} mb-2`}>Financial Health Score</h2>
              <p className={`${theme.textSec} mb-6`}>Your overall financial wellness rating</p>
              
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <div className="flex items-center justify-center">
                  <ResponsiveContainer width="100%" height={300}>
                    <RadarChart data={financialHealthScore}>
                      <PolarGrid stroke={darkMode ? '#334155' : '#e2e8f0'} />
                      <PolarAngleAxis dataKey="subject" stroke={darkMode ? '#94a3b8' : '#64748b'} />
                      <PolarRadiusAxis stroke={darkMode ? '#94a3b8' : '#64748b'} />
                      <Radar name="Score" dataKey="A" stroke="#3b82f6" fill="#3b82f6" fillOpacity={0.6} />
                    </RadarChart>
                  </ResponsiveContainer>
                </div>
                
                <div className="space-y-4">
                  {financialHealthScore.map((item, idx) => (
                    <div key={idx} className={`p-4 rounded-xl border ${theme.border}`}>
                      <div className="flex justify-between items-center mb-2">
                        <span className={`font-semibold ${theme.text}`}>{item.subject}</span>
                        <span className={`text-lg font-bold ${item.A >= 80 ? 'text-green-600' : item.A >= 60 ? 'text-yellow-600' : 'text-red-600'}`}>
                          {item.A}/100
                        </span>
                      </div>
                      <div className="w-full bg-slate-200 dark:bg-slate-800 rounded-full h-2">
                        <div
                          className={`h-full rounded-full ${item.A >= 80 ? 'bg-green-500' : item.A >= 60 ? 'bg-yellow-500' : 'bg-red-500'}`}
                          style={{ width: `${item.A}%` }}
                        ></div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            <div className={`${theme.cardBg} rounded-2xl p-6 border ${theme.border} shadow-xl`}>
              <h3 className={`text-xl font-bold ${theme.text} mb-6`}>AI Recommendations</h3>
              <div className="space-y-4">
                {aiInsights.map((insight, idx) => {
                  const Icon = insight.icon;
                  return (
                    <div key={idx} className={`p-5 rounded-xl border ${theme.border} ${theme.hover} transition-all`}>
                      <div className="flex items-start space-x-4">
                        <div className={`p-3 rounded-xl ${
                          insight.type === 'warning' ? 'bg-orange-100' : 
                          insight.type === 'success' ? 'bg-green-100' : 'bg-blue-100'
                        }`}>
                          <Icon className={`w-6 h-6 ${
                            insight.type === 'warning' ? 'text-orange-600' : 
                            insight.type === 'success' ? 'text-green-600' : 'text-blue-600'
                          }`} />
                        </div>
                        <div className="flex-1">
                          <h4 className={`font-bold ${theme.text} mb-1`}>{insight.title}</h4>
                          <p className={`${theme.textSec} mb-3`}>{insight.message}</p>
                          <button className="text-blue-600 hover:text-blue-700 font-medium text-sm">
                            {insight.action} →
                          </button>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Quick Add Modal */}
      {showQuickAdd && (
        <div className="fixed inset-0 bg-black bg-opacity-50 backdrop-blur-sm flex items-center justify-center z-50 p-4">
          <div className={`${theme.cardBg} rounded-2xl shadow-2xl max-w-md w-full p-6`}>
            <div className="flex justify-between items-center mb-6">
              <h2 className={`text-2xl font-bold ${theme.text}`}>Quick Add Transaction</h2>
              <button onClick={() => setShowQuickAdd(false)} className={`p-2 ${theme.hover} rounded-lg`}>
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="space-y-4">
              <div>
                <label className={`block text-sm font-medium ${theme.text} mb-2`}>Type</label>
                <div className="grid grid-cols-2 gap-3">
                  <button
                    onClick={() => setNewTransaction({...newTransaction, type: 'expense', category: ''})}
                    className={`py-3 rounded-xl font-medium transition-all ${
                      newTransaction.type === 'expense'
                        ? 'bg-red-500 text-white shadow-lg'
                        : `${theme.border} border ${theme.hover}`
                    }`}
                  >
                    Expense
                  </button>
                  <button
                    onClick={() => setNewTransaction({...newTransaction, type: 'income', category: ''})}
                    className={`py-3 rounded-xl font-medium transition-all ${
                      newTransaction.type === 'income'
                        ? 'bg-green-500 text-white shadow-lg'
                        : `${theme.border} border ${theme.hover}`
                    }`}
                  >
                    Income
                  </button>
                </div>
              </div>

              <div>
                <label className={`block text-sm font-medium ${theme.text} mb-2`}>Category</label>
                <select
                  value={newTransaction.category}
                  onChange={(e) => setNewTransaction({...newTransaction, category: e.target.value})}
                  className={`w-full px-4 py-3 ${theme.input} border rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500`}
                >
                  <option value="">Select category</option>
                  {newTransaction.type === 'expense' 
                    ? ['Food', 'Transport', 'Shopping', 'Entertainment', 'Bills', 'Healthcare'].map(cat => (
                        <option key={cat} value={cat}>{cat}</option>
                      ))
                    : ['Salary', 'Freelance', 'Investment', 'Business', 'Gift'].map(cat => (
                        <option key={cat} value={cat}>{cat}</option>
                      ))
                  }
                </select>
              </div>

              <div>
                <label className={`block text-sm font-medium ${theme.text} mb-2`}>Amount</label>
                <div className="relative">
                  <DollarSign className={`w-5 h-5 ${theme.textSec} absolute left-3 top-1/2 transform -translate-y-1/2`} />
                  <input
                    type="number"
                    value={newTransaction.amount}
                    onChange={(e) => setNewTransaction({...newTransaction, amount: e.target.value})}
                    placeholder="0.00"
                    className={`w-full pl-10 pr-4 py-3 ${theme.input} border rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500`}
                  />
                </div>
              </div>

              <div>
                <label className={`block text-sm font-medium ${theme.text} mb-2`}>Description</label>
                <input
                  type="text"
                  value={newTransaction.description}
                  onChange={(e) => setNewTransaction({...newTransaction, description: e.target.value})}
                  placeholder="Enter description"
                  className={`w-full px-4 py-3 ${theme.input} border rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500`}
                />
              </div>

              <div>
                <label className={`block text-sm font-medium ${theme.text} mb-2`}>Date</label>
                <input
                  type="date"
                  value={newTransaction.date}
                  onChange={(e) => setNewTransaction({...newTransaction, date: e.target.value})}
                  className={`w-full px-4 py-3 ${theme.input} border rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500`}
                />
              </div>
            </div>

            <div className="flex space-x-3 mt-6">
              <button
                onClick={() => setShowQuickAdd(false)}
                className={`flex-1 px-4 py-3 border ${theme.border} rounded-xl font-medium ${theme.hover} transition-all`}
              >
                Cancel
              </button>
              <button
                onClick={handleAddTransaction}
                className="flex-1 px-4 py-3 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-xl font-medium hover:shadow-xl transition-all"
              >
                Add Transaction
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
