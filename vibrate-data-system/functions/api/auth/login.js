import bcrypt from 'bcryptjs';

async function hashPassword(password) {
    return await bcrypt.hash(password, 12);
}

async function verifyPassword(password, hash) {
    try {
        return await bcrypt.compare(password, hash);
    } catch (error) {
        console.error('Password verification error:', error);
        return false;
    }
}

function generateSessionId() {
    return crypto.randomUUID();
}

async function createSession(userId, env) {
    const sessionId = generateSessionId();
    const expiresAt = new Date(Date.now() + 30 * 24 * 60 * 60 * 1000); // 30 days
    
    try {
        await env.DB.prepare(`
            INSERT INTO sessions (id, user_id, expires_at)
            VALUES (?, ?, ?)
        `).bind(sessionId, userId, expiresAt.toISOString()).run();
        
        return sessionId;
    } catch (error) {
        console.error('Session creation error:', error);
        throw error;
    }
}

function setCookie(name, value, maxAge = 30 * 24 * 60 * 60) {
    return `${name}=${value}; HttpOnly; Secure; SameSite=Strict; Max-Age=${maxAge}; Path=/`;
}

export async function onRequestPost(context) {
    const { request, env } = context;
    
    try {
        // Parse request body
        const body = await request.json();
        const { username, password } = body;
        
        console.log('Login attempt for:', username);
        
        if (!username || !password) {
            return new Response(JSON.stringify({ 
                error: 'نام کاربری و رمز عبور الزامی هستند' 
            }), {
                status: 400,
                headers: { 
                    'Content-Type': 'application/json',
                    'Access-Control-Allow-Origin': '*'
                }
            });
        }
        
        // Find user
        const userQuery = `
            SELECT id, username, password_hash, full_name, role, is_approved, is_active
            FROM users 
            WHERE username = ? OR email = ?
        `;
        
        const user = await env.DB.prepare(userQuery)
            .bind(username, username)
            .first();
        
        console.log('User found:', user ? 'Yes' : 'No');
        
        if (!user) {
            return new Response(JSON.stringify({ 
                error: 'نام کاربری یا رمز عبور اشتباه است' 
            }), {
                status: 401,
                headers: { 
                    'Content-Type': 'application/json',
                    'Access-Control-Allow-Origin': '*'
                }
            });
        }
        
        // Check if user is active
        if (!user.is_active) {
            return new Response(JSON.stringify({ 
                error: 'حساب کاربری شما غیرفعال است' 
            }), {
                status: 403,
                headers: { 
                    'Content-Type': 'application/json',
                    'Access-Control-Allow-Origin': '*'
                }
            });
        }
        
        // Check if user is approved
        if (!user.is_approved) {
            return new Response(JSON.stringify({ 
                error: 'حساب کاربری شما هنوز تایید نشده است' 
            }), {
                status: 403,
                headers: { 
                    'Content-Type': 'application/json',
                    'Access-Control-Allow-Origin': '*'
                }
            });
        }
        
        // Verify password
        console.log('Verifying password...');
        const isValidPassword = await verifyPassword(password, user.password_hash);
        
        console.log('Password valid:', isValidPassword);
        
        if (!isValidPassword) {
            return new Response(JSON.stringify({ 
                error: 'نام کاربری یا رمز عبور اشتباه است' 
            }), {
                status: 401,
                headers: { 
                    'Content-Type': 'application/json',
                    'Access-Control-Allow-Origin': '*'
                }
            });
        }
        
        // Create session
        console.log('Creating session...');
        const sessionId = await createSession(user.id, env);
        
        // Set cookie
        const cookie = setCookie('session', sessionId);
        
        console.log('Login successful for user:', user.username);
        
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
                'Set-Cookie': cookie,
                'Access-Control-Allow-Origin': '*'
            }
        });
        
    } catch (error) {
        console.error('Login error:', error);
        return new Response(JSON.stringify({ 
            error: 'خطا در ورود',
            details: error.message
        }), {
            status: 500,
            headers: { 
                'Content-Type': 'application/json',
                'Access-Control-Allow-Origin': '*'
            }
        });
    }
}
