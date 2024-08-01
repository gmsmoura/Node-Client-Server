//carregando módulos 'express' e 'consign'
const express = require('express');
const consign = require('consign');
const bodyParser = require('body-parser');

let app = express();

//utilizando dois parâmetros para sinalizar a rota raíz para envio das subrotas (otimização de código e removendo ambiguidade)
// app.use('/users', routesUsers);

//configura o body-parser para processar JSON e dados de formulários
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

//método 'consign()' para incluir todas as rotas e inserir no 'app'
//método 'include()' para referenciar as pastas com os files que estão sendo utilizados
consign().include('routes').include('utils').into(app);

//chamando o servidor (ouvindo) na porta 3000 (pode ser qualquer porta) com IP local, caso o servidor fique hospedado em outro local (cloud por ex), utilizar porta que esteja liberado para uso
app.listen(4000, '127.0.0.1', () =>{
    //via function anônima
    console.log('running server');
});