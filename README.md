# knights service

Um simples `microserviço` para gerencia o cadastro de cavaleiros e suas informções
Esta ferramenta foi desenvolvida com Node

## Dependências
- Node.js LTS
- Inversify
- Mongoose
- Docker

## Instalação para o uso local
Para instalar a ferramenta em sua máquina, basta realizar o clone deste repositório.<br>

Em um diretorio de sua escolha execute o comando de clone do repositório:
```bash
git clone git@github.com:an-gabriel/server.git
```

Após clonar o projeto, entre no diretório `server` e execute o arquivo de `npm install`.<br>
Abaixo é possível visualizar o comando de execução do arquivo de setup:

```bash
cd ~/server && npm install
```

Para realizar o login é necessario passar no body da requisição `username` e `password` conforme exemplo abaixo:

## Instalação para o com docker

Para instalar o `service` para utilizar com docker, basta realizar o clone deste repositório.<br>

Em um diretorio de sua escolha execute o comando de clone do repositório:
```bash
git clone git@github.com:an-gabriel/server.git
```

Após clonar o projeto, entre no diretório `server` e execute o arquivo de `npm install`.<br>
Abaixo é possível visualizar o comando de execução do arquivo de setup:

```bash
cd ~/server && npm install
```

Depois de instaladas todas as dependencias, execute o comando para realizar o build da aplicação via docker:

```bash
docker-compose build
```

quando finalizar o processo de build, basta executar o comando abaixo para iniciar o conteiner criado:

```bash
docker-compose up
```


>___IMPORTANTE___: Para execução das rotas, está disponivel no projeto a pasta postman, basta baixar a colection e a env para utilizar.

ps : Lembrei que preciso colocar o .env, geralmente utilizaria o secrets manager da aws para segurar variaveis de ambiente. 
