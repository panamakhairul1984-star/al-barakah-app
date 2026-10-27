// ============================================================
// Al Barakah Group - Business Management App
// Offline-first PWA for property lease & subletting management
// ============================================================

const STORAGE_KEY = 'albarakah_data_v1';
const PIN_KEY = 'albarakah_pin';
const DEFAULT_CONTRIB = 6100;

// Role & Lock state
let currentRole = 'admin'; // 'admin' | 'viewer'
let pinBuffer = '';
let isLocked = false;

// -------------------- i18n --------------------
const i18n = {
  en: {
    appTitle: 'Al Barakah',
    navDashboard: 'Home',
    navMembers: 'Members',
    navFinance: 'Finance',
    navReports: 'Reports',
    navDocs: 'Docs',
    navSettings: 'Settings',
    txtRecentTxn: 'Recent Transactions',
    txtQuickActions: 'Quick Actions',
    txtMembers: 'Members',
    txtTransactions: 'Transactions',
    txtDocuments: 'Documents',
    txtSettings: 'Settings',
    txtLanguage: 'Language / ভাষা',
    txtMonthlyContribution: 'Monthly Contribution (BDT)',
    totalBalance: 'Total Balance',
    thisMonthIncome: 'This Month Income',
    thisMonthExpense: 'This Month Expense',
    pendingDues: 'Pending Dues',
    membersPaid: 'Members Paid',
    noTransactions: 'No transactions yet',
    noMembers: 'No members yet. Add your first member.',
    noDocs: 'No documents yet. Upload the group constitution or other PDFs.',
    addIncome: 'Add Income',
    addExpense: 'Add Expense',
    addContribution: 'Record Contribution',
    addMember: 'Add Member',
    addTxn: 'Add Transaction',
    save: 'Save',
    cancel: 'Cancel',
    delete: 'Delete',
    edit: 'Edit',
    name: 'Full Name',
    phone: 'Phone Number',
    joinDate: 'Join Date',
    photo: 'Photo',
    amount: 'Amount (BDT)',
    category: 'Category',
    date: 'Date',
    note: 'Note / Description',
    type: 'Type',
    income: 'Income',
    expense: 'Expense',
    contribution: 'Contribution',
    paid: 'Paid',
    pending: 'Pending',
    shareReport: 'Share Report',
    dailyReport: 'Daily Cash Summary',
    monthlyReport: 'Monthly Financial Statement',
    contribReport: 'Member Contribution Report',
    openingBalance: 'Opening Balance',
    closingBalance: 'Closing Balance',
    totalIncome: 'Total Income',
    totalExpense: 'Total Expense',
    net: 'Net',
    confirmReset: 'Are you sure you want to delete ALL data? This cannot be undone.',
    dataExported: 'Data exported successfully',
    dataImported: 'Data imported successfully',
    dataReset: 'All data has been reset',
    saved: 'Saved successfully',
    deleted: 'Deleted',
    memberAdded: 'Member added',
    txnAdded: 'Transaction recorded',
    docUploaded: 'Document uploaded',
    offlineMode: 'You are offline. Changes will sync when online.',
    selectMember: 'Select Member',
    allCategories: 'All Categories',
    rent: 'Shop / Property Rent',
    advance: 'Advance Deposit',
    otherIncome: 'Other Income',
    leasePayment: 'Lease Payment',
    maintenance: 'Maintenance & Repairs',
    utility: 'Utilities',
    legal: 'Legal & Admin',
    bankCharge: 'Bank Charges',
    otherExpense: 'Other Expense',
    searchMembers: 'Search members...',
    viewAll: 'View All',
    exportData: 'Export All Data (JSON)',
    importData: 'Import Data',
    resetData: 'Reset All Data',
    about: 'About',
    enterPin: 'Enter PIN to unlock',
    wrongPin: 'Wrong PIN',
    viewOnly: 'View Only Mode',
    pinSet: 'PIN set successfully',
    pinRemoved: 'PIN removed',
    pinRequired: 'Enter 4-6 digit PIN',
    admin: 'Admin',
    viewer: 'Viewer',
    lockApp: 'Lock',
    setPin: 'Set PIN',
    removePin: 'Remove PIN',
    pinLabel: 'Admin PIN (4-6 digits)',
    noPermission: 'Only Admin can do this',
    clearTransactions: 'Clear All Transactions',
    confirmClearTxns: 'Are you sure you want to delete ALL transactions? Member list will remain. This cannot be undone.',
    txnsCleared: 'All transactions cleared',
  },
  bn: {
    appTitle: 'আল বারাকাহ',
    navDashboard: 'হোম',
    navMembers: 'সদস্য',
    navFinance: 'হিসাব',
    navReports: 'রিপোর্ট',
    navDocs: 'ডকুমেন্ট',
    navSettings: 'সেটিংস',
    txtRecentTxn: 'সাম্প্রতিক লেনদেন',
    txtQuickActions: 'দ্রুত কাজ',
    txtMembers: 'সদস্যবৃন্দ',
    txtTransactions: 'লেনদেনসমূহ',
    txtDocuments: 'ডকুমেন্টসমূহ',
    txtSettings: 'সেটিংস',
    txtLanguage: 'Language / ভাষা',
    txtMonthlyContribution: 'মাসিক চাঁদা (টাকা)',
    totalBalance: 'মোট ব্যালেন্স',
    thisMonthIncome: 'এই মাসের আয়',
    thisMonthExpense: 'এই মাসের খরচ',
    pendingDues: 'বকেয়া চাঁদা',
    membersPaid: 'চাঁদা পরিশোধ',
    noTransactions: 'এখনো কোনো লেনদেন নেই',
    noMembers: 'এখনো কোনো সদস্য নেই। প্রথম সদস্য যোগ করুন।',
    noDocs: 'এখনো কোনো ডকুমেন্ট নেই। সংবিধান বা অন্যান্য পিডিএফ আপলোড করুন।',
    addIncome: 'আয় যোগ করুন',
    addExpense: 'খরচ যোগ করুন',
    addContribution: 'চাঁদা রেকর্ড করুন',
    addMember: 'সদস্য যোগ করুন',
    addTxn: 'লেনদেন যোগ করুন',
    save: 'সংরক্ষণ',
    cancel: 'বাতিল',
    delete: 'মুছুন',
    edit: 'সম্পাদনা',
    name: 'পুরো নাম',
    phone: 'মোবাইল নম্বর',
    joinDate: 'যোগদানের তারিখ',
    photo: 'ছবি',
    amount: 'পরিমাণ (টাকা)',
    category: 'ক্যাটাগরি',
    date: 'তারিখ',
    note: 'নোট / বিবরণ',
    type: 'ধরন',
    income: 'আয়',
    expense: 'খরচ',
    contribution: 'চাঁদা',
    paid: 'পরিশোধিত',
    pending: 'বকেয়া',
    shareReport: 'রিপোর্ট শেয়ার করুন',
    dailyReport: 'দৈনিক নগদ সারসংক্ষেপ',
    monthlyReport: 'মাসিক আর্থিক বিবরণী',
    contribReport: 'সদস্য চাঁদা রিপোর্ট',
    openingBalance: 'শুরুর ব্যালেন্স',
    closingBalance: 'শেষ ব্যালেন্স',
    totalIncome: 'মোট আয়',
    totalExpense: 'মোট খরচ',
    net: 'নিট',
    confirmReset: 'আপনি কি সব ডেটা মুছে ফেলতে চান? এটি পূর্বাবস্থায় ফেরানো যাবে না।',
    dataExported: 'ডেটা সফলভাবে এক্সপোর্ট হয়েছে',
    dataImported: 'ডেটা সফলভাবে ইমপোর্ট হয়েছে',
    dataReset: 'সব ডেটা রিসেট করা হয়েছে',
    saved: 'সফলভাবে সংরক্ষিত',
    deleted: 'মুছে ফেলা হয়েছে',
    memberAdded: 'সদস্য যোগ করা হয়েছে',
    txnAdded: 'লেনদেন রেকর্ড করা হয়েছে',
    docUploaded: 'ডকুমেন্ট আপলোড হয়েছে',
    offlineMode: 'আপনি অফলাইনে আছেন। অনলাইনে এলে পরিবর্তন সিঙ্ক হবে।',
    selectMember: 'সদস্য নির্বাচন করুন',
    allCategories: 'সব ক্যাটাগরি',
    rent: 'দোকান / সম্পত্তি ভাড়া',
    advance: 'অগ্রিম জমা',
    otherIncome: 'অন্যান্য আয়',
    leasePayment: 'লিজ পেমেন্ট',
    maintenance: 'রক্ষণাবেক্ষণ ও মেরামত',
    utility: 'ইউটিলিটি',
    legal: 'আইনি ও প্রশাসনিক',
    bankCharge: 'ব্যাংক চার্জ',
    otherExpense: 'অন্যান্য খরচ',
    searchMembers: 'সদস্য খুঁজুন...',
    viewAll: 'সব দেখুন',
    exportData: 'সব ডেটা এক্সপোর্ট (JSON)',
    importData: 'ডেটা ইমপোর্ট',
    resetData: 'সব ডেটা রিসেট',
    about: 'সম্পর্কে',
    enterPin: 'আনলক করতে পিন দিন',
    wrongPin: 'ভুল পিন',
    viewOnly: 'শুধু দেখার মোড',
    pinSet: 'পিন সফলভাবে সেট হয়েছে',
    pinRemoved: 'পিন মুছে ফেলা হয়েছে',
    pinRequired: '৪-৬ সংখ্যার পিন দিন',
    admin: 'অ্যাডমিন',
    viewer: 'দর্শক',
    lockApp: 'লক',
    setPin: 'পিন সেট করুন',
    removePin: 'পিন মুছুন',
    pinLabel: 'অ্যাডমিন পিন (৪-৬ সংখ্যা)',
    noPermission: 'শুধুমাত্র অ্যাডমিন এটি করতে পারবেন',
    clearTransactions: 'সব লেনদেন মুছুন',
    confirmClearTxns: 'আপনি কি সব লেনদেন মুছে ফেলতে চান? সদস্য তালিকা থাকবে। এটি পূর্বাবস্থায় ফেরানো যাবে না।',
    txnsCleared: 'সব লেনদেন মুছে ফেলা হয়েছে',
  }
};

