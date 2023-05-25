@ECHO OFF
ECHO subiendo server nuwwe.pp.

@REM cd D:/#Usuario/Documents/docker_proyect/laradock-nuwwe 
cd C:/Users/Carlos A. Chacon/docker_proyect/laradock-nuwwe

docker-compose up -d nginx mysql ssms-sockets

cd C:/Users/Carlos A. Chacon/docker_proyect/nuwwe
REM PAUSE