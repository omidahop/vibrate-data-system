import { verifySession } from '../../utils/auth.js';

export async function onRequestGet(context) {
    const { request, env } = context;
    
    try {
        const session = await verifySession(request, env);
        
        if (!session) {
            return new Response(JSON.stringify({ 
                isLoggedIn: false 
            }), {
                headers: { 'Content-Type': 'application/json' }
            });
        }
        
        return new Response(JSON.stringify({ 
            isLoggedIn: true,
            isApproved: session.user.isApproved,
            user: session.user
        }), {
            headers: { 'Content-Type': 'application/json' }
        });
        
    } catch (error) {
        console.error('Check approval error:', error);
        return new Response(JSON.stringify({ 
            isLoggedIn: false 
        }), {
            headers: { 'Content-Type': 'application/json' }
        });
    }
}