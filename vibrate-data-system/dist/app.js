// ==================== APPLICATION CONSTANTS ====================
const APP_CONFIG = {
    version: '2.2.0',
    
    // Equipment data
    equipments: [
        { id: 'GB-cp48A', name: 'گیربکس کمپرسور 48A', code: 'GB-cp 48A', icon: 'fas fa-cog', color: '#8b5cf6' },
        { id: 'CP-cp48A', name: 'کمپرسور 48A', code: 'CP-cp 48A', icon: 'fas fa-compress', color: '#06b6d4' },
        { id: 'GB-cp48B', name: 'گیربکس کمپرسور 48B', code: 'GB-cp 48B', icon: 'fas fa-cog', color: '#8b5cf6' },
        { id: 'CP-cp48B', name: 'کمپرسور 48B', code: 'CP-cp 48B', icon: 'fas fa-compress', color: '#06b6d4' },
        { id: 'GB-cp51', name: 'گیربکس کمپرسور 51', code: 'GB-cp 51', icon: 'fas fa-cog', color: '#8b5cf6' },
        { id: 'CP-cp51', name: 'کمپرسور 51', code: 'CP-cp 51', icon: 'fas fa-compress', color: '#06b6d4' },
        { id: 'GB-cp71', name: 'گیربکس کمپرسور 71', code: 'GB-cp 71', icon: 'fas fa-cog', color: '#8b5cf6' },
        { id: 'CP-cp71', name: 'کمپرسور 71', code: 'CP-cp 71', icon: 'fas fa-compress', color: '#06b6d4' },
        { id: 'CP-cpSGC', name: 'کمپرسور سیل گس', code: 'CP-cp SGC', icon: 'fas fa-compress', color: '#06b6d4' },
        { id: 'FN-fnESF', name: 'فن استک', code: 'FN-fn ESF', icon: 'fas fa-fan', color: '#10b981' },
        { id: 'FN-fnAUX', name: 'فن اگزیلاری', code: 'FN-fn AUX', icon: 'fas fa-fan', color: '#10b981' },
        { id: 'FN-fnMAB', name: 'فن هوای اصلی', code: 'FN-fn MAB', icon: 'fas fa-fan', color: '#10b981' }
    ],
    
    // Parameter data
    parameters: [
        { id: 'V1', name: 'سرعت عمودی متصل', code: 'V1', icon: 'fas fa-arrow-up', color: '#ec4899', type: 'velocity', category: 'connected' },
        { id: 'GV1', name: 'شتاب عمودی متصل', code: 'GV1', icon: 'fas fa-arrow-up', color: '#f59e0b', type: 'acceleration', category: 'connected' },
        { id: 'H1', name: 'سرعت افقی متصل', code: 'H1', icon: 'fas fa-arrow-right', color: '#ec4899', type: 'velocity', category: 'connected' },
        { id: 'GH1', name: 'شتاب افقی متصل', code: 'GH1', icon: 'fas fa-arrow-right', color: '#f59e0b', type: 'acceleration', category: 'connected' },
        { id: 'A1', name: 'سرعت محوری متصل', code: 'A1', icon: 'fas fa-arrows-alt', color: '#ec4899', type: 'velocity', category: 'connected' },
        { id: 'GA1', name: 'شتاب محوری متصل', code: 'GA1', icon: 'fas fa-arrows-alt', color: '#f59e0b', type: 'acceleration', category: 'connected' },
        { id: 'V2', name: 'سرعت عمودی آزاد', code: 'V2', icon: 'fas fa-arrow-up', color: '#6366f1', type: 'velocity', category: 'free' },
        { id: 'GV2', name: 'شتاب عمودی آزاد', code: 'GV2', icon: 'fas fa-arrow-up', color: '#8b5cf6', type: 'acceleration', category: 'free' },
        { id: 'H2', name: 'سرعت افقی آزاد', code: 'H2', icon: 'fas fa-arrow-right', color: '#6366f1', type: 'velocity', category: 'free' },
        { id: 'GH2', name: 'شتاب افقی آزاد', code: 'GH2', icon: 'fas fa-arrow-right', color: '#8b5cf6', type: 'acceleration', category: 'free' },
        { id: 'A2', name: 'سرعت محوری آزاد', code: 'A2', icon: 'fas fa-arrows-alt', color: '#6366f1', type: 'velocity', category: 'free' },
        { id: 'GA2', name: 'شتاب محوری آزاد', code: 'GA2', icon: 'fas fa-arrows-alt', color: '#8b5cf6', type: 'acceleration', category: 'free' }
    ],
    
    // Units
    units: [
        { id: 'DRI1', name: 'واحد احیا مستقیم 1', code: 'DRI 1', color: '#3b82f6' },
        { id: 'DRI2', name: 'واحد احیا مستقیم 2', code: 'DRI 2', color: '#ef4444' }
    ],

    // Random colors for slideshow values
    randomColors: [
        '#3b82f6', '#ef4444', '#10b981', '#f59e0b', '#8b5cf6', 
        '#ec4899', '#06b6d4', '#84cc16', '#f97316', '#6366f1',
        '#14b8a6', '#f43f5e', '#a855f7', '#22d3ee', '#eab308',
        '#ef4444', '#22c55e', '#3b82f6', '#f59e0b', '#8b5cf6'
    ]
};

// ==================== GLOBAL VARIABLES ====================
let currentUser = null;
let isAuthenticated = false;

let currentSettings = {
    theme: 'light',
    primaryColor: '#2563eb',
    dri1Color: '#3b82f6',
    dri2Color: '#ef4444',
    // Equipment priority for slideshow (1-24)
    equipmentPriority: {},
    // Parameter priority for slideshow (1-12)
    parameterPriority: {},
    // Parameter mode: 'velocity-first' or 'custom'
    parameterMode: 'velocity-first',
    // Analysis settings
    analysisThreshold: 20, // percentage
    analysisTimeRange: 7, // days
    analysisComparisonDays: 1 // how many days back to compare
};

let dataEntryState = {
    mode: 'new', // 'new' or 'edit'
    selectedUnit: null,
    selectedDate: null,
    currentEquipmentIndex: 0,
    currentParameterIndex: 0,
    currentData: {},
    dateData: {},
    // Edit mode specific
    editSelectedUnit: null,
    editSelectedDate: null,
    editSelectedEquipment: null,
    editSelectedParameter: null,
    editCurrentValue: null
};

let slideshowState = {
    isRunning: false,
    isPaused: false,
    currentDate: null,
    currentEquipmentIndex: 0,
    currentParameterIndex: 0,
    interval: null,
    speed: 3000,
    data: {},
    isFullscreen: false,
    currentValueColor: '#3b82f6'
};

let chartInstance = null;

// ==================== AUTHENTICATION FUNCTIONS ====================
async function checkAuthentication() {
    try {
        const response = await fetch('/api/auth/check-approval');
        const data = await response.json();
        
        if (data.isLoggedIn) {
            if (data.isApproved) {
                currentUser = data.user;
                isAuthenticated = true;
                return true;
            } else {
                showNotification('حساب کاربری شما هنوز تایید نشده است', 'warning');
                setTimeout(() => {
                    window.location.href = '/login.html';
                }, 3000);
                return false;
            }
        } else {
            window.location.href = '/login.html';
            return false;
        }
    } catch (error) {
        console.error('Authentication check error:', error);
        window.location.href = '/login.html';
        return false;
    }
}

async function logout() {
    try {
        await fetch('/api/auth/logout', { method: 'POST' });
        window.location.href = '/login.html';
    } catch (error) {
        console.error('Logout error:', error);
        window.location.href = '/login.html';
    }
}

// ==================== UTILITY FUNCTIONS ====================
function getCurrentDate() {
    const now = new Date();
    return now.toISOString().split('T')[0];
}

function formatDate(dateString) {
    const date = new Date(dateString);
    return date.toLocaleDateString('fa-IR');
}

function getRandomColor() {
    return APP_CONFIG.randomColors[Math.floor(Math.random() * APP_CONFIG.randomColors.length)];
}

function showNotification(message, type = 'info') {
    const notification = document.createElement('div');
    notification.className = `notification notification-${type}`;
    notification.style.cssText = `
        position: fixed;
        top: 20px;
        right: 20px;
        background: var(--success-color);
        color: white;
        padding: 1rem 1.5rem;
        border-radius: 8px;
        z-index: 10000;
        box-shadow: var(--shadow-lg);
        transform: translateX(100%);
        transition: transform 0.3s ease;
    `;
    
    if (type === 'error') {
        notification.style.background = 'var(--error-color)';
    } else if (type === 'warning') {
        notification.style.background = 'var(--warning-color)';
    }
    
    notification.innerHTML = `
        <div style="display: flex; align-items: center; gap: 0.5rem;">
            <i class="fas fa-${type === 'error' ? 'exclamation-circle' : type === 'warning' ? 'exclamation-triangle' : 'check-circle'}"></i>
            <span>${message}</span>
        </div>
    `;
    
    document.body.appendChild(notification);
    
    setTimeout(() => {
        notification.style.transform = 'translateX(0)';
    }, 100);
    
    setTimeout(() => {
        notification.style.transform = 'translateX(100%)';
        setTimeout(() => {
            if (document.body.contains(notification)) {
                document.body.removeChild(notification);
            }
        }, 300);
    }, 3000);
}

function validateValue(value) {
    const num = parseFloat(value);
    return !isNaN(num) && num >= 0 && num <= 20;
}

function getEquipmentByPriority() {
    if (Object.keys(currentSettings.equipmentPriority).length > 0) {
        return Object.entries(currentSettings.equipmentPriority)
            .sort(([,a], [,b]) => a - b)
            .map(([id]) => {
                // Handle both single equipment and unit-specific equipment
                const baseId = id.replace('_DRI1', '').replace('_DRI2', '');
                const equipment = APP_CONFIG.equipments.find(e => e.id === baseId);
                if (equipment) {
                    return {
                        ...equipment,
                        unit: id.includes('_DRI1') ? 'DRI1' : id.includes('_DRI2') ? 'DRI2' : null,
                        priorityId: id
                    };
                }
                return null;
            })
            .filter(Boolean);
    }
    
    return APP_CONFIG.equipments;
}

function getParametersByPriority() {
    if (currentSettings.parameterMode === 'velocity-first') {
        const velocityParams = APP_CONFIG.parameters.filter(p => p.type === 'velocity');
        const accelerationParams = APP_CONFIG.parameters.filter(p => p.type === 'acceleration');
        return [...velocityParams, ...accelerationParams];
    } else if (currentSettings.parameterMode === 'custom' && Object.keys(currentSettings.parameterPriority).length > 0) {
        return Object.entries(currentSettings.parameterPriority)
            .sort(([,a], [,b]) => a - b)
            .map(([id]) => APP_CONFIG.parameters.find(p => p.id === id))
            .filter(Boolean);
    }
    
    return APP_CONFIG.parameters;
}

function initializeDefaultPriorities() {
    if (Object.keys(currentSettings.equipmentPriority).length === 0) {
        // Initialize 24 equipment priorities (12 equipment × 2 units)
        let priority = 1;
        ['DRI1', 'DRI2'].forEach(unit => {
            APP_CONFIG.equipments.forEach(equipment => {
                currentSettings.equipmentPriority[`${equipment.id}_${unit}`] = priority++;
            });
        });
    }
    
    if (Object.keys(currentSettings.parameterPriority).length === 0) {
        APP_CONFIG.parameters.forEach((parameter, index) => {
            currentSettings.parameterPriority[parameter.id] = index + 1;
        });
    }
}

// ==================== DATABASE FUNCTIONS ====================
async function saveDataToDB(data) {
    try {
        const response = await fetch('/api/data', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(data)
        });
        
        const result = await response.json();
        
        if (!response.ok) {
            throw new Error(result.error || 'خطا در ذخیره داده‌ها');
        }
        
        return true;
    } catch (error) {
        console.error('Error saving data:', error);
        throw error;
    }
}

async function getDataFromDB(filters = {}) {
    try {
        const params = new URLSearchParams();
        Object.keys(filters).forEach(key => {
            if (filters[key] !== null && filters[key] !== undefined && filters[key] !== '') {
                params.append(key, filters[key]);
            }
        });
        
        const response = await fetch(`/api/data?${params}`);
        const result = await response.json();
        
        if (!response.ok) {
            throw new Error(result.error || 'خطا در دریافت داده‌ها');
        }
        
        return result.data;
    } catch (error) {
        console.error('Error getting data:', error);
        throw error;
    }
}

async function saveSettingsToDB(settings) {
    try {
        const response = await fetch('/api/settings', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(settings)
        });
        
        const result = await response.json();
        
        if (!response.ok) {
            throw new Error(result.error || 'خطا در ذخیره تنظیمات');
        }
        
        return true;
    } catch (error) {
        console.error('Error saving settings:', error);
        throw error;
    }
}

async function getSettingsFromDB() {
    try {
        const response = await fetch('/api/settings');
        const result = await response.json();
        
        if (!response.ok) {
            throw new Error(result.error || 'خطا در دریافت تنظیمات');
        }
        
        return result.settings;
    } catch (error) {
        console.error('Error getting settings:', error);
        return null;
    }
}

// ==================== THEME FUNCTIONS ====================
function toggleTheme() {
    currentSettings.theme = currentSettings.theme === 'light' ? 'dark' : 'light';
    applyTheme();
    updateThemeIcon();
}

function applyTheme() {
    document.documentElement.setAttribute('data-theme', currentSettings.theme);
    
    const root = document.documentElement;
    root.style.setProperty('--primary-color', currentSettings.primaryColor);
    root.style.setProperty('--dri1-color', currentSettings.dri1Color);
    root.style.setProperty('--dri2-color', currentSettings.dri2Color);
}

function updateThemeIcon() {
    const themeIcon = document.querySelector('.theme-toggle i');
    if (themeIcon) {
        themeIcon.className = currentSettings.theme === 'light' ? 'fas fa-moon' : 'fas fa-sun';
    }
}

// ==================== NAVIGATION FUNCTIONS ====================
function showSection(sectionId) {
    const sections = document.querySelectorAll('.section');
    sections.forEach(section => section.classList.remove('active'));
    
    const targetSection = document.getElementById(sectionId);
    if (targetSection) {
        targetSection.classList.add('active');
    }
    
    const navTabs = document.querySelectorAll('.nav-tab');
    navTabs.forEach(tab => tab.classList.remove('active'));
    
    // Find the clicked tab and make it active
    const clickedTab = event ? event.target.closest('.nav-tab') : 
                      document.querySelector(`[onclick*="${sectionId}"]`);
    if (clickedTab) {
        clickedTab.classList.add('active');
    }
    
    switch(sectionId) {
        case 'data-entry':
            initDataEntry();
            break;
        case 'view-data':
            initViewData();
            break;
        case 'charts':
            initCharts();
            break;
        case 'analysis':
            initAnalysis();
            break;
        case 'slideshow':
            initSlideshow();
            break;
        case 'database':
            initDatabase();
            break;
        case 'settings':
            initSettings();
            break;
        case 'admin':
            if (currentUser && currentUser.role === 'admin') {
                loadUsers();
            }
            break;
    }
}

