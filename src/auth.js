/**
 * Created by glenn on 17/02/16.
 */

const auth = {
  isLoggedIn() {
    return localStorage.token;
  },
};

export { auth as default, auth };
