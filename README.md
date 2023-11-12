# ghost_TSDC

Para el uso de los escenarios de pruebas se utilizo la version de Ghost 5.68.0 en las ventanas de administración.

## Integrantes Equipo 04
- Andres Clavijo Rodriguez
- Wilson Andres Alarcon Cuchigay
- Fabio Camilo López Castellanos

## Inicio Escenarios de prueba Cypress

1. Descargue o clone e repositorio
2. Con una terminal o una ventana de comandos diríjase a la carpeta EscenariosCypress
3. Inserte el comando `npm install`
4. por favor cambie en el archivo *cypress.config.js* el usuario y la contraseña por un usuario valido en su ambiente Ghost
5. por favor cambie en el archivo *cypress.config.js* la url que dirige a la pagina de Ghost como se ve en el ejemplo
6. Cuando termine la instalación de dependencias inserte el comando `npm run cypress:run` o si quiere abrir el proyecto en una ventana de Cypress inserte el comando npm `run cypress:open`

## Inicio de escenarios de Kraken

## Requisitos previos

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
