FROM python:3.9

RUN pip install Flask

WORKDIR /app

COPY ./requirements.txt /app/requirements.txt

RUN pip install --no-cache-dir --upgrade -r /app/requirements.txt

COPY ./src /app

CMD ["python", "main.py"]