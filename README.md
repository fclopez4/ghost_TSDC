# Ghost CMS TSDC

Para el uso de los escenarios de pruebas se utilizo la version de Ghost 5.68.0 en las ventanas de administración.

## Integrantes Equipo 04
|Nombre|Correo|
|-|-|
|Andres Clavijo Rodriguez|a.clavijo1@uniandes.edu.co|
|Wilson Andres Alarcon Cuchigay|w.alarconc@uniandes.edu.co|
|Fabio Camilo López Castellanos|fc.lopez@uniandes.edu.co|

# Pruebas VRT

## Ejecución 30 Escenarios de prueba

### Requisitos previos Cypress
1. Instalar **Ghost CMS v5.68.0**, esta acción puede realizarse utilizando un contenedor docker
    ``````
    docker pull ghost:5.68.0
    docker run -d --name current-ghost -e NODE_ENV=development -e url=http://localhost:3001 -p 3001:2368 ghost:5.68.0
    ``````
2. Descargar o clonar este repositorio
3. Con una terminal o una ventana de comandos diríjase a la ruta  **GHOST_TSDC/EscenariosVRT/Version_ghost_5.68.0**
4. Inserte el comando `npm install`
5. En el archivo *cypress.config.js* cambie la url que dirige a la pagina de Ghost como se ve en el ejemplo
6. En el archivo *cypress.config.js* cambie el usuario y la contraseña por un usuario valido en su ambiente Ghost

### Ejecución Cypress
1. Para ejecutar los escenarios de pruebas inserte el comando `npm run cypress:run`
2. Para abrir el proyecto en una ventana de Cypress inserte el comando `npm run cypress:open`

### Requisitos previos Kraken
1. Instalar Android SDK (ADB and AAPT configurado)
3. Instalar NodeJS (Version >= 12)
4. Instalar Java 11 JDK
5. Instalar appium *En forma global* usando comando `npm install -g appium`
6. Instalar Kraken *En forma global* `npm install kraken-node -g`
7. Instalar **Ghost CMS v5.68.0**, esta acción puede realizarse utilizando un contenedor docker
    ``````
    docker pull ghost:5.68.0
    docker run -d --name current-ghost -e NODE_ENV=development -e url=http://localhost:3001 -p 3001:2368 ghost:5.68.0
    ``````
8. Descargar o clonar este repositorio
9. Con una terminal o una ventana de comandos diríjase a la ruta  **GHOST_TSDC/EscenariosVRT/Escenarios Kraken**
10. Inserte el comando `npm install`
11. En el archivo *properties.json* cambie el usuario y la contraseña por un usuario valido en su ambiente Ghost

### Ejecución Kraken
1. Para ejecutar los escenarios de pruebas en windows inserte el comando `npm run krakenTest`
2. Para ejecutar los escenarios de pruebas en unix inserte el comando `npm run run-kraken`


## Ejecución 10 Escenarios de prueba

### Requisitos previos
1. Instalar **Ghost CMS v5.0.0**, esta acción puede realizarse utilizando un contenedor docker
    ``````
    docker pull ghost:5.0.0
    docker run -d --name current-ghost -e NODE_ENV=development -e url=http://localhost:3002 -p 3002:2368 ghost:5.0.0
    ``````
2. Descargar o clonar este repositorio
3. Con una terminal o una ventana de comandos diríjase a la ruta  **GHOST_TSDC/EscenariosVRT/Version_ghost_5.0.0**
4. Inserte el comando `npm install`
5. En el archivo *cypress.config.js* cambie la url que dirige a la pagina de Ghost como se ve en el ejemplo
6. En el archivo *cypress.config.js* cambie el usuario y la contraseña por un usuario valido en su ambiente Ghost

### Ejecución Cypress
1. Para ejecutar los escenarios de pruebas inserte el comando `npm run cypress:run`
2. Para abrir el proyecto en una ventana de Cypress inserte el comando `npm run cypress:open`


# Pruebas E2E

## Inicio Escenarios de prueba Cypress

### Requisitos previos 

1. Descargue o clone e repositorio
2. Con una terminal o una ventana de comandos diríjase a la carpeta EscenariosCypress
3. Inserte el comando `npm install`
4. por favor cambie en el archivo *cypress.config.js* el usuario y la contraseña por un usuario valido en su ambiente Ghost
5. por favor cambie en el archivo *cypress.config.js* la url que dirige a la pagina de Ghost como se ve en el ejemplo
6. Cuando termine la instalación de dependencias inserte el comando `npm run cypress:run` o si quiere abrir el proyecto en una ventana de Cypress inserte el comando `npm run cypress:open`

## Inicio de escenarios de Kraken

### Requisitos previos

Para la instalación de Kraken debe tener preconfigurado las siguientes herramientas

1. Android SDK (ADB and AAPT configurado)
2. Appium
3. NodeJS (Version >= 12)
4. Java
5. appium *En forma global* usando comando `npm install -g appium`
6. Kraken *En forma global* `npm install kraken-node -g`

## Ejecución de escenarios

1. Con una terminal o una ventana de comandos diríjase a la carpeta EscenariosKraken
2. Inserte el comando `npm install`
3. En el archivo *properties.json* cambie el usuario y la contraseña por un usuario valido en su ambiente Ghost
