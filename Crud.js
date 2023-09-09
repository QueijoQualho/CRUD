const express = require('express');
const server = express();

/* Import conexão */
const con = require('./bd')

server.use(express.json());

server.get('/get', (req, res) => {
    con.query('SELECT * FROM Clientes', (err, results) => {
        if (err) {
            console.error('Erro na consulta SQL:', err);
            res.status(500).send('Erro interno do servidor');
            return;
        }

        res.json(results);
    });
});

server.get('/get/:id', (req, res) => {
    const id = parseInt(req.params.id);

    const getID = "Select * from Clientes where ID = ?"

    if (isNaN(id)) {
        res.status(400).send('ID inválido');
        return;
    }

    con.query(getID, id, (err, results) => {
        if (err) {
            console.error('Erro na consulta SQL:', err);
            res.status(500).send('Erro interno do servidor');
            return;
        }

        if (results.length === 0) {
            res.status(404).send('Registro não encontrado');
            return;
        }

        res.json(results[0]);
    })

})

server.post('/post', (req, res) => {
    const { Nome, Sobrenome, Endereco, Telefone } = req.body

    const insert = "INSERT INTO Clientes (Nome, Sobrenome, Endereco, Telefone) VALUES (?, ?, ?, ?);"

    con.query(insert, [Nome, Sobrenome, Endereco, Telefone], (err, results) => {
        if (err) {
            console.error('Erro na inserção de dados: ', err);
            res.status(500).send('Erro na inserção de dados');
            return;
        }

        res.status(200).send("Dados inseridos")

    })
})

server.put('/put/:id', (req, res) => {
    const id = parseInt(req.params.id);
    const { Nome, Sobrenome, Endereco, Telefone } = req.body

    const update = "Update Clientes set Nome = ?, Sobrenome = ?, Endereco = ?, Telefone = ? where ID = ?"

    con.query(update, [Nome, Sobrenome, Endereco, Telefone, id], (err, results) => {
        if (err) {
            console.error('Erro na alteração de dados: ', err);
            res.status(500).send('Erro na alteração de dados');
            return;
        }

        res.status(200).send("Dados alterados")
    })
})

server.delete('/delete/:id', (req, res) => {
    const id = parseInt(req.params.id);

    const del = "delete from Clientes where ID = ?"

    con.query(del, id, (err, results) => {
        if (err) {
            console.error('Erro ao deletar de dados: ', err);
            res.status(500).send('Erro ao deletar de dados');
            return;
        }

        res.status(200).send("Dados deletados")
    })
})

server.listen(3001, () => {
    console.log('Servidor está rodando na porta 3001');
});
