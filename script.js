const productos = [
    { id: 1, nombre: 'Mate Estilo Calabaza', precio: 15.00 },
    { id: 2, nombre: 'Mate Estilo 2', precio: 12.00 },
    { id: 3, nombre: 'Mate 3D-Print', precio: 18.00 },
    { id: 4, nombre: 'Mate Madera', precio: 10.00 },];

const carrito = [];
const carritoLista = document.getElementById('carrito-lista');
const carritoTotal = document.getElementById('carrito-total');
const vaciarCarritoBtn = document.getElementById('vaciar-carrito');
const comprarBtn = document.getElementById('comprar');

// Agregar un producto al carrito
function agregarAlCarrito(id) {
    const producto = productos.find(p => p.id === id);
    if (producto) {
        carrito.push(producto);
        mostrarCarrito();
    }
}

// Mostrar los elementos del carrito
function mostrarCarrito() {
    carritoLista.innerHTML = '';
    carritoTotal.textContent = calcularTotal().toFixed(2);

    carrito.forEach(producto => {
        const li = document.createElement('li');
        li.innerHTML = `${producto.nombre} - $${producto.precio.toFixed(2)}
            <button class="eliminar" data-id="${producto.id}">Eliminar</button>`;
        carritoLista.appendChild(li);
    });
}

// Calcular el total del carrito
function calcularTotal() {
    return carrito.reduce((total, producto) => total + producto.precio, 0);
}

// Agregar productos al carrito
document.querySelectorAll('.agregar-carrito').forEach(btn => {
    btn.addEventListener('click', () => {
        const id = parseInt(btn.getAttribute('data-id'));
        agregarAlCarrito(id);
    });
});

// Eliminar productos del carrito
carritoLista.addEventListener('click', (e) => {
    if (e.target.classList.contains('eliminar')) {
        const id = parseInt(e.target.getAttribute('data-id'));
        const index = carrito.findIndex(producto => producto.id === id);
        if (index !== -1) {
            carrito.splice(index, 1);
            mostrarCarrito();
        }
    }
});

// Vaciar el carrito
vaciarCarritoBtn.addEventListener('click', () => {
    carrito.length = 0;
    mostrarCarrito();
});

// Finalizar la compra
comprarBtn.addEventListener('click', () => {
    if (carrito.length > 0) {
        alert('Compra realizada con éxito. Disfrute su Mate.');
        carrito.length = 0;
        mostrarCarrito();
    } else {
        alert('El carrito aun está vacío. Agregue el o los Mates para comprar.');
    }
});

// Mostrar carrito
mostrarCarrito();
