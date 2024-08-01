const Validator = require('../utils/validator');  // Importa o módulo Validator

//configurando módulo do database nedb para persistência de dados
let NeDB = require('nedb');
let db = new NeDB({
    filename: 'users.db',
    autoload: true
});

module.exports = app =>{
    //simplificando o mapeamento da rota utilizando via variável onde o path '/users' está sendo referenciado várias vezes
    let route = app.route('/users');
    //mapeando rota para busca por id do user, para parametrizar a busca por uma prop específica, pós a barra utilizamos o ":nomeProp"
    let routeId = app.route('/users/:id');

     //criação de subrota para 'users', utilizando o método GET para retorno dos usuários  
    route.get((req, res) => {

        //primeiro parâmetro com json/objeto vazio para listar todos os users e em seguida ordenando o resultado com o método 'sort()' e por fim o método 'exec()' para executar a função
        db.find({}).sort({name: 1}).exec((err, users)=>{
            //tratando retorno error
            if(err){
                //chamando o método 'send()' da classe 'utils.js'
                app.utils.error.send(err, req, res);
            } else {
                //retornando o status da resposta
                res.statusCode = 200;
            
                //header parametrizado para o retorno em formato 'json'
                res.setHeader('Contet-Type', 'application/json');
                res.json({
                    users
                });
            }
        });
    });

    routeId.get((req, res) => {
        //utilizando o método 'findOne()' para a busca utilizando parâmetros, neste caso o id
        //utilizando o método 'exec()' com mapeamento de caso de erros para executar o 'findOne()' 
        db.findOne({_id:req.params.id}).exec((err, user)=>{
            if(err){
                app.utils.error.send(err, req, res);
            } else {
                res.status(200).json(user);
            }
        });
    });


    //criação de subrota inserção de novos users, utilizando o método POST para envio
    route.post(Validator.validateUser(), Validator.handleValidationErrors, (req, res) =>{
        //aplicando insert com dois parâmetros, json com os dados do body enviado e parâmetros para casos de erro ser retornado ou envio do objeto (user)
        db.insert(req.body, (err, user) =>{
            //tratando retorno de erro
            if(err){
                //chamando o método 'send()' da classe 'utils.js'
                app.utils.error.send(err, req, res);
            } else {
                //enviando com status 200 ok, com o json (objeto/dados do user)
                res.status(200).json(user);
            }
        });
    });

    //mapeando rota para update do objeto user por id utilizando o método 'put()' e 'update()'
    routeId.put(Validator.validateUser(), Validator.handleValidationErrors, (req, res) => {
        //recuperando os dados através dos parâmetro '{_id:req.params.id}' e 'req.body' e utilizando como terceiro param a 'chamada' da requisição, se for sucesso ok, se não envia o 'err', para o 'update' não utiliza o 'exec()'
        db.update({_id:req.params.id}, req.body, err =>{
            if(err){
                app.utils.error.send(err, req, res);
            } else {
                //utlizando o 'Object.assign' para retornar o id que foi utilizado para o update com 'req.params' e o retorno do objeto aletrado 'req.body'
                res.status(200).json(Object.assign(req.params, req.body));
            }
        });
    });

    //mapeando rota para delete do objeto user por id utilizando o método 'put()' e 'update()'
    routeId.delete((req, res) => {
        //recuperando os dados através dos parâmetro '{_id:req.params.id}', segundo param vazio (parâmetro de opções, para excluir vários ou um registro por vez), como terceiro param a 'chamada' da requisição, se for sucesso ok, se não envia o 'err', para o 'delete' não utiliza o 'exec()'
        db.remove({_id:req.params.id}, {}, err =>{
            if(err){
                app.utils.error.send(err, req, res);
            } else {
                //utilizando o 'req.params' para retornar o objeto removido
                res.status(200).json(req.params);
            }
        });
    });
}