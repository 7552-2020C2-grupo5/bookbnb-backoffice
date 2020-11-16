class App {
    routes() {
        return {
            login: '/',
            users: '/users',
            userProfile: '/users/:id',
            publications: '/publications',
            publication: '/publications/:id'
        }
    }

    loginUser(token) {
        localStorage.setItem("token", token);
    }

    thereIsLoggedInUser() {
        return localStorage.getItem("token");
    }
}

export let app = new App();