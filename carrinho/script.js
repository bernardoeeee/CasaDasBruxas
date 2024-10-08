function carregarCarrinho(){
    let carrinho = JSON.parse(localStorage.getItem("carrinho")) || []

    let itensCarrinho = document.querySelector("#itensCarrinho");
    let valorTotal = 0;

    itensCarrinho.innerHTML = '';
    carrinho.forEach(element =>{
        let ItemProduto = document.createElement('div')
        ItemProduto.textContent = `${element.nome} - ${element.quantidade} x R$ ${element.preco}`
        itensCarrinho.appendChild(ItemProduto)

        valorTotal += (element.quantidade * element.preco)
    })

    document.querySelector("#valorTotal").textContent = valorTotal
}


if(window.location.pathname.includes("carrinho.html")){
    carregarCarrinho();
}




function limparCarrinho(){
    localStorage.clear()
    carregarCarrinho();
}