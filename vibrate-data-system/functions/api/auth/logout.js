import { deleteSession, getCookie } from '../../utils/auth.js';

export async function onRequestPost(context) {
    const { request, env } = context;
    
    try {
        const sessionId = getCookie(request, 'session');
        if (sessionId) {
            await deleteSession(sessionId, env);
        }
        
        return new Response(JSON.stringify({ 
            message: 'خروج موفقیت‌آمیز' 
        }), {
            headers: { 
                'Content-Type': 'application/json',
                'Set-Cookie': 'session=; HttpOnly; Secure; SameSite=Strict; Max-Age=0; Path=/'
            }
        });
        
    } catch (error) {
        console.error('Logout error:', error);
        return new Response(JSON.stringify({ 
            error: 'خطا در خروج' 
        }), {
            status: 500,
            headers: { 'Content-Type': 'application/json' }
        });
    }
}