function addToCart(nomeProduto, preco){
    //  JSON.parse(localStorage.getItem("carrinho")) se este codigo voltar vazio ele vai criar uma lista vazia no lugar {||[]}
    let carrinho = JSON.parse(localStorage.getItem("carrinho")) || [] 
    // este codigo busca no carrinho
    let elemento = carrinho.find(item => item.nome === nomeProduto)
    if(elemento){
        elemento.quantidade++;
    }else{
        carrinho.push({nome: nomeProduto, preco: preco, quantidade: 1})
    }

    localStorage.setItem("carrinho", JSON.stringify(carrinho));
}


async function addToFav(event) {
    event.preventDefault();


}

function addToFav(nomeProduto, preco){
    let Favoritos = JSON.parse(localStorage.getItem("Favoritar")) || [] 
    let elementoF = Favoritos.find(item => item.nome === nomeProduto)
    if(elementoF){
        elementoF.quantidade++;
    }else{
        Favoritos.push({nome: nomeProduto, preco: preco, quantidade: 1})
    }

    localStorage.setItem("Favoritar", JSON.stringify(Favoritos));
}