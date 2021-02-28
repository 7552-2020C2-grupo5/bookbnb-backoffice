import ApiClient from "../server-requester/client/ApiClient";
import RemoteRequester from "../server-requester/requester/RemoteRequester";

class App {
    constructor() {
        this._apiClient = undefined;
    }

    routes() {
        return {
            login: '/login',
            home: '/',
            users: '/users',
            userProfile: '/users/:id(\\d+)',
            publications: '/publications',
            publication: '/publications/:id(\\d+)',
            admins: '/admins',
            newAdmin: '/admins/new',
            adminProfile: '/admins/:id(\\d+)',
            bookings: '/bookings'
        }
    }

    apiClient() {
        debugger;
        if (this._apiClient === undefined) {
            this._apiClient = new ApiClient(new RemoteRequester(), undefined, undefined,
                this.logoutUser);
        }
        if (this.thereIsLoggedInUser() && !this._apiClient.hasToken()) {
            this._apiClient.setToken(this.getUserToken());
        }
        return this._apiClient;
    }

    loginUser(token) {
        this.apiClient().setToken(token);
        localStorage.setItem("token", token);
    }

    logoutUser(token) {
        localStorage.removeItem("token");
        window.history.go();
    }

    getUserToken() {
        return localStorage.getItem("token");
    }

    thereIsLoggedInUser() {
        return localStorage.getItem("token");
    }

}

export let app = new App();