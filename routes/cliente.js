const { Router } = require('express');
const { ensureLoggedIn, ensureLoggedOut } = require('../utils/auth');

const routes = new Router();


/**
 * GET /cadastro
 * Formulário para cadastro de um novo cliente.
 */
routes.get('/cadastro', (req, res, next) => {
    res.render('cliente-cadastro');
});


/**
 * POST /cadastro
 * Processa a requisição de cadastro de um novo cliente.
 */
 routes.post('/cadastro', (req, res, next) => {
    res.render('cliente-cadastro');
});


/**
 * GET /home
 * Página inicial do cliente
 */
routes.get('/', (req, res, next) => {
    res.render('cliente-home', { usuario: {nome: "André Luiz Maravilha Silva".split(" ")[0]} });
});


// Exporta as rotas
module.exports = routes;
