const { body, validationResult } = require('express-validator');

module.exports = {
    // Função para validação de usuário
    validateUser: () => {
        return [
            //método 'notEmpty()' para definir required nos campos, método 'isEmail()' define se o value está no formato de email
            body('_name').notEmpty().withMessage('O nome é obrigatório.'),
            body('_email').isEmail().withMessage('O e-mail não é válido.')
        ];
    },

    //validando campos com o método 'validationResult()'
    handleValidationErrors: (req, res, next) => {
        let errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }
        next();
    }
}