let lang = localStorage.getItem('albarakah_lang') || 'en';
let data = null;
let currentView = 'dashboard';
let currentTxnFilter = 'all';
let currentReport = 'daily';
let tempPhoto = null;

// -------------------- Data Management --------------------
function loadData() {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (raw) {
      data = JSON.parse(raw);
      // Ensure new fields exist
      if (data.settings.openingBalance === undefined) {
        data.settings.openingBalance = 0;
      }
    } else {
      data = getDefaultData();
      saveData();
    }
  } catch (e) {
    console.error(e);
    data = getDefaultData();
  }
}

function getDefaultData() {
  const now = new Date().toISOString().slice(0, 10);
  return {
    settings: {
      businessName: 'Al Barakah Group',
      monthlyContribution: DEFAULT_CONTRIB,
      openingBalance: 0,
      address: 'Shibganj Bus Stand, Shibganj, Chapainawabganj'
    },
    members: [
      { id: 'm1', name: 'Abdul Karim', phone: '01711-000001', joinDate: '2024-01-15', photo: null, status: 'active' },
      { id: 'm2', name: 'Fatema Begum', phone: '01711-000002', joinDate: '2024-01-15', photo: null, status: 'active' },
      { id: 'm3', name: 'Mohammad Rafiq', phone: '01711-000003', joinDate: '2024-02-01', photo: null, status: 'active' },
      { id: 'm4', name: 'Ayesha Khatun', phone: '01711-000004', joinDate: '2024-02-10', photo: null, status: 'active' },
      { id: 'm5', name: 'Jahangir Alam', phone: '01711-000005', joinDate: '2024-03-05', photo: null, status: 'active' },
    ],
    transactions: [
      { id: 't1', type: 'income', category: 'rent', amount: 25000, date: now, note: 'Shop rent - Unit A', memberId: null },
      { id: 't2', type: 'expense', category: 'leasePayment', amount: 18000, date: now, note: 'Monthly lease to owner', memberId: null },
      { id: 't3', type: 'contribution', category: 'contribution', amount: 6100, date: now, note: 'Monthly contribution', memberId: 'm1' },
      { id: 't4', type: 'contribution', category: 'contribution', amount: 6100, date: now, note: 'Monthly contribution', memberId: 'm2' },
    ],
    documents: [],
    createdAt: new Date().toISOString()
  };
}

