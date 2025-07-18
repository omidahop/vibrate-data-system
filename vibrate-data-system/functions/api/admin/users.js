export async function onRequestGet(context) {
    const { env } = context;
    
    // Check if user is admin
    if (context.user.role !== 'admin') {
        return new Response(JSON.stringify({ 
            error: 'دسترسی غیرمجاز' 
        }), {
            status: 403,
            headers: { 'Content-Type': 'application/json' }
        });
    }
    
    try {
        const users = await env.DB.prepare(`
            SELECT id, username, email, full_name, role, is_approved, is_active, created_at
            FROM users
            ORDER BY created_at DESC
        `).all();
        
        return new Response(JSON.stringify({ 
            users: users.results
        }), {
            headers: { 'Content-Type': 'application/json' }
        });
        
    } catch (error) {
        console.error('Get users error:', error);
        return new Response(JSON.stringify({ 
            error: 'خطا در دریافت کاربران' 
        }), {
            status: 500,
            headers: { 'Content-Type': 'application/json' }
        });
    }
}

export async function onRequestPut(context) {
    const { request, env } = context;
    
    // Check if user is admin
    if (context.user.role !== 'admin') {
        return new Response(JSON.stringify({ 
            error: 'دسترسی غیرمجاز' 
        }), {
            status: 403,
            headers: { 'Content-Type': 'application/json' }
        });
    }
    
    try {
        const { userId, isApproved, isActive } = await request.json();
        
        await env.DB.prepare(`
            UPDATE users 
            SET is_approved = ?, is_active = ?, updated_at = datetime('now')
            WHERE id = ?
        `).bind(isApproved, isActive, userId).run();
        
        return new Response(JSON.stringify({ 
            message: 'وضعیت کاربر به‌روزرسانی شد' 
        }), {
            headers: { 'Content-Type': 'application/json' }
        });
        
    } catch (error) {
        console.error('Update user error:', error);
        return new Response(JSON.stringify({ 
            error: 'خطا در به‌روزرسانی کاربر' 
        }), {
            status: 500,
            headers: { 'Content-Type': 'application/json' }
        });
    }
}