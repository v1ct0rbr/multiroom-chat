


module.exports.iniciaChat = function (application, 
   
    
    req, res) {

    var dadosForm = req.body;



    /* req.assert('apelido', 'Nome ou Apelido é obrigatório').notEmpty();
    req.assert('apelido', 'Nome ou Apelido deve conter entre 3 e 15 caracteres').len(3, 15); */

 







    // application.isEmail();


    // var erros = req.validationErrors();
    /* var error = validationResult(req);

    if (!error.isEmpty()) {
        res.render("index", { validacao: erros });
        return;
    } */

    application.get('io').to('room').emit('msgParaCliente', { apelido: dadosForm.apelido, mensagem: ' acabou de entrar no chat' });

    res.render('chat', { dadosForm: dadosForm });
}