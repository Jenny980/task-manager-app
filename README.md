# task-manager-app
Aplicación móvil híbrida desarrollada con Ionic y Angular, diseñada para gestionar una lista de tareas (To-Do List). Permite agregar, completar, eliminar y categorizar tareas, con almacenamiento local y configuración de funcionalidades mediante Firebase Remote Config. 

## Tecnologías utilizadas

- Ionic 7  
- Angular 17  
- Capacitor  
- Firebase Remote Config  
- LocalStorage (almacenamiento local)  
- UUID  

## Funcionalidades

- Agregar tareas con título y categoría  
- Completar y eliminar tareas  
- Filtrar tareas por categoría (si la opción está habilitada por Remote Config)  
- Persistencia local usando `localStorage`  
- Compatible con Android e iOS  
- Uso de feature flag con Firebase Remote Config  

## Ejecución de proyecto

npm install
ionic build
npx cap sync
npx cap copy

## Ejecutar en Android

npx cap open android

## Ejecutar en IOS

npx cap open ios

## El sistema de filtrado por categoría depende de un flag remoto:

remoteConfig.getBoolean('filter_enabled');