function saveData() {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
}

// -------------------- Translation --------------------
function t(key) {
  return (i18n[lang] && i18n[lang][key]) || i18n.en[key] || key;
}

function applyTranslations() {
  const map = {
    appTitle: 'appTitle',
    navDashboard: 'navDashboard',
    navMembers: 'navMembers',
    navFinance: 'navFinance',
    navReports: 'navReports',
    navDocs: 'navDocs',
    navSettings: 'navSettings',
    txtRecentTxn: 'txtRecentTxn',
    txtQuickActions: 'txtQuickActions',
    txtMembers: 'txtMembers',
    txtTransactions: 'txtTransactions',
    txtDocuments: 'txtDocuments',
    txtSettings: 'txtSettings',
    txtLanguage: 'txtLanguage',
    txtMonthlyContribution: 'txtMonthlyContribution',
  };
  Object.keys(map).forEach(id => {
    const el = document.getElementById(id);
    if (el) el.textContent = t(map[id]);
  });
  document.getElementById('langBtn').textContent = lang === 'en' ? 'বাংলা' : 'English';
  document.getElementById('langSelect').value = lang;
  const searchEl = document.getElementById('memberSearch');
  if (searchEl) searchEl.placeholder = t('searchMembers');
  const membersTitle = document.getElementById('txtMembers');
  if (membersTitle && data) membersTitle.textContent = `${t('txtMembers')} (${data.members.length})`;

  // Lock screen texts
  const lockSub = document.getElementById('lockSubtitle');
  if (lockSub) lockSub.textContent = t('enterPin');
  const viewerBtn = document.getElementById('viewerBtn');
  if (viewerBtn) viewerBtn.textContent = t('viewOnly');
  const pinLabel = document.getElementById('txtPinLabel');
  if (pinLabel) pinLabel.textContent = t('pinLabel');
  const btnSet = document.getElementById('btnSetPin');
  if (btnSet) btnSet.textContent = t('setPin');
  const btnRem = document.getElementById('btnRemovePin');
  if (btnRem) btnRem.textContent = t('removePin');
  updatePinStatus();
  updateRoleUI();
}

function setLanguage(l) {
  lang = l;
  localStorage.setItem('albarakah_lang', lang);
  applyTranslations();
  renderAll();
}

function toggleLanguage() {
  setLanguage(lang === 'en' ? 'bn' : 'en');
}

// -------------------- Formatting --------------------
function formatBDT(n) {
  return '৳' + Number(n || 0).toLocaleString('en-BD');
}

function formatDate(d) {
  if (!d) return '';
  const date = new Date(d);
  return date.toLocaleDateString(lang === 'bn' ? 'bn-BD' : 'en-GB', {
    day: 'numeric', month: 'short', year: 'numeric'
  });
}

function today() {
  return new Date().toISOString().slice(0, 10);
}

function thisMonth() {
  const d = new Date();
  return d.getFullYear() + '-' + String(d.getMonth() + 1).padStart(2, '0');
}

// -------------------- Calculations --------------------
function getBalance() {
  const opening = Number(data.settings.openingBalance) || 0;
  return data.transactions.reduce((sum, t) => {
    if (t.type === 'income' || t.type === 'contribution') return sum + t.amount;
    return sum - t.amount;
  }, opening);
}

function getMonthStats(ym) {
  const txns = data.transactions.filter(t => t.date.startsWith(ym));
  let income = 0, expense = 0, contrib = 0;
  txns.forEach(t => {
    if (t.type === 'income') income += t.amount;
    else if (t.type === 'expense') expense += t.amount;
    else if (t.type === 'contribution') contrib += t.amount;
  });
  return { income, expense, contrib, net: income + contrib - expense };
}

function getMemberContributionStatus(memberId, ym) {
  const paid = data.transactions
    .filter(t => t.type === 'contribution' && t.memberId === memberId && t.date.startsWith(ym))
    .reduce((s, t) => s + t.amount, 0);
  const target = data.settings.monthlyContribution;
  return { paid, target, pending: Math.max(0, target - paid), isPaid: paid >= target };
}

