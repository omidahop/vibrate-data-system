export async function onRequest(context) {
    const { request, env } = context;
    const url = new URL(request.url);
    
    console.log('Middleware called for:', url.pathname, request.method);
    
    // Add CORS headers for all requests
    const corsHeaders = {
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE, OPTIONS',
        'Access-Control-Allow-Headers': 'Content-Type, Authorization',
        'Access-Control-Max-Age': '86400',
    };
    
    // Handle OPTIONS requests
    if (request.method === 'OPTIONS') {
        return new Response(null, {
            headers: corsHeaders
        });
    }
    
    // Public routes that don't require authentication
    const publicRoutes = [
        '/api/auth/login',
        '/api/auth/register',
        '/api/auth/check-approval',
        '/login.html',
        '/register.html',
        '/'
    ];
    
    // Static files
    if (url.pathname.endsWith('.html') || 
        url.pathname.endsWith('.css') || 
        url.pathname.endsWith('.js') || 
        url.pathname.endsWith('.ico') ||
        url.pathname.startsWith('/static/') ||
        !url.pathname.startsWith('/api/')) {
        
        const response = await context.next();
        // Add CORS headers to static files too
        Object.entries(corsHeaders).forEach(([key, value]) => {
            response.headers.set(key, value);
        });
        return response;
    }
    
    // Check if route requires authentication
    if (url.pathname.startsWith('/api/') && !publicRoutes.includes(url.pathname)) {
        try {
            const session = await verifySession(request, env);
            if (!session) {
                return new Response(JSON.stringify({ 
                    error: 'Authentication required',
                    code: 'AUTH_REQUIRED'
                }), {
                    status: 401,
                    headers: {
                        'Content-Type': 'application/json',
                        ...corsHeaders
                    }
                });
            }
            
            // Add user info to context
            context.user = session.user;
            
        } catch (error) {
            console.error('Authentication error:', error);
            return new Response(JSON.stringify({ 
                error: 'Authentication failed',
                code: 'AUTH_FAILED'
            }), {
                status: 401,
                headers: {
                    'Content-Type': 'application/json',
                    ...corsHeaders
                }
            });
        }
    }
    
    // Continue to next handler
    const response = await context.next();
    
    // Add CORS headers to all API responses
    if (url.pathname.startsWith('/api/')) {
        Object.entries(corsHeaders).forEach(([key, value]) => {
            response.headers.set(key, value);
        });
    }
    
    return response;
}

// Session verification function
async function verifySession(request, env) {
    try {
        const sessionId = getCookie(request, 'session');
        if (!sessionId) {
            console.log('No session cookie found');
            return null;
        }
        
        const query = `
            SELECT s.*, u.id as user_id, u.username, u.full_name, u.role, u.is_approved, u.is_active
            FROM sessions s
            JOIN users u ON s.user_id = u.id
            WHERE s.id = ? AND s.expires_at > datetime('now') AND u.is_active = 1
        `;
        
        const session = await env.DB.prepare(query)
            .bind(sessionId)
            .first();
        
        if (!session) {
            console.log('Session not found or expired');
            return null;
        }
        
        return {
            id: session.id,
            user: {
                id: session.user_id,
                username: session.username,
                fullName: session.full_name,
                role: session.role,
                isApproved: Boolean(session.is_approved)
            }
        };
    } catch (error) {
        console.error('Verify session error:', error);
        return null;
    }
}

// Get cookie helper
function getCookie(request, name) {
    try {
        const cookies = request.headers.get('cookie') || '';
        const match = cookies.match(new RegExp(`(^| )${name}=([^;]+)`));
        return match ? match[2] : null;
    } catch (error) {
        console.error('Get cookie error:', error);
        return null;
    }
}
