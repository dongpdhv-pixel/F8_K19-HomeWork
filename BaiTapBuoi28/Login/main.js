import { login, fetchWithAuth } from '../plugin/api.js';

const HOME_PAGE = '../page/home/home.html';

const redirectIfAuthenticated = async () => {
    const accessToken = localStorage.getItem('accessToken');

    if (!accessToken) {
        return;
    }

    try {
        const response = await fetchWithAuth('/auth/me', { method: 'GET' });

        if (response.ok) {
            window.location.href = HOME_PAGE;
        }
    } catch (error) {
        // Ignore network error and keep user on login page.
    }
};

const onLogin =  async ()  =>{
    const username = document.getElementById('username').value.trim();
    const password = document.getElementById('password').value.trim();

    if (!username || !password) {
        alert('Vui lòng nhập username và password');
        return;
    }

    try {
        await login(username, password);
        window.location.href = HOME_PAGE;
    } catch (error) {
        alert('Đăng nhập thất bại!');
    }

}
const loginBtn = document.getElementById('login-btn');
if (loginBtn) {
    loginBtn.addEventListener('click', onLogin);
}

redirectIfAuthenticated();