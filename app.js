const path = require('path');
const express = require('express');
const session = require('express-session');
const passport = require('passport');
const cors = require('cors');
const createError = require('http-errors');
const nunjucks = require('nunjucks');
const routes = require('./routes');

// Cria uma instânia do Express
const app = express();

// Configura o Nunjucks (template engine) para renderizar as páginas
app.set('view engine', 'html');
app.set('views', path.join(__dirname, 'views'));
nunjucks.configure('views', {
    autoescape: true,
    express: app,
    tags: ''
});

// Habilita a obtenção dos dados enviados pelas requisições
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Define o caminho para arquivos estáticos da aplicação (css, js, imagens, ...)
app.use(express.static(path.join(__dirname, 'public')));

// Habilita o suporte a sessões
app.use(session({
    secret: "keyboard cat",
    resave: false,
    saveUninitialized: false,
    cookie: { secure: false }
}));

app.use(passport.session());

// Habilita CORS (Cross-Origin Resource Sharing)
app.use(cors());

// Configura as rotas da aplicação
app.use(routes);

// Captura erros 404 e o encaminha adiante
app.use((req, res, next) => {
    next(createError(404));
});

// Captura erros e exibe uma página com informações
app.use((erro, req, res, next) => {
    let msg = "Não encontramos nada por aqui.";
    if (erro.status !== 404) {
        msg = "Aconteceu algo que não estávamos esperando.";
        console.error(erro.stack);
    }
    res.status(erro.status || 500);
    res.render('erro', { 
        codigo: erro.status || 500,
        mensagem: msg
     });
});


// Exporta a aplicação
module.exports = app;