// -------------------- Rendering --------------------
function showView(view) {
  currentView = view;
  document.querySelectorAll('[id^="view-"]').forEach(el => el.classList.add('hidden'));
  document.getElementById('view-' + view).classList.remove('hidden');
  document.querySelectorAll('.nav-item').forEach(el => {
    el.classList.toggle('active', el.dataset.view === view);
  });
  document.getElementById('fabBtn').style.display = (view === 'finance' || view === 'dashboard') ? 'flex' : 'none';
  renderAll();
}

function renderAll() {
  applyTranslations();
  if (currentView === 'dashboard') renderDashboard();
  else if (currentView === 'members') renderMembers();
  else if (currentView === 'finance') renderTransactions();
  else if (currentView === 'reports') showReport(currentReport);
  else if (currentView === 'documents') renderDocuments();
  else if (currentView === 'settings') {
    document.getElementById('contribAmount').value = data.settings.monthlyContribution;
    document.getElementById('openingBalance').value = data.settings.openingBalance || 0;
    document.getElementById('businessName').value = data.settings.businessName;
  }
}

function renderDashboard() {
  const balance = getBalance();
  const month = thisMonth();
  const stats = getMonthStats(month);
  const paidCount = data.members.filter(m => getMemberContributionStatus(m.id, month).isPaid).length;
  const pendingAmount = data.members.reduce((s, m) => s + getMemberContributionStatus(m.id, month).pending, 0);

  document.getElementById('statsGrid').innerHTML = `
    <div class="stat-card">
      <div class="stat-label">${t('totalBalance')}</div>
      <div class="stat-value ${balance >= 0 ? 'positive' : 'negative'}">${formatBDT(balance)}</div>
    </div>
    <div class="stat-card">
      <div class="stat-label">${t('thisMonthIncome')}</div>
      <div class="stat-value positive">${formatBDT(stats.income + stats.contrib)}</div>
    </div>
    <div class="stat-card">
      <div class="stat-label">${t('thisMonthExpense')}</div>
      <div class="stat-value negative">${formatBDT(stats.expense)}</div>
    </div>
    <div class="stat-card">
      <div class="stat-label">${t('pendingDues')}</div>
      <div class="stat-value">${formatBDT(pendingAmount)}</div>
      <div style="font-size:0.75rem;color:var(--muted);margin-top:4px">${paidCount}/${data.members.length} ${t('membersPaid')}</div>
    </div>
  `;

  const recent = [...data.transactions].sort((a,b) => b.date.localeCompare(a.date) || b.id.localeCompare(a.id)).slice(0, 5);
  const container = document.getElementById('recentTxns');
  if (recent.length === 0) {
    container.innerHTML = `<div class="empty-state"><p>${t('noTransactions')}</p></div>`;
  } else {
    container.innerHTML = recent.map(txnHtml).join('');
  }

  // Hide quick action buttons for viewers
  const quickCard = document.querySelector('#view-dashboard .card:last-of-type');
  if (quickCard) {
    quickCard.style.display = currentRole === 'admin' ? '' : 'none';
  }
}

function txnHtml(txn) {
  const isIn = txn.type === 'income' || txn.type === 'contribution';
  const member = txn.memberId ? data.members.find(m => m.id === txn.memberId) : null;
  const catLabel = t(txn.category) || txn.category;
  return `
    <div class="txn-item">
      <div class="txn-icon ${isIn ? 'income' : 'expense'}">${isIn ? '↓' : '↑'}</div>
      <div class="txn-details">
        <div class="txn-title">${catLabel}${member ? ' · ' + member.name : ''}</div>
        <div class="txn-meta">${formatDate(txn.date)}${txn.note ? ' · ' + txn.note : ''}</div>
      </div>
      <div class="txn-amount ${isIn ? 'income' : 'expense'}">${isIn ? '+' : '-'}${formatBDT(txn.amount)}</div>
    </div>
  `;
}

function renderMembers() {
  const q = (document.getElementById('memberSearch').value || '').toLowerCase();
  let list = data.members;
  if (q) list = list.filter(m => m.name.toLowerCase().includes(q) || (m.phone || '').includes(q));
  const month = thisMonth();
  const container = document.getElementById('membersList');
  // Show/hide Add button
  const addBtn = document.querySelector('#view-members .btn-primary');
  if (addBtn) addBtn.style.display = currentRole === 'admin' ? '' : 'none';

  if (list.length === 0) {
    container.innerHTML = `<div class="empty-state"><p>${t('noMembers')}</p></div>`;
    return;
  }
  container.innerHTML = list.map(m => {
    const status = getMemberContributionStatus(m.id, month);
    const badge = status.isPaid
      ? `<span class="badge badge-success">${t('paid')}</span>`
      : `<span class="badge badge-warning">${t('pending')}</span>`;
    const avatar = m.photo
      ? `<img class="member-avatar" src="${m.photo}" alt="">`
      : `<div class="member-avatar">${m.name.charAt(0)}</div>`;
    return `
      <div class="member-item" onclick="openMemberDetail('${m.id}')">
        ${avatar}
        <div class="member-info">
          <div class="member-name">${m.name}</div>
          <div class="member-meta">${m.phone || ''} · ${formatBDT(status.paid)} / ${formatBDT(status.target)}</div>
        </div>
        ${badge}
      </div>
    `;
  }).join('');
}

function filterTxns(filter) {
  currentTxnFilter = filter;
  document.querySelectorAll('#view-finance .tab').forEach(tab => {
    tab.classList.toggle('active', tab.dataset.tab === filter);
  });
  renderTransactions();
}

