const mysql = require('mysql');

const con = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'MinhaEmpresa'
});

con.connect((err) => {
    if (err) {
        console.log('Erro na conexão:', err);
        return;
    }
    console.log('Conectado');
});

/* Permite import */
module.exports = con;