// ==================== USER DISPLAY FUNCTIONS ====================
function updateUserDisplay() {
    if (currentUser) {
        const userNameElement = document.getElementById('userName');
        if (userNameElement) {
            userNameElement.textContent = currentUser.fullName;
        }
        
        const userDisplayElements = [
            'currentUserDisplay',
            'currentUserDisplayCharts',
            'currentUserDisplayAnalysis'
        ];
        
        userDisplayElements.forEach(elementId => {
            const element = document.getElementById(elementId);
            if (element) {
                element.textContent = currentUser.fullName;
            }
        });
        
        const avatar = document.getElementById('userAvatar');
        if (avatar) {
            avatar.textContent = currentUser.fullName.charAt(0).toUpperCase();
        }
    }
}

function addLogoutButton() {
    const headerContent = document.querySelector('.header-content');
    if (headerContent && currentUser) {
        // Remove existing user info if present
        const existingUserInfo = headerContent.querySelector('.user-info-header');
        if (existingUserInfo) {
            existingUserInfo.remove();
        }
        
        const userInfo = document.createElement('div');
        userInfo.className = 'user-info-header d-flex align-center gap-2';
        userInfo.innerHTML = `
            <span class="user-name" style="color: var(--text-primary); font-weight: 500;">
                ${currentUser.fullName}
            </span>
            <button class="btn btn-secondary btn-sm" onclick="logout()">
                <i class="fas fa-sign-out-alt"></i>
                خروج
            </button>
        `;
        headerContent.appendChild(userInfo);
    }
}

// ==================== ADMIN FUNCTIONS ====================
function initAdminPanel() {
    if (currentUser && currentUser.role === 'admin') {
        // Add admin tab
        const navTabs = document.querySelector('.nav-tabs');
        const existingAdminTab = navTabs.querySelector('[onclick*="admin"]');
        
        if (!existingAdminTab) {
            const adminTab = document.createElement('button');
            adminTab.className = 'nav-tab';
            adminTab.onclick = () => showSection('admin');
            adminTab.innerHTML = `
                <i class="fas fa-users-cog"></i>
                پنل ادمین
            `;
            navTabs.appendChild(adminTab);
        }
        
        // Add admin section
        const mainContent = document.querySelector('.main-content .container');
        const existingAdminSection = document.getElementById('admin');
        
        if (!existingAdminSection) {
            const adminSection = document.createElement('section');
            adminSection.id = 'admin';
            adminSection.className = 'section';
            adminSection.innerHTML = `
                <div class="card">
                    <div class="card-header">
                        <h2 class="card-title">
                            <i class="fas fa-users-cog"></i>
                            پنل مدیریت
                        </h2>
                    </div>
                    
                    <div class="admin-panel">
                        <h3>
                            <i class="fas fa-users"></i>
                            مدیریت کاربران
                        </h3>
                        <div id="usersTableContainer">
                            <div class="text-center">
                                <i class="fas fa-spinner fa-spin"></i>
                                در حال بارگذاری...
                            </div>
                        </div>
                    </div>
                </div>
            `;
            mainContent.appendChild(adminSection);
        }
    }
}

async function loadUsers() {
    if (!currentUser || currentUser.role !== 'admin') return;
    
    try {
        const response = await fetch('/api/admin/users');
        const result = await response.json();
        
        if (!response.ok) {
            throw new Error(result.error);
        }
        
        renderUsersTable(result.users);
    } catch (error) {
        console.error('Error loading users:', error);
        showNotification('خطا در بارگذاری کاربران', 'error');
        
        const container = document.getElementById('usersTableContainer');
        if (container) {
            container.innerHTML = '<div class="text-center text-error">خطا در بارگذاری کاربران</div>';
        }
    }
}

function renderUsersTable(users) {
    const container = document.getElementById('usersTableContainer');
    if (!container) return;
    
    if (users.length === 0) {
        container.innerHTML = '<div class="text-center">هیچ کاربری یافت نشد</div>';
        return;
    }
    
    let html = `
        <table class="users-table">
            <thead>
                <tr>
                    <th>نام</th>
                    <th>نام کاربری</th>
                    <th>ایمیل</th>
                    <th>نقش</th>
                    <th>وضعیت</th>
                    <th>تاریخ عضویت</th>
                    <th>عملیات</th>
                </tr>
            </thead>
            <tbody>
    `;
    
    users.forEach(user => {
        const statusClass = user.is_approved ? (user.is_active ? 'approved' : 'inactive') : 'pending';
        const statusText = user.is_approved ? (user.is_active ? 'تایید شده' : 'غیرفعال') : 'در انتظار تایید';
        const createdDate = new Date(user.created_at).toLocaleDateString('fa-IR');
        
        html += `
            <tr>
                <td>${user.full_name}</td>
                <td>${user.username}</td>
                <td>${user.email}</td>
                <td>${user.role === 'admin' ? 'مدیر' : 'اپراتور'}</td>
                <td><span class="user-status ${statusClass}">${statusText}</span></td>
                <td>${createdDate}</td>
                <td>
                    <div class="user-actions">
                        ${!user.is_approved ? `
                            <button class="btn btn-success btn-sm" onclick="approveUser(${user.id})">
                                <i class="fas fa-check"></i>
                                تایید
                            </button>
                        ` : ''}
                        ${user.role !== 'admin' ? `
                            <button class="btn btn-warning btn-sm" onclick="toggleUserStatus(${user.id}, ${!user.is_active})">
                                <i class="fas fa-${user.is_active ? 'ban' : 'check'}"></i>
                                ${user.is_active ? 'غیرفعال' : 'فعال'}
                            </button>
                        ` : '<span class="text-muted">مدیر</span>'}
                    </div>
                </td>
            </tr>
        `;
    });
    
    html += `
            </tbody>
        </table>
    `;
    
    container.innerHTML = html;
}

async function approveUser(userId) {
    try {
        const response = await fetch('/api/admin/users', {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                userId: userId,
                isApproved: true,
                isActive: true
            })
        });
        
        const result = await response.json();
        
        if (!response.ok) {
            throw new Error(result.error);
        }
        
        showNotification('کاربر تایید شد', 'success');
        loadUsers(); // Refresh list
    } catch (error) {
        console.error('Error approving user:', error);
        showNotification('خطا در تایید کاربر', 'error');
    }
}

async function toggleUserStatus(userId, isActive) {
    try {
        const response = await fetch('/api/admin/users', {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                userId: userId,
                isApproved: true,
                isActive: isActive
            })
        });
        
        const result = await response.json();
        
        if (!response.ok) {
            throw new Error(result.error);
        }
        
        showNotification('وضعیت کاربر تغییر کرد', 'success');
        loadUsers(); // Refresh list
    } catch (error) {
        console.error('Error changing user status:', error);
        showNotification('خطا در تغییر وضعیت کاربر', 'error');
    }
}

// ==================== DATA ENTRY FUNCTIONS ====================
function switchDataEntryMode(mode) {
    dataEntryState.mode = mode;
    
    // Update tab buttons
    document.querySelectorAll('.tab-btn').forEach(btn => btn.classList.remove('active'));
    const targetTab = document.getElementById(`${mode}EntryTab`);
    if (targetTab) {
        targetTab.classList.add('active');
    }
    
    // Toggle sections
    const newEntryMode = document.getElementById('newEntryMode');
    const editMode = document.getElementById('editMode');
    
    if (mode === 'new') {
        if (newEntryMode) newEntryMode.classList.remove('d-none');
        if (editMode) editMode.classList.add('d-none');
    } else {
        if (newEntryMode) newEntryMode.classList.add('d-none');
        if (editMode) editMode.classList.remove('d-none');
    }
    
    // Reset states
    resetDataEntryState();
}

function resetDataEntryState() {
    // Reset unit selections
    document.querySelectorAll('.unit-btn').forEach(btn => btn.classList.remove('selected'));
    document.querySelectorAll('.equipment-card').forEach(card => card.classList.remove('selected'));
    document.querySelectorAll('.parameter-card').forEach(card => card.classList.remove('selected'));
    
    // Hide sections
    const elementsToHide = [
        'entryHeader', 'inputArea', 'newEntryControls', 'editEquipmentSection',
        'editParameterSection', 'editInputArea', 'editControls'
    ];
    
    elementsToHide.forEach(id => {
        const element = document.getElementById(id);
        if (element) {
            element.classList.add('d-none');
        }
    });
    
    // Reset state
    dataEntryState.selectedUnit = null;
    dataEntryState.selectedDate = null;
    dataEntryState.currentEquipmentIndex = 0;
    dataEntryState.currentParameterIndex = 0;
    dataEntryState.dateData = {};
    dataEntryState.currentData = {};
    dataEntryState.editSelectedUnit = null;
    dataEntryState.editSelectedDate = null;
    dataEntryState.editSelectedEquipment = null;
    dataEntryState.editSelectedParameter = null;
    dataEntryState.editCurrentValue = null;
    
    // Reset date inputs
    const entryDateInput = document.getElementById('entryDateInput');
    const editDateInput = document.getElementById('editDateInput');
    
    if (entryDateInput) entryDateInput.value = getCurrentDate();
    if (editDateInput) editDateInput.value = getCurrentDate();
}

async function setNextIncompletePosition() {
    const equipments = APP_CONFIG.equipments;
    const parameters = APP_CONFIG.parameters;
    
    console.log('Setting next incomplete position...');
    
    // Find first incomplete equipment
    for (let i = 0; i < equipments.length; i++) {
        const equipment = equipments[i];
        const equipmentData = dataEntryState.dateData[equipment.id];
        
        if (!equipmentData) {
            // Equipment not started
            dataEntryState.currentEquipmentIndex = i;
            dataEntryState.currentParameterIndex = 0;
            console.log(`Equipment ${equipment.name} not started`);
            return;
        }
        
        // Check if equipment is complete - all parameters must have valid values
        const validParams = parameters.filter(param => 
            equipmentData[param.id] !== undefined && 
            equipmentData[param.id] !== null && 
            equipmentData[param.id] !== '' &&
            !isNaN(equipmentData[param.id])
        );
        
        if (validParams.length < parameters.length) {
            // Equipment incomplete, find next parameter
            dataEntryState.currentEquipmentIndex = i;
            dataEntryState.currentParameterIndex = validParams.length;
            console.log(`Equipment ${equipment.name} incomplete: ${validParams.length}/${parameters.length}`);
            return;
        }
        
        console.log(`Equipment ${equipment.name} completed`);
    }
    
    // All equipment completed
    console.log('All equipment completed');
    dataEntryState.currentEquipmentIndex = 0;
    dataEntryState.currentParameterIndex = 0;
}

function showEntryInterface(unitId) {
    console.log('Showing entry interface for unit:', unitId);
    
    // Update unit button styles
    document.querySelectorAll('.unit-btn').forEach(btn => btn.classList.remove('selected'));
    const unitButton = document.querySelector(`.unit-btn.${unitId.toLowerCase()}`);
    if (unitButton) {
        unitButton.classList.add('selected');
    }
    
    // Show entry interface
    const entryHeader = document.getElementById('entryHeader');
    if (entryHeader) {
        entryHeader.classList.remove('d-none');
        entryHeader.className = `data-entry-header ${unitId.toLowerCase()}`;
    }
    
    const inputArea = document.getElementById('inputArea');
    if (inputArea) {
        inputArea.classList.remove('d-none');
    }
    
    const newEntryControls = document.getElementById('newEntryControls');
    if (newEntryControls) {
        newEntryControls.classList.remove('d-none');
    }
    
    // Update current display
    updateCurrentDisplay();
    
    // Focus on input
    setTimeout(() => {
        const dataInput = document.getElementById('dataInput');
        if (dataInput) {
            dataInput.focus();
        }
    }, 100);
}

async function selectUnit(unitId) {
    console.log('Selecting unit:', unitId);
    
    const selectedDate = document.getElementById('entryDateInput')?.value;
    
    if (!selectedDate) {
        showNotification('لطفاً تاریخ را انتخاب کنید', 'error');
        return;
    }
    
    try {
        // Reset state
        dataEntryState.selectedUnit = unitId;
        dataEntryState.selectedDate = selectedDate;
        dataEntryState.currentEquipmentIndex = 0;
        dataEntryState.currentParameterIndex = 0;
        dataEntryState.dateData = {};
        dataEntryState.currentData = {};
        
        // Load data
        await loadDateData();
        
        // Check if all equipment is completed
        const equipmentIds = APP_CONFIG.equipments.map(e => e.id);
        const allData = await getDataFromDB({ 
            unit: unitId, 
            date: selectedDate 
        });
        
        let allCompleted = true;
        for (const equipmentId of equipmentIds) {
            const equipmentData = allData.find(d => d.equipment === equipmentId);
            if (!equipmentData) {
                allCompleted = false;
                break;
            }
            
            // Check if all parameters are complete
            const parameterCount = APP_CONFIG.parameters.length;
            const completedParams = Object.keys(equipmentData.parameters).filter(
                paramId => equipmentData.parameters[paramId] !== undefined && 
                          equipmentData.parameters[paramId] !== null && 
                          equipmentData.parameters[paramId] !== ''
            ).length;
            
            if (completedParams < parameterCount) {
                allCompleted = false;
                break;
            }
        }
        
        if (allCompleted && allData.length === equipmentIds.length) {
            showNotification('تمام تجهیزات این واحد برای این تاریخ تکمیل شده. به حالت ویرایش منتقل می‌شوید.', 'info');
            switchDataEntryMode('edit');
            document.getElementById('editDateInput').value = selectedDate;
            selectEditUnit(unitId);
            return;
        }
        
        showEntryInterface(unitId);
        
    } catch (error) {
        console.error('Error selecting unit:', error);
        showNotification('خطا در انتخاب واحد', 'error');
    }
}

async function selectEditUnit(unitId) {
    dataEntryState.editSelectedUnit = unitId;
    dataEntryState.editSelectedDate = document.getElementById('editDateInput')?.value;
    dataEntryState.editSelectedEquipment = null;
    dataEntryState.editSelectedParameter = null;
    
    if (!dataEntryState.editSelectedDate) {
        showNotification('لطفاً تاریخ را انتخاب کنید', 'error');
        return;
    }
    
    // Update unit button styles
    document.querySelectorAll('#editMode .unit-btn').forEach(btn => btn.classList.remove('selected'));
    const unitButton = document.querySelector(`#editMode .unit-btn.${unitId.toLowerCase()}`);
    if (unitButton) {
        unitButton.classList.add('selected');
    }
    
    // Show equipment selection
    const editEquipmentSection = document.getElementById('editEquipmentSection');
    if (editEquipmentSection) {
        editEquipmentSection.classList.remove('d-none');
    }
    
    // Render equipment cards
    renderEditEquipmentCards(unitId);
    
    // Hide parameter and input sections
    const elementsToHide = ['editParameterSection', 'editInputArea', 'editControls'];
    elementsToHide.forEach(id => {
        const element = document.getElementById(id);
        if (element) {
            element.classList.add('d-none');
        }
    });
}

