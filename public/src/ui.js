/**
 * Módulo para gerenciar a interface do usuário
 */

/**
 * Mostrar seção de autenticação e esconder app
 */
export function showAuthSection() {
    document.getElementById('auth-section').classList.remove('hidden');
    document.getElementById('app-section').classList.add('hidden');
}

/**
 * Mostrar app e esconder seção de autenticação
 */
export function showAppSection() {
    document.getElementById('auth-section').classList.add('hidden');
    document.getElementById('app-section').classList.remove('hidden');
}

/**
 * Mostrar mensagem de erro
 */
export function showError(message) {
    const errorEl = document.getElementById('auth-error');
    errorEl.textContent = message;
    errorEl.classList.remove('hidden');
    
    // Esconder após 5 segundos
    setTimeout(() => {
        errorEl.classList.add('hidden');
    }, 5000);
}

/**
 * Esconder mensagem de erro
 */
export function hideError() {
    document.getElementById('auth-error').classList.add('hidden');
}

/**
 * Mostrar mensagem de sucesso
 */
export function showSuccess(message, containerId = 'auth-error') {
    const container = document.getElementById(containerId);
    container.textContent = message;
    container.className = 'success-message';
    container.classList.remove('hidden');
    
    // Esconder após 3 segundos
    setTimeout(() => {
        container.classList.add('hidden');
        container.className = 'error-message';
    }, 3000);
}

/**
 * Atualizar nome do usuário na interface
 */
export function updateUserName(user) {
    const userNameEl = document.getElementById('user-name');
    userNameEl.textContent = user.displayName || user.email.split('@')[0];
}

/**
 * Renderizar lista de comentários
 */
export function renderComments(comments, error = null) {
    const container = document.getElementById('comments-container');
    
    if (error) {
        container.innerHTML = `
            <p class="error-message">
                Erro ao carregar comentários: ${error.message || 'Erro desconhecido'}
            </p>
        `;
        return;
    }

    if (comments.length === 0) {
        container.innerHTML = `
            <p class="empty-state">
                Nenhum comentário ainda. Seja o primeiro a comentar!
            </p>
        `;
        return;
    }

    container.innerHTML = comments.map(comment => `
        <div class="comment-card">
            <div class="comment-header">
                <span class="comment-author">${escapeHtml(comment.user_name)}</span>
                <span class="comment-date">${formatDate(comment.timestamp)}</span>
            </div>
            <div class="comment-content">${escapeHtml(comment.content)}</div>
        </div>
    `).join('');
}

/**
 * Limpar formulário de comentário
 */
export function clearCommentForm() {
    document.getElementById('comment-content').value = '';
}

/**
 * Alternar entre formulário de login e registro
 */
export function toggleAuthForms() {
    const loginForm = document.getElementById('login-form');
    const registerForm = document.getElementById('register-form');
    
    loginForm.classList.toggle('hidden');
    registerForm.classList.toggle('hidden');
    hideError();
}

/**
 * Função auxiliar para escapar HTML (prevenir XSS)
 */
function escapeHtml(text) {
    const div = document.createElement('div');
    div.textContent = text;
    return div.innerHTML;
}

/**
 * Função auxiliar para formatar data
 */
function formatDate(date) {
    if (!date) return '';
    
    const now = new Date();
    const commentDate = date instanceof Date ? date : new Date(date);
    const diffMs = now - commentDate;
    const diffMins = Math.floor(diffMs / 60000);
    const diffHours = Math.floor(diffMs / 3600000);
    const diffDays = Math.floor(diffMs / 86400000);

    if (diffMins < 1) return 'Agora mesmo';
    if (diffMins < 60) return `${diffMins} minuto${diffMins > 1 ? 's' : ''} atrás`;
    if (diffHours < 24) return `${diffHours} hora${diffHours > 1 ? 's' : ''} atrás`;
    if (diffDays < 7) return `${diffDays} dia${diffDays > 1 ? 's' : ''} atrás`;
    
    return commentDate.toLocaleDateString('pt-BR', {
        day: '2-digit',
        month: '2-digit',
        year: 'numeric',
        hour: '2-digit',
        minute: '2-digit'
    });
}

