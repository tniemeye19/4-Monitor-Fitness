// use this to decode a token and get the user's information out of it
import decode from 'jwt-decode';

// create a new class to instantiate for a user
class AuthService {
    // get user data
    getProfile() {
        return decode(this.getToken());
    }

    // check if user's logged in
    loggedIn() {
        // Checks if there is a saved token and it's still void
        const token = this.getToken();
        return !!token && !this.isTokenExpired(token); // handwaiving
    }

    // check if token is expired
    isTokenExpired(token) {
        try {
            const decoded = decode(token);
            if (decoded.exp < Date.now() / 1000) {
                return true;
            } else return false;
        } catch (err) {
            return false;
        }
    }

    getToken() {
        // Retrieves the user token from local storage
        return localStorage.getItem('id_token');
    }

    login(idToken, ifSignup) {
        // Saves user token to localStorage
        localStorage.setItem('id_token', idToken);
        if(!ifSignup){
            window.location.assign("/analytics");
        }
    }

    logout() {
        // Clear user token and profile data from localStorage
        localStorage.removeItem('id_token');
        // This will reload the page and reset the state of the application
        window.location.assign('/welcome');
    }
}

export default new AuthService();