import { 
    getFirestore, 
    collection, 
    addDoc, 
    query, 
    orderBy, 
    onSnapshot,
    Timestamp 
} from 'firebase/firestore';
import { getAuth } from 'firebase/auth';
import { initializeApp } from 'firebase/app';
import { firebaseConfig } from './firebase-config.js';

// Inicializar Firestore (já inicializado no auth.js, mas vamos garantir)
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
const auth = getAuth(app);

const COMMENTS_COLLECTION = 'comments';

/**
 * Adicionar um novo comentário
 */
export async function addComment(content) {
    try {
        const user = auth.currentUser;
        
        if (!user) {
            return { success: false, error: 'Usuário não autenticado.' };
        }

        if (!content || content.trim().length === 0) {
            return { success: false, error: 'O comentário não pode estar vazio.' };
        }

        const commentData = {
            user_id: user.uid,
            user_name: user.displayName || user.email.split('@')[0],
            user_email: user.email,
            content: content.trim(),
            timestamp: Timestamp.now(),
            reply_to: null // Para futuras respostas aninhadas
        };

        const docRef = await addDoc(collection(db, COMMENTS_COLLECTION), commentData);
        
        return { 
            success: true, 
            id: docRef.id,
            message: 'Comentário publicado com sucesso!' 
        };
    } catch (error) {
        console.error('Erro ao adicionar comentário:', error);
        return { 
            success: false, 
            error: 'Erro ao publicar comentário. Tente novamente.' 
        };
    }
}

/**
 * Observar comentários em tempo real
 */
export function subscribeToComments(callback) {
    try {
        const q = query(
            collection(db, COMMENTS_COLLECTION),
            orderBy('timestamp', 'desc')
        );

        return onSnapshot(q, (snapshot) => {
            const comments = [];
            snapshot.forEach((doc) => {
                const data = doc.data();
                comments.push({
                    id: doc.id,
                    ...data,
                    timestamp: data.timestamp?.toDate() || new Date()
                });
            });
            callback(comments);
        }, (error) => {
            console.error('Erro ao carregar comentários:', error);
            callback([], error);
        });
    } catch (error) {
        console.error('Erro ao configurar observador de comentários:', error);
        callback([], error);
    }
}

/**
 * Formatar data para exibição
 */
export function formatDate(date) {
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