function renderEditEquipmentCards(unitId) {
    const container = document.getElementById('editEquipmentGrid');
    if (!container) return;
    
    container.innerHTML = '';
    
    APP_CONFIG.equipments.forEach(equipment => {
        const card = document.createElement('div');
        card.className = `equipment-card ${unitId.toLowerCase()}-style`;
        card.onclick = () => selectEditEquipment(equipment.id);
        
        card.innerHTML = `
            <div class="equipment-header">
                <div class="equipment-icon">
                    <i class="${equipment.icon}"></i>
                </div>
                <div class="equipment-info">
                    <h3>${equipment.name}</h3>
                    <p>${equipment.code}</p>
                </div>
            </div>
        `;
        
        container.appendChild(card);
    });
}

async function selectEditEquipment(equipmentId) {
    dataEntryState.editSelectedEquipment = equipmentId;
    dataEntryState.editSelectedParameter = null;
    
    // Update equipment card styles
    document.querySelectorAll('#editEquipmentGrid .equipment-card').forEach(card => {
        card.classList.remove('selected');
    });
    
    const clickedCard = event?.target?.closest('.equipment-card');
    if (clickedCard) {
        clickedCard.classList.add('selected');
    }
    
    // Show parameter selection
    const editParameterSection = document.getElementById('editParameterSection');
    if (editParameterSection) {
        editParameterSection.classList.remove('d-none');
    }
    
    // Render parameter cards
    renderEditParameterCards();
    
    // Hide input section
    const elementsToHide = ['editInputArea', 'editControls'];
    elementsToHide.forEach(id => {
        const element = document.getElementById(id);
        if (element) {
            element.classList.add('d-none');
        }
    });
}

function renderEditParameterCards() {
    const container = document.getElementById('editParameterGrid');
    if (!container) return;
    
    container.innerHTML = '';
    
    APP_CONFIG.parameters.forEach(parameter => {
        const card = document.createElement('div');
        card.className = `parameter-card ${dataEntryState.editSelectedUnit?.toLowerCase()}-style`;
        card.onclick = () => selectEditParameter(parameter.id);
        
        card.innerHTML = `
            <div class="parameter-icon">
                <i class="${parameter.icon}"></i>
            </div>
            <div class="parameter-name">${parameter.name}</div>
            <div class="parameter-code">${parameter.code}</div>
        `;
        
        container.appendChild(card);
    });
}

async function selectEditParameter(parameterId) {
    dataEntryState.editSelectedParameter = parameterId;
    
    // Update parameter card styles
    document.querySelectorAll('#editParameterGrid .parameter-card').forEach(card => {
        card.classList.remove('selected');
    });
    
    const clickedCard = event?.target?.closest('.parameter-card');
    if (clickedCard) {
        clickedCard.classList.add('selected');
    }
    
    // Get current value
    try {
        const data = await getDataFromDB({
            unit: dataEntryState.editSelectedUnit,
            equipment: dataEntryState.editSelectedEquipment,
            date: dataEntryState.editSelectedDate
        });
        
        let currentValue = '--';
        if (data.length > 0 && data[0].parameters[parameterId] !== undefined) {
            currentValue = data[0].parameters[parameterId];
        }
        
        dataEntryState.editCurrentValue = currentValue;
        
        // Show input section
        const editInputArea = document.getElementById('editInputArea');
        const editControls = document.getElementById('editControls');
        
        if (editInputArea) editInputArea.classList.remove('d-none');
        if (editControls) editControls.classList.remove('d-none');
        
        // Update display
        const currentValueElement = document.getElementById('currentValue');
        const editDataInput = document.getElementById('editDataInput');
        
        if (currentValueElement) {
            currentValueElement.textContent = currentValue;
        }
        
        if (editDataInput) {
            editDataInput.value = currentValue === '--' ? '' : currentValue;
            editDataInput.focus();
        }
        
    } catch (error) {
        console.error('Error getting current value:', error);
        showNotification('خطا در دریافت مقدار فعلی', 'error');
    }
}

async function saveEditedData() {
    const editDataInput = document.getElementById('editDataInput');
    const value = editDataInput?.value?.trim();
    
    if (!value || !validateValue(value)) {
        showNotification('لطفاً مقدار صحیح (0-20) وارد کنید', 'error');
        return;
    }
    
    try {
        const saveData = {
            unit: dataEntryState.editSelectedUnit,
            equipment: dataEntryState.editSelectedEquipment,
            date: dataEntryState.editSelectedDate,
            parameters: {
                [dataEntryState.editSelectedParameter]: parseFloat(value)
            }
        };
        
        await saveDataToDB(saveData);
        showNotification('داده با موفقیت ویرایش شد', 'success');
        
        // Update current value display
        dataEntryState.editCurrentValue = parseFloat(value);
        const currentValueElement = document.getElementById('currentValue');
        if (currentValueElement) {
            currentValueElement.textContent = parseFloat(value);
        }
        
    } catch (error) {
        console.error('Error saving edited data:', error);
        showNotification('خطا در ذخیره داده', 'error');
    }
}

function cancelEdit() {
    // Reset edit selections
    dataEntryState.editSelectedUnit = null;
    dataEntryState.editSelectedDate = null;
    dataEntryState.editSelectedEquipment = null;
    dataEntryState.editSelectedParameter = null;
    dataEntryState.editCurrentValue = null;
    
    // Hide sections
    const elementsToHide = [
        'editEquipmentSection', 'editParameterSection', 'editInputArea', 'editControls'
    ];
    
    elementsToHide.forEach(id => {
        const element = document.getElementById(id);
        if (element) {
            element.classList.add('d-none');
        }
    });
    
    // Reset selections
    document.querySelectorAll('#editMode .unit-btn').forEach(btn => btn.classList.remove('selected'));
    document.querySelectorAll('#editEquipmentGrid .equipment-card').forEach(card => card.classList.remove('selected'));
    document.querySelectorAll('#editParameterGrid .parameter-card').forEach(card => card.classList.remove('selected'));
}

async function loadDateData() {
    try {
        console.log('Loading data for:', dataEntryState.selectedUnit, dataEntryState.selectedDate);
        
        // Clear previous cache
        dataEntryState.dateData = {};
        
        // Load data specific to selected date
        const data = await getDataFromDB({ 
            unit: dataEntryState.selectedUnit, 
            date: dataEntryState.selectedDate 
        });
        
        console.log('Raw data from DB:', data);
        
        // Organize data
        data.forEach(item => {
            console.log(`Processing equipment: ${item.equipment}`, item.parameters);
            dataEntryState.dateData[item.equipment] = { ...item.parameters };
        });
        
        console.log('Organized dateData:', dataEntryState.dateData);
        
        // Set indices for next incomplete equipment
        await setNextIncompletePosition();
        
        console.log('Set position:', {
            equipmentIndex: dataEntryState.currentEquipmentIndex,
            parameterIndex: dataEntryState.currentParameterIndex
        });
        
    } catch (error) {
        console.error('Error loading date data:', error);
    }
}

function updateCurrentDisplay() {
    const equipments = APP_CONFIG.equipments;
    const parameters = APP_CONFIG.parameters;
    const currentEquipment = equipments[dataEntryState.currentEquipmentIndex];
    const currentParameter = parameters[dataEntryState.currentParameterIndex];
    
    if (!currentEquipment || !currentParameter) return;
    
    // Update display
    const unitInfo = APP_CONFIG.units.find(u => u.id === dataEntryState.selectedUnit);
    const currentUnitElement = document.getElementById('currentUnit');
    const currentDateElement = document.getElementById('currentDate');
    
    if (currentUnitElement && unitInfo) {
        currentUnitElement.textContent = unitInfo.name;
    }
    
    if (currentDateElement && dataEntryState.selectedDate) {
        currentDateElement.textContent = formatDate(dataEntryState.selectedDate);
    }
    
    const equipmentElement = document.getElementById('currentEquipment');
    if (equipmentElement) {
        equipmentElement.innerHTML = `
            <i class="${currentEquipment.icon}" style="color: ${currentEquipment.color}"></i>
            ${currentEquipment.name}
        `;
    }
    
    const parameterElement = document.getElementById('currentParameter');
    if (parameterElement) {
        parameterElement.innerHTML = `
            <i class="${currentParameter.icon}" style="color: ${currentParameter.color}"></i>
            ${currentParameter.name} (${currentParameter.code})
        `;
    }
    
    // Update progress
    const totalParams = equipments.length * parameters.length;
    const currentProgress = (dataEntryState.currentEquipmentIndex * parameters.length) + dataEntryState.currentParameterIndex;
    const progressPercent = Math.round((currentProgress / totalParams) * 100);
    
    const progressFill = document.getElementById('progressFill');
    if (progressFill) {
        progressFill.style.width = `${progressPercent}%`;
    }
    
    // Check if value exists
    const existingValue = dataEntryState.dateData[currentEquipment.id]?.[currentParameter.id];
    const dataInput = document.getElementById('dataInput');
    if (dataInput) {
        if (existingValue !== undefined) {
            dataInput.value = existingValue;
        } else {
            dataInput.value = '';
        }
    }
}

function handleDataInput() {
    const input = document.getElementById('dataInput');
    const value = input?.value?.trim();
    
    if (!value || !validateValue(value)) {
        if (input) {
            input.classList.add('shake');
            setTimeout(() => input.classList.remove('shake'), 500);
        }
        showNotification('لطفاً مقدار صحیح (0-20) وارد کنید', 'error');
        return;
    }
    
    // Save current value
    const equipments = APP_CONFIG.equipments;
    const parameters = APP_CONFIG.parameters;
    const currentEquipment = equipments[dataEntryState.currentEquipmentIndex];
    const currentParameter = parameters[dataEntryState.currentParameterIndex];
    
    if (!dataEntryState.dateData[currentEquipment.id]) {
        dataEntryState.dateData[currentEquipment.id] = {};
    }
    dataEntryState.dateData[currentEquipment.id][currentParameter.id] = parseFloat(value);
    
    console.log('Saved value:', value, 'for', currentEquipment.name, currentParameter.name);
    
    // Move to next parameter
    dataEntryState.currentParameterIndex++;
    
    if (dataEntryState.currentParameterIndex >= parameters.length) {
        // Save equipment data
        saveEquipmentData(currentEquipment.id);
        
        // Move to next equipment
        dataEntryState.currentParameterIndex = 0;
        dataEntryState.currentEquipmentIndex++;
        
        if (dataEntryState.currentEquipmentIndex >= equipments.length) {
            // All equipment completed
            showNotification('تمام تجهیزات تکمیل شد!', 'success');
            dataEntryState.currentEquipmentIndex = 0;
            // Switch to edit mode
            setTimeout(() => {
                switchDataEntryMode('edit');
                const editDateInput = document.getElementById('editDateInput');
                if (editDateInput) {
                    editDateInput.value = dataEntryState.selectedDate;
                }
                showNotification('اکنون می‌توانید داده‌ها را ویرایش کنید', 'info');
            }, 1000);
            return;
        }
    }
    
    updateCurrentDisplay();
    if (input) {
        input.focus();
    }
}

async function saveEquipmentData(equipmentId) {
    const data = {
        unit: dataEntryState.selectedUnit,
        equipment: equipmentId,
        date: dataEntryState.selectedDate,
        parameters: dataEntryState.dateData[equipmentId]
    };
    
    try {
        await saveDataToDB(data);
        console.log('Equipment data saved:', data);
        showNotification('داده‌های تجهیز ذخیره شد', 'success');
    } catch (error) {
        console.error('Error saving equipment data:', error);
        showNotification('خطا در ذخیره داده‌ها', 'error');
    }
}

function saveCurrentData() {
    const input = document.getElementById('dataInput');
    const value = input?.value?.trim();
    
    if (value && validateValue(value)) {
        handleDataInput();
    } else {
        showNotification('لطفاً مقدار صحیح وارد کنید', 'error');
    }
}

function resetEntry() {
    dataEntryState.currentEquipmentIndex = 0;
    dataEntryState.currentParameterIndex = 0;
    updateCurrentDisplay();
    
    const dataInput = document.getElementById('dataInput');
    if (dataInput) {
        dataInput.focus();
    }
}

function initDataEntry() {
    // Set default date to today
    const entryDateInput = document.getElementById('entryDateInput');
    const editDateInput = document.getElementById('editDateInput');
    
    if (entryDateInput) entryDateInput.value = getCurrentDate();
    if (editDateInput) editDateInput.value = getCurrentDate();
    
    // Setup input event listeners
    const dataInput = document.getElementById('dataInput');
    if (dataInput) {
        // Remove existing listeners
        const newInput = dataInput.cloneNode(true);
        dataInput.parentNode.replaceChild(newInput, dataInput);
        
        newInput.addEventListener('keypress', (e) => {
            if (e.key === 'Enter') {
                e.preventDefault();
                handleDataInput();
            }
        });
        
        newInput.addEventListener('input', (e) => {
            const value = e.target.value;
            if (value && !validateValue(value)) {
                e.target.style.borderColor = 'var(--error-color)';
            } else {
                e.target.style.borderColor = 'var(--border-color)';
            }
        });
    }
    
    // Setup edit input event listener
    const editDataInput = document.getElementById('editDataInput');
    if (editDataInput) {
        // Remove existing listeners
        const newEditInput = editDataInput.cloneNode(true);
        editDataInput.parentNode.replaceChild(newEditInput, editDataInput);
        
        newEditInput.addEventListener('keypress', (e) => {
            if (e.key === 'Enter') {
                e.preventDefault();
                saveEditedData();
            }
        });
        
        newEditInput.addEventListener('input', (e) => {
            const value = e.target.value;
            if (value && !validateValue(value)) {
                e.target.style.borderColor = 'var(--error-color)';
            } else {
                e.target.style.borderColor = 'var(--border-color)';
            }
        });
    }
}

// ==================== VIEW DATA FUNCTIONS ====================
async function initViewData() {
    await loadViewFilters();
    await loadViewData();
    updateUserDisplay();
}

async function loadViewFilters() {
    // Load equipment options
    const equipmentSelect = document.getElementById('viewEquipment');
    if (equipmentSelect) {
        equipmentSelect.innerHTML = '<option value="">همه تجهیزات</option>';
        
        APP_CONFIG.equipments.forEach(equipment => {
            const option = document.createElement('option');
            option.value = equipment.id;
            option.textContent = equipment.name;
            equipmentSelect.appendChild(option);
        });
    }
    
    // Set default date to today
    const viewDate = document.getElementById('viewDate');
    if (viewDate) {
        viewDate.value = getCurrentDate();
    }
    
    // Add event listeners
    const viewUnit = document.getElementById('viewUnit');
    const viewEquipment = document.getElementById('viewEquipment');
    
    if (viewUnit) {
        viewUnit.removeEventListener('change', loadViewData);
        viewUnit.addEventListener('change', loadViewData);
    }
    
    if (viewDate) {
        viewDate.removeEventListener('change', loadViewData);
        viewDate.addEventListener('change', loadViewData);
    }
    
    if (viewEquipment) {
        viewEquipment.removeEventListener('change', loadViewData);
        viewEquipment.addEventListener('change', loadViewData);
    }
}

