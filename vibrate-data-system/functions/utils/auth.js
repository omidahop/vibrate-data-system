import bcrypt from 'bcryptjs';

export async function hashPassword(password) {
    return await bcrypt.hash(password, 12);
}

export async function verifyPassword(password, hash) {
    return await bcrypt.compare(password, hash);
}

export function generateSessionId() {
    return crypto.randomUUID();
}

export async function createSession(userId, env) {
    const sessionId = generateSessionId();
    const expiresAt = new Date(Date.now() + 30 * 24 * 60 * 60 * 1000); // 30 days
    
    await env.DB.prepare(`
        INSERT INTO sessions (id, user_id, expires_at)
        VALUES (?, ?, ?)
    `).bind(sessionId, userId, expiresAt.toISOString()).run();
    
    return sessionId;
}

export async function verifySession(request, env) {
    const sessionId = getCookie(request, 'session');
    if (!sessionId) return null;
    
    const session = await env.DB.prepare(`
        SELECT s.*, u.id as user_id, u.username, u.full_name, u.role, u.is_approved, u.is_active
        FROM sessions s
        JOIN users u ON s.user_id = u.id
        WHERE s.id = ? AND s.expires_at > datetime('now') AND u.is_active = TRUE
    `).bind(sessionId).first();
    
    if (!session) return null;
    
    return {
        id: session.id,
        user: {
            id: session.user_id,
            username: session.username,
            fullName: session.full_name,
            role: session.role,
            isApproved: session.is_approved
        }
    };
}

export async function deleteSession(sessionId, env) {
    await env.DB.prepare(`
        DELETE FROM sessions WHERE id = ?
    `).bind(sessionId).run();
}

export function getCookie(request, name) {
    const cookies = request.headers.get('cookie') || '';
    const match = cookies.match(new RegExp(`(^| )${name}=([^;]+)`));
    return match ? match[2] : null;
}

export function setCookie(name, value, maxAge = 30 * 24 * 60 * 60) {
    return `${name}=${value}; HttpOnly; Secure; SameSite=Strict; Max-Age=${maxAge}; Path=/`;
}