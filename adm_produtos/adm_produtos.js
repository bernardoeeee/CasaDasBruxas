window.addEventListener("load", () => {
    listarProduto()


    if (localStorage.getItem("Informacoes")) {
        let Html = document.querySelector('#Informacoes')
        let dados = JSON.parse(localStorage.getItem('Informacoes'))

        dados.perfil == 'admin'
            ? document.getElementById('cadastrar_Produto').style.display = 'block'
            : document.getElementById('cadastrar_Produto').style.display = 'none'

        Html.innerHTML = `<div style="display: flex; flex-direction: column; align-items: end;">
                Nome: ${dados.NomeCompleto}
                Perfil: ${dados.perfil}
                </div>`

        Html.style.display = 'block';
    }
})


async function cadastrarProduto(event){
    event.preventDefault()

    const nomeProduto = document.querySelector('#nomeProduto').value;
    const preco = Number(document.querySelector('#preco').value);
    const descricao = document.querySelector('#descricao').value;
    const image = document.querySelector('#image').files[0].name;

    let formData = new FormData();

    console.log(nomeProduto,preco,descricao,image);

    formData.append('nomeProduto', nomeProduto)
    formData.append('preco', preco)
    formData.append('descricao',descricao)
    formData.append('image', image)

    const response = await fetch('http://localhost:3002/produtos/cadastrar', {
        method: "POST",
        body: formData
    });

    console.log(response)
    
    const results = await response.json()
    if(results.message){
        alert(results.message)
    }else{
        alert(results.message)
    }
}


async function listarProduto() {
    const response = await fetch('http://localhost:3002/produtos/listar',{
        method: 'GET',
        headers:{
            "Content-Type": "application/json"
        }
    })

    const results = await response.json()

    if(results.sucess){
        let produtoData = results.data
        const images = 'http://localhost:3002/uploads/';
        let html = document.getElementById('FileiraProdutos')
    }else{
        // alert(results.message)
    }
}