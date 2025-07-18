import { verifySession } from './utils/auth.js';

export async function onRequest(context) {
    const { request, env } = context;
    const url = new URL(request.url);
    
    // Public routes that don't require authentication
    const publicRoutes = [
        '/api/auth/login',
        '/api/auth/register',
        '/login.html',
        '/register.html',
        '/api/auth/check-approval'
    ];
    
    // Static files
    if (url.pathname.startsWith('/static/') || 
        url.pathname.endsWith('.css') || 
        url.pathname.endsWith('.js') || 
        url.pathname.endsWith('.html') && !url.pathname.startsWith('/api/')) {
        return await context.next();
    }
    
    // Check if route requires authentication
    if (url.pathname.startsWith('/api/') && !publicRoutes.includes(url.pathname)) {
        const session = await verifySession(request, env);
        if (!session) {
            return new Response(JSON.stringify({ error: 'Authentication required' }), {
                status: 401,
                headers: { 'Content-Type': 'application/json' }
            });
        }
        
        // Add user info to context
        context.user = session.user;
    }
    
    return await context.next();
}