async function loadViewData() {
    const viewUnit = document.getElementById('viewUnit');
    const viewDate = document.getElementById('viewDate');
    const viewEquipment = document.getElementById('viewEquipment');
    
    const unit = viewUnit?.value || '';
    const date = viewDate?.value || '';
    const equipment = viewEquipment?.value || '';
    
    const filters = {};
    if (unit) filters.unit = unit;
    if (date) filters.date = date;
    if (equipment) filters.equipment = equipment;
    
    try {
        const data = await getDataFromDB(filters);
        
        if (unit === '') {
            // Show both units in separate tables
            renderSeparateUnitTables(data, date);
        } else {
            // Show single table
            renderDataTable(data, unit);
        }
    } catch (error) {
        console.error('Error loading view data:', error);
        showNotification('خطا در بارگذاری داده‌ها', 'error');
    }
}

function renderSeparateUnitTables(data, date) {
    const container = document.getElementById('dataTablesContainer');
    if (!container) return;
    
    container.innerHTML = '';
    
    ['DRI1', 'DRI2'].forEach(unitId => {
        const unitData = data.filter(d => d.unit === unitId);
        const unitInfo = APP_CONFIG.units.find(u => u.id === unitId);
        
        // Create table container
        const tableContainer = document.createElement('div');
        tableContainer.className = `table-container mobile-scroll table-${unitId.toLowerCase()}`;
        
        // Add title with user info
        const title = document.createElement('div');
        title.className = `table-title ${unitId.toLowerCase()}`;
        title.innerHTML = `
            <div class="d-flex justify-between align-center">
                <span>${unitInfo.name} - ${date ? formatDate(date) : 'همه تاریخ‌ها'}</span>
                <span style="font-size: 0.9rem;">کاربر: ${currentUser?.fullName || 'نامشخص'}</span>
            </div>
        `;
        tableContainer.appendChild(title);
        
        // Create table
        const table = document.createElement('table');
        table.className = 'table';
        
        // Create header
        const thead = document.createElement('thead');
        const headerRow = document.createElement('tr');
        headerRow.innerHTML = '<th>پارامتر</th>';
        
        const equipments = [...new Set(unitData.map(d => d.equipment))].sort();
        equipments.forEach(equipmentId => {
            const equipment = APP_CONFIG.equipments.find(e => e.id === equipmentId);
            const th = document.createElement('th');
            th.textContent = equipment ? equipment.name : equipmentId;
            headerRow.appendChild(th);
        });
        
        thead.appendChild(headerRow);
        table.appendChild(thead);
        
        // Create body
        const tbody = document.createElement('tbody');
        
        if (unitData.length === 0) {
            const row = document.createElement('tr');
            row.innerHTML = `<td colspan="${equipments.length + 1}" class="text-center">داده‌ای موجود نیست</td>`;
            tbody.appendChild(row);
        } else {
            const parameters = APP_CONFIG.parameters;
            parameters.forEach(parameter => {
                const row = document.createElement('tr');
                
                // Parameter name cell
                const paramCell = document.createElement('td');
                paramCell.innerHTML = `
                    <div style="display: flex; align-items: center; gap: 0.5rem;">
                        <i class="${parameter.icon}" style="color: ${parameter.color}"></i>
                        <span>${parameter.name}</span>
                        <small style="opacity: 0.7;">(${parameter.code})</small>
                    </div>
                `;
                row.appendChild(paramCell);
                
                // Data cells
                equipments.forEach(equipmentId => {
                    const td = document.createElement('td');
                    const equipmentData = unitData.find(d => d.equipment === equipmentId);
                    const value = equipmentData?.parameters?.[parameter.id];
                    
                    if (value !== undefined) {
                        td.textContent = value;
                        td.style.fontWeight = '600';
                    } else {
                        td.textContent = '--';
                        td.style.opacity = '0.5';
                    }
                    
                    row.appendChild(td);
                });
                
                tbody.appendChild(row);
            });
        }
        
        table.appendChild(tbody);
        tableContainer.appendChild(table);
        container.appendChild(tableContainer);
    });
}

function renderDataTable(data, selectedUnit) {
    const container = document.getElementById('dataTablesContainer');
    if (!container) return;
    
    container.innerHTML = '';
    
    const tableContainer = document.createElement('div');
    tableContainer.className = 'table-container mobile-scroll';
    
    if (selectedUnit) {
        tableContainer.classList.add(`table-${selectedUnit.toLowerCase()}`);
    }
    
    const table = document.createElement('table');
    table.className = 'table';
    
    // Create header
    const thead = document.createElement('thead');
    const headerRow = document.createElement('tr');
    headerRow.innerHTML = '<th>پارامتر</th>';
    
    if (data.length === 0) {
        const tbody = document.createElement('tbody');
        tbody.innerHTML = '<tr><td colspan="100%" class="text-center">داده‌ای موجود نیست</td></tr>';
        table.appendChild(tbody);
        tableContainer.appendChild(table);
        container.appendChild(tableContainer);
        return;
    }
    
    // Get unique equipments from data
    const equipments = [...new Set(data.map(d => d.equipment))].sort();
    
    equipments.forEach(equipmentId => {
                const equipment = APP_CONFIG.equipments.find(e => e.id === equipmentId);
        const th = document.createElement('th');
        th.textContent = equipment ? equipment.name : equipmentId;
        headerRow.appendChild(th);
    });
    
    thead.appendChild(headerRow);
    table.appendChild(thead);
    
    // Create body
    const tbody = document.createElement('tbody');
    const parameters = APP_CONFIG.parameters;
    
    parameters.forEach(parameter => {
        const row = document.createElement('tr');
        
        // Parameter name cell
        const paramCell = document.createElement('td');
        paramCell.innerHTML = `
            <div style="display: flex; align-items: center; gap: 0.5rem;">
                <i class="${parameter.icon}" style="color: ${parameter.color}"></i>
                <span>${parameter.name}</span>
                <small style="opacity: 0.7;">(${parameter.code})</small>
            </div>
        `;
        row.appendChild(paramCell);
        
        // Data cells
        equipments.forEach(equipmentId => {
            const td = document.createElement('td');
            const equipmentData = data.find(d => d.equipment === equipmentId);
            const value = equipmentData?.parameters?.[parameter.id];
            
            if (value !== undefined) {
                td.textContent = value;
                td.style.fontWeight = '600';
            } else {
                td.textContent = '--';
                td.style.opacity = '0.5';
            }
            
            row.appendChild(td);
        });
        
        tbody.appendChild(row);
    });
    
    table.appendChild(tbody);
    tableContainer.appendChild(table);
    container.appendChild(tableContainer);
}

function printTable() {
    const viewUnit = document.getElementById('viewUnit');
    const viewDate = document.getElementById('viewDate');
    const selectedUnit = viewUnit?.value || '';
    const selectedDate = viewDate?.value || '';
    
    let unitName = 'همه واحدها';
    if (selectedUnit) {
        const unit = APP_CONFIG.units.find(u => u.id === selectedUnit);
        unitName = unit ? unit.name : selectedUnit;
    }
    
    const printWindow = window.open('', '', 'width=800,height=600');
    
    const tablesContainer = document.getElementById('dataTablesContainer');
    
    printWindow.document.write(`
        <html>
            <head>
                <title>گزارش داده‌های ویبره</title>
                <style>
                    body { font-family: 'Vazirmatn', sans-serif; direction: rtl; }
                    table { width: 100%; border-collapse: collapse; margin-bottom: 2rem; }
                    th, td { border: 1px solid #ddd; padding: 8px; text-align: center; }
                    th { background-color: #f2f2f2; font-weight: bold; }
                    .header { text-align: center; margin-bottom: 20px; }
                    .info { margin-bottom: 10px; color: #666; }
                    .table-title { background: #f0f0f0; padding: 10px; font-weight: bold; margin-bottom: 10px; }
                    .table-title.dri1 { background: #3b82f6; color: white; }
                    .table-title.dri2 { background: #ef4444; color: white; }
                    .user-info { text-align: left; font-size: 0.9rem; margin-top: 10px; }
                </style>
            </head>
            <body>
                <div class="header">
                    <h2>گزارش داده‌های ویبره تجهیزات</h2>
                    <div class="info">واحد: ${unitName}</div>
                    <div class="info">تاریخ: ${selectedDate ? formatDate(selectedDate) : 'همه تاریخ‌ها'}</div>
                    <div class="user-info">کاربر: ${currentUser?.fullName || 'نامشخص'}</div>
                </div>
                ${tablesContainer?.innerHTML || ''}
            </body>
        </html>
    `);
    
    printWindow.document.close();
    printWindow.print();
}

// ==================== CHARTS FUNCTIONS ====================
async function initCharts() {
    await loadChartFilters();
    initChartParameters();
    updateUserDisplay();
    updateChartContainerSize();
}

async function loadChartFilters() {
    // Load equipment options
    const equipmentSelect = document.getElementById('chartEquipment');
    if (equipmentSelect) {
        equipmentSelect.innerHTML = '';
        
        APP_CONFIG.equipments.forEach(equipment => {
            const option = document.createElement('option');
            option.value = equipment.id;
            option.textContent = equipment.name;
            equipmentSelect.appendChild(option);
        });
    }
    
    // Set default dates
    const today = getCurrentDate();
    const weekAgo = new Date();
    weekAgo.setDate(weekAgo.getDate() - 7);
    
    const chartDateFrom = document.getElementById('chartDateFrom');
    const chartDateTo = document.getElementById('chartDateTo');
    
    if (chartDateFrom) chartDateFrom.value = weekAgo.toISOString().split('T')[0];
    if (chartDateTo) chartDateTo.value = today;
    
    // Add event listeners
    const chartElements = ['chartUnit', 'chartEquipment', 'chartDateFrom', 'chartDateTo'];
    chartElements.forEach(elementId => {
        const element = document.getElementById(elementId);
        if (element) {
            element.removeEventListener('change', updateChart);
            element.addEventListener('change', updateChart);
        }
    });
}

function initChartParameters() {
    const container = document.getElementById('chartParameters');
    if (!container) return;
    
    container.innerHTML = '';
    
    const parameters = APP_CONFIG.parameters;
    parameters.forEach(parameter => {
        const div = document.createElement('div');
        div.className = 'parameter-item';
        div.innerHTML = `
            <label style="display: flex; align-items: center; gap: 0.5rem; cursor: pointer;">
                <input type="checkbox" value="${parameter.id}" onchange="updateChart()">
                <i class="${parameter.icon}" style="color: ${parameter.color}"></i>
                <span>${parameter.name}</span>
            </label>
        `;
        container.appendChild(div);
    });
}

function updateChartContainerSize() {
    const chartContainer = document.getElementById('chartContainerMain');
    if (!chartContainer) return;
    
    const isFullscreen = document.getElementById('charts')?.classList.contains('fullscreen');
    
    if (isFullscreen) {
        // Fullscreen: 90% width and height
        chartContainer.style.width = '90%';
        chartContainer.style.height = '90vh';
        chartContainer.style.margin = '0 auto';
    } else {
        // Normal: 80% width and height
        chartContainer.style.width = '80%';
        chartContainer.style.height = '80vh';
        chartContainer.style.margin = '0 auto';
    }
}

async function updateChart() {
    const chartUnit = document.getElementById('chartUnit');
    const chartEquipment = document.getElementById('chartEquipment');
    const chartDateFrom = document.getElementById('chartDateFrom');
    const chartDateTo = document.getElementById('chartDateTo');
    
    const unit = chartUnit?.value || '';
    const equipment = chartEquipment?.value || '';
    const dateFrom = chartDateFrom?.value || '';
    const dateTo = chartDateTo?.value || '';
    
    const selectedParameters = [];
    document.querySelectorAll('#chartParameters input[type="checkbox"]:checked').forEach(cb => {
        selectedParameters.push(cb.value);
    });
    
    if (!equipment || selectedParameters.length === 0) {
        if (chartInstance) {
            chartInstance.destroy();
            chartInstance = null;
        }
        return;
    }
    
    try {
        const data = await getDataFromDB({
            unit,
            equipment,
            dateFrom,
            dateTo
        });
        
        renderChart(data, selectedParameters);
    } catch (error) {
        console.error('Error loading chart data:', error);
        showNotification('خطا در بارگذاری داده‌های نمودار', 'error');
    }
}

function renderChart(data, selectedParameters) {
    const ctx = document.getElementById('mainChart')?.getContext('2d');
    if (!ctx) return;
    
    if (chartInstance) {
        chartInstance.destroy();
    }
    
    // Prepare data
    const dates = [...new Set(data.map(d => d.date))].sort();
    const datasets = [];
    
    selectedParameters.forEach((paramId, index) => {
        const parameter = APP_CONFIG.parameters.find(p => p.id === paramId);
        const values = dates.map(date => {
            const item = data.find(d => d.date === date);
            return item?.parameters?.[paramId] || null;
        });
        
        datasets.push({
            label: parameter.name,
            data: values,
            borderColor: parameter.color,
            backgroundColor: parameter.color + '20',
            borderWidth: 2,
            fill: false,
            tension: 0.1
        });
    });
    
    chartInstance = new Chart(ctx, {
        type: 'line',
        data: {
            labels: dates.map(date => formatDate(date)),
            datasets: datasets
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            plugins: {
                legend: {
                    position: 'top',
                    labels: {
                        usePointStyle: true,
                        font: {
                            family: 'Vazirmatn'
                        }
                    }
                }
            },
            scales: {
                x: {
                    title: {
                        display: true,
                        text: 'تاریخ'
                    }
                },
                y: {
                    title: {
                        display: true,
                        text: 'مقدار'
                    },
                    beginAtZero: true
                }
            }
        }
    });
}

function printChart() {
    const canvas = document.getElementById('mainChart');
    if (!canvas) return;
    
    const printWindow = window.open('', '', 'width=800,height=600');
    
    const chartEquipment = document.getElementById('chartEquipment');
    const equipmentText = chartEquipment?.selectedOptions[0]?.textContent || 'نامشخص';
    
    printWindow.document.write(`
        <html>
            <head>
                <title>نمودار داده‌های ویبره</title>
                <style>
                    body { font-family: 'Vazirmatn', sans-serif; direction: rtl; text-align: center; }
                    .header { margin-bottom: 20px; }
                    img { max-width: 100%; height: auto; }
                    .user-info { text-align: left; font-size: 0.9rem; margin-top: 10px; }
                </style>
            </head>
            <body>
                <div class="header">
                    <h2>نمودار داده‌های ویبره</h2>
                    <p>تجهیز: ${equipmentText}</p>
                    <div class="user-info">کاربر: ${currentUser?.fullName || 'نامشخص'}</div>
                </div>
                <img src="${canvas.toDataURL()}" alt="نمودار">
            </body>
        </html>
    `);
    
    printWindow.document.close();
    printWindow.print();
}

// ==================== ANALYSIS FUNCTIONS ====================
async function initAnalysis() {
    updateUserDisplay();
    await loadAnalysisData();
}

