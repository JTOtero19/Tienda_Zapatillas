'use strict';

const producto$1 = document.getElementById('producto');
const productoImagen = producto$1.querySelector('.producto__imagen');
const thumbs = producto$1.querySelector('.producto__thumbs');

// Accediendo propiedad color
const propiedadColor = document.querySelector('#propiedad-color');

// referencias de la cantidad
const btnIncrementarCantidad = document.querySelector('#incrementar-cantidad');
const btnDisminuirCantidad = document.querySelector('#disminuir-cantidad');
const inputCantidad = document.querySelector('#cantidad');

// Funcionalidad thumbails
thumbs.addEventListener('click', (e) => {
  if (e.target.tagName === 'IMG'){

    // Accediendo a la ruta de la imagen
    const imagenSrc = e.target.src;

    // Obteniendo la ubicacion o posicion despues de la ultima '/'
    const lastIndex = imagenSrc.lastIndexOf('/');

    // Para cortar la ultima ubicacion
    const nombreImagen = imagenSrc.substring(lastIndex + 1);

    // Reemplaar por la imagen ppal
    productoImagen.src = `./img/tennis/${nombreImagen}`;
  }});

// Funcionalidad colores
propiedadColor.addEventListener('click', (e) => {
  if (e.target.tagName === 'INPUT') {
    productoImagen.src = `./img/tennis/${e.target.value}.jpg`;
  }});

// btn Agregar cantidad
btnIncrementarCantidad.addEventListener('click', (e) => {
  inputCantidad.value = parseInt(inputCantidad.value) + 1;
});

// btn Disminuir cantidad
btnDisminuirCantidad.addEventListener('click', (e) => {
  if (parseInt(inputCantidad.value) > 1) {
    inputCantidad.value = parseInt(inputCantidad.value) - 1;
  }
});

var data = {
  productos: [
    // Dentro de este objeto quiero guardar los productos. Producto 1
    {
      id: '1',
      nombre: 'Tennis Converse Standard.',
      descripcion: 'Tennis Converse unisex de calidad.',
      precio: 25000,
      colores: ['negro', 'rojo', 'amarillo'],
      tamaños: ['38', '38,5', '39', '39,5', '40', '41'],
    },

    // Para agregar otro producto agregamos esto mismo.
    {
      id: '2',
      nombre: 'Tennis Converse Pro.',
      descripcion: 'Tennis Converse unisex de calidad pro.',
      precio: 50000,
      colores: ['negro', 'rojo', 'amarillo'],
      tamaños: ['38', '38,5', '39', '39,5', '40', '41'],
    }
  ]
};

// tarer base de datos

const botonesAbrirCarrito = document.querySelectorAll('[data-accion="abrir-carrito"]');
const botonesCerrarCarrito = document.querySelectorAll('[data-accion="cerrar-carrito"]');
const ventanaCarrito = document.getElementById('carrito');
// Detetar click en carrito
const btnAgregarCarrito = document.getElementById('agregar-al-carrito');
// accediendo a la variable del producto general, acceder al contenedor del producto
const producto = document.getElementById('producto');
// Arreglo vacio para gaurdar info de productos, let apra poder sobreescribirlo
let carrito = [];
// API formatear moneda Intl es la internacioanlizacion de monedas
const formatearMoneda = new Intl.NumberFormat('es-MX', {style: 'currency', currency: 'CLP'});

