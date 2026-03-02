/**
 * Expense Tracker - Vanilla JavaScript
 * Connects to FastAPI backend at http://localhost:8000
 */

const API_BASE_URL = 'http://localhost:8000';

// State
let expenses = [];
let currentFilter = 'all';

// DOM Elements
const expenseForm = document.getElementById('expenseForm');
const expenseList = document.getElementById('expenseList');
const totalAmount = document.getElementById('totalAmount');
const expenseCount = document.getElementById('expenseCount');
const filterCategory = document.getElementById('filterCategory');
const clearFilter = document.getElementById('clearFilter');
const apiStatus = document.getElementById('apiStatus');
const toast = document.getElementById('toast');

// Initialize app
document.addEventListener('DOMContentLoaded', () => {
    initializeDateInput();
    checkApiConnection();
    fetchExpenses();
    setupEventListeners();
});

// Set default date to today
function initializeDateInput() {
    const today = new Date().toISOString().split('T')[0];
    document.getElementById('date').value = today;
}

// Setup event listeners
function setupEventListeners() {
    expenseForm.addEventListener('submit', handleAddExpense);
    filterCategory.addEventListener('change', handleFilterChange);
    clearFilter.addEventListener('click', handleClearFilter);
}

// Check API connection
async function checkApiConnection() {
    try {
        const response = await fetch(`${API_BASE_URL}/expenses`, {
            method: 'GET',
            headers: { 'Content-Type': 'application/json' }
        });

        if (response.ok) {
            apiStatus.textContent = 'Connected';
            apiStatus.classList.add('connected');
            apiStatus.classList.remove('disconnected');
        } else {
            throw new Error('API returned error');
        }
    } catch (error) {
        apiStatus.textContent = 'Disconnected';
        apiStatus.classList.add('disconnected');
        apiStatus.classList.remove('connected');
        showToast('Unable to connect to API. Make sure the server is running.', 'error');
    }
}

// Fetch all expenses from API
async function fetchExpenses() {
    try {
        showLoadingState();

        const response = await fetch(`${API_BASE_URL}/expenses`, {
            method: 'GET',
            headers: { 'Content-Type': 'application/json' }
        });

        if (!response.ok) {
            throw new Error('Failed to fetch expenses');
        }

        expenses = await response.json();
        renderExpenses();
        updateSummary();

    } catch (error) {
        console.error('Error fetching expenses:', error);
        showToast('Failed to load expenses. Please check your connection.', 'error');
        showEmptyState();
    }
}

// Handle add expense form submission
async function handleAddExpense(event) {
    event.preventDefault();

    const formData = new FormData(expenseForm);
    const expenseData = {
        description: formData.get('description').trim(),
        amount: parseFloat(formData.get('amount')),
        category: formData.get('category'),
        date: formData.get('date')
    };

    try {
        const response = await fetch(`${API_BASE_URL}/expenses`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(expenseData)
        });

        if (!response.ok) {
            const errorData = await response.json();
            throw new Error(errorData.detail || 'Failed to add expense');
        }

        const newExpense = await response.json();
        expenses.unshift(newExpense);

        renderExpenses();
        updateSummary();
        resetForm();
        showToast('Expense added successfully!', 'success');

    } catch (error) {
        console.error('Error adding expense:', error);
        showToast(error.message || 'Failed to add expense. Please try again.', 'error');
    }
}

// Handle expense deletion
async function handleDeleteExpense(expenseId) {
    if (!confirm('Are you sure you want to delete this expense?')) {
        return;
    }

    try {
        const response = await fetch(`${API_BASE_URL}/expenses/${expenseId}`, {
            method: 'DELETE',
            headers: { 'Content-Type': 'application/json' }
        });

        if (!response.ok) {
            throw new Error('Failed to delete expense');
        }

        expenses = expenses.filter(expense => expense.id !== expenseId);

        renderExpenses();
        updateSummary();
        showToast('Expense deleted successfully!', 'success');

    } catch (error) {
        console.error('Error deleting expense:', error);
        showToast('Failed to delete expense. Please try again.', 'error');
    }
}

