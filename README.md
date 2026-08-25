<p align="center">
  <a href="http://nestjs.com/" target="blank"><img src="https://nestjs.com/img/logo-small.svg" width="120" alt="Nest Logo" /></a>
</p>

# Ejecutar en desarrollo
1. Clonar el repositorio
2. Instalar dependencias
```
yarn install
```
3. Tener Nest CLI instalado
```
npm i -g @nestjs/cli
```
4. Crear el archivo de entorno
```
cp .env.example .env
```
5. Levantar la base de datos
```
docker-compose up -d
```
6. Iniciar la app
```
yarn start:dev
```

## Stack usado
* MongoDB
* Nest