/*
  Esta funcion se encargra de abrir el carrito y comprobar si hay o no productos en el carrito.
  Tambien la usaremos en varios bloques.
*/
const renderCarrito = () => {
  // Este modificador abriara la ventana.
  ventanaCarrito.classList.add('carrito--active');

  // Eliminar productos anteriores para construir el carrito desde cero
  const productosAnteriores = ventanaCarrito.querySelectorAll('.carrito__producto');
  productosAnteriores.forEach((producto) => producto.remove());

  // Total de los productos del carrito
  let total = 0;

  // Comprobar si hay productos en el carrito
  if (carrito.length < 1){
    // Ponemos la clase del carrito vacio
    ventanaCarrito.classList.add('carrito--vacio');
  } else {
    // Elminamos la calse del carrito vacio
    ventanaCarrito.classList.remove('carrito--vacio');

    // Iteramos sobre cada producto del carrito y lo mostramos
    carrito.forEach((productoCarrito) => {
      // Obtenemos el precio del archivo de producto.js
      // Cuando el id del item del carrito sea el mismo que alguno de la lista.
      data.productos.forEach((productoBaseDatos) => {
        if (productoBaseDatos.id === productoCarrito.id){
          productoCarrito.precio = productoBaseDatos.precio;

          // Trabajamos agregando el total de los productos aqui
          total += productoBaseDatos.precio * productoCarrito.cantidad;
        }      });

      // codigo para obtener la ruta de la foto de la zapatilla y que se pueda sobreescribir
      // de esta clase quiero el primer objeto, pero quiero su ruta.
      let thumbSrc = producto.querySelectorAll('.producto__thumb-img')[0].src;
      if (productoCarrito.color === 'rojo'){
        thumbSrc = './img/thumbs/rojo.jpg';
      } else if (productoCarrito.color === 'amarillo'){
        thumbSrc = './img/thumbs/amarillo.jpg';
      }
      // Creamos una plantilla del codigo HTML.
      const plantillaProducto = `
      <div class="carrito__producto-info">
        <img src="${thumbSrc}" alt="" class="carrito__thumb" />
        <div>
          <p class="carrito__producto-nombre">
            <span class="carrito__producto-cantidad">${productoCarrito.cantidad} x </span>${productoCarrito.nombre}
          </p>
          <p class="carrito__producto-propiedades">
            Tamaño:<span>${productoCarrito.tamaño}</span> Color:<span>${productoCarrito.color}</span>
          </p>
        </div>
      </div>
      <div class="carrito__producto-contenedor-precio">
        <button class="carrito__btn-eliminar-item" data-accion="eliminar-item-carrito">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="16"
            height="16"
            fill="currentColor"
            viewBox="0 0 16 16"
          >
            <path
              d="M2 0a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V2a2 2 0 0 0-2-2H2zm3.354 4.646L8 7.293l2.646-2.647a.5.5 0 0 1 .708.708L8.707 8l2.647 2.646a.5.5 0 0 1-.708.708L8 8.707l-2.646 2.647a.5.5 0 0 1-.708-.708L7.293 8 4.646 5.354a.5.5 0 1 1 .708-.708z"
            />
          </svg>
        </button>
        <p class="carrito__producto-precio">${formatearMoneda.format(productoCarrito.precio * productoCarrito.cantidad)}</p>
      </div>
      `;
      // Crear contenedor con toda la info del producto. Creamos un div.
      const itemCarrito = document.createElement('div');

      // Agregamos la clase al div
      itemCarrito.classList.add('carrito__producto');

      // Agregando plantilla al div
      itemCarrito.innerHTML = plantillaProducto;

      // Para agregarlo a nuestra pagina
      // Esto es para agregar nuestro item al final de la lista.
      ventanaCarrito.querySelector('.carrito__body').appendChild(itemCarrito);
    });
  }
  // Accederemos al elemento de total, para poner el total del carrito aqui
  ventanaCarrito.querySelector('.carrito__total').innerText = formatearMoneda.format(total);
};

// Abrir carrito
botonesAbrirCarrito.forEach((boton) => {
  boton.addEventListener('click', (e) => {

    // Ahora hay que abrirlo
    renderCarrito();
  });
});

// Cerrar carrito
botonesCerrarCarrito.forEach((boton) => {
  boton.addEventListener('click', (e) => {

    // Ahora hay que cerrarlo
    ventanaCarrito.classList.remove('carrito--active');
  });
});