// Handle filter change
function handleFilterChange(event) {
    currentFilter = event.target.value;
    renderExpenses();
}

// Handle clear filter
function handleClearFilter() {
    currentFilter = 'all';
    filterCategory.value = 'all';
    renderExpenses();
}

// Filter expenses by category
function getFilteredExpenses() {
    if (currentFilter === 'all') {
        return expenses;
    }
    return expenses.filter(expense => expense.category === currentFilter);
}

// Render expense list
function renderExpenses() {
    const filteredExpenses = getFilteredExpenses();

    if (filteredExpenses.length === 0) {
        showEmptyState();
        return;
    }

    expenseList.innerHTML = filteredExpenses.map(expense => createExpenseItem(expense)).join('');

    // Add delete event listeners
    document.querySelectorAll('.expense-delete').forEach(button => {
        button.addEventListener('click', () => {
            const expenseId = parseInt(button.dataset.id);
            handleDeleteExpense(expenseId);
        });
    });
}

// Create expense item HTML
function createExpenseItem(expense) {
    const formattedAmount = formatCurrency(expense.amount);
    const formattedDate = formatDate(expense.date);
    const categoryClass = getCategoryClass(expense.category);

    return `
        <div class="expense-item" data-id="${expense.id}">
            <div class="expense-info">
                <span class="expense-description">${escapeHtml(expense.description)}</span>
                <div class="expense-meta">
                    <span class="expense-category ${categoryClass}">${escapeHtml(expense.category)}</span>
                    <span class="expense-date">${formattedDate}</span>
                </div>
            </div>
            <span class="expense-amount">${formattedAmount}</span>
            <button class="btn-danger expense-delete" data-id="${expense.id}" aria-label="Delete expense">
                <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                    <polyline points="3 6 5 6 21 6"></polyline>
                    <path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"></path>
                    <line x1="10" y1="11" x2="10" y2="17"></line>
                    <line x1="14" y1="11" x2="14" y2="17"></line>
                </svg>
            </button>
        </div>
    `;
}

// Update summary section
function updateSummary() {
    const filteredExpenses = getFilteredExpenses();
    const total = filteredExpenses.reduce((sum, expense) => sum + expense.amount, 0);
    const count = filteredExpenses.length;

    totalAmount.textContent = formatCurrency(total);
    expenseCount.textContent = `${count} expense${count !== 1 ? 's' : ''}`;
}

// Show loading state
function showLoadingState() {
    expenseList.innerHTML = `
        <div class="loading">
            <div class="spinner"></div>
        </div>
    `;
}

// Show empty state
function showEmptyState() {
    const message = currentFilter === 'all'
        ? 'No expenses yet. Add your first expense above!'
        : 'No expenses found in this category.';

    expenseList.innerHTML = `
        <p class="empty-state">${message}</p>
    `;
}

// Reset form
function resetForm() {
    expenseForm.reset();
    initializeDateInput();
}

// Utility: Format currency
function formatCurrency(amount) {
    return new Intl.NumberFormat('en-US', {
        style: 'currency',
        currency: 'USD'
    }).format(amount);
}

// Utility: Format date
function formatDate(dateString) {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
        month: 'short',
        day: 'numeric',
        year: 'numeric'
    });
}

// Utility: Get category class
function getCategoryClass(category) {
    const categoryColors = {
        food: 'category-food',
        transport: 'category-transport',
        entertainment: 'category-entertainment',
        shopping: 'category-shopping',
        bills: 'category-bills',
        health: 'category-health',
        other: 'category-other'
    };
    return categoryColors[category] || '';
}

// Utility: Escape HTML to prevent XSS
function escapeHtml(text) {
    const div = document.createElement('div');
    div.textContent = text;
    return div.innerHTML;
}

// Utility: Show toast notification
function showToast(message, type = 'success') {
    toast.textContent = message;
    toast.className = `toast ${type} show`;

    setTimeout(() => {
        toast.classList.remove('show');
    }, 3000);
}
