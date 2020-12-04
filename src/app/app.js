class App {
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