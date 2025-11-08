/**
 * Arquivo principal da aplicação
 * Coordena autenticação, comentários e interface
 */

import { login, register, logout, onAuthChange, getCurrentUser } from './auth.js';
import { addComment, subscribeToComments } from './comments.js';
import { 
    showAuthSection, 
    showAppSection, 
    showError, 
    hideError,
    showSuccess,
    updateUserName,
    renderComments,
    clearCommentForm,
    toggleAuthForms
} from './ui.js';

// Elementos do DOM
const loginForm = document.getElementById('login-form');
const registerForm = document.getElementById('register-form');
const commentForm = document.getElementById('comment-form');
const logoutBtn = document.getElementById('logout-btn');
const showRegisterBtn = document.getElementById('show-register');
const showLoginBtn = document.getElementById('show-login');

// Variável para armazenar unsubscribe dos comentários
let unsubscribeComments = null;

/**
 * Inicializar aplicação
 */
function init() {
    setupEventListeners();
    setupAuthListener();
}

/**
 * Configurar event listeners
 */
function setupEventListeners() {
    // Formulário de login
    loginForm.addEventListener('submit', async (e) => {
        e.preventDefault();
        hideError();
        
        const email = document.getElementById('email').value;
        const password = document.getElementById('password').value;
        
        const result = await login(email, password);
        
        if (result.success) {
            // A mudança de estado será tratada pelo onAuthChange
            loginForm.reset();
        } else {
            showError(result.error);
        }
    });

    // Formulário de registro
    registerForm.addEventListener('submit', async (e) => {
        e.preventDefault();
        hideError();
        
        const name = document.getElementById('reg-name').value;
        const email = document.getElementById('reg-email').value;
        const password = document.getElementById('reg-password').value;
        
        const result = await register(email, password, name);
        
        if (result.success) {
            showSuccess('Conta criada com sucesso! Você já está logado.');
            registerForm.reset();
            // A mudança de estado será tratada pelo onAuthChange
        } else {
            showError(result.error);
        }
    });

    // Toggle entre login e registro
    showRegisterBtn.addEventListener('click', () => {
        toggleAuthForms();
        document.getElementById('login-form').classList.add('hidden');
        document.getElementById('register-form').classList.remove('hidden');
    });

    showLoginBtn.addEventListener('click', () => {
        toggleAuthForms();
        document.getElementById('register-form').classList.add('hidden');
        document.getElementById('login-form').classList.remove('hidden');
    });

    // Logout
    logoutBtn.addEventListener('click', async () => {
        const result = await logout();
        if (result.success) {
            // A mudança de estado será tratada pelo onAuthChange
        } else {
            showError(result.error);
        }
    });

    // Formulário de comentário
    commentForm.addEventListener('submit', async (e) => {
        e.preventDefault();
        
        const content = document.getElementById('comment-content').value;
        
        if (!content.trim()) {
            showError('O comentário não pode estar vazio.');
            return;
        }
        
        const result = await addComment(content);
        
        if (result.success) {
            clearCommentForm();
            showSuccess('Comentário publicado com sucesso!', 'comment-success');
        } else {
            showError(result.error);
        }
    });
}

/**
 * Observar mudanças no estado de autenticação
 */
function setupAuthListener() {
    onAuthChange((user) => {
        if (user) {
            // Usuário está logado
            handleUserLoggedIn(user);
        } else {
            // Usuário não está logado
            handleUserLoggedOut();
        }
    });
}

/**
 * Manipular quando usuário faz login
 */
function handleUserLoggedIn(user) {
    updateUserName(user);
    showAppSection();
    
    // Carregar comentários
    loadComments();
}

/**
 * Manipular quando usuário faz logout
 */
function handleUserLoggedOut() {
    showAuthSection();
    
    // Parar de observar comentários
    if (unsubscribeComments) {
        unsubscribeComments();
        unsubscribeComments = null;
    }
    
    // Limpar comentários da tela
    renderComments([]);
}

/**
 * Carregar e observar comentários em tempo real
 */
function loadComments() {
    // Se já existe uma subscription, cancelar antes de criar nova
    if (unsubscribeComments) {
        unsubscribeComments();
    }
    
    unsubscribeComments = subscribeToComments((comments, error) => {
        renderComments(comments, error);
    });
}

// Inicializar aplicação quando o DOM estiver pronto
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
} else {
    init();
}

