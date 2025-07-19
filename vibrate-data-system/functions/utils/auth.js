import bcrypt from 'bcryptjs';

export async function hashPassword(password) {
    try {
        return await bcrypt.hash(password, 12);
    } catch (error) {
        console.error('Hash password error:', error);
        throw error;
    }
}

export async function verifyPassword(password, hash) {
    try {
        return await bcrypt.compare(password, hash);
    } catch (error) {
        console.error('Verify password error:', error);
        return false;
    }
}

export function generateSessionId() {
    return crypto.randomUUID();
}

export async function createSession(userId, env) {
    const sessionId = generateSessionId();
    const expiresAt = new Date(Date.now() + 30 * 24 * 60 * 60 * 1000); // 30 days
    
    try {
        const query = `
            INSERT INTO sessions (id, user_id, expires_at)
            VALUES (?, ?, ?)
        `;
        
        await env.DB.prepare(query)
            .bind(sessionId, userId, expiresAt.toISOString())
            .run();
        
        return sessionId;
    } catch (error) {
        console.error('Create session error:', error);
        throw error;
    }
}

export async function verifySession(request, env) {
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

export async function deleteSession(sessionId, env) {
    try {
        await env.DB.prepare(`
            DELETE FROM sessions WHERE id = ?
        `).bind(sessionId).run();
    } catch (error) {
        console.error('Delete session error:', error);
    }
}

export function getCookie(request, name) {
    try {
        const cookies = request.headers.get('cookie') || '';
        const match = cookies.match(new RegExp(`(^| )${name}=([^;]+)`));
        return match ? match[2] : null;
    } catch (error) {
        console.error('Get cookie error:', error);
        return null;
    }
}

export function setCookie(name, value, maxAge = 30 * 24 * 60 * 60) {
    return `${name}=${value}; HttpOnly; Secure; SameSite=Strict; Max-Age=${maxAge}; Path=/`;
}
