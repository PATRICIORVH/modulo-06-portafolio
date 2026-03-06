const express = require('express');
const path = require('path');
const { promises: fs } = require('fs');
const { v4: uuidv4 } = require('uuid');

const app = express();
const PORT = 3000;

// rutas de archivos JSON
const DATA_DIR = path.join(__dirname, 'data');
const FILE_PROD = path.join(DATA_DIR, 'productos.json');
const FILE_VENT = path.join(DATA_DIR, 'ventas.json');

// middlewares
app.use(express.json());
app.use(express.static(path.join(__dirname, 'public')));

// funciones para leer y escribir archivos JSON
const leerJson = async (file) => {
  const data = await fs.readFile(file, 'utf-8');
  return JSON.parse(data);
};

const escribirJson = async (file, data) => {
  await fs.writeFile(file, JSON.stringify(data, null, 2), 'utf-8');
};

// ruta principal
app.get('/', (req, res) => {
  res.send("API Backend funcionando");
});

// GET /productos
app.get('/productos', async (req, res) => {

  try {

    const productos = await leerJson(FILE_PROD);

    res.status(200).json(productos);

  } catch (error) {

    res.status(500).json({ error: 'Error al leer productos' });

  }

});

// POST /producto
app.post('/producto', async (req, res) => {

  try {

    const { nombre, precio, stock } = req.body;

    // validar datos
    if (!nombre || precio == null || stock == null) {
      return res.status(400).json({ error: 'Datos incompletos' });
    }

    const productos = await leerJson(FILE_PROD);

    const nuevoProducto = {
      id: uuidv4(),
      nombre,
      precio,
      stock
    };

    productos.push(nuevoProducto);

    await escribirJson(FILE_PROD, productos);

    res.status(201).json(nuevoProducto);

  } catch (error) {

    res.status(500).json({ error: 'Error al crear producto' });

  }

});

// PUT /producto
app.put('/producto', async (req, res) => {

  try {

    const { id, nombre, precio, stock } = req.body;

    if (!id) {
      return res.status(400).json({ error: 'ID del producto requerido' });
    }

    const productos = await leerJson(FILE_PROD);

    const index = productos.findIndex(p => p.id === id);

    if (index === -1) {
      return res.status(404).json({ error: 'Producto no encontrado' });
    }

    // actualizar datos
    if (nombre !== undefined) productos[index].nombre = nombre;
    if (precio !== undefined) productos[index].precio = precio;
    if (stock !== undefined) productos[index].stock = stock;

    await escribirJson(FILE_PROD, productos);

    res.status(200).json(productos[index]);

  } catch (error) {

    res.status(500).json({ error: 'Error al actualizar producto' });

  }

});

// DELETE /producto
app.delete('/producto', async (req, res) => {

  try {

    const { id } = req.body;

    if (!id) {
      return res.status(400).json({ error: 'ID del producto requerido' });
    }

    const productos = await leerJson(FILE_PROD);

    const index = productos.findIndex(p => p.id === id);

    if (index === -1) {
      return res.status(404).json({ error: 'Producto no encontrado' });
    }

    const productoEliminado = productos.splice(index, 1);

    await escribirJson(FILE_PROD, productos);

    res.status(200).json({
      mensaje: 'Producto eliminado',
      producto: productoEliminado
    });

  } catch (error) {

    res.status(500).json({ error: 'Error al eliminar producto' });

  }

});

// POST /venta
app.post('/venta', async (req, res) => {

  try {

    const { idProducto, cantidad } = req.body;

    if (!idProducto || !cantidad) {
      return res.status(400).json({ error: 'Datos incompletos' });
    }

    const productos = await leerJson(FILE_PROD);
    const ventas = await leerJson(FILE_VENT);

    const producto = productos.find(p => p.id === idProducto);

    if (!producto) {
      return res.status(404).json({ error: 'Producto no encontrado' });
    }

    if (producto.stock < cantidad) {
      return res.status(409).json({ error: 'Stock insuficiente' });
    }

    // calcular total
    const total = producto.precio * cantidad;

    const nuevaVenta = {
      id: uuidv4(),
      producto: producto.nombre,
      precio: producto.precio,
      cantidad,
      total,
      fecha: new Date().toISOString()
    };

    // descontar stock
    producto.stock -= cantidad;

    ventas.push(nuevaVenta);

    await escribirJson(FILE_PROD, productos);
    await escribirJson(FILE_VENT, ventas);

    res.status(201).json(nuevaVenta);

  } catch (error) {

    res.status(500).json({ error: 'Error al registrar venta' });

  }

});

// GET /ventas
app.get('/ventas', async (req, res) => {

  try {

    const ventas = await leerJson(FILE_VENT);

    res.status(200).json(ventas);

  } catch (error) {

    res.status(500).json({ error: 'Error al leer ventas' });

  }

});

// iniciar servidor
app.listen(PORT, () => {
  console.log(`Servidor corriendo en http://localhost:${PORT}`);
});