class HttpRequest{
    
    //método 'GET' e rota '/users' chamando o próprio 'HttpRequest' passando o método 'request()' e os parâmetros para o 'GET'
    static get(url, params = {}){
        //retornando o retorno do método 'request()'
        return HttpRequest.request('GET', url, params);
    }

    //método 'DELETE' e rota '/users' chamando o próprio 'HttpRequest' passando o método 'request()' e os parâmetros para o 'GET'
    static delete(url, params = {}){
        //retornando o retorno do método 'request()'
        return HttpRequest.request('DELETE', url, params);
    }

    //método 'PUT' e rota '/users' chamando o próprio 'HttpRequest' passando o método 'request()' e os parâmetros para o 'GET'
    static put(url, params = {}){
        //retornando o retorno do método 'request()'
        return HttpRequest.request('PUT', url, params);
    }  

    //método 'PUT' e rota '/users' chamando o próprio 'HttpRequest' passando o método 'request()' e os parâmetros para o 'GET'
    static post(url, params = {}){
        //retornando o retorno do método 'request()'
        return HttpRequest.request('POST', url, params);
    }  
    
    //'static' para chamar o método diretamente (própria class sem utilizar em outras)
    //terceiro paramêtro com chaves vazias para caso não seja informado o terceiro parâmetro, irá utilizar o obj vazio
    static request(method, url, params = {}){

        //retornando a promisse que será utilizada com os paramêtros 'resolve' para caso de 'success' ou 'reject' para caso de 'fail' e 'arrowFunction' encapsulando a chamada
        return new Promise((resolve, reject) =>{
            //requisição para server 'http://localhost:4000'
            let ajax = new XMLHttpRequest();

            //parâmetros de método ('upperCase()' para inputar sempre em maiusculo), rota de onde está buscando
            ajax.open(method.toUpperCase(), url);

            //retornando em caso de error no com o próprio 'ajax()'
            ajax.onerror = event =>{
                reject(e);
            }

            //para finalizar o carregamento da requisição
            ajax.onload = event => {

                //variável com obj vazio para que seja informada a rota na chamada do método da classe 'HttpRequest'
                //para tratar o retorno utilizamos o 'try/catch'
                let obj = {}

                try{
                    //'JSON.parse()' para converter o retorno em JSON
                    obj = JSON.parse(ajax.responseText);
                } catch(e){
                    reject(e);
                    console.error(e);
                }
                resolve(obj);
            }

            //chamando o método 'send()' para enviar a requisição
            ajax.send();
        });
    }
}