async function loadAnalysisData() {
    try {
        const anomalies = await findAnomalies();
        renderAnalysisCards(anomalies);
    } catch (error) {
        console.error('Error loading analysis data:', error);
        showNotification('خطا در بارگذاری داده‌های آنالیز', 'error');
    }
}

async function findAnomalies() {
    const anomalies = [];
    const today = new Date();
    const timeRangeEnd = new Date(today);
    
    // Calculate date range based on settings
    const timeRangeStart = new Date(today);
    timeRangeStart.setDate(timeRangeStart.getDate() - currentSettings.analysisTimeRange);
    
    const comparisonDate = new Date(today);
    comparisonDate.setDate(comparisonDate.getDate() - currentSettings.analysisComparisonDays);
    
    // Get all data for the time range
    const allData = await getDataFromDB({
        dateFrom: timeRangeStart.toISOString().split('T')[0],
        dateTo: timeRangeEnd.toISOString().split('T')[0]
    });
    
    // Group data by unit, equipment, and parameter
    const dataGroups = {};
    allData.forEach(item => {
        const key = `${item.unit}_${item.equipment}`;
        if (!dataGroups[key]) {
            dataGroups[key] = {};
        }
        dataGroups[key][item.date] = item.parameters;
    });
    
    // Check for anomalies in each group
    for (const [groupKey, dateData] of Object.entries(dataGroups)) {
        const [unit, equipment] = groupKey.split('_');
        const dates = Object.keys(dateData).sort();
        
        if (dates.length < 2) continue; // Need at least 2 data points
        
        for (const parameterId of Object.keys(APP_CONFIG.parameters.reduce((acc, p) => ({ ...acc, [p.id]: true }), {}))) {
            const values = dates.map(date => dateData[date]?.[parameterId]).filter(v => v !== undefined);
            
            if (values.length < 2) continue;
            
            // Compare latest value with comparison value
            const latestValue = values[values.length - 1];
            const comparisonValue = values[values.length - 2]; // Previous value
            
            if (comparisonValue === 0) continue; // Avoid division by zero
            
            const increasePercentage = ((latestValue - comparisonValue) / comparisonValue) * 100;
            
            // Check if increase is above threshold
            if (increasePercentage >= currentSettings.analysisThreshold) {
                const parameter = APP_CONFIG.parameters.find(p => p.id === parameterId);
                const equipmentInfo = APP_CONFIG.equipments.find(e => e.id === equipment);
                const unitInfo = APP_CONFIG.units.find(u => u.id === unit);
                
                anomalies.push({
                    unit,
                    unitName: unitInfo?.name || unit,
                    equipment,
                    equipmentName: equipmentInfo?.name || equipment,
                    parameter: parameterId,
                    parameterName: parameter?.name || parameterId,
                    parameterIcon: parameter?.icon || 'fas fa-chart-line',
                    parameterColor: parameter?.color || '#666',
                    currentValue: latestValue,
                    previousValue: comparisonValue,
                    increasePercentage: Math.round(increasePercentage * 100) / 100,
                    increaseAmount: Math.round((latestValue - comparisonValue) * 100) / 100,
                    latestDate: dates[dates.length - 1]
                });
            }
        }
    }
    
    // Sort anomalies by increase percentage (highest first)
    return anomalies.sort((a, b) => b.increasePercentage - a.increasePercentage);
}

function renderAnalysisCards(anomalies) {
    const container = document.getElementById('analysisCardsContainer');
    if (!container) return;
    
    container.innerHTML = '';
    
    if (anomalies.length === 0) {
        container.innerHTML = `
            <div class="text-center p-5">
                <i class="fas fa-check-circle text-success" style="font-size: 4rem;"></i>
                <h3 class="mt-3">هیچ افزایش غیرعادی‌ای یافت نشد</h3>
                <p class="text-secondary">تمام پارامترها در محدوده طبیعی قرار دارند</p>
            </div>
        `;
        return;
    }
    
    anomalies.forEach(anomaly => {
        const card = document.createElement('div');
        card.className = `analysis-card ${anomaly.unit.toLowerCase()}-style`;
        card.onclick = () => navigateToChart(anomaly.unit, anomaly.equipment);
        
        card.innerHTML = `
            <div class="analysis-card-header">
                <div class="analysis-icon">
                    <i class="${anomaly.parameterIcon}" style="color: ${anomaly.parameterColor}"></i>
                </div>
                <div class="analysis-severity ${getSeverityClass(anomaly.increasePercentage)}">
                    ${getSeverityText(anomaly.increasePercentage)}
                </div>
            </div>
            <div class="analysis-card-body">
                <h4 class="analysis-title">${anomaly.parameterName}</h4>
                <div class="analysis-equipment">
                    <strong>${anomaly.equipmentName}</strong> - ${anomaly.unitName}
                </div>
                <div class="analysis-values">
                    <div class="analysis-value-item">
                        <span class="analysis-label">مقدار فعلی:</span>
                        <span class="analysis-value analysis-current">${anomaly.currentValue}</span>
                    </div>
                    <div class="analysis-value-item">
                        <span class="analysis-label">مقدار قبلی:</span>
                        <span class="analysis-value">${anomaly.previousValue}</span>
                    </div>
                    <div class="analysis-value-item">
                        <span class="analysis-label">میزان افزایش:</span>
                        <span class="analysis-value analysis-increase">+${anomaly.increaseAmount}</span>
                    </div>
                    <div class="analysis-value-item">
                        <span class="analysis-label">درصد افزایش:</span>
                        <span class="analysis-value analysis-percentage">+${anomaly.increasePercentage}%</span>
                    </div>
                </div>
                <div class="analysis-date">
                    <i class="fas fa-calendar"></i>
                    ${formatDate(anomaly.latestDate)}
                </div>
            </div>
            <div class="analysis-card-footer">
                <span class="analysis-action-hint">
                    <i class="fas fa-chart-line"></i>
                    برای مشاهده نمودار کلیک کنید
                </span>
            </div>
        `;
        
        container.appendChild(card);
    });
}

function getSeverityClass(percentage) {
    if (percentage >= 50) return 'severity-critical';
    if (percentage >= 30) return 'severity-high';
    if (percentage >= 20) return 'severity-medium';
    return 'severity-low';
}

function getSeverityText(percentage) {
    if (percentage >= 50) return 'بحرانی';
    if (percentage >= 30) return 'بالا';
    if (percentage >= 20) return 'متوسط';
    return 'پایین';
}

function navigateToChart(unit, equipment) {
    // Switch to charts section
    const chartTab = document.querySelector('.nav-tab[onclick*="charts"]');
    if (chartTab) {
        chartTab.click();
    }
    
    // Set chart filters
    setTimeout(() => {
        const chartUnit = document.getElementById('chartUnit');
        const chartEquipment = document.getElementById('chartEquipment');
        
        if (chartUnit) chartUnit.value = unit;
        if (chartEquipment) chartEquipment.value = equipment;
        
        // Select all parameters for better analysis
        document.querySelectorAll('#chartParameters input[type="checkbox"]').forEach(cb => {
            cb.checked = true;
        });
        
        // Set date range to last 30 days
        const today = getCurrentDate();
        const monthAgo = new Date();
        monthAgo.setDate(monthAgo.getDate() - 30);
        
        const chartDateFrom = document.getElementById('chartDateFrom');
        const chartDateTo = document.getElementById('chartDateTo');
        
        if (chartDateFrom) chartDateFrom.value = monthAgo.toISOString().split('T')[0];
        if (chartDateTo) chartDateTo.value = today;
        
        // Update chart
        updateChart();
        
        showNotification(`نمودار ${equipment} در واحد ${unit} نمایش داده شد`, 'success');
    }, 300);
}

function refreshAnalysis() {
    showNotification('در حال به‌روزرسانی آنالیز...', 'info');
    setTimeout(() => {
        loadAnalysisData();
    }, 500);
}

// ==================== SLIDESHOW FUNCTIONS ====================
function initSlideshow() {
    const slideshowDate = document.getElementById('slideshowDate');
    const slideshowSpeed = document.getElementById('slideshowSpeed');
    
    if (slideshowDate) {
        slideshowDate.value = getCurrentDate();
    }
    
    if (slideshowSpeed) {
        slideshowSpeed.removeEventListener('change', updateSlideshowSpeed);
        slideshowSpeed.addEventListener('change', updateSlideshowSpeed);
    }
}

function updateSlideshowSpeed() {
    const slideshowSpeed = document.getElementById('slideshowSpeed');
    const speed = parseInt(slideshowSpeed?.value || 3);
    slideshowState.speed = speed * 1000;
    
    if (slideshowState.isRunning && !slideshowState.isPaused) {
        clearInterval(slideshowState.interval);
        startSlideshowInterval();
    }
}

async function startSlideshow() {
    const slideshowDate = document.getElementById('slideshowDate');
    const date = slideshowDate?.value || '';
    
    if (!date) {
        showNotification('لطفاً تاریخ را انتخاب کنید', 'error');
        return;
    }
    
    try {
        // Get all data for the date
        const allData = await getDataFromDB({ date });
        
        if (allData.length === 0) {
            showNotification('داده‌ای برای این تاریخ موجود نیست', 'error');
            return;
        }
        
        // Organize data by equipment priority
        const equipmentsByPriority = getEquipmentByPriority();
        
        slideshowState.data = {};
        allData.forEach(item => {
            const key = `${item.equipment}_${item.unit}`;
            slideshowState.data[key] = item.parameters;
        });
        
        slideshowState.isRunning = true;
        slideshowState.isPaused = false;
        slideshowState.currentDate = date;
        slideshowState.currentEquipmentIndex = 0;
        slideshowState.currentParameterIndex = 0;
        
        startSlideshowInterval();
        
        showNotification('اسلایدشو شروع شد', 'success');
    } catch (error) {
        console.error('Error starting slideshow:', error);
        showNotification('خطا در شروع اسلایدشو', 'error');
    }
}

function startSlideshowInterval() {
    slideshowState.interval = setInterval(() => {
        showNextSlide();
    }, slideshowState.speed);
    
    // Show first slide immediately
    showNextSlide();
}

function showNextSlide() {
    const equipmentsByPriority = getEquipmentByPriority();
    const parameters = getParametersByPriority();
    
    if (slideshowState.currentEquipmentIndex >= equipmentsByPriority.length) {
        stopSlideshow();
        return;
    }
    
    const currentEquipment = equipmentsByPriority[slideshowState.currentEquipmentIndex];
    const currentParameter = parameters[slideshowState.currentParameterIndex];
    
    // Get data key
    const dataKey = `${currentEquipment.id}_${currentEquipment.unit || 'DRI1'}`;
    
    // Generate random color for the value
    slideshowState.currentValueColor = getRandomColor();
    
    // Update display
    updateSlideshowDisplay(currentEquipment, currentParameter, dataKey);
    
    // Move to next parameter
    slideshowState.currentParameterIndex++;
    
    if (slideshowState.currentParameterIndex >= parameters.length) {
        // Equipment finished, ask for next
        clearInterval(slideshowState.interval);
        slideshowState.currentParameterIndex = 0;
        slideshowState.currentEquipmentIndex++;
        
        if (slideshowState.currentEquipmentIndex < equipmentsByPriority.length) {
            showEquipmentConfirmation();
        } else {
            stopSlideshow();
        }
    }
}

function updateSlideshowDisplay(equipment, parameter, dataKey) {
    const value = slideshowState.data[dataKey]?.[parameter.id];
    
    // Update normal display
    const slideshowEquipmentName = document.getElementById('slideshowEquipmentName');
    const slideshowParameterName = document.getElementById('slideshowParameterName');
    const slideshowValue = document.getElementById('slideshowValue');
    
    if (slideshowEquipmentName) {
        slideshowEquipmentName.textContent = equipment.name;
    }
    
    if (slideshowParameterName) {
        slideshowParameterName.textContent = `${parameter.name} (${parameter.code})`;
    }
    
    if (slideshowValue) {
        slideshowValue.textContent = value !== undefined ? value : '--';
        slideshowValue.style.color = slideshowState.currentValueColor;
    }
    
    // Update fullscreen display if active
    if (slideshowState.isFullscreen) {
        const slideshowEquipmentNameFS = document.getElementById('slideshowEquipmentNameFS');
        const slideshowParameterNameFS = document.getElementById('slideshowParameterNameFS');
        const slideshowValueFS = document.getElementById('slideshowValueFS');
        
        if (slideshowEquipmentNameFS) {
            slideshowEquipmentNameFS.textContent = equipment.name;
        }
        
        if (slideshowParameterNameFS) {
            slideshowParameterNameFS.textContent = `${parameter.name} (${parameter.code})`;
        }
        
        if (slideshowValueFS) {
            slideshowValueFS.textContent = value !== undefined ? value : '--';
            slideshowValueFS.style.color = slideshowState.currentValueColor;
        }
    }
}

function showEquipmentConfirmation() {
    const equipmentsByPriority = getEquipmentByPriority();
    const nextEquipment = equipmentsByPriority[slideshowState.currentEquipmentIndex];
    
    if (slideshowState.isFullscreen) {
        // Show fullscreen modal
        const slideshowFullscreenMessage = document.getElementById('slideshowFullscreenMessage');
        const slideshowFullscreenModal = document.getElementById('slideshowFullscreenModal');
        
        if (slideshowFullscreenMessage) {
            slideshowFullscreenMessage.textContent = `آیا به تجهیز ${nextEquipment.name} بروم؟`;
        }
        
        if (slideshowFullscreenModal) {
            slideshowFullscreenModal.classList.remove('d-none');
        }
    } else {
        // Show normal modal
        const slideshowMessage = document.getElementById('slideshowMessage');
        const slideshowModal = document.getElementById('slideshowModal');
        
        if (slideshowMessage) {
            slideshowMessage.textContent = `آیا به تجهیز ${nextEquipment.name} بروم؟`;
        }
        
        if (slideshowModal) {
            slideshowModal.classList.add('active');
        }
    }
}

function confirmNextEquipment() {
    closeModal('slideshowModal');
    
    if (slideshowState.isRunning) {
        startSlideshowInterval();
    }
}

function confirmNextEquipmentFullscreen() {
    const slideshowFullscreenModal = document.getElementById('slideshowFullscreenModal');
    if (slideshowFullscreenModal) {
        slideshowFullscreenModal.classList.add('d-none');
    }
    
    if (slideshowState.isRunning) {
        startSlideshowInterval();
    }
}

function stopSlideshowFromFullscreen() {
    const slideshowFullscreenModal = document.getElementById('slideshowFullscreenModal');
    if (slideshowFullscreenModal) {
        slideshowFullscreenModal.classList.add('d-none');
    }
    stopSlideshow();
}

function pauseSlideshow() {
    if (slideshowState.isRunning) {
        slideshowState.isPaused = true;
        clearInterval(slideshowState.interval);
        showNotification('اسلایدشو متوقف شد', 'warning');
    }
}