//Detectar click usuario
btnAgregarCarrito.addEventListener ('click', (e) => {
  // Accediendo a la info del producto, accediendo al id linea 57 index.html
  const id = producto.dataset.productoId;
  // tambien necesitamos el nombre, color, tamanio, etc.
  const nombre = producto.querySelector('.producto__nombre').innerText;
  const cantidad = parseInt(producto.querySelector('#cantidad').value);
  // Hay que buscar el input que este marcado
  const color = producto.querySelector('#propiedad-color input:checked').value;
  const tamaño = parseInt(producto.querySelector('#propiedad-tamaño input:checked').value);
  // Agregando notificacion carrito
  const notificacion = document.getElementById('notificacion');

  // Comprobar si hay algun producto igual en el carrito
  if (carrito.length > 0){
    let productoEnCarrito = false;

    carrito.forEach((item) => {
      if (item.id === id && item.nombre === nombre && item.color === color && item.tamaño === tamaño){
        item.cantidad += cantidad;
        productoEnCarrito = true;
      }
    });

    if (!productoEnCarrito){
      carrito.push({
        id: id,
        nombre: nombre,
        cantidad: cantidad,
        color: color,
        tamaño: tamaño,
      });
    }
  } else {

     // Creamos un arreglo que va a contener todos los productos que el usuario agregue al carrito
    carrito.push({
      id: id,
      nombre: nombre,
      cantidad: cantidad,
      color: color,
      tamaño: tamaño,
    });
  }
  // Establecemos la ruta de la imagen que queremos mostrar
  // .src para acceder a la ruta de la imagen
  let thumbSrc = producto.querySelectorAll('.producto__thumb-img')[0].src;
  if (color === 'rojo'){
    thumbSrc = './img/thumbs/rojo.jpg';
  } else if (color === 'amarillo'){
    thumbSrc = './img/thumbs/amarillo.jpg';
  }
  // Me tome la imagen de la zapatilla seleccionada
  notificacion.querySelector('img').src = thumbSrc;

  // Para mostrarla le agregamos una clase
  notificacion.classList.add('notificacion--active');

  //Cerrar notificacion despues de 3 segundos
  setTimeout(() => notificacion.classList.remove('notificacion--active'), 3000);
});

// Botones para eliminar productos del carrito
ventanaCarrito.addEventListener('click', (e) => {
  if (e.target.closest('button')?.dataset.accion === 'eliminar-item-carrito'){
    // Contenga el contenedor del producto dentro del carrito
    const producto = e.target.closest('.carrito__producto');

    // Agrupamos los elementos dentro de un array para conocer su posicion
    // No queremos trabajar con lista de Nodos, queiro un array
    // Esto tomara los elementos de la lista y los pondra dentro de un array
    const indexProducto = [...ventanaCarrito.querySelectorAll('.carrito__producto')].indexOf(producto);

    // Queremos filtrar un elemento que tiene este index
    // Filter nos permite devolver un arreglo que vamos a poder guardar
    carrito = carrito.filter((item, index) => {
      if (index !== indexProducto){
        // Si el index es distinto al indexProducto, entonces lo guardamos en el carrito
        return item;
      }    });

    renderCarrito();
  }});

// Boton de enviar carrito o comprar
ventanaCarrito.querySelector('#carrito__btn-comprar').addEventListener('click', (e) => {
  console.log('Enviando peticion de compra...');
});

class Tabs {
  // Para ejecutar este codigo hay que hacer una instancia de la clase.
  constructor(idElemento){
    // Queremos tener acceso a los tabs
    // Queremos definir una propiedad, se usa this, aqui guardaremos el elemento completo
    this.tabs = document.getElementById(idElemento);
    // Aqui guardaremos el menu de navegacion
    this.nav = this.tabs.querySelector('.tabs');

    //Agregar eventlistener a todo el menu de navegacion
    this.nav.addEventListener('click', (e) => {

      // De esta forma lo transformamos en un array que contiene las clases
      if ([...e.target.classList].includes('tabs__button')){

        // Obetenmos la tab que queremos mostrar.
        const tab = e.target.dataset.tab;

        // Queremos quitarle la calse activa de alguna de las otras tabs que la tengan
        if (this.tabs.querySelector('.tab--active')){
          this.tabs.querySelector('.tab--active').classList.remove('tab--active');
        }
        // Quitamos la clase active del boton
        if (this.tabs.querySelector('.tabs__button--active')){
          this.tabs.querySelector('.tabs__button--active').classList.remove('tabs__button--active');
        }
        // Agregamos la clase activa al tab
        this.tabs.querySelector(`#${tab}`).classList.add('tab--active');

        // Agregamos la clase activa al boton
        e.target.classList.add('tabs__button--active');
      }
    });
  }
}

// Nueva instancia para crear un nuevo componente
new Tabs('mas-informacion');
