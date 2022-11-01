const { Router } = require('express');
const { ensureLoggedIn, ensureLoggedOut } = require('../utils/auth');

// Cria uma instância do objeto de rotas.
const routes = new Router();

// Adiciona as rotas de autenticação de serviços específicos 
// dos usuários da aplicação.
routes.use('/', require('./autenticacao'));
routes.use('/cliente', require('./cliente'));

/**
 * GET /home
 * Redireciona para a página inicial adequada de acordo com a
 * categoria do usuário.
 */
routes.get('/', ensureLoggedIn, (req, res, next) => {
    res.redirect('/cliente');
});

routes.get('/cad-cliente', (req, res, next) => {
    res.render('cliente-cadastro');
});

routes.get('/cad-empresa', (req, res, next) => {
    res.render('empresa-cadastro');
});

routes.get('/agendar', (req, res, next) => {
    res.render('cliente-agendar');
});

routes.get('/perfil', (req, res, next) => {
    res.render('cliente-perfil');
});

routes.get('/configuracao', (req, res, next) => {
    res.render('cliente-config');
});

routes.get('/historico-cliente', (req, res, next) => {
    res.render('cliente-historico');
});

routes.get('/servicos', (req, res, next) => {
    res.render('cliente-servicos');
});

routes.get('/localizar', (req, res, next) => {
    res.render('cliente-empresas');
});


//Rotas empresa
routes.get('/empresa', (req, res, next) => {
    res.render('empresa-home');
});

routes.get('/cad-funcionarios', (req, res, next) => {
    res.render('funcionario-cadastro');
});

routes.get('/view-funcionarios', (req, res, next) => {
    res.render('view-funcionarios');
});

routes.get('/cad-servico', (req, res, next) => {
    res.render('servico-cadastro');
});

routes.get('/historico-empresa', (req, res, next) => {
    res.render('empresa-historico');
});

routes.get('/horarios', (req, res, next) => {
    res.render('empresa-horarios');
});



//Rotas funcionários
routes.get('/funcionario', (req, res, next) => {
    res.render('funcionario-home');
});

routes.get('/agendamentos' , (req, res, next) => {
    res.render('funcionarios_agendamentos');
});

routes.get('/ver-horarios' , (req, res, next) => {
    res.render('funcionarios_horarios');
});

routes.get('/api' , (req, res, next) => {
    req.module('servico-cadastro');
});


routes.get('/teste', (req, res, next) => {
    res.render('teste');
});
// Exporta as rotas
module.exports = routes;
