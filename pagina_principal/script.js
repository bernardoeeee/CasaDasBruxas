document.addEventListener("DOMContentLoaded", () => {

    window.addEventListener("load", () => {
        if (localStorage.getItem("Informacoes")) {
            let Html = document.querySelector('#Informacoes')
            let dados = JSON.parse(localStorage.getItem('Informacoes'))

            // dados.perfil == 'admin'
            //     ? document.getElementById('cadastrar_Produto').style.display = 'block'
            //     : document.getElementById('cadastrar_Produto').style.display = 'none'

            Html.innerHTML = `<div style="display: flex; flex-direction: column; align-items: end;">
                     Nome: ${dados.NomeCompleto} 
                     ID: ${dados.id_usuario}
                     Perfil: ${dados.perfil}
                    </div>`

            Html.style.display = 'block';

            let logado = document.querySelector('#logado');
            logado.style.display = 'none';

        }
    })
})




function Sair(event) {
    localStorage.removeItem('Informacoes');
    window.location.href = 'index.html'

    let logado2 = document.querySelector('#logado');
    logado2.style.display = 'block';
}