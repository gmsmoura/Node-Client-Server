var express = require('express');
var assert = require('assert');
var restify = require('restify-clients');
var router = express.Router();

//Create a JSON client -- criando conexão com outro servidor (onde estão armazenados os dados de usuários)
var client = restify.createJsonClient({
  url: 'http://localhost:4000',
  version: '~1.0'
});

/* GET users listing. */
router.get('/', function(req, res, next) {
  //res.send('respond with a resource');

  //toda chamada executada com '/users' será enviado na rota 'client.get' mapeada
  client.get('/users', function (err, request, response, obj) {
    assert.ifError(err);
    
    //retornando em tela a resposta
    res.json(obj);
  });
});

/* GET users by id. */
router.get('/:id', function(req, res, next) {
  //res.send('respond with a resource');

  //toda chamada executada com '/users/id' será enviado na rota 'client.get' mapeada e com a utilização de dois params 'id e a function para os retornos
  client.get(`/users/${req.params.id}`, function (err, request, response, obj) {
    assert.ifError(err);
    
    //retornando em tela a resposta
    res.json(obj);
  });
});

/* PUT users by id. */
router.put('/:id', function(req, res, next) {
  //res.send('respond with a resource');

  //toda chamada executada com '/users/id' será enviado na rota 'client.put' mapeada e com a utilização de três params 'id, body do obj/req e a function para os retornos
  client.put(`/users/${req.params.id}`, req.body, function (err, request, response, obj) {
    assert.ifError(err);
    
    //retornando em tela a resposta
    res.json(obj);
  });
});

/* DELETE users by id. */
router.delete('/:id', function(req, res, next) {
  //res.send('respond with a resource');

  //toda chamada executada com '/users/id' será enviado na rota 'client.del' mapeada e com a utilização de dois params 'id e a function para os retornos
  client.del(`/users/${req.params.id}`, function (err, request, response, obj) {
    assert.ifError(err);
    
    //retornando em tela a resposta
    res.json(obj);
  });
});

/* POST users by id. */
router.post('/', function(req, res, next) {
  //res.send('respond with a resource');

  //toda chamada executada com '/users/id' será enviado na rota 'client.post' mapeada e com a utilização de três params 'id, body do obj/req e a function para os retornos
  client.post(`/users`, req.body, function (err, request, response, obj) {
    assert.ifError(err);
    
    //retornando em tela a resposta
    res.json(obj);
  });
});

module.exports = router;
