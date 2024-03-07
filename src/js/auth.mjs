import { loginRequest } from "./externalServices.mjs";
import { alertMessage, getLocalStorage, setLocalStorage } from "./utils.mjs";

/* 
will be responsible for sending the credentials to the authentication server 
and if that comes back successful it will store the authentication token that is 
sent back into local storage. Then we will redirect the user to whatever page 
they were trying to access when they were asked to login.
*/

const tokenKey = "so-token";
export async function login(creds, redirect = "/") {
    console.log("login function");
    try {
        const token = await loginRequest(creds);
        setLocalStorage(tokenKey, token);
        // because of the default arg provided above...if no redirect is provided send them Home.
        window.location = redirect;
    } catch (err) {
        alertMessage(err.message.message);
    }
}


/* 
is responsible to check to see if the user is already logged in. 
How will we do that? We will check to see if there is a valid token stored in localStorage.
 If there is no token, or if the token is expired we should redirect the user to the login page...
 making sure to keep track of the page they were trying to access so we can send them back after the login!
*/
export function checkLogin() {
    // get the token from localStorage
    const token = getLocalStorage(tokenKey);
    // if the token is NOT valid
    if (!isTokenValid(token)) {
      localStorage.removeItem(tokenKey);
      const location = window.location;
      console.log(location);
      window.location = `/login/index.html?redirect=${location.pathname}`;
    } else {
        return token; //if they are logged in then just return the token.
    }
  }

/* 
is responsible for checking an existing token to make sure it is not expired. 
It should return a true or false, true if the token is still valid (unexpired), 
false if it is expired.
*/
function isTokenValid(token) {
    // check to make sure a token was actually passed in.
    if (token) {
        // decode the token
        const decoded = jwt_decode(token);
        // get the current date
        let currentDate = new Date();
        // JWT exp is in seconds, the time from our current date will be milliseconds.
        if (decoded.exp * 1000 < currentDate.getTime()) {
        //token expiration has passed
        console.log("Token expired.");
        return false;
        } else {
        // token not expired
        console.log("Valid token");
        return true;
        }
        //no token...automatically return false.
    } else return false;
}