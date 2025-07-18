export async function onRequestGet(context) {
    const { request, env } = context;
    const url = new URL(request.url);
    
    try {
        const unit = url.searchParams.get('unit');
        const equipment = url.searchParams.get('equipment');
        const date = url.searchParams.get('date');
        const dateFrom = url.searchParams.get('dateFrom');
        const dateTo = url.searchParams.get('dateTo');
        
        let query = `
            SELECT v.*, u.full_name as user_name
            FROM vibrate_data v
            JOIN users u ON v.user_id = u.id
            WHERE 1=1
        `;
        
        const params = [];
        
        if (unit) {
            query += ` AND v.unit = ?`;
            params.push(unit);
        }
        
        if (equipment) {
            query += ` AND v.equipment = ?`;
            params.push(equipment);
        }
        
        if (date) {
            query += ` AND v.date = ?`;
            params.push(date);
        }
        
        if (dateFrom) {
            query += ` AND v.date >= ?`;
            params.push(dateFrom);
        }
        
        if (dateTo) {
            query += ` AND v.date <= ?`;
            params.push(dateTo);
        }
        
        query += ` ORDER BY v.date DESC, v.created_at DESC`;
        
        const result = await env.DB.prepare(query).bind(...params).all();
        
        const data = result.results.map(row => ({
            id: row.id,
            unit: row.unit,
            equipment: row.equipment,
            date: row.date,
            parameters: JSON.parse(row.parameters),
            userName: row.user_name,
            createdAt: row.created_at
        }));
        
        return new Response(JSON.stringify({ data }), {
            headers: { 'Content-Type': 'application/json' }
        });
        
    } catch (error) {
        console.error('Get data error:', error);
        return new Response(JSON.stringify({ 
            error: 'خطا در دریافت داده‌ها' 
        }), {
            status: 500,
            headers: { 'Content-Type': 'application/json' }
        });
    }
}

export async function onRequestPost(context) {
    const { request, env } = context;
    
    try {
        const { unit, equipment, date, parameters } = await request.json();
        
        if (!unit || !equipment || !date || !parameters) {
            return new Response(JSON.stringify({ 
                error: 'تمام فیلدها الزامی هستند' 
            }), {
                status: 400,
                headers: { 'Content-Type': 'application/json' }
            });
        }
        
        // Check if data already exists
        const existing = await env.DB.prepare(`
            SELECT id FROM vibrate_data 
            WHERE unit = ? AND equipment = ? AND date = ?
        `).bind(unit, equipment, date).first();
        
        if (existing) {
            // Update existing data
            await env.DB.prepare(`
                UPDATE vibrate_data 
                SET parameters = ?, updated_at = datetime('now')
                WHERE id = ?
            `).bind(JSON.stringify(parameters), existing.id).run();
        } else {
            // Insert new data
            await env.DB.prepare(`
                INSERT INTO vibrate_data (user_id, unit, equipment, date, parameters)
                VALUES (?, ?, ?, ?, ?)
            `).bind(context.user.id, unit, equipment, date, JSON.stringify(parameters)).run();
        }
        
        return new Response(JSON.stringify({ 
            message: 'داده‌ها ذخیره شد' 
        }), {
            headers: { 'Content-Type': 'application/json' }
        });
        
    } catch (error) {
        console.error('Save data error:', error);
        return new Response(JSON.stringify({ 
            error: 'خطا در ذخیره داده‌ها' 
        }), {
            status: 500,
            headers: { 'Content-Type': 'application/json' }
        });
    }
}