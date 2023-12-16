import axios from 'axios';
import cookies from 'react-cookies';

axios.defaults.xsrfCookieName = 'csrftoken';
axios.defaults.xsrfHeaderName = 'X-CSRFToken';
axios.defaults.withCredentials = true;

const client = axios.create({
    // TODO: Put this in a .env file
    baseURL: "http://127.0.0.1:8000/api/accounts",
    sameSite: 'none',
});

const authService = {
    fetchUserProfile: async () => {
        try {
            const res = await client.get("/user", {
                headers: { "X-CSRFToken": cookies.load('csrftoken') }
            });
            return res.data;
        } catch (error) {
            throw error;
        }
    },

    loginUser: async (email, password) => {
        try {
            const res = await client.post("/login", {
                email: email,
                password: password
            }, {
                headers: { "X-CSRFToken": cookies.load('csrftoken') }
            });
            return res.data;
        } catch (error) {
            throw error;
        }
    },

    registerUser: async (email, password) => {
        try {
            const res = await client.post("/register", {
                email: email,
                password: password
            }, {
                headers: { "X-CSRFToken": cookies.load('csrftoken') }
            });
            return res.data;
        } catch (error) {
            throw error;
        }
    },

    logoutUser: async () => {
        try {
            const res = await client.post("/logout", null, {
                headers: { "X-CSRFToken": cookies.load('csrftoken') }
            });
            return res.data;
        } catch (error) {
            throw error;
        }
    }
};

export default authService;