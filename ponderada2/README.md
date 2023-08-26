## Getting Started

Para clonar o projeto em sua máquina

```bash
git clone https://github.com/jacksonwsaguiar/Questoes-Trabalho-Inteli-M7.git
cd Questoes-Trabalho-Inteli-M7
```
## Docker Imagens

-backend: https://hub.docker.com/repository/docker/jacksonaguiar/backend-image
<br />
-frontend: https://hub.docker.com/repository/docker/jacksonaguiar/frontend-image
<br />

Para obter as imagens:
```bash
docker pull jacksonaguiar/image
```
## Iniciando os containers
docker-compose up -d

-d: modo detach, após execução dos containers o terminal é liberado.

## Arquitetura
A aplicação é projetada com uma arquitetura de microsserviços, composta pelos seguintes componentes:<br />

Frontend: Interfaces web login e home desenvolvidas com HTML, CSS e JavaScript. Um servidor nginx é usado para executar a aplicação.<br />
Back-end: Um servidor Node.js responsável pela manipulação da API e pelas interações do banco de dados.<br />
Banco de dados: Um banco de dados PostgreSQL usado para armazenar informações como credenciais de login e tasks do usuário.<br />
Essa arquitetura foi escolhida para aprimorar a escalabilidade, separar preocupações e encapsular a funcionalidade em contêineres isolados, assim facilita a manutenção da aplicação, além de um serviço não atrapalhar o outro.
# Estrutura do projeto
ponderada2/<br />
├── frontend/<br />
│   ├── Dockerfile<br />
│   ├── login<br />
│   ├── home<br />
│   └── ...<br />
├── backend/<br />
│   ├── Dockerfile<br />
│   ├── app.js<br />
│   ├── package.json<br />
│   └── ...<br />
├── docker-compose.yml<br />
└── README.md<br />