function renderTransactions() {
  let list = [...data.transactions].sort((a,b) => b.date.localeCompare(a.date) || b.id.localeCompare(a.id));
  if (currentTxnFilter === 'income') list = list.filter(t => t.type === 'income' || t.type === 'contribution');
  if (currentTxnFilter === 'expense') list = list.filter(t => t.type === 'expense');
  const container = document.getElementById('txnsList');
  // Hide add button for viewers
  const addBtn = document.querySelector('#view-finance .btn-primary');
  if (addBtn) addBtn.style.display = currentRole === 'admin' ? '' : 'none';

  if (list.length === 0) {
    container.innerHTML = `<div class="empty-state"><p>${t('noTransactions')}</p></div>`;
  } else {
    container.innerHTML = list.map(txnHtml).join('');
  }
}

function showReport(type) {
  currentReport = type;
  document.querySelectorAll('#view-reports .tab').forEach(tab => {
    tab.classList.toggle('active', tab.dataset.tab === type);
  });
  const container = document.getElementById('reportContent');
  const month = thisMonth();
  const todayStr = today();

  if (type === 'daily') {
    const dayTxns = data.transactions.filter(t => t.date === todayStr);
    let income = 0, expense = 0;
    dayTxns.forEach(t => {
      if (t.type === 'income' || t.type === 'contribution') income += t.amount;
      else expense += t.amount;
    });
    // Approximate opening = current - net today
    const opening = getBalance() - (income - expense);
    container.innerHTML = `
      <div class="report-box" id="reportBox">
        <div class="report-header">
          <h3>${data.settings.businessName}</h3>
          <p>${t('dailyReport')}</p>
          <p style="font-size:0.85rem;color:var(--muted)">${formatDate(todayStr)}</p>
        </div>
        <div class="report-row"><span>${t('openingBalance')}</span><span>${formatBDT(opening)}</span></div>
        <div class="report-row"><span>${t('totalIncome')}</span><span class="positive">+${formatBDT(income)}</span></div>
        <div class="report-row"><span>${t('totalExpense')}</span><span class="negative">-${formatBDT(expense)}</span></div>
        <div class="report-row total"><span>${t('closingBalance')}</span><span>${formatBDT(getBalance())}</span></div>
      </div>
    `;
  } else if (type === 'monthly') {
    const stats = getMonthStats(month);
    container.innerHTML = `
      <div class="report-box" id="reportBox">
        <div class="report-header">
          <h3>${data.settings.businessName}</h3>
          <p>${t('monthlyReport')}</p>
          <p style="font-size:0.85rem;color:var(--muted)">${month}</p>
        </div>
        <div class="report-row"><span>${t('totalIncome')} (Rent + Other)</span><span class="positive">+${formatBDT(stats.income)}</span></div>
        <div class="report-row"><span>${t('contribution')}</span><span class="positive">+${formatBDT(stats.contrib)}</span></div>
        <div class="report-row"><span>${t('totalExpense')}</span><span class="negative">-${formatBDT(stats.expense)}</span></div>
        <div class="report-row total"><span>${t('net')}</span><span>${formatBDT(stats.net)}</span></div>
        <div class="report-row total"><span>${t('totalBalance')}</span><span>${formatBDT(getBalance())}</span></div>
      </div>
    `;
  } else {
    // Contribution report
    let rows = data.members.map(m => {
      const s = getMemberContributionStatus(m.id, month);
      return `<div class="report-row"><span>${m.name}</span><span>${s.isPaid ? '✓ ' + formatBDT(s.paid) : formatBDT(s.paid) + ' / ' + formatBDT(s.target)}</span></div>`;
    }).join('');
    const totalPaid = data.members.reduce((s, m) => s + getMemberContributionStatus(m.id, month).paid, 0);
    const totalTarget = data.members.length * data.settings.monthlyContribution;
    container.innerHTML = `
      <div class="report-box" id="reportBox">
        <div class="report-header">
          <h3>${data.settings.businessName}</h3>
          <p>${t('contribReport')}</p>
          <p style="font-size:0.85rem;color:var(--muted)">${month}</p>
        </div>
        ${rows}
        <div class="report-row total"><span>Total Collected</span><span>${formatBDT(totalPaid)} / ${formatBDT(totalTarget)}</span></div>
      </div>
    `;
  }
}

async function shareReport() {
  const box = document.getElementById('reportBox');
  if (!box) return;
  const text = box.innerText;
  const title = data.settings.businessName + ' - Report';

  if (navigator.share) {
    try {
      await navigator.share({ title, text });
      return;
    } catch (e) { /* user cancelled or failed */ }
  }
  // Fallback: copy + WhatsApp link
  try {
    await navigator.clipboard.writeText(text);
    toast('Report copied to clipboard');
  } catch (e) {}
  const waUrl = 'https://wa.me/?text=' + encodeURIComponent(text);
  window.open(waUrl, '_blank');
}

function renderDocuments() {
  const list = data.documents;
  const container = document.getElementById('docsList');
  const empty = document.getElementById('docsEmpty');
  // Hide upload for viewers
  const uploadBtn = document.querySelector('#view-documents .btn-primary');
  if (uploadBtn) uploadBtn.style.display = currentRole === 'admin' ? '' : 'none';

  if (list.length === 0) {
    container.innerHTML = '';
    empty.style.display = 'block';
    return;
  }
  empty.style.display = 'none';
  container.innerHTML = list.map(doc => `
    <div class="doc-item">
      <div class="doc-icon">📄</div>
      <div style="flex:1;min-width:0">
        <div style="font-weight:600;font-size:0.9rem">${doc.name}</div>
        <div style="font-size:0.75rem;color:var(--muted)">${formatDate(doc.date)} · ${(doc.size/1024).toFixed(1)} KB</div>
      </div>
      <button class="btn btn-sm btn-outline" onclick="viewDocument('${doc.id}')">View</button>
      ${currentRole === 'admin' ? `<button class="btn btn-sm btn-danger" onclick="deleteDocument('${doc.id}')">×</button>` : ''}
    </div>
  `).join('');
}

