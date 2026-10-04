const API_URL = 'https://dummyjson.com';
const LOGIN_PAGE = 'BaiTapBuoi28/login/index.html';

const buildUrl = (path) => (path.startsWith('http') ? path : `${API_URL}${path}`);

const redirectToLogin = () => {
    window.location.href = LOGIN_PAGE;
};

export const clearAuthStorage = () => {
    localStorage.removeItem('accessToken');
    localStorage.removeItem('refreshToken');
};

export const login = async (username, password) => {
    const response = await fetch(buildUrl('/auth/login'), {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username, password }),
    });

    const result = await response.json();

    if (!response.ok) {
        throw new Error(result.message || 'Login failed');
    }

    localStorage.setItem('accessToken', result.accessToken);
    localStorage.setItem('refreshToken', result.refreshToken);

    return result;
};

export const getNewAccessToken = async () => {
    const refreshToken = localStorage.getItem('refreshToken');

    if (!refreshToken) {
        clearAuthStorage();
        redirectToLogin();
        return null;
    }

    const response = await fetch(buildUrl('/auth/refresh'), {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ refreshToken, expiresInMins: 30 }),
    });

    if (!response.ok) {
        clearAuthStorage();
        redirectToLogin();
        return null;
    }

    const data = await response.json();
    localStorage.setItem('accessToken', data.accessToken);

    if (data.refreshToken) {
        localStorage.setItem('refreshToken', data.refreshToken);
    }

    return data.accessToken;
};

export const fetchWithAuth = async (path, options = {}) => {
    const requestOptions = {
        ...options,
        headers: {
            ...(options.headers || {}),
        },
    };

    const accessToken = localStorage.getItem('accessToken');

    if (accessToken) {
        requestOptions.headers.Authorization = `Bearer ${accessToken}`;
    }

    let response = await fetch(buildUrl(path), requestOptions);

    if (response.status === 401) {
        const newAccessToken = await getNewAccessToken();

        if (newAccessToken) {
            requestOptions.headers.Authorization = `Bearer ${newAccessToken}`;
            response = await fetch(buildUrl(path), requestOptions);
        }
    }

    return response;
};

const request = async (method, path, data, token) => {
    const headers = {
        'Content-Type': 'application/json',
    };

    if (token) {
        headers.Authorization = `Bearer ${token}`;
    }

    const response = await fetch(buildUrl(path), {
        method,
        headers,
        body: data ? JSON.stringify(data) : undefined,
    });

    const result = await response.json();

    if (!response.ok) {
        throw new Error(result.message || 'Request failed');
    }

    return result;
};

export const get = (path, token) => request('GET', path, undefined, token);

export const post = (path, data, token) => request('POST', path, data, token);

export const getAccessNewToken = (refreshToken, expiresInMins) =>
    post('/auth/refresh', {
        refreshToken,
        expiresInMins,
    });