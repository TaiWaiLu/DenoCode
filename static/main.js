document.getElementById('loginForm').addEventListener('submit', async (e) => {
    e.preventDefault();
    
    const username = document.getElementById('username').value;
    const password = document.getElementById('password').value;
    
    try {
        const response = await fetch('/api/login', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ username, password })
        });
        
        const data = await response.json();
        
        if (response.ok) {
            localStorage.setItem('token', data.token);
            alert('登录成功！');
            // 跳转到主页或其他页面
        } else {
            alert(data.error || '登录失败，请重试');
        }
    } catch (error) {
        alert('发生错误，请稍后重试');
        console.error('Error:', error);
    }
});