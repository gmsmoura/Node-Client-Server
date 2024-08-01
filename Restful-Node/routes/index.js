//exportando o módulo para utilização via 'consign' e melhor mapeamento das rotas, utilizando arrow function
module.exports = (app) =>{
    //criação de rota '/' == localhost:3000
    app.get('/', (req, res) => {
        //verificando qual URL e Método foram chamados
        console.log('URL:', req.url);
        console.log('METHOD:', req.method);

        //retornando o status da resposta
        res.statusCode = 200;

        //setando retornos com HTML
        res.setHeader('Contet-Type', 'text/html; charset=utf-8');

        const htmlContent = `
        <!DOCTYPE html>
        <html lang="pt-BR">
        <head>
            <meta charset="UTF-8">
            <meta name="viewport" content="width=device-width, initial-scale=1.0">
            <title>Página de Exemplo</title>
        </head>
        <body>
            <h1>Olá, mundo!</h1>
            <p>Este é um exemplo de página HTML.</p>
        </body>
        </html>
        `;

        //método 'end()' para finalizar a execução (e retornar uma resposta)
        res.end(htmlContent);
    });
};