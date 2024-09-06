FROM python:3.11.4-slim-buster

WORKDIR /usr/src/cinema

ENV PYTHONDONTWRITEBYTECODE 1
ENV PYTHONUNBUFFERED 1

RUN apt-get update && apt-get install -y \
    build-essential \
    libsqlite3-dev \
    wget \
    && wget https://sqlite.org/2023/sqlite-autoconf-3410200.tar.gz \
    && tar xzf sqlite-autoconf-3410200.tar.gz \
    && cd sqlite-autoconf-3410200 \
    && ./configure --prefix=/usr \
    && make && make install

RUN pip install --upgrade pip
COPY ./requirements.txt .
RUN pip install -r requirements.txt

COPY . .
