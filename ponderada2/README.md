## Getting Started

Para clonar o projeto em sua máquina

```bash
git clone https://github.com/jacksonwsaguiar/Questoes-Trabalho-Inteli-M7.git
cd Questoes-Trabalho-Inteli-M7
```
## Docker Imagens
Para obter as imagens:
```bash
docker pull jacksonaguiar/image
```
### Images disponiveis

-backend: https://hub.docker.com/repository/docker/jacksonaguiar/backend-image
-frontend: https://hub.docker.com/repository/docker/jacksonaguiar/frontend-image
## Iniciando os containers
docker-compose up -d

-d: modo detach, após execução dos containers o terminal é liberado.

## Arquitetura
A aplicação é projetada com uma arquitetura de microsserviços, composta pelos seguintes componentes:

Frontend: Interfaces web login e home desenvolvidas com HTML, CSS e JavaScript. Um servidor nginx é usado para executar a aplicação.
Back-end: Um servidor Node.js responsável pela manipulação da API e pelas interações do banco de dados.
Banco de dados: Um banco de dados PostgreSQL usado para armazenar informações como credenciais de login e tasks do usuário.
Essa arquitetura foi escolhida para aprimorar a escalabilidade, separar preocupações e encapsular a funcionalidade em contêineres isolados, assim facilita a manutenção da aplicação, além de um serviço não atrapalhar o outro.
# Estrutura do projeto
ponderada2/
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
