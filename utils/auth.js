const ensureLogin = require('connect-ensure-login');


module.exports = {

    /**
     * Middlewares para garantir que as requisições a rotas sejam 
     * realizadas a partir de sessões autenticadas.
     */
    ensureLoggedIn: ensureLogin.ensureLoggedIn('/login'),

    /**
     * Middlewares para garantir que as requisições a rotas sejam 
     * realizadas a partir de sessões não autenticadas.
     */
    ensureLoggedOut: ensureLogin.ensureLoggedOut('/'),

};

