const knex = require('knex')({
    client: "mysql2",
    connection: {
        host: "localhost", 
        port: 2020, 
        user: "marye",
        password: "9853",
        database: "sigec"
    },
    pool: {
        min: 2,
        max: 10
    }
});

module.exports = knex;
