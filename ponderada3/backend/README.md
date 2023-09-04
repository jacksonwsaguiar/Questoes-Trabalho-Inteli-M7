# FastAPI e ML - Jackson Aguiar

## Descrição

A API possui uma rota chamada /consulta-score que permite aos usuários consultar seu "score" com base em dois campos enviados: "idade" e "renda". Essa rota é alimentada por um modelo de Machine Learning previamente treinado com dados históricos de crédito.

O modelo foi escolhido devido à sua capacidade de prever com precisão o risco de inadimplência com base na idade e na renda anual do cliente. Durante o treinamento, o modelo aprendeu a identificar padrões e correlações nos dados, tornando-o capaz de estimar o "score" de crédito de um cliente com base nessas informações.

Quando um cliente faz uma solicitação através da rota /get-score, ele fornece sua idade e renda anual como parâmetros. A API então utiliza o modelo treinado para realizar uma previsão, retornando um valor numérico que representa o "score" de crédito estimado do cliente. Esse "score" pode ser usado por instituições financeiras para tomar decisões de concessão de crédito.

A API fornece uma maneira rápida e conveniente para os clientes obterem uma estimativa do seu "score" de crédito com base na idade e seu rendimento.

### Rotas

```bash
POST: /get-score
```

### Paramentros de entrada

- Enviar no corpo da requisição json:

```bash
  age: float,
  income: float
```

### Resposta

- Qual será seu score conforme os dados enviados.

```bash
   score: float
```
## Imagem Docker

A imagem Docker para esta aplicação está disponível no Docker Hub. Você pode encontrá-la em [Link para o Docker Hub](https://hub.docker.com/r/jacksonaguiar/fastapiml).

```bash
   docker pull jacksonaguiar/fastapiml
```
- Em seguida
```bash
   docker run -p 8000:80 jacksonaguiar/fastapiml
```
## Machine Learnig

Foi escolhido o modelo Adaboost para este projeto a pós testes em diferentes modelos de regressão e classificação, o modelo que testa pequenas hipoteses para balancear seus pesos, foi o que melhor performou, atingindo até 47 % de acuracia.

## Como Executar a Aplicação

Para executar a aplicação, certifique-se de que o Docker já está instalado no seu sistema. Em seguida, siga estas etapas:

1. Clone este repositório para o seu sistema local:

   ```bash
   git clone https://github.com/jacksonwsaguiar/Questoes-Trabalho-Inteli-M7/
   cd Questoes-Trabalho-Inteli-M7/ponderada3
   ```

2. Execute a aplicação

```bash
   uvicorn main:app --host 0.0.0.0 --port 8000
```