// -------------------- Modals --------------------
function openModal(type, extra = null) {
  // Viewers can only view member details, not add/edit
  if (['addMember', 'addIncome', 'addExpense', 'addTxn', 'addContribution'].includes(type) && currentRole !== 'admin') {
    return toast(t('noPermission'));
  }
  if (type === 'editMember' && currentRole !== 'admin') {
    // allow view but we can still open for now
  }
  const overlay = document.getElementById('modalOverlay');
  const content = document.getElementById('modalContent');
  tempPhoto = null;

  let html = '';
  if (type === 'addMember' || type === 'editMember') {
    const m = extra ? data.members.find(x => x.id === extra) : null;
    const isEdit = !!m;
    html = `
      <div class="modal-header">
        <h2>${isEdit ? t('edit') : t('addMember')}</h2>
        <button class="close-btn" onclick="closeModal()">×</button>
      </div>
      <div class="text-center">
        <img id="photoPreview" class="photo-preview" src="${m && m.photo ? m.photo : ''}" style="${m && m.photo ? '' : 'display:none'}">
        <label class="photo-upload-btn">
          📷 ${t('photo')}
          <input type="file" accept="image/*" capture="user" class="hidden" onchange="previewPhoto(event)">
        </label>
      </div>
      <div class="form-group">
        <label>${t('name')}</label>
        <input type="text" class="form-control" id="mName" value="${m ? m.name : ''}" required>
      </div>
      <div class="form-group">
        <label>${t('phone')}</label>
        <input type="tel" class="form-control" id="mPhone" value="${m ? m.phone || '' : ''}">
      </div>
      <div class="form-group">
        <label>${t('joinDate')}</label>
        <input type="date" class="form-control" id="mJoin" value="${m ? m.joinDate : today()}">
      </div>
      <button class="btn btn-primary btn-block" onclick="saveMember('${m ? m.id : ''}')">${t('save')}</button>
      ${isEdit && currentRole === 'admin' ? `
        <button class="btn btn-danger btn-block mt-8" onclick="deleteMember('${m.id}')" style="margin-top:12px;">
          🗑 ${t('delete')} ${lang === 'bn' ? 'সদস্য' : 'Member'}
        </button>
      ` : ''}
    `;
  } else if (type === 'addIncome' || type === 'addExpense' || type === 'addTxn' || type === 'addContribution') {
    const defaultType = type === 'addIncome' ? 'income' : type === 'addExpense' ? 'expense' : type === 'addContribution' ? 'contribution' : 'income';
    const memberOptions = data.members.map(m => `<option value="${m.id}">${m.name}</option>`).join('');
    html = `
      <div class="modal-header">
        <h2>${defaultType === 'contribution' ? t('addContribution') : t('addTxn')}</h2>
        <button class="close-btn" onclick="closeModal()">×</button>
      </div>
      <div class="form-group">
        <label>${t('type')}</label>
        <select class="form-control" id="txnType" onchange="updateCategoryOptions()">
          <option value="income" ${defaultType==='income'?'selected':''}>${t('income')}</option>
          <option value="expense" ${defaultType==='expense'?'selected':''}>${t('expense')}</option>
          <option value="contribution" ${defaultType==='contribution'?'selected':''}>${t('contribution')}</option>
        </select>
      </div>
      <div class="form-group" id="memberGroup" style="${defaultType==='contribution'?'':'display:none'}">
        <label>${t('selectMember')}</label>
        <select class="form-control" id="txnMember">
          <option value="">-- ${t('selectMember')} --</option>
          ${memberOptions}
        </select>
      </div>
      <div class="form-group">
        <label>${t('category')}</label>
        <select class="form-control" id="txnCategory"></select>
      </div>
      <div class="form-group">
        <label>${t('amount')}</label>
        <input type="number" class="form-control" id="txnAmount" value="${defaultType==='contribution' ? data.settings.monthlyContribution : ''}" min="0" step="1">
      </div>
      <div class="form-group">
        <label>${t('date')}</label>
        <input type="date" class="form-control" id="txnDate" value="${today()}">
      </div>
      <div class="form-group">
        <label>${t('note')}</label>
        <textarea class="form-control" id="txnNote" rows="2"></textarea>
      </div>
      <button class="btn btn-primary btn-block" onclick="saveTransaction()">${t('save')}</button>
    `;
  }

  content.innerHTML = html;
  overlay.classList.add('active');
  if (type === 'addIncome' || type === 'addExpense' || type === 'addTxn' || type === 'addContribution') {
    updateCategoryOptions();
  }
}

function closeModal() {
  document.getElementById('modalOverlay').classList.remove('active');
}

function updateCategoryOptions() {
  const type = document.getElementById('txnType').value;
  const catSelect = document.getElementById('txnCategory');
  const memberGroup = document.getElementById('memberGroup');
  memberGroup.style.display = type === 'contribution' ? 'block' : 'none';

  let options = [];
  if (type === 'income') {
    options = ['rent', 'advance', 'otherIncome'];
  } else if (type === 'expense') {
    options = ['leasePayment', 'maintenance', 'utility', 'legal', 'bankCharge', 'otherExpense'];
  } else {
    options = ['contribution'];
  }
  catSelect.innerHTML = options.map(o => `<option value="${o}">${t(o)}</option>`).join('');
  if (type === 'contribution') {
    document.getElementById('txnAmount').value = data.settings.monthlyContribution;
  }
}

