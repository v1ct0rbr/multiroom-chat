module.exports.home = function(application, req, res){
    res.render('index', { validacao : {} });
}

/* exports.home = (req, res, next) =>{
    res.render('index', { validacao : {} });
} */