// ================================================================
//  EASEMED — SESSION VALIDATION (for protected pages)
//  Include this in every page that requires authentication
// ================================================================

// ── Session Validation Function ──────────────────────────────
async function validateSession() {
    if (typeof sb === 'undefined') {
        console.warn('[EaseMed] Supabase client not available');
        return false;
    }

    const storedToken = localStorage.getItem('easemed_session_token');
    if (!storedToken) {
        console.log('[EaseMed] No session token found');
        return false;
    }

    try {
        const { data: { user } } = await sb.auth.getUser();
        if (!user) {
            console.log('[EaseMed] No authenticated user');
            return false;
        }

        const { data, error } = await sb
            .from('active_sessions')
            .select('session_token, last_seen')
            .eq('user_id', user.id)
            .single();

        if (error || !data) {
            console.warn('[EaseMed] No session in database:', error?.message);
            return false;
        }

        if (data.session_token !== storedToken) {
            console.warn('[EaseMed] Session token mismatch - logged in elsewhere');
            return false;
        }

        // Check for session expiration (30 minutes inactivity)
        if (data.last_seen) {
            const lastSeen = new Date(data.last_seen);
            const now = new Date();
            const minutesSinceLastSeen = (now - lastSeen) / 1000 / 60;
            if (minutesSinceLastSeen > 30) {
                console.warn('[EaseMed] Session expired (inactive for 30+ minutes)');
                return false;
            }
        }

        // Update last_seen
        await sb
            .from('active_sessions')
            .update({ last_seen: new Date().toISOString() })
            .eq('user_id', user.id);

        return true;
    } catch (e) {
        console.warn('[EaseMed] Session validation error:', e.message);
        return false;
    }
}

// ── Session Monitoring ──────────────────────────────────────
let sessionCheckInterval = null;

function startSessionMonitoring() {
    if (sessionCheckInterval) {
        clearInterval(sessionCheckInterval);
        sessionCheckInterval = null;
    }

    sessionCheckInterval = setInterval(async () => {
        const isValid = await validateSession();
        if (!isValid) {
            console.warn('[EaseMed] Session invalidated on another device');
            clearInterval(sessionCheckInterval);
            sessionCheckInterval = null;
            showSessionExpiredAlert();
        }
    }, 30000); // Check every 30 seconds
}

function stopSessionMonitoring() {
    if (sessionCheckInterval) {
        clearInterval(sessionCheckInterval);
        sessionCheckInterval = null;
    }
}

// ── Show Expired Alert ──────────────────────────────────────
function showSessionExpiredAlert() {
    // Remove any existing alerts
    const existingAlert = document.getElementById('easemed-session-alert');
    if (existingAlert) existingAlert.remove();

    const alertDiv = document.createElement('div');
    alertDiv.id = 'easemed-session-alert';
    alertDiv.style.cssText = `
        position: fixed; top: 20px; left: 50%; transform: translateX(-50%);
        background: #e53e3e; color: white; padding: 16px 24px;
        border-radius: 12px; font-weight: 600; z-index: 99999;
        box-shadow: 0 4px 20px rgba(0,0,0,0.3);
        text-align: center; max-width: 500px;
        animation: slideUp2 0.4s ease;
        font-family: 'Segoe UI', sans-serif;
    `;
    alertDiv.textContent = '⚠️ You have been logged out on another device. Redirecting...';
    document.body.appendChild(alertDiv);

    // Clean up after redirect
    setTimeout(() => {
        localStorage.removeItem('easemed_user');
        localStorage.removeItem('easemed_user_name');
        localStorage.removeItem('easemed_session_token');
        localStorage.removeItem('easemed_pending_user_id');
        localStorage.removeItem('easemed_pending_email');
        localStorage.removeItem('easemed_pending_name');

        if (typeof sb !== 'undefined' && sb) {
            sb.auth.signOut().catch(() => {});
        }
        window.location.href = 'easemed_login.html';
    }, 2500);
}

// ── Main Check Function ─────────────────────────────────────
async function requireAuth(redirectUrl = 'easemed_login.html') {
    const isValid = await validateSession();
    
    if (!isValid) {
        console.log('[EaseMed] Invalid session, redirecting to login');
        localStorage.removeItem('easemed_user');
        localStorage.removeItem('easemed_user_name');
        localStorage.removeItem('easemed_session_token');
        localStorage.removeItem('easemed_pending_user_id');
        localStorage.removeItem('easemed_pending_email');
        localStorage.removeItem('easemed_pending_name');

        if (typeof sb !== 'undefined' && sb) {
            await sb.auth.signOut().catch(() => {});
        }
        window.location.href = redirectUrl;
        return false;
    }
    
    // Start monitoring after successful validation
    startSessionMonitoring();
    return true;
}

// ── Logout Function ─────────────────────────────────────────
function logoutUser(redirectUrl = 'easemed_login.html') {
    stopSessionMonitoring();
    localStorage.removeItem('easemed_user');
    localStorage.removeItem('easemed_user_name');
    localStorage.removeItem('easemed_session_token');
    localStorage.removeItem('easemed_pending_user_id');
    localStorage.removeItem('easemed_pending_email');
    localStorage.removeItem('easemed_pending_name');

    if (typeof sb !== 'undefined' && sb) {
        sb.auth.signOut().catch(() => {});
    }
    window.location.href = redirectUrl;
}