function resumeSlideshow() {
    if (slideshowState.isRunning && slideshowState.isPaused) {
        slideshowState.isPaused = false;
        startSlideshowInterval();
        showNotification('اسلایدشو ادامه یافت', 'success');
    }
}

function stopSlideshow() {
    slideshowState.isRunning = false;
    slideshowState.isPaused = false;
    clearInterval(slideshowState.interval);
    
    // Reset colors
    const slideshowValue = document.getElementById('slideshowValue');
    const slideshowValueFS = document.getElementById('slideshowValueFS');
    
    if (slideshowValue) {
        slideshowValue.style.color = 'var(--primary-color)';
    }
    
    if (slideshowValueFS) {
        slideshowValueFS.style.color = 'var(--primary-color)';
    }
    
    const slideshowEquipmentName = document.getElementById('slideshowEquipmentName');
    const slideshowParameterName = document.getElementById('slideshowParameterName');
    
    if (slideshowEquipmentName) {
        slideshowEquipmentName.textContent = 'اسلایدشو متوقف شد';
    }
    
    if (slideshowParameterName) {
        slideshowParameterName.textContent = '';
    }
    
    if (slideshowValue) {
        slideshowValue.textContent = '--';
    }
    
    if (slideshowState.isFullscreen) {
        const slideshowEquipmentNameFS = document.getElementById('slideshowEquipmentNameFS');
        const slideshowParameterNameFS = document.getElementById('slideshowParameterNameFS');
        
        if (slideshowEquipmentNameFS) {
            slideshowEquipmentNameFS.textContent = 'اسلایدشو متوقف شد';
        }
        
        if (slideshowParameterNameFS) {
            slideshowParameterNameFS.textContent = '';
        }
        
        if (slideshowValueFS) {
            slideshowValueFS.textContent = '--';
        }
    }
    
    closeModal('slideshowModal');
    
    const slideshowFullscreenModal = document.getElementById('slideshowFullscreenModal');
    if (slideshowFullscreenModal) {
        slideshowFullscreenModal.classList.add('d-none');
    }
    
    showNotification('اسلایدشو پایان یافت', 'info');
}

function toggleSlideshowFullscreen() {
    if (slideshowState.isFullscreen) {
        exitSlideshowFullscreen();
    } else {
        enterSlideshowFullscreen();
    }
}

function enterSlideshowFullscreen() {
    slideshowState.isFullscreen = true;
    
    const slideshowFullscreen = document.getElementById('slideshowFullscreen');
    if (slideshowFullscreen) {
        slideshowFullscreen.classList.remove('d-none');
    }
    
    // Copy current values to fullscreen
    const slideshowEquipmentName = document.getElementById('slideshowEquipmentName');
    const slideshowParameterName = document.getElementById('slideshowParameterName');
    const slideshowValue = document.getElementById('slideshowValue');
    
    const slideshowEquipmentNameFS = document.getElementById('slideshowEquipmentNameFS');
    const slideshowParameterNameFS = document.getElementById('slideshowParameterNameFS');
    const slideshowValueFS = document.getElementById('slideshowValueFS');
    
    if (slideshowEquipmentNameFS && slideshowEquipmentName) {
        slideshowEquipmentNameFS.textContent = slideshowEquipmentName.textContent;
    }
    
    if (slideshowParameterNameFS && slideshowParameterName) {
        slideshowParameterNameFS.textContent = slideshowParameterName.textContent;
    }
    
    if (slideshowValueFS && slideshowValue) {
        slideshowValueFS.textContent = slideshowValue.textContent;
        slideshowValueFS.style.color = slideshowValue.style.color;
    }
}

function exitSlideshowFullscreen() {
    slideshowState.isFullscreen = false;
    
    const slideshowFullscreen = document.getElementById('slideshowFullscreen');
    const slideshowFullscreenModal = document.getElementById('slideshowFullscreenModal');
    
    if (slideshowFullscreen) {
        slideshowFullscreen.classList.add('d-none');
    }
    
    if (slideshowFullscreenModal) {
        slideshowFullscreenModal.classList.add('d-none');
    }
}

// ==================== DATABASE FUNCTIONS ====================
async function initDatabase() {
    await updateDatabaseStats();
}

async function updateDatabaseStats() {
    try {
        const allData = await getDataFromDB({});
        const uniqueDates = [...new Set(allData.map(d => d.date))];
        
        const totalDays = document.getElementById('totalDays');
        const totalRecords = document.getElementById('totalRecords');
        const dbSize = document.getElementById('dbSize');
        const lastUpdate = document.getElementById('lastUpdate');
        const lastUser = document.getElementById('lastUser');
        
        if (totalDays) totalDays.textContent = uniqueDates.length;
        if (totalRecords) totalRecords.textContent = allData.length;
        
        // Calculate database size (approximate)
        const dataSize = JSON.stringify(allData).length;
        const sizeKB = Math.round(dataSize / 1024);
        if (dbSize) dbSize.textContent = `${sizeKB} KB`;
        
        // Last update
        const lastRecord = allData.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt))[0];
        if (lastRecord && lastUpdate) {
            lastUpdate.textContent = formatDate(lastRecord.createdAt?.split('T')[0] || lastRecord.date);
        }

        // Last user who entered data
        if (lastRecord && lastUser) {
            lastUser.textContent = lastRecord.userName || 'نامشخص';
        }
        
    } catch (error) {
        console.error('Error updating database stats:', error);
    }
}

async function exportData(format) {
    try {
        const allData = await getDataFromDB({});
        
        if (format === 'csv') {
            exportToCSV(allData);
        }
        
        showNotification('داده‌ها با موفقیت خروجی گرفته شد', 'success');
    } catch (error) {
        console.error('Error exporting data:', error);
        showNotification('خطا در خروجی گرفتن', 'error');
    }
}

function exportToCSV(data) {
    const headers = ['واحد', 'تجهیز', 'تاریخ', 'کاربر'];
    const parameters = APP_CONFIG.parameters;
    parameters.forEach(param => {
        headers.push(param.name);
    });
    
    const rows = [headers];
    
    data.forEach(item => {
        const equipment = APP_CONFIG.equipments.find(e => e.id === item.equipment);
        const row = [
            item.unit,
            equipment?.name || item.equipment,
            item.date,
            item.userName || 'نامشخص'
        ];
        
        parameters.forEach(param => {
            row.push(item.parameters[param.id] || '');
        });
        
        rows.push(row);
    });
    
    const csvContent = rows.map(row => row.join(',')).join('\n');
    downloadFile(csvContent, 'vibrate-data.csv', 'text/csv');
}

async function exportSettings() {
    try {
        const settingsData = JSON.stringify(currentSettings, null, 2);
        downloadFile(settingsData, 'vibrate-settings.json', 'application/json');
        showNotification('تنظیمات با موفقیت خروجی گرفته شد', 'success');
    } catch (error) {
        console.error('Error exporting settings:', error);
        showNotification('خطا در خروجی گرفتن تنظیمات', 'error');
    }
}

function downloadFile(content, filename, contentType) {
    const blob = new Blob([content], { type: contentType });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = filename;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
}

async function importData() {
    const fileInput = document.getElementById('importFile');
    const file = fileInput?.files[0];
    
    if (!file) {
        showNotification('لطفاً فایل را انتخاب کنید', 'error');
        return;
    }
    
    try {
        const csvText = await file.text();
        
        // Simple CSV parsing (for more robust parsing, use a library)
        const lines = csvText.split('\n');
        const headers = lines[0].split(',');
        
        if (lines.length < 2) {
            throw new Error('فایل CSV خالی است');
        }
        
        for (let i = 1; i < lines.length; i++) {
            const values = lines[i].split(',');
            if (values.length < headers.length) continue;
            
            const unit = values[0];
            const equipmentName = values[1];
            const date = values[2];
            const userName = values[3] || 'نامشخص';
            
            if (!unit || !equipmentName || !date) continue;
            
            // Find equipment by name
            const equipment = APP_CONFIG.equipments.find(e => e.name === equipmentName);
            if (!equipment) continue;
            
            // Extract parameters
            const params = {};
            APP_CONFIG.parameters.forEach((param, index) => {
                const valueIndex = 4 + index; // Skip unit, equipment, date, userName
                if (values[valueIndex] && values[valueIndex].trim()) {
                    params[param.id] = parseFloat(values[valueIndex]);
                }
            });
            
            // Save to database
            const dataItem = {
                unit,
                equipment: equipment.id,
                date,
                parameters: params
            };
            
            await saveDataToDB(dataItem);
        }
        
        showNotification('داده‌ها با موفقیت وارد شد', 'success');
        await updateDatabaseStats();
    } catch (error) {
        console.error('Error importing data:', error);
        showNotification('خطا در وارد کردن داده‌ها', 'error');
    }
}

async function mergeDatabase() {
    const fileInput = document.getElementById('mergeFile');
    const file = fileInput?.files[0];
    
    if (!file) {
        showNotification('لطفاً فایل دیتابیس را انتخاب کنید', 'error');
        return;
    }
    
    try {
        const csvText = await file.text();
        const lines = csvText.split('\n');
        const headers = lines[0].split(',');
        
        if (lines.length < 2) {
            throw new Error('فایل CSV خالی است');
        }
        
        let mergedCount = 0;
        let skippedCount = 0;
        
        for (let i = 1; i < lines.length; i++) {
            const values = lines[i].split(',');
            if (values.length < headers.length) continue;
            
            const unit = values[0];
            const equipmentName = values[1];
            const date = values[2];
            const userName = values[3] || 'نامشخص';
            
            if (!unit || !equipmentName || !date) continue;
            
            // Find equipment by name
            const equipment = APP_CONFIG.equipments.find(e => e.name === equipmentName);
            if (!equipment) continue;
            
            // Check if data already exists
            const existingData = await getDataFromDB({
                unit,
                equipment: equipment.id,
                date
            });
            
            if (existingData.length > 0) {
                skippedCount++;
                continue;
            }
            
            // Extract parameters
            const params = {};
            APP_CONFIG.parameters.forEach((param, index) => {
                const valueIndex = 4 + index;
                if (values[valueIndex] && values[valueIndex].trim()) {
                    params[param.id] = parseFloat(values[valueIndex]);
                }
            });
            
            // Save to database
            const dataItem = {
                unit,
                equipment: equipment.id,
                date,
                parameters: params
            };
            
            await saveDataToDB(dataItem);
            mergedCount++;
        }
        
        showNotification(`${mergedCount} رکورد ادغام شد، ${skippedCount} رکورد تکراری نادیده گرفته شد`, 'success');
        await updateDatabaseStats();
    } catch (error) {
        console.error('Error merging database:', error);
        showNotification('خطا در ادغام دیتابیس', 'error');
    }
}

async function importSettings() {
    const fileInput = document.createElement('input');
    fileInput.type = 'file';
    fileInput.accept = '.json';
    
    fileInput.onchange = async (e) => {
        const file = e.target.files[0];
        if (!file) return;
        
        try {
            const settingsText = await file.text();
            const importedSettings = JSON.parse(settingsText);
            
            // Validate settings structure
            if (validateSettings(importedSettings)) {
                currentSettings = { ...currentSettings, ...importedSettings };
                await saveSettingsToDB(currentSettings);
                applyTheme();
                showNotification('تنظیمات با موفقیت وارد شد', 'success');
                initSettings(); // Refresh settings display
            } else {
                throw new Error('فایل تنظیمات معیوب است');
            }
        } catch (error) {
            console.error('Error importing settings:', error);
            showNotification('خطا در وارد کردن تنظیمات', 'error');
        }
    };
    
    fileInput.click();
}

function validateSettings(settings) {
    const requiredKeys = ['theme', 'primaryColor', 'equipmentPriority', 'parameterPriority'];
    return requiredKeys.every(key => settings.hasOwnProperty(key));
}

async function clearPreviousDaysCache() {
    try {
        const today = getCurrentDate();
        showNotification('کش روزهای قبل پاک شد', 'success');
        
        // Refresh database stats
        await updateDatabaseStats();
        
    } catch (error) {
        console.error('Error clearing previous days cache:', error);
        showNotification('خطا در پاک کردن کش روزهای قبل', 'error');
    }
}

async function resetApplicationCompletely() {
    if (!confirm('آیا می‌خواهید تمام داده‌ها، تنظیمات و کش را پاک کنید؟ این عمل قابل بازگشت نیست!')) {
        return;
    }
    
    try {
        // Reset settings to default
        currentSettings = {
            theme: 'light',
            primaryColor: '#2563eb',
            dri1Color: '#3b82f6',
            dri2Color: '#ef4444',
            equipmentPriority: {},
            parameterPriority: {},
            parameterMode: 'velocity-first',
            analysisThreshold: 20,
            analysisTimeRange: 7,
            analysisComparisonDays: 1
        };
        
        await saveSettingsToDB(currentSettings);
        
        showNotification('سیستم بازنشانی شد. صفحه بازنشانی می‌شود...', 'success');
        
        setTimeout(() => {
            window.location.reload(true);
        }, 2000);
        
    } catch (error) {
        console.error('Error in complete reset:', error);
        showNotification('خطا در بازنشانی سیستم', 'error');
    }
}

// ==================== SETTINGS FUNCTIONS ====================
async function initSettings() {
    // Load current settings into form
    const themeSelect = document.getElementById('themeSelect');
    const primaryColor = document.getElementById('primaryColor');
    const dri1Color = document.getElementById('dri1Color');
    const dri2Color = document.getElementById('dri2Color');
    const analysisThreshold = document.getElementById('analysisThreshold');
    const analysisTimeRange = document.getElementById('analysisTimeRange');
    const analysisComparisonDays = document.getElementById('analysisComparisonDays');
    
    if (themeSelect) themeSelect.value = currentSettings.theme;
    if (primaryColor) primaryColor.value = currentSettings.primaryColor;
    if (dri1Color) dri1Color.value = currentSettings.dri1Color;
    if (dri2Color) dri2Color.value = currentSettings.dri2Color;
    if (analysisThreshold) analysisThreshold.value = currentSettings.analysisThreshold;
    if (analysisTimeRange) analysisTimeRange.value = currentSettings.analysisTimeRange;
    if (analysisComparisonDays) analysisComparisonDays.value = currentSettings.analysisComparisonDays;
    
    // Update analysis display
    const thresholdDisplay = document.getElementById('thresholdDisplay');
    const timeRangeDisplay = document.getElementById('timeRangeDisplay');
    const comparisonDisplay = document.getElementById('comparisonDisplay');
    
    if (thresholdDisplay) thresholdDisplay.textContent = `${currentSettings.analysisThreshold}%`;
    if (timeRangeDisplay) timeRangeDisplay.textContent = `${currentSettings.analysisTimeRange} روز`;
    if (comparisonDisplay) comparisonDisplay.textContent = `${currentSettings.analysisComparisonDays} روز قبل`;
    
    // Initialize priority settings
    initEquipmentPriority();
    initParameterPriority();
    
    // Add event listeners
    if (themeSelect) {
        themeSelect.removeEventListener('change', handleThemeChange);
        themeSelect.addEventListener('change', handleThemeChange);
    }
    
    if (primaryColor) {
        primaryColor.removeEventListener('change', handlePrimaryColorChange);
        primaryColor.addEventListener('change', handlePrimaryColorChange);
    }
    
    if (dri1Color) {
        dri1Color.removeEventListener('change', handleDri1ColorChange);
        dri1Color.addEventListener('change', handleDri1ColorChange);
    }
    
    if (dri2Color) {
        dri2Color.removeEventListener('change', handleDri2ColorChange);
        dri2Color.addEventListener('change', handleDri2ColorChange);
    }
    
    // Analysis settings event listeners
    if (analysisThreshold) {
        analysisThreshold.removeEventListener('change', handleAnalysisThresholdChange);
        analysisThreshold.addEventListener('change', handleAnalysisThresholdChange);
    }
    
    if (analysisTimeRange) {
        analysisTimeRange.removeEventListener('change', handleAnalysisTimeRangeChange);
        analysisTimeRange.addEventListener('change', handleAnalysisTimeRangeChange);
    }
    
    if (analysisComparisonDays) {
        analysisComparisonDays.removeEventListener('change', handleAnalysisComparisonDaysChange);
        analysisComparisonDays.addEventListener('change', handleAnalysisComparisonDaysChange);
    }
}

