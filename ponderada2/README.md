## Getting Started

1. Clone this repository to your local machine.

```bash
git clone https://github.com/your-username/your-repo.git
cd your-repo
```

## Iniciando os containers
docker-compose up -d

## Arquitetura
A aplicação é projetada com uma arquitetura de microsserviços, composta pelos seguintes componentes:

Frontend: Interfaces web login e homem desenvolvidas com HTML, CSS e JavaScript.
Back-end: Um servidor Node.js responsável pela manipulação da API e pelas interações do banco de dados.
Banco de dados: Um banco de dados PostgreSQL usado para armazenar informações e tasks do usuário.
Essa arquitetura foi escolhida para aprimorar a escalabilidade, separar preocupações e encapsular a funcionalidade em contêineres isolados.
# Estrutura do projeto
my-dockerized-app/
├── database/
│   ├── Dockerfile
├── frontend/
│   ├── Dockerfile
│   ├── login
│   ├── home
│   └── ...
├── backend/
│   ├── Dockerfile
│   ├── app.js
│   ├── package.json
│   └── ...
├── docker-compose.yml
└── README.md