function previewPhoto(e) {
  const file = e.target.files[0];
  if (!file) return;
  const reader = new FileReader();
  reader.onload = ev => {
    tempPhoto = ev.target.result;
    const img = document.getElementById('photoPreview');
    img.src = tempPhoto;
    img.style.display = 'block';
  };
  reader.readAsDataURL(file);
}

function saveMember(id) {
  if (!requireAdmin()) return;
  const name = document.getElementById('mName').value.trim();
  if (!name) return toast('Name required');
  const phone = document.getElementById('mPhone').value.trim();
  const joinDate = document.getElementById('mJoin').value || today();

  if (id) {
    const m = data.members.find(x => x.id === id);
    if (m) {
      m.name = name;
      m.phone = phone;
      m.joinDate = joinDate;
      if (tempPhoto) m.photo = tempPhoto;
    }
  } else {
    data.members.push({
      id: 'm' + Date.now(),
      name, phone, joinDate,
      photo: tempPhoto,
      status: 'active'
    });
  }
  saveData();
  closeModal();
  toast(t('memberAdded'));
  renderAll();
}

function deleteMember(id) {
  if (!requireAdmin()) return;
  const m = data.members.find(x => x.id === id);
  if (!m) return;

  const confirmMsg = lang === 'bn'
    ? `"${m.name}" কে মুছে ফেলতে চান? এই সদস্যের চাঁদার হিসাব থাকবে, কিন্তু সদস্য তালিকা থেকে সরে যাবে।`
    : `Delete "${m.name}"? Their contribution records will remain, but they will be removed from the member list.`;

  if (!confirm(confirmMsg)) return;

  data.members = data.members.filter(x => x.id !== id);
  // Note: We keep contribution transactions for historical accuracy
  saveData();
  closeModal();
  toast(t('deleted'));
  renderAll();
}

function saveTransaction() {
  if (!requireAdmin()) return;
  const type = document.getElementById('txnType').value;
  const category = document.getElementById('txnCategory').value;
  const amount = parseFloat(document.getElementById('txnAmount').value) || 0;
  const date = document.getElementById('txnDate').value || today();
  const note = document.getElementById('txnNote').value.trim();
  const memberId = type === 'contribution' ? document.getElementById('txnMember').value : null;

  if (amount <= 0) return toast('Amount required');
  if (type === 'contribution' && !memberId) return toast('Select a member');

  data.transactions.push({
    id: 't' + Date.now(),
    type, category, amount, date, note, memberId
  });
  saveData();
  closeModal();
  toast(t('txnAdded'));
  renderAll();
}

function openMemberDetail(id) {
  openModal('editMember', id);
}

// -------------------- Documents --------------------
function uploadDocument(e) {
  if (!requireAdmin()) {
    e.target.value = '';
    return;
  }
  const file = e.target.files[0];
  if (!file) return;
  if (file.size > 5 * 1024 * 1024) {
    toast('File too large (max 5MB)');
    return;
  }
  const reader = new FileReader();
  reader.onload = ev => {
    data.documents.push({
      id: 'd' + Date.now(),
      name: file.name,
      type: file.type,
      size: file.size,
      date: today(),
      data: ev.target.result
    });
    saveData();
    toast(t('docUploaded'));
    renderDocuments();
  };
  reader.readAsDataURL(file);
  e.target.value = '';
}

function viewDocument(id) {
  const doc = data.documents.find(d => d.id === id);
  if (!doc) return;
  const win = window.open();
  if (doc.type.startsWith('image/')) {
    win.document.write(`<img src="${doc.data}" style="max-width:100%">`);
  } else {
    win.document.write(`<iframe src="${doc.data}" style="width:100%;height:100%;border:none"></iframe>`);
  }
}

function deleteDocument(id) {
  if (!requireAdmin()) return;
  if (!confirm(t('delete') + '?')) return;
  data.documents = data.documents.filter(d => d.id !== id);
  saveData();
  toast(t('deleted'));
  renderDocuments();
}

// -------------------- Settings & Data --------------------
function saveSettings() {
  if (!requireAdmin()) return;
  data.settings.monthlyContribution = parseInt(document.getElementById('contribAmount').value) || DEFAULT_CONTRIB;
  data.settings.openingBalance = parseFloat(document.getElementById('openingBalance').value) || 0;
  data.settings.businessName = document.getElementById('businessName').value || 'Al Barakah Group';
  saveData();
  toast(t('saved'));
  renderAll();
}

function exportData() {
  const blob = new Blob([JSON.stringify(data, null, 2)], { type: 'application/json' });
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = `al-barakah-backup-${today()}.json`;
  a.click();
  URL.revokeObjectURL(url);
  toast(t('dataExported'));
}

function importData(e) {
  const file = e.target.files[0];
  if (!file) return;
  const reader = new FileReader();
  reader.onload = ev => {
    try {
      const imported = JSON.parse(ev.target.result);
      if (imported.members && imported.transactions) {
        data = imported;
        saveData();
        toast(t('dataImported'));
        renderAll();
      } else {
        toast('Invalid file');
      }
    } catch (err) {
      toast('Invalid JSON');
    }
  };
  reader.readAsText(file);
  e.target.value = '';
}

function resetAllData() {
  if (currentRole !== 'admin') return toast(t('noPermission'));
  localStorage.removeItem(STORAGE_KEY);
  data = getDefaultData();
  saveData();
  toast(t('dataReset'));
  renderAll();
}

function clearAllTransactions() {
  if (!requireAdmin()) return;
  if (!confirm(t('confirmClearTxns'))) return;
  data.transactions = [];
  saveData();
  toast(t('txnsCleared'));
  renderAll();
}