function handleThemeChange(e) {
    currentSettings.theme = e.target.value;
    applyTheme();
    updateThemeIcon();
}

function handlePrimaryColorChange(e) {
    currentSettings.primaryColor = e.target.value;
    applyTheme();
}

function handleDri1ColorChange(e) {
    currentSettings.dri1Color = e.target.value;
    applyTheme();
}

function handleDri2ColorChange(e) {
    currentSettings.dri2Color = e.target.value;
    applyTheme();
}

function handleAnalysisThresholdChange(e) {
    currentSettings.analysisThreshold = parseFloat(e.target.value);
    const thresholdDisplay = document.getElementById('thresholdDisplay');
    if (thresholdDisplay) {
        thresholdDisplay.textContent = `${currentSettings.analysisThreshold}%`;
    }
}

function handleAnalysisTimeRangeChange(e) {
    currentSettings.analysisTimeRange = parseInt(e.target.value);
    const timeRangeDisplay = document.getElementById('timeRangeDisplay');
    if (timeRangeDisplay) {
        timeRangeDisplay.textContent = `${currentSettings.analysisTimeRange} روز`;
    }
}

function handleAnalysisComparisonDaysChange(e) {
    currentSettings.analysisComparisonDays = parseInt(e.target.value);
    const comparisonDisplay = document.getElementById('comparisonDisplay');
    if (comparisonDisplay) {
        comparisonDisplay.textContent = `${currentSettings.analysisComparisonDays} روز قبل`;
    }
}

function initEquipmentPriority() {
    const container = document.getElementById('equipmentPriority');
    if (!container) return;
    
    container.innerHTML = '';
    
    // Create 24 equipment entries (12 equipment × 2 units)
    const equipmentEntries = [];
    
    ['DRI1', 'DRI2'].forEach(unit => {
        APP_CONFIG.equipments.forEach(equipment => {
            const priorityKey = `${equipment.id}_${unit}`;
            const priority = currentSettings.equipmentPriority[priorityKey] || 1;
            
            equipmentEntries.push({
                id: priorityKey,
                name: equipment.name,
                unit: unit,
                priority: priority
            });
        });
    });
    
    // Sort by priority
    equipmentEntries.sort((a, b) => a.priority - b.priority);
    
    equipmentEntries.forEach(entry => {
        const item = document.createElement('div');
        item.className = 'priority-item';
        item.innerHTML = `
            <div class="priority-number">${entry.priority}</div>
            <div class="priority-info">
                <div class="priority-name">${entry.name}</div>
                <small>${entry.unit}</small>
            </div>
            <input type="number" class="priority-input" 
                   min="1" max="24" value="${entry.priority}"
                   onchange="updateEquipmentPriority('${entry.id}', this.value)">
        `;
        
        container.appendChild(item);
    });
}

function initParameterPriority() {
    const container = document.getElementById('parameterPriority');
    if (!container) return;
    
    container.innerHTML = '';
    
    // Set parameter mode
    const modeOptions = document.querySelectorAll('.mode-option');
    modeOptions.forEach(option => {
        option.classList.remove('selected');
        const input = option.querySelector('input');
        if (input && input.value === currentSettings.parameterMode) {
            option.classList.add('selected');
            input.checked = true;
        }
    });
    
    // Create parameter priority items
    if (currentSettings.parameterMode === 'custom') {
        APP_CONFIG.parameters.forEach(parameter => {
            const priority = currentSettings.parameterPriority[parameter.id] || 1;
            
            const item = document.createElement('div');
            item.className = 'priority-item';
            item.innerHTML = `
                <div class="priority-number">${priority}</div>
                <div class="priority-info">
                    <div class="priority-name">${parameter.name}</div>
                    <small>${parameter.code}</small>
                </div>
                <input type="number" class="priority-input" 
                       min="1" max="12" value="${priority}"
                       onchange="updateParameterPriority('${parameter.id}', this.value)">
            `;
            
            container.appendChild(item);
        });
    } else {
        // Show velocity-first mode explanation
        const info = document.createElement('div');
        info.className = 'text-center';
        info.innerHTML = `
            <p>در حالت "ابتدا سرعت، سپس شتاب":</p>
            <p>ابتدا تمام پارامترهای سرعت، سپس تمام پارامترهای شتاب نمایش داده می‌شود.</p>
        `;
        container.appendChild(info);
    }
}

function setParameterMode(mode) {
    currentSettings.parameterMode = mode;
    
    // Update UI
    const modeOptions = document.querySelectorAll('.mode-option');
    modeOptions.forEach(option => {
        option.classList.remove('selected');
        const input = option.querySelector('input');
        if (input) {
            input.checked = false;
        }
    });
    
    const selectedInput = document.querySelector(`.mode-option input[value="${mode}"]`);
    if (selectedInput) {
        const selectedOption = selectedInput.parentElement;
        selectedOption.classList.add('selected');
        selectedInput.checked = true;
    }
    
    // Refresh parameter priority display
    initParameterPriority();
}

function updateEquipmentPriority(equipmentId, priority) {
    const numPriority = parseInt(priority);
    if (numPriority >= 1 && numPriority <= 24) {
        currentSettings.equipmentPriority[equipmentId] = numPriority;
        
        // Update display
        const priorityInput = document.querySelector(`input[onchange*="${equipmentId}"]`);
        if (priorityInput) {
            const priorityNumber = priorityInput.parentElement.querySelector('.priority-number');
            if (priorityNumber) {
                priorityNumber.textContent = numPriority;
            }
        }
    }
}

function updateParameterPriority(parameterId, priority) {
    const numPriority = parseInt(priority);
    if (numPriority >= 1 && numPriority <= 12) {
        currentSettings.parameterPriority[parameterId] = numPriority;
        
        // Update display
        const priorityInput = document.querySelector(`input[onchange*="${parameterId}"]`);
        if (priorityInput) {
            const priorityNumber = priorityInput.parentElement.querySelector('.priority-number');
            if (priorityNumber) {
                priorityNumber.textContent = numPriority;
            }
        }
    }
}

async function saveSettings() {
    try {
        await saveSettingsToDB(currentSettings);
        showNotification('تنظیمات با موفقیت ذخیره شد', 'success');
    } catch (error) {
        console.error('Error saving settings:', error);
        showNotification('خطا در ذخیره تنظیمات', 'error');
    }
}

function resetSettings() {
    currentSettings = {
        theme: 'light',
        primaryColor: '#2563eb',
        dri1Color: '#3b82f6',
        dri2Color: '#ef4444',
        equipmentPriority: {},
        parameterPriority: {},
        parameterMode: 'velocity-first',
        analysisThreshold: 20,
        analysisTimeRange: 7,
        analysisComparisonDays: 1
    };
    
    initializeDefaultPriorities();
    applyTheme();
    initSettings();
    showNotification('تنظیمات به حالت اولیه بازگردانده شد', 'info');
}

// ==================== FULLSCREEN FUNCTIONS ====================
function toggleFullscreen(sectionId) {
    const section = document.getElementById(sectionId);
    if (!section) return;
    
    const isFullscreen = section.classList.contains('fullscreen');
    
    if (isFullscreen) {
        exitFullscreen(sectionId);
    } else {
        enterFullscreen(sectionId);
    }
}

function enterFullscreen(sectionId) {
    const section = document.getElementById(sectionId);
    if (!section) return;
    
    section.classList.add('fullscreen');
    
    // Add fullscreen header
    const cardTitle = section.querySelector('.card-title');
    const titleText = cardTitle ? cardTitle.textContent : 'بخش';
    
    const header = document.createElement('div');
    header.className = 'fullscreen-header';
    header.innerHTML = `
        <h2 class="fullscreen-title">${titleText}</h2>
        <button class="fullscreen-close" onclick="exitFullscreen('${sectionId}')">
            <i class="fas fa-times"></i>
            خروج از تمام صفحه
        </button>
    `;
    
    section.insertBefore(header, section.firstChild);
    
    // Hide main header
    const mainHeader = document.querySelector('.header');
    if (mainHeader) {
        mainHeader.style.display = 'none';
    }
    
    // Update chart size if this is charts section
    if (sectionId === 'charts') {
        updateChartContainerSize();
        if (chartInstance) {
            chartInstance.resize();
        }
    }
}

function exitFullscreen(sectionId) {
    const section = document.getElementById(sectionId);
    if (!section) return;
    
    section.classList.remove('fullscreen');
    
    // Remove fullscreen header
    const header = section.querySelector('.fullscreen-header');
    if (header) {
        header.remove();
    }
    
    // Show main header
    const mainHeader = document.querySelector('.header');
    if (mainHeader) {
        mainHeader.style.display = 'block';
    }
    
    // Update chart size if this is charts section
    if (sectionId === 'charts') {
        updateChartContainerSize();
        if (chartInstance) {
            chartInstance.resize();
        }
    }
}

// ==================== MODAL FUNCTIONS ====================
function showModal(modalId, message) {
    const modal = document.getElementById(modalId);
    if (!modal) return;
    
    modal.classList.add('active');
    
    if (message) {
        const messageElement = modal.querySelector('#confirmMessage, #slideshowMessage');
        if (messageElement) {
            messageElement.textContent = message;
        }
    }
}

function closeModal(modalId) {
    const modal = document.getElementById(modalId);
    if (modal) {
        modal.classList.remove('active');
    }
}

let confirmCallback = null;

function showConfirmModal(message, callback) {
    showModal('confirmModal', message);
    confirmCallback = callback;
}

function confirmAction() {
    if (confirmCallback) {
        confirmCallback();
        confirmCallback = null;
    }
    closeModal('confirmModal');
}

// ==================== USER MODAL FUNCTIONS ====================
function showUserModal() {
    const userNameInput = document.getElementById('userNameInput');
    const userRole = document.getElementById('userRole');
    
    if (userNameInput && currentUser) {
        userNameInput.value = currentUser.fullName === 'کاربر میهمان' ? '' : currentUser.fullName;
    }
    
    if (userRole && currentUser) {
        userRole.value = currentUser.role || 'اپراتور تجهیزات';
    }
    
    showModal('userModal');
}

async function saveUser() {
    const userNameInput = document.getElementById('userNameInput');
    const userRole = document.getElementById('userRole');
    
    const name = userNameInput?.value?.trim() || '';
    const role = userRole?.value || 'اپراتور تجهیزات';
    
    if (!name) {
        showNotification('لطفاً نام کاربری را وارد کنید', 'error');
        return;
    }
    
    try {
        // Update current user info (this is just UI update since we're in authenticated state)
        currentUser.fullName = name;
        currentUser.role = role;
        
        updateUserDisplay();
        closeModal('userModal');
        showNotification('اطلاعات کاربر به‌روزرسانی شد', 'success');
    } catch (error) {
        showNotification('خطا در به‌روزرسانی اطلاعات کاربر', 'error');
    }
}

// ==================== INITIALIZATION ====================
async function initApp() {
    try {
        // Check authentication first
        const isAuth = await checkAuthentication();
        if (!isAuth) return;
        
        // Load settings from server
        const savedSettings = await getSettingsFromDB();
        if (savedSettings) {
            currentSettings = { ...currentSettings, ...savedSettings };
        }
        
        // Initialize default priorities if not set
        initializeDefaultPriorities();
        
        // Apply theme and update UI
        applyTheme();
        updateThemeIcon();
        updateUserDisplay();
        addLogoutButton();
        
        // Initialize admin panel if user is admin
        initAdminPanel();
        
        // Initialize default section
        initDataEntry();
        
        // Add global event listeners
        addGlobalEventListeners();
        
        console.log('Application initialized successfully');
    } catch (error) {
        console.error('Error initializing application:', error);
        showNotification('خطا در راه‌اندازی برنامه', 'error');
    }
}

function addGlobalEventListeners() {
    // Close modals on outside click
    document.addEventListener('click', (e) => {
        if (e.target.classList.contains('modal')) {
            closeModal(e.target.id);
        }
    });
    
    // Escape key to close modals
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape') {
            const activeModal = document.querySelector('.modal.active');
            if (activeModal) {
                closeModal(activeModal.id);
            }
            
            // Also close slideshow fullscreen
            if (slideshowState.isFullscreen) {
                exitSlideshowFullscreen();
            }
        }
    });
    
    // Handle window resize for charts
    window.addEventListener('resize', () => {
        if (chartInstance) {
            chartInstance.resize();
        }
    });
    
    // Handle browser back/forward buttons
    window.addEventListener('popstate', (e) => {
        // Handle navigation state if needed
    });
    
    // Handle page visibility change
    document.addEventListener('visibilitychange', () => {
        if (document.hidden) {
            // Page is hidden, pause slideshow if running
            if (slideshowState.isRunning && !slideshowState.isPaused) {
                pauseSlideshow();
            }
        }
    });
    
    // Handle online/offline status
    window.addEventListener('online', () => {
        showNotification('اتصال اینترنت برقرار شد', 'success');
    });
    
    window.addEventListener('offline', () => {
        showNotification('اتصال اینترنت قطع شد', 'warning');
    });
}

// ==================== ERROR HANDLING ====================
window.addEventListener('error', (e) => {
    console.error('Global error:', e.error);
    showNotification('خطای غیرمنتظره‌ای رخ داد', 'error');
});

window.addEventListener('unhandledrejection', (e) => {
    console.error('Unhandled promise rejection:', e.reason);
    showNotification('خطا در پردازش درخواست', 'error');
});

// ==================== PERFORMANCE MONITORING ====================
function logPerformance(label, startTime) {
    const endTime = performance.now();
    const duration = endTime - startTime;
    console.log(`${label}: ${duration.toFixed(2)}ms`);
}

