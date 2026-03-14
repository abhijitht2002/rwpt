import axios from "axios";
const API_URL = import.meta.env.VITE_API_URL;

const API = axios.create({
    baseURL: API_URL,
    withCredentials: true, // sends httpOnly cookie automatically
});

let accessToken = null;

export const setAccessToken = (token) => {
    accessToken = token;
};

// Attach access token to every request
API.interceptors.request.use((config) => {
    if (accessToken) {
        config.headers.Authorization = `Bearer ${accessToken}`;
    }
    return config;
});

// Auto refresh interceptor
API.interceptors.response.use(
    (response) => response,
    async (error) => {
        const originalRequest = error.config;

        // Do NOT try refresh for login or refresh routes
        if (
            error.response?.status === 401 &&
            !originalRequest._retry &&
            !originalRequest.url.includes("/auth/login") &&
            !originalRequest.url.includes("/auth/refresh")
        ) {
            originalRequest._retry = true;

            try {
                const res = await axios.post(
                    `${API_URL}/auth/refresh`,
                    {},
                    { withCredentials: true }
                );

                const newAccessToken = res.data.accessToken;
                setAccessToken(newAccessToken);

                originalRequest.headers.Authorization = `Bearer ${newAccessToken}`;
                return API(originalRequest);
            } catch (refreshError) {
                // Redirect to correct login route
                window.location.href = "/account/login";
                return Promise.reject(refreshError);
            }
        }

        return Promise.reject(error);
    }
);

export default API;