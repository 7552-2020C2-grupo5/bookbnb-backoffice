import ApiClient from "../server-requester/client/ApiClient";
import RemoteRequester from "../server-requester/requester/RemoteRequester";

class App {
    constructor() {
        this._apiClient = new ApiClient(new RemoteRequester());
    }

    routes() {
        return {
            login: '/login',
            home: '/',
            users: '/users',
            userProfile: '/users/:id',
            publications: '/publications',
            publication: '/publications/:id',
            admins: '/admins',
            newAdmin: '/admins/new',
            adminProfile: '/admins/:id'
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