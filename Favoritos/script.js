function carregarFavoritos(){
    let Favoritos = JSON.parse(localStorage.getItem("Favoritar")) || []

    let itensFavoritos = document.querySelector("#itensFavoritos");

    itensFavoritos.innerHTML = '';
    Favoritos.forEach(element =>{
        let ItemProduto = document.createElement('div')
        ItemProduto.textContent = `${element.nome} -- R$ ${element.preco}`
        itensFavoritos.appendChild(ItemProduto)
    })
}


if(window.location.pathname.includes("Favoritos.html")){
    carregarFavoritos();
}




function limparFavoritos(){
    localStorage.clear()
    carregarFavoritos();
}