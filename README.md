# Ejercicio Práctico - Desarrollo Portafolio Módulo 6: Backend REST con Node.js/Express, manejo de archivos (File System) y estados HTTP

En este portafolio se desarrolla un backend REST utilizando **Node.js y Express** que permite administrar productos y registrar ventas. Los datos se guardan en archivos **JSON** utilizando el módulo **File System (fs)**.

### El backend permite:

- registrar productos
- listar productos
- actualizar productos
- eliminar productos
- registrar ventas
- consultar ventas

Además se creó una pequeña interfaz web para probar el sistema desde el navegador.



## Paso 1 – Inicializar proyecto Node

Primero se crea la carpeta del proyecto y se inicializa Node utilizando el comando:

npm init -y

### Luego se instalan las dependencias necesarias:

- express
- uuid
- nodemon

Estas librerías permiten crear el servidor, generar identificadores únicos y reiniciar el servidor automáticamente en desarrollo.

![Paso 1](img/01.1.iniciar-node.png)

![Paso 1](img/01.2.instalar-expressuuid.png)

![Paso 1](img/01.3.instalar-nodemon.png)

![Paso 1](img/01.4.configurar-script.png)



## Paso 2 – Crear archivos JSON

Se crea una carpeta llamada **data** donde se almacenan los archivos JSON que funcionan como base de datos.

### Se crean dos archivos:

- productos.json
- ventas.json

Ambos comienzan con un arreglo vacío.

![Paso 2](img/02.1.iniciar-json.png)

![Paso 2](img/02.2.iniciar-json.png)



## Paso 3 – Crear servidor con Express

Se crea el archivo **server.js** donde se configura el servidor Express.

También se configuran las funciones para leer y escribir archivos JSON utilizando el módulo **fs**.

![Paso 3](img/03.crear-servidor.png)



## Paso 4 – Crear endpoint GET /productos

Se implementa la ruta **GET /productos** que permite obtener todos los productos almacenados en el archivo productos.json.

Se prueba en el navegador para verificar que el servidor funciona correctamente.

![Paso 4](img/04.1.crear-get.png)

![Paso 4](img/04.3.reiniciar-servidor.png)

![Paso 4](img/04.4.probar-navegador.png)



## Paso 5 – Crear endpoint POST /producto

Se implementa la ruta **POST /producto** que permite registrar un nuevo producto.

Se utiliza la librería **uuid** para generar un identificador único para cada producto.

La prueba se realiza utilizando **Thunder Client**.

![Paso 5](img/05.1.crear-post.png)

![Paso 5](img/05.2.thunder-post.png)

![Paso 5](img/05.3.post-productos.png)

![Paso 5](img/05.4.post-navegador.png)



## Paso 6 – Crear endpoint PUT /producto

Se implementa la ruta **PUT /producto** para actualizar la información de un producto existente.

Se busca el producto por su ID y se actualizan sus datos.

![Paso 6](img/06.1.crear-put.png)

![Paso 6](img/06.2.thunder-put.png)

![Paso 6](img/06.3.productos-actualizado.png)



## Paso 7 – Crear endpoint DELETE /producto

Se implementa la ruta **DELETE /producto** que permite eliminar un producto del inventario.

La prueba se realiza nuevamente utilizando Thunder Client.

![Paso 7](img/07.1.crear-delete.png)

![Paso 7](img/07.2.thunder-delete.png)

![Paso 7](img/07.3.delete-navegador.png)



## Paso 8 – Crear endpoint POST /venta

Se implementa la ruta **POST /venta** que permite registrar una venta.

### Esta ruta realiza varias operaciones:

- verifica que el producto exista
- valida que exista stock suficiente
- calcula el total de la venta
- descuenta el stock del producto
- guarda la venta en ventas.json

![Paso 8](img/08.1.crear-postventa.png)

![Paso 8](img/08.2.thunder-producto.png)

![Paso 8](img/08.3.thunder-postventa.png)

![Paso 8](img/08.4.actualizacion-productos.png)



## Paso 9 – Crear endpoint GET /ventas

Se implementa la ruta **GET /ventas** que permite consultar todas las ventas registradas en el sistema.

![Paso 9](img/09.1.crear-getventas.png)

![Paso 9](img/09.2.probar-getventas.png)



## Paso 10 – Crear interfaz web simple

Finalmente se crea un archivo **index.html** dentro de la carpeta public.

### Esta página permite:

- ver productos
- realizar una compra
- registrar ventas desde el navegador

La interfaz se conecta al backend utilizando **fetch** para consumir la API REST.

![Paso 10](img/10.1.crear-indexhtml.png)

![Paso 10](img/10.2.probar-index.png)

![Paso 10](img/10.3.probar-index.png)

![Paso 10](img/10.4.probar-index.png)



## Archivos del proyecto

A continuación se describen los archivos principales del proyecto.

**server.js**: Archivo principal donde se configura el servidor Express y se implementan las rutas de la API.

**package.json**: Archivo de configuración del proyecto Node que contiene las dependencias instaladas.

**package-lock.json**: Archivo generado automáticamente por npm que guarda información de las versiones exactas de las dependencias.

**node_modules/**: Carpeta que contiene todas las librerías instaladas mediante npm.

**data/productos.json**: Archivo donde se almacenan los productos disponibles en el inventario.

**data/ventas.json**: Archivo donde se registran todas las ventas realizadas.

**public/index.html**: Página web simple que permite visualizar productos y registrar compras desde el navegador.

**img/**: Carpeta que contiene las imágenes utilizadas como evidencia del desarrollo paso a paso del portafolio.



## Autor

Patricio Valenzuela



## Repositorio GitHub

https://github.com/PATRICIORVH/modulo-06-portafolio