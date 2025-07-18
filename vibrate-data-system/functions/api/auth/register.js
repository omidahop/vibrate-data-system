import { hashPassword } from '../../utils/auth.js';

export async function onRequestPost(context) {
    const { request, env } = context;
    
    try {
        const { username, email, password, fullName } = await request.json();
        
        // Validation
        if (!username || !email || !password || !fullName) {
            return new Response(JSON.stringify({ 
                error: 'تمام فیلدها الزامی هستند' 
            }), {
                status: 400,
                headers: { 'Content-Type': 'application/json' }
            });
        }
        
        if (password.length < 6) {
            return new Response(JSON.stringify({ 
                error: 'رمز عبور باید حداقل 6 کاراکتر باشد' 
            }), {
                status: 400,
                headers: { 'Content-Type': 'application/json' }
            });
        }
        
        // Check if user already exists
        const existingUser = await env.DB.prepare(`
            SELECT id FROM users WHERE username = ? OR email = ?
        `).bind(username, email).first();
        
        if (existingUser) {
            return new Response(JSON.stringify({ 
                error: 'نام کاربری یا ایمیل قبلاً استفاده شده است' 
            }), {
                status: 409,
                headers: { 'Content-Type': 'application/json' }
            });
        }
        
        // Hash password
        const passwordHash = await hashPassword(password);
        
        // Create user
        const result = await env.DB.prepare(`
            INSERT INTO users (username, email, password_hash, full_name, role, is_approved)
            VALUES (?, ?, ?, ?, 'operator', FALSE)
        `).bind(username, email, passwordHash, fullName).run();
        
        // Create default settings for user
        await env.DB.prepare(`
            INSERT INTO user_settings (user_id) VALUES (?)
        `).bind(result.meta.last_row_id).run();
        
        return new Response(JSON.stringify({ 
            message: 'حساب کاربری شما ایجاد شد. در انتظار تایید مدیر'
        }), {
            headers: { 'Content-Type': 'application/json' }
        });
        
    } catch (error) {
        console.error('Registration error:', error);
        return new Response(JSON.stringify({ 
            error: 'خطا در ثبت نام' 
        }), {
            status: 500,
            headers: { 'Content-Type': 'application/json' }
        });
    }
}