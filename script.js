const productos = [
    { id: 1, nombre: 'Mate Estilo Calabaza', precio: 10.00 },
    { id: 2, nombre: 'Mate Estilo 2', precio: 12.00 },
    // Agrega más productos aquí
];

const carrito = [];
const carritoLista = document.getElementById('carrito-lista');
const carritoTotal = document.getElementById('carrito-total');
const vaciarCarritoBtn = document.getElementById('vaciar-carrito');
const comprarBtn = document.getElementById('comprar');

// Función para agregar un producto al carrito
function agregarAlCarrito(id) {
    const producto = productos.find(p => p.id === id);
    if (producto) {
        carrito.push(producto);
        mostrarCarrito();
    }
}

// Función para mostrar los elementos del carrito
function mostrarCarrito() {
    carritoLista.innerHTML = '';
    carritoTotal.textContent = calcularTotal().toFixed(2);

    carrito.forEach(producto => {
        const li = document.createElement('li');
        li.innerHTML = `
            ${producto.nombre} - $${producto.precio.toFixed(2)}
            <button class="eliminar" data-id="${producto.id}">Eliminar</button>
        `;
        carritoLista.appendChild(li);
    });
}

// Función para calcular el total del carrito
function calcularTotal() {
    return carrito.reduce((total, producto) => total + producto.precio, 0);
}

// Event listeners para agregar productos al carrito
document.querySelectorAll('.agregar-carrito').forEach(btn => {
    btn.addEventListener('click', () => {
        const id = parseInt(btn.getAttribute('data-id'));
        agregarAlCarrito(id);
    });
});

// Event listener para eliminar productos del carrito
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

// Event listener para vaciar el carrito
vaciarCarritoBtn.addEventListener('click', () => {
    carrito.length = 0;
    mostrarCarrito();
});

// Event listener para finalizar la compra
comprarBtn.addEventListener('click', () => {
    if (carrito.length > 0) {
        alert('Compra realizada con éxito. Gracias por su compra.');
        carrito.length = 0;
        mostrarCarrito();
    } else {
        alert('El carrito está vacío. Agregue productos antes de comprar.');
    }
});

// Mostrar carrito inicialmente
mostrarCarrito();
