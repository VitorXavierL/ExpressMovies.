# ExpressMovies API - Core

Este é o backend da aplicação ExpressMovies, responsável pela lógica de negócio e persistência de dados.

## Proposta

Esta API RESTful permite realizar operações de CRUD (Criar, Ler, Atualizar, Deletar) para uma entidade de filmes e diretor. Ela foi construída com Flask e utiliza um banco de dados SQLite para armazenar os dados.

## Stack de Tecnologias

- **Linguagem:** Python
- **Framework:** Flask
- **ORM:** SQLAlchemy com Flask-SQLAlchemy
- **Banco de Dados:** SQLite

## Como Rodar o Projeto

**Pré-requisitos:** Python 3.9+ e `pip` instalados.

1.  **Clone o repositório:**
    ```bash
    git clone <url-desse-repositorio>
    cd ExpressMovies
    ```

2.  **Crie e ative um ambiente virtual:**
    ```bash
    # No Windows
    python -m venv .venv
    .venv\Scripts\activate

    # No macOS/Linux
    python -m venv .venv
    source .venv/bin/activate
    ```

3.  **Instale as dependências:**
    ```bash
    pip install -r requirements.txt
    ```

4.  **Configure o Flask CLI para reconhecer a aplicação:**
    ```bash
    # No Windows
    set FLASK_APP=run.py

    # No macOS/Linux
    export FLASK_APP=run.py
    ```

5.  **Crie o banco de dados e suas tabelas:**
    *Este comando deve ser executado apenas na primeira vez que você configurar o projeto.*
    ```bash
    flask create-db
    ```

6.  **Inicie o servidor de desenvolvimento:**
    ```bash
    flask run
    ```

A API estará rodando e pronta para receber requisições em `http://127.0.0.1:5000`. Use ferramentas como Postman ou Insomnia para testar os endpoints.

## FrontEnd
A parte do frontend do projeto foi feito usando a biblioteca React, que permite criar interfaces de usuário, onde cada funcionalidade da aplicação foi dividida.

## Como rodar o front
``` bash
    cd 'frontend(vite)'
    npm install
    npm run dev
``` 
O link indicado será `localhost:5173` , basta apertar 'ctrl' e clicar que ele direcionará para o navegador, onde estará rodando a parte do frontend.
