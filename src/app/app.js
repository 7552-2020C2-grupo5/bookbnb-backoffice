import {Requester} from "../server-requester/requester";

class App {
    constructor() {
        this._apiClient = new Requester();
    }

    routes() {
        return {
            login: '/login',
            home: '/',
            users: '/users',
            userProfile: '/users/:id',
            publications: '/publications',
            publication: '/publications/:id'
        }
    }

    apiClient() {
        return this._apiClient;
    }

    loginUser(token) {
        localStorage.setItem("token", token);
    }

    logoutUser(token) {
        localStorage.removeItem("token");
    }

    thereIsLoggedInUser() {
        return localStorage.getItem("token");
    }
}

export let app = new App();