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
composer install
```


_Finaliza con un ejemplo de cómo obtener datos del sistema o como usarlos para una pequeña demo_

## Ejecutando las pruebas ⚙️

_Explica como ejecutar las pruebas automatizadas para este sistema_

### Analice las pruebas end-to-end 🔩

_Explica que verifican estas pruebas y por qué_

```
Da un ejemplo
```

### Y las pruebas de estilo de codificación ⌨️

_Explica que verifican estas pruebas y por qué_

```
Da un ejemplo
```

## Despliegue 📦

_Agrega notas adicionales sobre como hacer deploy_

## Construido con 🛠️

_Menciona las herramientas que utilizaste para crear tu proyecto_

* [Dropwizard](http://www.dropwizard.io/1.0.2/docs/) - El framework web usado
* [Maven](https://maven.apache.org/) - Manejador de dependencias
* [ROME](https://rometools.github.io/rome/) - Usado para generar RSS

## Contribuyendo 🖇️

Por favor lee el [CONTRIBUTING.md](https://gist.github.com/villanuevand/xxxxxx) para detalles de nuestro código de conducta, y el proceso para enviarnos pull requests.

## Wiki 📖

Puedes encontrar mucho más de cómo utilizar este proyecto en nuestra [Wiki](https://github.com/tu/proyecto/wiki)

## Versionado 📌

Usamos [SemVer](http://semver.org/) para el versionado. Para todas las versiones disponibles, mira los [tags en este repositorio](https://github.com/tu/proyecto/tags).

## Autores ✒️

_Menciona a todos aquellos que ayudaron a levantar el proyecto desde sus inicios_

* **Andrés Villanueva** - *Trabajo Inicial* - [villanuevand](https://github.com/villanuevand)
* **Fulanito Detal** - *Documentación* - [fulanitodetal](#fulanito-de-tal)

También puedes mirar la lista de todos los [contribuyentes](https://github.com/your/project/contributors) quíenes han participado en este proyecto. 

## Licencia 📄

Este proyecto está bajo la Licencia (Tu Licencia) - mira el archivo [LICENSE.md](LICENSE.md) para detalles

## Expresiones de Gratitud 🎁

* Comenta a otros sobre este proyecto 📢
* Invita una cerveza 🍺 o un café ☕ a alguien del equipo. 
* Da las gracias públicamente 🤓.
* Dona con cripto a esta dirección: `0xf253fc233333078436d111175e5a76a649890000`
* etc.



---
⌨️ con ❤️ por [Villanuevand](https://github.com/Villanuevand) 😊

