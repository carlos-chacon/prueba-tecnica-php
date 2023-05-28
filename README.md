# Prueba práctica php

_Realizar un microservicio que consulte la humedad de las ciudades Miami,
Orlando y New York. Para esto se debe crear un sitio web donde se muestre
por medio de un mapa el resultado del microservicio, adicionalmente se
debe almacenar en un historial que se pueda consultar a través de un link
en la página._

## Comenzando 🚀

_Estas instrucciones te permitirán obtener una copia del proyecto en funcionamiento en tu máquina local para propósitos de desarrollo y pruebas._

_Puedes empezar clonando el proyecto con el siguiente comando._

```
git clone git@github.com:carlos-chacon/prueba-tecnica-php.git
```

_Esta aplicación esta construida, en el backend con php (Laravel Lumen) y en el frontend con Angular_


## Pre-requisitos 📋

- [Docker](https://www.docker.com/)
- [Node.js](https://nodejs.org/en/download/)
- [Angular CLI](https://angular.io/cli/)


## Instalación 🔧

_Para la instalación del proyecto y después de haber clonado el repositorio seguiremos los siguientes pasos:_

### Backend php
#### Usando Contenedor Docker:

- _Nos ubicamos en el directorio backend/docker_

```bash
cd backend/docker/
```

- _Creamos una copia del archivos de variables docker_

```sh
cp .env.example .env
```

- _Poner en marcha los contenedor docker. Se levantaran los contenedores php, nginx y el espacio de trabajo donde esta el código php_

```sh
docker-compose up -d nginx mysql
```

#### Instalación y configuración proyecto php (Laravel Lumen):

- _Estando en el directorio backend/docker/ ejecutamos los siguiente comandos:_

```sh
docker-compose exec workspace bash
```

- _Dentro del shell, ejecutamos los siguientes comandos:_
```sh
cp .env.example .env
```
```sh
composer install
```
```sh
php artisan migrate
```

- _Después de realizar los pasos anterior los servicios (php) quedan expuestos en **http://localhost** ._
    _Existen dos servicios:_
    1. _Obtener la humedad de una ciudad por medio de las coordenadas (latitud, longitud): **http://localhost/api/v1/ciudades/obtener-humedad/{lat}/{long}**_
    2. _Mostrar el historial de consultas de humedad por ciudad: **http://localhost/api/v1/ciudades/weather-log?page={numPage}&q={textoBuscar}**_


_Nota: para el servicio "obtener humedad" se utiliza la api **https://openweathermap.org/api/one-call-3**, de debe colocar la api key en el archivo .env que esta en el directorio backend._
```sh
...

API_KEY_OPEN_WEATHER_MAP=
```

### Frontend Angular

_Nos ubicamos en el directorio frontend del raíz del proyecto, y ejecutamos los siguientes comandos:_

```sh
cd frontend/
```
```sh
npm install
```

```sh
ng s --port=4201
```

_El sitio web queda expuesto en **http://localhost:4201**_

## Construido con 🛠️

* [Laravel Lumen](https://lumen.laravel.com/) - Framework php
* [Angular](https://maven.apache.org/) - Framework Javascript

## Autor ✒️


* **Carlos Chacón** - *Trabajo Inicial* - [carlos-chacon](https://github.com/carlos-chacon)

---

