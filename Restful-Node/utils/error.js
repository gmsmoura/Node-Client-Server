module.exports = {
    //método para tratamento de erros
    send: (err, req, res, code = 400) => {
        console.log(`error: ${err}`);
        res.status(code).json({
            error: err
        });
    }
}