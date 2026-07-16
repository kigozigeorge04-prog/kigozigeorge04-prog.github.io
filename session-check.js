<script>
    document.addEventListener('DOMContentLoaded', function() {
        // Simple check - user is already authenticated by authCheck()
        if (!localStorage.getItem('easemed_user')) {
            window.location.href = 'easemed_login.html';
            return;
        }
        console.log('[EaseMed] Protected page loaded successfully');
        console.log('Welcome, ' + localStorage.getItem('easemed_user_name'));
    });
</script>