// ==================== UTILITY FUNCTIONS FOR DEBUGGING ====================
function debugDataEntryState() {
    console.log('=== DEBUG DATA ENTRY STATE ===');
    console.log('Selected Unit:', dataEntryState.selectedUnit);
    console.log('Selected Date:', dataEntryState.selectedDate);
    console.log('Current Equipment Index:', dataEntryState.currentEquipmentIndex);
    console.log('Current Parameter Index:', dataEntryState.currentParameterIndex);
    console.log('Date Data:', dataEntryState.dateData);
    console.log('Current User:', currentUser);
    console.log('Is Authenticated:', isAuthenticated);
    console.log('Current Settings:', currentSettings);
    console.log('===============================');
}

function debugSlideshowState() {
    console.log('=== DEBUG SLIDESHOW STATE ===');
    console.log('Is Running:', slideshowState.isRunning);
    console.log('Is Paused:', slideshowState.isPaused);
    console.log('Current Date:', slideshowState.currentDate);
    console.log('Current Equipment Index:', slideshowState.currentEquipmentIndex);
    console.log('Current Parameter Index:', slideshowState.currentParameterIndex);
    console.log('Speed:', slideshowState.speed);
    console.log('Data:', slideshowState.data);
    console.log('=============================');
}

// Make debug functions available globally
window.debugDataEntryState = debugDataEntryState;
window.debugSlideshowState = debugSlideshowState;
window.currentUser = () => currentUser;
window.currentSettings = () => currentSettings;

// ==================== ACCESSIBILITY FUNCTIONS ====================
function setupAccessibility() {
    // Add ARIA labels and roles where needed
    const buttons = document.querySelectorAll('button');
    buttons.forEach(button => {
        if (!button.getAttribute('aria-label') && !button.textContent.trim()) {
            const icon = button.querySelector('i');
            if (icon) {
                const iconClass = icon.className;
                if (iconClass.includes('fa-edit')) {
                    button.setAttribute('aria-label', 'ویرایش');
                } else if (iconClass.includes('fa-save')) {
                    button.setAttribute('aria-label', 'ذخیره');
                } else if (iconClass.includes('fa-print')) {
                    button.setAttribute('aria-label', 'چاپ');
                } else if (iconClass.includes('fa-expand')) {
                    button.setAttribute('aria-label', 'تمام صفحه');
                }
            }
        }
    });
    
    // Add focus management
    const modals = document.querySelectorAll('.modal');
    modals.forEach(modal => {
        modal.addEventListener('shown', () => {
            const firstInput = modal.querySelector('input, button');
            if (firstInput) {
                firstInput.focus();
            }
        });
    });
}

// ==================== KEYBOARD SHORTCUTS ====================
function setupKeyboardShortcuts() {
    document.addEventListener('keydown', (e) => {
        // Only handle shortcuts when not in input fields
        if (e.target.tagName === 'INPUT' || e.target.tagName === 'TEXTAREA') {
            return;
        }
        
        // Ctrl/Cmd + S: Save settings
        if ((e.ctrlKey || e.metaKey) && e.key === 's') {
            e.preventDefault();
            const activeSection = document.querySelector('.section.active');
            if (activeSection && activeSection.id === 'settings') {
                saveSettings();
            }
        }
        
        // Ctrl/Cmd + P: Print
        if ((e.ctrlKey || e.metaKey) && e.key === 'p') {
            e.preventDefault();
            const activeSection = document.querySelector('.section.active');
            if (activeSection) {
                if (activeSection.id === 'view-data') {
                    printTable();
                } else if (activeSection.id === 'charts') {
                    printChart();
                }
            }
        }
        
        // F11: Toggle fullscreen
        if (e.key === 'F11') {
            e.preventDefault();
            const activeSection = document.querySelector('.section.active');
            if (activeSection) {
                toggleFullscreen(activeSection.id);
            }
        }
        
        // Space: Pause/Resume slideshow
        if (e.key === ' ' || e.key === 'Spacebar') {
            const activeSection = document.querySelector('.section.active');
            if (activeSection && activeSection.id === 'slideshow') {
                e.preventDefault();
                if (slideshowState.isRunning) {
                    if (slideshowState.isPaused) {
                        resumeSlideshow();
                    } else {
                        pauseSlideshow();
                    }
                }
            }
        }
        
        // Number keys 1-7: Switch sections
        if (e.key >= '1' && e.key <= '7') {
            const sectionIndex = parseInt(e.key) - 1;
            const sections = ['data-entry', 'view-data', 'charts', 'analysis', 'slideshow', 'database', 'settings'];
            if (sections[sectionIndex]) {
                showSection(sections[sectionIndex]);
            }
        }
    });
}

// ==================== RESPONSIVE UTILITIES ====================
function checkMobileDevice() {
    return window.innerWidth <= 768;
}

function setupResponsiveHandlers() {
    window.addEventListener('resize', () => {
        const isMobile = checkMobileDevice();
        
        // Adjust UI for mobile
        if (isMobile) {
            // Close any open dropdowns or modals that might be problematic on mobile
            document.querySelectorAll('.modal.active').forEach(modal => {
                if (!modal.classList.contains('mobile-friendly')) {
                    closeModal(modal.id);
                }
            });
        }
        
        // Update chart container size
        if (chartInstance) {
            updateChartContainerSize();
            chartInstance.resize();
        }
    });
}

// ==================== DATA VALIDATION ====================
function validateDataEntry(data) {
    const errors = [];
    
    if (!data.unit) {
        errors.push('واحد انتخاب نشده است');
    }
    
    if (!data.equipment) {
        errors.push('تجهیز انتخاب نشده است');
    }
    
    if (!data.date) {
        errors.push('تاریخ انتخاب نشده است');
    }
    
    if (!data.parameters || Object.keys(data.parameters).length === 0) {
        errors.push('هیچ پارامتری وارد نشده است');
    }
    
    // Validate parameter values
    if (data.parameters) {
        Object.entries(data.parameters).forEach(([paramId, value]) => {
            if (!validateValue(value)) {
                const param = APP_CONFIG.parameters.find(p => p.id === paramId);
                errors.push(`مقدار ${param?.name || paramId} صحیح نیست`);
            }
        });
    }
    
    return errors;
}

// ==================== CACHE MANAGEMENT ====================
function clearBrowserCache() {
    // Clear service worker cache if available
    if ('serviceWorker' in navigator) {
        navigator.serviceWorker.getRegistrations().then(registrations => {
            registrations.forEach(registration => {
                registration.unregister();
            });
        });
    }
    
    // Clear any localStorage items that might be cached
    const keysToKeep = ['userSettings', 'authToken'];
    const keysToRemove = [];
    
    for (let i = 0; i < localStorage.length; i++) {
        const key = localStorage.key(i);
        if (key && !keysToKeep.includes(key)) {
            keysToRemove.push(key);
        }
    }
    
    keysToRemove.forEach(key => localStorage.removeItem(key));
}

// ==================== NETWORK STATUS ====================
function checkNetworkStatus() {
    return navigator.onLine;
}

async function waitForNetwork() {
    return new Promise((resolve) => {
        if (navigator.onLine) {
            resolve(true);
        } else {
            const handleOnline = () => {
                window.removeEventListener('online', handleOnline);
                resolve(true);
            };
            window.addEventListener('online', handleOnline);
        }
    });
}

// ==================== BACKUP AND SYNC ====================
async function createDataBackup() {
    try {
        const allData = await getDataFromDB({});
        const backup = {
            timestamp: new Date().toISOString(),
            version: APP_CONFIG.version,
            user: currentUser.username,
            data: allData,
            settings: currentSettings
        };
        
        const backupData = JSON.stringify(backup, null, 2);
        const timestamp = new Date().toISOString().split('T')[0];
        downloadFile(backupData, `vibrate-backup-${timestamp}.json`, 'application/json');
        
        showNotification('پشتیبان‌گیری با موفقیت انجام شد', 'success');
    } catch (error) {
        console.error('Error creating backup:', error);
        showNotification('خطا در ایجاد پشتیبان', 'error');
    }
}

async function restoreDataBackup(file) {
    try {
        const backupText = await file.text();
        const backup = JSON.parse(backupText);
        
        if (!backup.data || !backup.settings) {
            throw new Error('فایل پشتیبان معیوب است');
        }
        
        // Restore settings
        currentSettings = { ...currentSettings, ...backup.settings };
        await saveSettingsToDB(currentSettings);
        
        // Restore data
        for (const dataItem of backup.data) {
            await saveDataToDB(dataItem);
        }
        
        applyTheme();
        showNotification('بازیابی با موفقیت انجام شد', 'success');
        
        // Refresh current view
        const activeSection = document.querySelector('.section.active');
        if (activeSection) {
            showSection(activeSection.id);
        }
        
    } catch (error) {
        console.error('Error restoring backup:', error);
        showNotification('خطا در بازیابی پشتیبان', 'error');
    }
}

// ==================== STATISTICS ====================
async function generateStatistics() {
    try {
        const allData = await getDataFromDB({});
        
        const stats = {
            totalRecords: allData.length,
            totalDays: new Set(allData.map(d => d.date)).size,
            byUnit: {},
            byEquipment: {},
            byDate: {},
            averageValues: {}
        };
        
        // Group by unit
        allData.forEach(item => {
            if (!stats.byUnit[item.unit]) {
                stats.byUnit[item.unit] = 0;
            }
            stats.byUnit[item.unit]++;
        });
        
        // Group by equipment
        allData.forEach(item => {
            if (!stats.byEquipment[item.equipment]) {
                stats.byEquipment[item.equipment] = 0;
            }
            stats.byEquipment[item.equipment]++;
        });
        
        // Group by date
        allData.forEach(item => {
            if (!stats.byDate[item.date]) {
                stats.byDate[item.date] = 0;
            }
            stats.byDate[item.date]++;
        });
        
        // Calculate average values for each parameter
        APP_CONFIG.parameters.forEach(param => {
            const values = [];
            allData.forEach(item => {
                if (item.parameters[param.id] !== undefined) {
                    values.push(item.parameters[param.id]);
                }
            });
            
            if (values.length > 0) {
                stats.averageValues[param.id] = {
                    average: values.reduce((a, b) => a + b, 0) / values.length,
                    min: Math.min(...values),
                    max: Math.max(...values),
                    count: values.length
                };
            }
        });
        
        return stats;
    } catch (error) {
        console.error('Error generating statistics:', error);
        throw error;
    }
}

// ==================== EXPORT FUNCTIONS ====================
function exportStatistics() {
    generateStatistics().then(stats => {
        const statsData = JSON.stringify(stats, null, 2);
        const timestamp = new Date().toISOString().split('T')[0];
        downloadFile(statsData, `vibrate-stats-${timestamp}.json`, 'application/json');
        showNotification('آمار با موفقیت خروجی گرفته شد', 'success');
    }).catch(error => {
        console.error('Error exporting statistics:', error);
        showNotification('خطا در خروجی گرفتن آمار', 'error');
    });
}

// ==================== INITIALIZATION AND STARTUP ====================
document.addEventListener('DOMContentLoaded', () => {
    console.log('DOM loaded, initializing app...');
    
    // Setup accessibility
    setupAccessibility();
    
    // Setup keyboard shortcuts
    setupKeyboardShortcuts();
    
    // Setup responsive handlers
    setupResponsiveHandlers();
    
    // Initialize the main application
    initApp().then(() => {
        console.log('App initialization completed');
        
        // Show loading complete
        const loadingElement = document.querySelector('.loading');
        if (loadingElement) {
            loadingElement.remove();
        }
        
        // Show welcome message for new users
        if (currentUser && currentUser.fullName !== 'کاربر میهمان') {
            setTimeout(() => {
                showNotification(`خوش آمدید ${currentUser.fullName}`, 'success');
            }, 1000);
        }
        
    }).catch(error => {
        console.error('App initialization failed:', error);
        
        // Show error message
        document.body.innerHTML = `
            <div style="
                display: flex;
                justify-content: center;
                align-items: center;
                height: 100vh;
                flex-direction: column;
                font-family: 'Vazirmatn', sans-serif;
                text-align: center;
                padding: 2rem;
            ">
                <i class="fas fa-exclamation-triangle" style="font-size: 4rem; color: #ef4444; margin-bottom: 1rem;"></i>
                <h2 style="color: #1e293b; margin-bottom: 1rem;">خطا در راه‌اندازی برنامه</h2>
                <p style="color: #64748b; margin-bottom: 2rem;">لطفاً صفحه را بازنشانی کنید یا با مدیر سیستم تماس بگیرید.</p>
                <button onclick="window.location.reload()" style="
                    background: #3b82f6;
                    color: white;
                    border: none;
                    padding: 0.75rem 1.5rem;
                    border-radius: 0.5rem;
                    font-size: 1rem;
                    cursor: pointer;
                ">
                    <i class="fas fa-refresh"></i>
                    بازنشانی صفحه
                </button>
            </div>
        `;
    });
});

// ==================== GLOBAL FUNCTIONS FOR HTML CALLS ====================
// These functions are called directly from HTML elements

// Make functions globally available
window.showSection = showSection;
window.toggleTheme = toggleTheme;
window.logout = logout;
window.switchDataEntryMode = switchDataEntryMode;
window.selectUnit = selectUnit;
window.selectEditUnit = selectEditUnit;
window.selectEditEquipment = selectEditEquipment;
window.selectEditParameter = selectEditParameter;
window.saveEditedData = saveEditedData;
window.cancelEdit = cancelEdit;
window.saveCurrentData = saveCurrentData;
window.resetEntry = resetEntry;
window.printTable = printTable;
window.printChart = printChart;
window.updateChart = updateChart;
window.refreshAnalysis = refreshAnalysis;
window.startSlideshow = startSlideshow;
window.pauseSlideshow = pauseSlideshow;
window.resumeSlideshow = resumeSlideshow;
window.stopSlideshow = stopSlideshow;
window.confirmNextEquipment = confirmNextEquipment;
window.confirmNextEquipmentFullscreen = confirmNextEquipmentFullscreen;
window.stopSlideshowFromFullscreen = stopSlideshowFromFullscreen;
window.toggleSlideshowFullscreen = toggleSlideshowFullscreen;
window.exportData = exportData;
window.exportSettings = exportSettings;
window.importData = importData;
window.importSettings = importSettings;
window.mergeDatabase = mergeDatabase;
window.clearPreviousDaysCache = clearPreviousDaysCache;
window.resetApplicationCompletely = resetApplicationCompletely;
window.saveSettings = saveSettings;
window.resetSettings = resetSettings;
window.setParameterMode = setParameterMode;
window.updateEquipmentPriority = updateEquipmentPriority;
window.updateParameterPriority = updateParameterPriority;
window.toggleFullscreen = toggleFullscreen;
window.showModal = showModal;
window.closeModal = closeModal;
window.showConfirmModal = showConfirmModal;
window.confirmAction = confirmAction;
window.showUserModal = showUserModal;
window.saveUser = saveUser;
window.approveUser = approveUser;
window.toggleUserStatus = toggleUserStatus;
window.loadUsers = loadUsers;
window.createDataBackup = createDataBackup;
window.exportStatistics = exportStatistics;

// ==================== END OF APPLICATION ====================
console.log('Vibrate Data System v' + APP_CONFIG.version + ' loaded successfully');