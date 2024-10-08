# CasaDasBruxas

<h2>Tabelas do MySQL</h2>


````
CREATE DATABASE CasaDasBruxas;
USE CasaDasBruxas;
````
<h2>Aqui é feito a tabela de cadastro</h2>

````
CREATE TABLE cadastro (
    id_usuario INT AUTO_INCREMENT PRIMARY KEY,
    DataNascimento DATE NOT NULL,
    email VARCHAR(500) NOT NULL UNIQUE,
    NomeCompleto VARCHAR(255) NOT NULL,
    senha VARCHAR(255) NOT NULL UNIQUE,
    perfil enum('admin', 'usuario') default('usuario')
);
````
<h3>Armazena as informações dos usuários cadastrados na plataforma. Cada user possui um "id_usuario", "DataNascimento", "email", "NomeCompleto" e "senha". Os e-mails e as senhas são únicos, para não ter contas iguais. O perfil serve para quando os usuarios criados pelo site serem 'usuarios' e nao poderem adicionar produtos na loja.</h3>

<h2>Aqui é feito a tabela de produtos</h2>

````
CREATE TABLE produtos (
    id_produto INT AUTO_INCREMENT PRIMARY KEY,
    nomeProduto VARCHAR(255) NOT NULL UNIQUE,
    preco FLOAT,
    descricao VARCHAR(1000) NOT NULl,
    image text
);
````
<h3>Tem os itens para comprar na plataforma. Cada produto tem um "id_produto", um "nomeProduto", um "preco", e uma "descricao" sobre o item e a imagem do item. O nome do produto é único para não ter duplicados.</h3>

<h2>Aqui é feito a tabela de carrinho</h2>

````
CREATE TABLE carrinho (
    preco_total FLOAT,
    id_produto INT,
    id_usuario INT,
    id_carrinho INT AUTO_INCREMENT PRIMARY KEY,
    FOREIGN KEY (id_produto) REFERENCES produtos(id_produto),
    FOREIGN KEY (id_usuario) REFERENCES cadastro(id_usuario)
);
````
<h3>Adiciona produtos aos usuários, mostrando os itens que cada usuário adicionou ao carrinho de compras. Inclui o "preco_total" dos produtos no carrinho, e também chaves estrangeiras (id_produto e id_usuario) para os produtos e usuários correspondentes.</h3>

<h2>Aqui é feito a tabela de login</h2>

````
CREATE TABLE loggin (
    email VARCHAR(255) NOT NULL UNIQUE,
    senha VARCHAR(255) NOT NULL UNIQUE,
    FOREIGN KEY (email) REFERENCES cadastro(email),
    FOREIGN KEY (senha) REFERENCES cadastro(senha)
);
````
<h3>Armazena os dados de login dos usuários, somente os campos email e senha. As duas colunas são únicas e têm restrições de chave estrangeira para garantir que o e-mail e a senha sejam iguais às informações armazenadas na tabela cadastro, sendo mais seguro para o login.</h3>

<h2>Inserir dados para teste:</h2>

````
INSERT INTO cadastro (DataNascimento, email, NomeCompleto, senha) VALUES ("2004-06-02", "bvfleck273@gmail.com", "Bernardo Varisco", "112358", "admin");

INSERT INTO produtos (nomeProduto, preco, descricao) VALUES ("VenenoDeAranha", 68.00, "Veneno letal extraído de aranhas raras.");

INSERT INTO loggin(email, senha) VALUES();
````
<h2>Rodar no servidor:</h2>
No terminal aplique:
"npm start"
O servidor deve iniciar na porta escolhida(3002) com o Mysql conectado.

<h3>Criando um JS para as rotas:</h3>
<h2>Crie um arquivo "server.js"</h2>

````
const express = require('express');
const cors = require('cors');
//definir a porta
const porta = 3002;
const app = express();
//habilitar o cors e utilizar json
app.use(cors());
app.use(express.json());
//testar
app.listen(porta, () => console.log(`rodando na porta` + porta));

const connection = require('./db_config.js');
const upload = require('./multer.js'); 

````
<h3>Aplique as rotas</h3>

````
--ESTA ROTA SERVE PARA CADASTRAR PRODUTOS AO SITE--
app.post('/produtos/cadastrar', upload.single('file'), (request, response) => {
       
    let params = Array(
        request.body.nomeProduto,
        request.body.preco,
        request.body.descricao,
        request.file.filename
    )
    console.log(params);
    
    let query = "INSERT INTO produtos(nomeProduto, preco, descricao, image) VALUES(?,?,?,?)";
    connection.query(query, params, (err, results) => {
        if (results) {
            response
                .status(200)
                .json({
                    success: true,
                    message: "sucesso",
                    data: results
                })
        } else {
            response
                .status(400)
                .json({
                    success: false,
                    message: "sem sucesso",
                    data: err
                })
        }
    })
});
````
<h3>Testar as API's:</h3>
<h2>Login do usuario:</h2>

````
app.post('/login', (request, response) => {
    let params = Array(
        request.body.email
    );
   
    let query = "SELECT id_usuario,NomeCompleto,email,senha,perfil FROM cadastro WHERE email = ?";
    connection.query(query, params, (err, results) => {
        if (results.length > 0) {
            let senhaDigitada = request.body.senha;
            let senhaBanco = results[0].senha;

            if (senhaBanco == senhaDigitada) {
                response
                    .status(201)
                    .json({
                        success: true,
                        message: "sucesso",
                        data: results[0]
                    })
            }
        } else {
            response
                .status(400)
                .json({
                    success: false,
                    message: "sem sucesso",
                    data: err
                })

        }
    })
});
````

<h1>Paginas criadas</h1>
<p>Criei novas paginas, como, Login.html, serve para entrar no login do usuarios ja cadastrado (Utilizo a rota que foi disponibilizada acima). Tambem criei uma pagina de favoritar produtos(mesmo sistema utilizado na pagina de carrinho). Criei uma pagina de ADM_produtos.html, onde apenas os admnistradores podem adicionar produtos no site, funciona a partir do localStorage.</p>  

<h1>Codigo do Multer.js</h1>

````
const multer = require('multer')

let storage = multer.diskStorage({
    destination: function (req, file, cb) {
        return cb(null, "./src/public")
    },
    filename: function (req, file, cb) {
        let nome_sem_espaco = file.originalname.trim()
        let nome_array = nome_sem_espaco.split(' ')
        let nome_com_underline = nome_array.join('_')
        return cb(null, `${Date.now()}_${nome_com_underline}}`)
    }
})

let upload = multer({
    storage: storage,
    limits: { fileSize: 10 * 1024 * 1024 }
})

module.exports = upload;

````
<p>Este codigo faz a imagem com os espaços nao ir com espaço para o localstorage e sim com underline.</p>
