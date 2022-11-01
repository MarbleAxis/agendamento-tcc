const { Router } = require('express');
const passport = require('passport');
const LocalStrategy = require('passport-local');
const knex = require('../utils/bd');

/** 
 * Configura o método de autenticação.
 * LocalStrategy realiza a autenticação através da verificação de usuário 
 * e senha. Os dados de usuário e senha são validados através do banco de 
 * dados.
 */
passport.use("local", new LocalStrategy(
    { usernameField: "usuario", passwordField: "senha" }, 
    (login, senha, callback) => {
        knex.select({id: "id", login: "login", senha: "senha", tipo: "tipo"})
        .from("credenciais")
        .where("login", "like", login) 
        .then((resultado) => {
            console.log(JSON.stringify(resultado));
        });
        

        if (false) {
            return callback(null, null);
        } else {
            return callback(null, false, { message: "Usuário ou senha inválidos." });
        }

    }
));


/**
 * Configura o gereciador de sessão serializar os dados do usuário.
 * A serialização transforma um objeto em string.
 */
passport.serializeUser((usuario_, callback) => {
    callback(null, usuario);
});


/**
 * Configura o gereciador de sessão desserializar os dados do usuário.
 * A desserialização transforma os dados do usuário em string de volta
 * para objeto.
 */
passport.deserializeUser((usuario_, callback) => {
    callback(null, usuario);
});


const router = new Router();


/**
 * GET /login
 * Renderiza a página com o formulário para que o usuário informe os
 * dados para autenticação (login e senha).
 */
router.get("/login", (req, res, next) => {
    res.render("login", { falhou: req.query.falhou });
});


/**
 * POST /login
 * Realiza o processo de autenticação através da validação dos dados
 * enviados pelo usuário (login e senha). Se a autenticação for bem 
 * sucedida, será criada uma sessão. Caso contrário, o usuário será 
 * enviado novamente à página com o formulário de atenticação.
 */
router.post("/login", passport.authenticate("local", {
    successReturnToOrRedirect: "/",
    failureRedirect: "/login?falhou=1"
}));


/**
 * GET /logout
 * Esta rota encerra a sessão autenticada do usuário.
 */
router.get("/logout", (req, res, next) => {
    req.logout((erro) => {
        if (erro) {
            return next(erro);
        } else {
            res.redirect("/");
        }
    });
});


// Exporta as rotas associadas à autenticação
module.exports = router;
