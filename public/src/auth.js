import { firebaseConfig } from './firebase-config.js';
import { initializeApp } from 'https://www.gstatic.com/firebasejs/10.7.1/firebase-app.js';
import { 
    getAuth, 
    signInWithEmailAndPassword, 
    createUserWithEmailAndPassword,
    signOut,
    onAuthStateChanged,
    updateProfile
} from 'https://www.gstatic.com/firebasejs/10.7.1/firebase-auth.js';

// Inicializar Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);

/**
 * Função para fazer login com e-mail e senha
 */
export async function login(email, password) {
    try {
        const userCredential = await signInWithEmailAndPassword(auth, email, password);
        return { success: true, user: userCredential.user };
    } catch (error) {
        return { success: false, error: getErrorMessage(error) };
    }
}

/**
 * Função para criar nova conta
 */
export async function register(email, password, displayName) {
    try {
        const userCredential = await createUserWithEmailAndPassword(auth, email, password);
        // Atualizar o nome do usuário
        await updateProfile(userCredential.user, { displayName });
        return { success: true, user: userCredential.user };
    } catch (error) {
        return { success: false, error: getErrorMessage(error) };
    }
}

/**
 * Função para fazer logout
 */
export async function logout() {
    try {
        await signOut(auth);
        return { success: true };
    } catch (error) {
        return { success: false, error: getErrorMessage(error) };
    }
}

/**
 * Observar mudanças no estado de autenticação
 */
export function onAuthChange(callback) {
    return onAuthStateChanged(auth, callback);
}

/**
 * Obter usuário atual
 */
export function getCurrentUser() {
    return auth.currentUser;
}

/**
 * Converter códigos de erro do Firebase em mensagens amigáveis
 */
function getErrorMessage(error) {
    const errorCodes = {
        'auth/user-not-found': 'Usuário não encontrado.',
        'auth/wrong-password': 'Senha incorreta.',
        'auth/email-already-in-use': 'Este e-mail já está cadastrado.',
        'auth/weak-password': 'A senha deve ter pelo menos 6 caracteres.',
        'auth/invalid-email': 'E-mail inválido.',
        'auth/network-request-failed': 'Erro de conexão. Verifique sua internet.',
        'auth/too-many-requests': 'Muitas tentativas. Tente novamente mais tarde.'
    };
    
    return errorCodes[error.code] || error.message || 'Ocorreu um erro. Tente novamente.';
}
