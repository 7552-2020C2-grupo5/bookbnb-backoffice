class App {
    routes() {
        return {
            login: '/',
            user: '/user',
            publication: '/profile'
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