
import { fetchWithAuth, clearAuthStorage } from '../../plugin/api.js';

const app = document.getElementById('homeApp');
const statusText = document.getElementById('statusText');
const heroCopy = document.getElementById('heroCopy');
const actionArea = document.getElementById('actionArea');
const logoutBtn = document.getElementById('logoutBtn');

const logout = () => {
    clearAuthStorage();
    window.location.href = '../../login/index.html';
};

const renderGuest = () => {
    app.classList.remove('logged-in');
    statusText.textContent = 'Guest mode';
    heroCopy.textContent = 'You are not signed in yet. Press login to continue.';
    actionArea.innerHTML = '<a class="btn btn-primary" href="../../login/index.html">Login</a>';
};

const renderUserProfile = (profile, statusLabel = 'You are logged in') => {
    app.classList.add('logged-in');
    statusText.textContent = statusLabel;
    heroCopy.textContent = `Welcome back, ${profile.firstName || profile.username || 'User'}. Your profile is loaded from the API.`;
    actionArea.innerHTML = `
        <div class="profile-card">
            <img class="profile-avatar" src="${profile.image || ''}" alt="${profile.firstName || profile.username || 'Profile'}">
            <div class="profile-meta">
                <h2 class="profile-name">${profile.firstName || ''} ${profile.lastName || ''}</h2>
                <p class="profile-text">@${profile.username || ''}</p>
                <p class="profile-text">${profile.email || ''}</p>
            </div>
        </div>
        <button class="btn btn-ghost" id="logoutActionBtn" type="button">Logout</button>
    `;

    const logoutActionBtn = document.getElementById('logoutActionBtn');

    if (logoutActionBtn) {
        logoutActionBtn.addEventListener('click', logout);
    }
};

const renderProfile = async () => {
    const accessToken = localStorage.getItem('accessToken');

    if (!accessToken) {
        renderGuest();
        return;
    }

    try {
        const response = await fetchWithAuth('/auth/me', {
            method: 'GET',
        });

        if (!response.ok) {
            throw new Error('Unauthorized');
        }

        const profile = await response.json();

        renderUserProfile(profile);
    } catch (error) {
        clearAuthStorage();
        renderGuest();
    }
};

logoutBtn.addEventListener('click', logout);
renderProfile();
