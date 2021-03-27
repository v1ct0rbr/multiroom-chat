(() => {

    var url = 'http://localhost'
  

    document.querySelector('#exibe_chat').addEventListener('click', () => {
        document.querySelector('#conversa').style.display = 'block'
        document.querySelector('#participantes').style.display = 'none'
    })



    document.querySelector('#exibe_participantes').addEventListener('click', () => {
        document.querySelector('#participantes').style.display = 'block'
        document.querySelector('#conversa').style.display = 'none'
    })


    var socket = io('http://localhost');
    document.querySelector('#enviar_mensagem').addEventListener('click', () => {
        if(document.getElementById('apelido').value.trim().length < 5)
            window.location.href = url
        socket.emit('msgParaServidor', {
            apelido: document.getElementById('apelido').value,
            mensagem: document.getElementById('mensagem').value,
            apelido_atualizado_nos_clientes: document.getElementById('apelido_atualizado_nos_clientes').value

        });
        document.getElementById('mensagem').value = "";
        document.getElementById('apelido_atualizado_nos_clientes').value = 1;
    })


    socket.on('msgParaCliente', function (data) {
        let html = '';
        html += '<div class="alert ' + (document.getElementById('apelido').value == data.apelido ? 'alert-primary' : 'alert-secondary') + '">';
        html += '<strong>' + data.apelido + '</strong> ';
        html += '<img src="../img/icons/chevron-double-right.svg" alt="Bootstrap" width="16" height="16" />   '
        html += data.mensagem;
        html += '</div>';

        document.getElementById('dialogos').innerHTML += html

        // $('#dialogos').append(html);
        window.scrollTo(0, document.body.scrollHeight);
    });




    socket.on('participantesParaCliente', function (data) {
        let html = '';
        html += '<span class="participante">';
        html += '<img src="/images/ico_usuario.png" />';
        html += data.apelido;

        html += '</span>';

        document.getElementById('pessoas').innerHTML += html
    });

})()