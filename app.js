/* importar as configurações do servidor */

const app = require('./config/server')



/* parametrizar porta de escuta */
var server = app.listen(80, function () {
    console.log('Servidor online');
})

var io = require('socket.io').listen(server)

app.set('io', io);

/* criar a conexão por websocket */

io.on('connection', function (socket) {

    socket.on('disconnect', function () {
        console.log('Usuário desconectou')
    })

    socket.on('msgParaServidor', function (data) {
        socket.emit(
            'msgParaCliente',
            { apelido: data.apelido, mensagem: data.mensagem }
        )
        socket.broadcast.emit(
            'msgParaCliente',
            { apelido: data.apelido, mensagem: data.mensagem }
        )

        /*participantes */
        if (parseInt(data.apelido_atualizado_nos_clientes) == 0) {

            socket.emit(
                'participantesParaCliente',
                { apelido: data.apelido }
            )
            socket.broadcast.emit(
                'participantesParaCliente',
                { apelido: data.apelido }
            )
        }



    })
})

/* module.exports = app; */