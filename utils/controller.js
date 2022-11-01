const db = require('./bd');

class Controller {
   novoCliente(req, res, next){
      const {email, telefone, nome} = req.body;

      console.log(email, telefone, nome);

      db.insert({email, telefone, nome}).table("cliente").then(data => {
         console.log(data);
         res.json({message: "Cliente cadastrado com sucesso!"});
      }).catch(error => {
         console.log(error);
      });
   }
}

// const dados = {
//     login: usuario,
//     senha: senha
// }

//  database.insert(dados).into("credenciais").then(data => {
//     console.log(data);
//  }).catch(err => {
//     console.log(err);  
//  });

module.exports = new Controller();