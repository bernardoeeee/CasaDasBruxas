// JAVASCRIPT DO CADASTRO
async function cadastrar(event) {
    event.preventDefault();

    const DataNascimento = document.getElementById('data_nascimento').value;
    const email = document.getElementById('email').value;
    const NomeCompleto = document.getElementById('nome').value;
    const senha = document.getElementById('senha').value;

    const data = { DataNascimento, email, NomeCompleto, senha };
    console.log(data)

    const response = await fetch('http://localhost:3002/cadastro/cadastrar', {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(data)

    })

    console.log(response);

    const results = await response.json();
    console.log(results);

    if (results.success) {
        alert(results.message)
        localStorage.setItem('Informacoes', JSON.stringify(results.data))
        window.location.href = "./Login.html";
    } else {
        console.log(message)
    }
}

// JAVASCRIPT DO LOGIN

async function Login(event) {
    event.preventDefault();

    const email = document.getElementById('email_login').value;
    const senha = document.getElementById('senha_login').value;

    const data = { email, senha };


    const response = await fetch("http://localhost:3002/login", {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(data)
    })

    let results = await response.json()


    if (results.success) {
        let userData = results.data;
        localStorage.setItem('Informacoes', JSON.stringify(userData))


        alert(results.message)
        window.location.href = "../pagina_principal/index.html";
    } else {
        alert(results.message)
    }
}