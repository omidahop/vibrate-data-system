export async function onRequestGet(context) {
    const { env } = context;
    
    try {
        const settings = await env.DB.prepare(`
            SELECT * FROM user_settings WHERE user_id = ?
        `).bind(context.user.id).first();
        
        if (!settings) {
            // Create default settings
            await env.DB.prepare(`
                INSERT INTO user_settings (user_id) VALUES (?)
            `).bind(context.user.id).run();
            
            return new Response(JSON.stringify({ 
                settings: getDefaultSettings()
            }), {
                headers: { 'Content-Type': 'application/json' }
            });
        }
        
        return new Response(JSON.stringify({ 
            settings: {
                theme: settings.theme,
                primaryColor: settings.primary_color,
                dri1Color: settings.dri1_color,
                dri2Color: settings.dri2_color,
                equipmentPriority: JSON.parse(settings.equipment_priority),
                parameterPriority: JSON.parse(settings.parameter_priority),
                parameterMode: settings.parameter_mode,
                analysisThreshold: settings.analysis_threshold,
                analysisTimeRange: settings.analysis_time_range,
                analysisComparisonDays: settings.analysis_comparison_days
            }
        }), {
            headers: { 'Content-Type': 'application/json' }
        });
        
    } catch (error) {
        console.error('Get settings error:', error);
        return new Response(JSON.stringify({ 
            error: 'خطا در دریافت تنظیمات' 
        }), {
            status: 500,
            headers: { 'Content-Type': 'application/json' }
        });
    }
}

export async function onRequestPost(context) {
    const { request, env } = context;
    
    try {
        const settings = await request.json();
        
        await env.DB.prepare(`
            UPDATE user_settings 
            SET 
                theme = ?,
                primary_color = ?,
                dri1_color = ?,
                dri2_color = ?,
                equipment_priority = ?,
                parameter_priority = ?,
                parameter_mode = ?,
                analysis_threshold = ?,
                analysis_time_range = ?,
                analysis_comparison_days = ?,
                updated_at = datetime('now')
            WHERE user_id = ?
        `).bind(
            settings.theme,
            settings.primaryColor,
            settings.dri1Color,
            settings.dri2Color,
            JSON.stringify(settings.equipmentPriority),
            JSON.stringify(settings.parameterPriority),
            settings.parameterMode,
            settings.analysisThreshold,
            settings.analysisTimeRange,
            settings.analysisComparisonDays,
            context.user.id
        ).run();
        
        return new Response(JSON.stringify({ 
            message: 'تنظیمات ذخیره شد' 
        }), {
            headers: { 'Content-Type': 'application/json' }
        });
        
    } catch (error) {
        console.error('Save settings error:', error);
        return new Response(JSON.stringify({ 
            error: 'خطا در ذخیره تنظیمات' 
        }), {
            status: 500,
            headers: { 'Content-Type': 'application/json' }
        });
    }
}

function getDefaultSettings() {
    return {
        theme: 'light',
        primaryColor: '#2563eb',
        dri1Color: '#3b82f6',
        dri2Color: '#ef4444',
        equipmentPriority: {},
        parameterPriority: {},
        parameterMode: 'velocity-first',
        analysisThreshold: 20,
        analysisTimeRange: 7,
        analysisComparisonDays: 1
    };
}