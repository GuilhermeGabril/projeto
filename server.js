const express = require('express');
const mysql = require('mysql');
const bodyParser = require('body-parser');
const app = express();
const port = process.env.PORT || 3000;

app.use(bodyParser.json());
app.use(express.static('public'));

const connection = mysql.createConnection({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASS,
    database: process.env.DB_NAME
});

connection.connect(err => {
    if (err) {
        console.error('Erro ao conectar ao banco de dados:', err.stack);
        return;
    }
    console.log('Conectado ao banco de dados.');
});

app.post('/api/register', (req, res) => {
    const { name, email } = req.body;
    const query = 'INSERT INTO usuario (nome, email) VALUES (?, ?)';
    connection.query(query, [name, email], (err, results) => {
        if (err) {
            res.status(500).json({ message: 'Erro ao registrar usuário.' });
            return;
        }
        res.status(200).json({ message: 'Usuário registrado com sucesso!' });
    });
});

app.listen(port, () => {
    console.log(`Servidor rodando em http://localhost:${port}`);
});
