export async function onRequestPost(context) {
    const { request, env } = context;
    
    try {
        console.log('Login endpoint called');
        
        // Parse request body
        let body;
        try {
            body = await request.json();
        } catch (e) {
            return new Response(JSON.stringify({ 
                error: 'فرمت درخواست اشتباه است' 
            }), {
                status: 400,
                headers: { 
                    'Content-Type': 'application/json',
                    'Access-Control-Allow-Origin': '*'
                }
            });
        }
        
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
        
        // Find user with error handling
        let user;
        try {
            const userQuery = `
                SELECT id, username, password_hash, full_name, role, is_approved, is_active
                FROM users 
                WHERE (username = ? OR email = ?) AND is_active = 1
            `;
            
            user = await env.DB.prepare(userQuery)
                .bind(username, username)
                .first();
        } catch (dbError) {
            console.error('Database error:', dbError);
            return new Response(JSON.stringify({ 
                error: 'خطا در پایگاه داده' 
            }), {
                status: 500,
                headers: { 
                    'Content-Type': 'application/json',
                    'Access-Control-Allow-Origin': '*'
                }
            });
        }
        
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
        
        // Password verification
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
        let sessionId;
        try {
            sessionId = await createSession(user.id, env);
        } catch (sessionError) {
            console.error('Session creation error:', sessionError);
            return new Response(JSON.stringify({ 
                error: 'خطا در ایجاد نشست' 
            }), {
                status: 500,
                headers: { 
                    'Content-Type': 'application/json',
                    'Access-Control-Allow-Origin': '*'
                }
            });
        }
        
        // Set cookie
        const cookie = `session=${sessionId}; HttpOnly; SameSite=Lax; Max-Age=${30 * 24 * 60 * 60}; Path=/`;
        
        console.log('Login successful for user:', user.username);
        
        return new Response(JSON.stringify({ 
            message: 'ورود موفقیت‌آمیز',
            user: {
                id: user.id,
                username: user.username,
                fullName: user.full_name,
                role: user.role,
                isApproved: Boolean(user.is_approved)
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
            error: 'خطا در سرور',
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

// Password verification function
async function verifyPassword(password, hash) {
    try {
        // Special case for simple admin hash
        if (hash === 'simple_admin123_hash') {
            return password === 'admin123';
        }
        
        // For future users with proper hashing
        const simpleHash = await hashPassword(password);
        return simpleHash === hash;
    } catch (error) {
        console.error('Password verification error:', error);
        return false;
    }
}

// Simple hash function for future users
async function hashPassword(password) {
    try {
        const encoder = new TextEncoder();
        const data = encoder.encode(password + 'vibrate-salt-2024');
        const hash = await crypto.subtle.digest('SHA-256', data);
        return Array.from(new Uint8Array(hash))
            .map(b => b.toString(16).padStart(2, '0'))
            .join('');
    } catch (error) {
        console.error('Hash password error:', error);
        throw error;
    }
}

// Create session function
async function createSession(userId, env) {
    const sessionId = crypto.randomUUID();
    const expiresAt = new Date(Date.now() + 30 * 24 * 60 * 60 * 1000); // 30 days
    
    try {
        const query = `
            INSERT INTO sessions (id, user_id, expires_at)
            VALUES (?, ?, ?)
        `;
        
        const result = await env.DB.prepare(query)
            .bind(sessionId, userId, expiresAt.toISOString())
            .run();
            
        if (!result.success) {
            throw new Error('Failed to create session');
        }
        
        return sessionId;
    } catch (error) {
        console.error('Create session error:', error);
        throw error;
    }
}