// -------------------- PIN Lock & Roles --------------------
function simpleHash(str) {
  let hash = 0;
  for (let i = 0; i < str.length; i++) {
    hash = ((hash << 5) - hash) + str.charCodeAt(i);
    hash |= 0;
  }
  return 'p' + Math.abs(hash).toString(36);
}

function getStoredPin() {
  return localStorage.getItem(PIN_KEY);
}

function hasPin() {
  return !!getStoredPin();
}

function setPin() {
  if (currentRole !== 'admin') return toast(t('noPermission'));
  const pin = document.getElementById('pinInput').value.trim();
  if (!/^\d{4,6}$/.test(pin)) return toast(t('pinRequired'));
  localStorage.setItem(PIN_KEY, simpleHash(pin));
  document.getElementById('pinInput').value = '';
  updatePinStatus();
  toast(t('pinSet'));
}

function removePin() {
  if (currentRole !== 'admin') return toast(t('noPermission'));
  localStorage.removeItem(PIN_KEY);
  document.getElementById('pinInput').value = '';
  updatePinStatus();
  toast(t('pinRemoved'));
}

function updatePinStatus() {
  const el = document.getElementById('pinStatus');
  if (!el) return;
  el.textContent = hasPin() ? (lang === 'bn' ? 'পিন সেট করা আছে ✓' : 'PIN is set ✓') : (lang === 'bn' ? 'কোনো পিন সেট নেই' : 'No PIN set');
}

function lockApp() {
  if (!hasPin()) {
    toast(lang === 'bn' ? 'প্রথমে সেটিংস থেকে পিন সেট করুন' : 'Set a PIN in Settings first');
    return;
  }
  isLocked = true;
  currentRole = 'viewer';
  pinBuffer = '';
  updatePinDisplay();
  document.getElementById('lockScreen').classList.remove('hidden');
  document.getElementById('pinError').classList.add('hidden');
  updateRoleUI();
}

function unlockAsAdmin() {
  isLocked = false;
  currentRole = 'admin';
  pinBuffer = '';
  document.getElementById('lockScreen').classList.add('hidden');
  updateRoleUI();
  renderAll();
}

function enterViewerMode() {
  isLocked = false;
  currentRole = 'viewer';
  pinBuffer = '';
  document.getElementById('lockScreen').classList.add('hidden');
  updateRoleUI();
  renderAll();
  toast(t('viewOnly'));
}

function pinPress(key) {
  const err = document.getElementById('pinError');
  err.classList.add('hidden');
  if (key === 'C') {
    pinBuffer = '';
  } else if (key === 'OK') {
    checkPin();
    return;
  } else if (pinBuffer.length < 6) {
    pinBuffer += key;
  }
  updatePinDisplay();
  if (pinBuffer.length >= 4 && pinBuffer.length <= 6) {
    // auto-check optional, but OK is clearer
  }
}

function updatePinDisplay() {
  const display = document.getElementById('pinDisplay');
  if (!display) return;
  display.textContent = pinBuffer.length ? '•'.repeat(pinBuffer.length) : '••••';
}

function checkPin() {
  const stored = getStoredPin();
  if (!stored) {
    unlockAsAdmin();
    return;
  }
  if (simpleHash(pinBuffer) === stored) {
    unlockAsAdmin();
  } else {
    document.getElementById('pinError').textContent = t('wrongPin');
    document.getElementById('pinError').classList.remove('hidden');
    pinBuffer = '';
    updatePinDisplay();
  }
}

function updateRoleUI() {
  const badge = document.getElementById('roleBadge');
  if (badge) {
    badge.textContent = currentRole === 'admin' ? t('admin') : t('viewer');
    badge.style.display = 'inline-block';
  }
  // Hide admin-only buttons for viewers
  const isAdmin = currentRole === 'admin';
  document.querySelectorAll('.admin-only, [data-admin-only]').forEach(el => {
    el.style.display = isAdmin ? '' : 'none';
  });
  // FAB
  const fab = document.getElementById('fabBtn');
  if (fab) fab.style.display = isAdmin && (currentView === 'finance' || currentView === 'dashboard') ? 'flex' : 'none';
}

function requireAdmin() {
  if (currentRole !== 'admin') {
    toast(t('noPermission'));
    return false;
  }
  return true;
}

// -------------------- Utils --------------------
function toast(msg) {
  const el = document.getElementById('toast');
  el.textContent = msg;
  el.classList.add('show');
  setTimeout(() => el.classList.remove('show'), 2500);
}

// Offline detection
function updateOnlineStatus() {
  const badge = document.getElementById('offlineBadge');
  if (!navigator.onLine) {
    badge.classList.add('show');
  } else {
    badge.classList.remove('show');
  }
}

// -------------------- Init --------------------
document.addEventListener('DOMContentLoaded', () => {
  loadData();
  applyTranslations();
  updatePinStatus();

  // If PIN is set, start locked
  if (hasPin()) {
    isLocked = true;
    currentRole = 'viewer';
    document.getElementById('lockScreen').classList.remove('hidden');
    document.getElementById('lockSubtitle').textContent = t('enterPin');
    document.getElementById('viewerBtn').textContent = t('viewOnly');
  } else {
    currentRole = 'admin';
  }

  showView('dashboard');
  updateRoleUI();
  updateOnlineStatus();
  window.addEventListener('online', updateOnlineStatus);
  window.addEventListener('offline', updateOnlineStatus);

  // Close modal on overlay click
  document.getElementById('modalOverlay').addEventListener('click', e => {
    if (e.target === e.currentTarget) closeModal();
  });
});
