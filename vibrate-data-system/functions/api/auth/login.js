import { verifyPassword, createSession, setCookie } from '../../utils/auth.js';

export async function onRequestPost(context) {
    const { request, env } = context;
    
    try {
        const { username, password } = await request.json();
        
        if (!username || !password) {
            return new Response(JSON.stringify({ 
                error: 'نام کاربری و رمز عبور الزامی هستند' 
            }), {
                status: 400,
                headers: { 'Content-Type': 'application/json' }
            });
        }
        
        // Find user
        const user = await env.DB.prepare(`
            SELECT id, username, password_hash, full_name, role, is_approved, is_active
            FROM users 
            WHERE username = ? OR email = ?
        `).bind(username, username).first();
        
        if (!user) {
            return new Response(JSON.stringify({ 
                error: 'نام کاربری یا رمز عبور اشتباه است' 
            }), {
                status: 401,
                headers: { 'Content-Type': 'application/json' }
            });
        }
        
        // Check if user is active
        if (!user.is_active) {
            return new Response(JSON.stringify({ 
                error: 'حساب کاربری شما غیرفعال است' 
            }), {
                status: 403,
                headers: { 'Content-Type': 'application/json' }
            });
        }
        
        // Check if user is approved
        if (!user.is_approved) {
            return new Response(JSON.stringify({ 
                error: 'حساب کاربری شما هنوز تایید نشده است' 
            }), {
                status: 403,
                headers: { 'Content-Type': 'application/json' }
            });
        }
        
        // Verify password
        const isValidPassword = await verifyPassword(password, user.password_hash);
        if (!isValidPassword) {
            return new Response(JSON.stringify({ 
                error: 'نام کاربری یا رمز عبور اشتباه است' 
            }), {
                status: 401,
                headers: { 'Content-Type': 'application/json' }
            });
        }
        
        // Create session
        const sessionId = await createSession(user.id, env);
        
        // Set cookie
        const cookie = setCookie('session', sessionId);
        
        return new Response(JSON.stringify({ 
            message: 'ورود موفقیت‌آمیز',
            user: {
                id: user.id,
                username: user.username,
                fullName: user.full_name,
                role: user.role
            }
        }), {
            headers: { 
                'Content-Type': 'application/json',
                'Set-Cookie': cookie
            }
        });
        
    } catch (error) {
        console.error('Login error:', error);
        return new Response(JSON.stringify({ 
            error: 'خطا در ورود' 
        }), {
            status: 500,
            headers: { 'Content-Type': 'application/json' }
        });
    }
}