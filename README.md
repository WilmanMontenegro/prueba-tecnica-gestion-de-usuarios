# Despliegue del Proyecto

Este proyecto consta de dos partes: el FrontEnd y el BackEnd. Ambos necesitan ser desplegados para que la aplicación funcione correctamente.

## Configuración de la conexión a la base de datos

Este proyecto se conecta a una base de datos MySQL en `localhost` con el usuario `root` y sin contraseña. Asegúrate de tener MySQL instalado y configurado correctamente en tu máquina antes de intentar desplegar este proyecto.

Si necesitas cambiar la configuración de la conexión a la base de datos, puedes hacerlo modificando las siguientes líneas en el archivo `dataBase.js`:

```javascript
const config = {
    host: 'localhost',
    user: 'root',
    password: ''
}; 
```

## Despliegue del BackEnd

1. Navega a la carpeta `BackEnd` con el comando `cd BackEnd`.
2. Instala las dependencias con el comando `npm install`.
3. Inicia el servidor con el comando `node main`. El servidor debería estar corriendo en `http://localhost:5000`.

## Despliegue del FrontEnd

1. Navega a la carpeta `FrontEnd` con el comando `cd FrontEnd`.
2. Instala las dependencias con el comando `npm install`.
3. Inicia la aplicación con el comando `npm start`. La aplicación debería estar corriendo en `http://localhost:3000`.

Recuerda que necesitas tener Node.js y npm instalados en tu máquina para poder desplegar este proyecto.

# Prueba de la Aplicación

Una vez que hayas desplegado tanto el FrontEnd como el BackEnd, puedes probar la aplicación navegando a `http://localhost:3000` en tu navegador web. Esto te llevará a la interfaz de usuario de la aplicación, donde podrás interactuar con ella y ver cómo funciona.