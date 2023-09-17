document.addEventListener("DOMContentLoaded", () => {
    const productosContainer = document.querySelector(".productos");
    const carritoLista = document.getElementById("carrito-lista");
    const totalElement = document.getElementById("total");
    const vaciarCarritoBtn = document.getElementById("vaciar-carrito");
    const finalizarCompraBtn = document.getElementById("finalizar-compra");

    // Obtener el carrito desde el almacenamiento local si existe
    let carrito = JSON.parse(localStorage.getItem("carrito")) || [];

    // Cargar productos desde el archivo JSON
    fetch("productos.json")
        .then(response => response.json())
        .then(productos => {
            mostrarProductos(productos);
            agregarListeners(productos);
            mostrarCarrito();
        });

    function mostrarProductos(productos) {
        productosContainer.innerHTML = "";
        productos.forEach(producto => {
            const productoDiv = document.createElement("div");
            productoDiv.classList.add("producto");
            productoDiv.innerHTML = `
                <img src="${producto.imagen}" alt="${producto.nombre}">
                <h3>${producto.nombre}</h3>
                <p>Precio: ${producto.precio} Pesos Arg</p>
                <button data-id="${producto.id}" class="agregar-carrito">Agregar al Carrito</button>`;
            productosContainer.appendChild(productoDiv);
        });
    }

    function agregarListeners(productos) {
        const agregarCarritoButtons = document.querySelectorAll(".agregar-carrito");
        agregarCarritoButtons.forEach(button => {
            button.addEventListener("click", () => {
                const productoId = parseInt(button.getAttribute("data-id"));
                const productoSeleccionado = productos.find(producto => producto.id === productoId);
                if (productoSeleccionado) {
                    agregarAlCarrito(productoSeleccionado);
                }
            });
        });
        finalizarCompraBtn.addEventListener("click", finalizarCompra);
    }

    function agregarAlCarrito(producto) {
        const carritoItem = carrito.find(item => item.id === producto.id);
        if (carritoItem) {
            carritoItem.cantidad++;
        } else {
            carrito.push({ ...producto, cantidad: 1 });
        }
        mostrarCarrito();

        // Actualizar el almacenamiento local con el carrito actualizado
        localStorage.setItem("carrito", JSON.stringify(carrito));
    }
    //vaciar el carrito
    vaciarCarritoBtn.addEventListener('click', () => {
        carrito.length = 0;
        mostrarCarrito();
    });

    function mostrarCarrito() {
        carritoLista.innerHTML = "";
        let total = 0;
        carrito.forEach(item => {
            const itemLi = document.createElement("li");
            itemLi.innerHTML = `${item.nombre} x${item.cantidad} - ${item.precio * item.cantidad} Pesos Arg`;
            carritoLista.appendChild(itemLi);
            total += item.precio * item.cantidad;
        });
        totalElement.textContent = total.toFixed(2);

        // Actualizar el almacenamiento local con el carrito actualizado
        localStorage.setItem("carrito", JSON.stringify(carrito));
    }

    function finalizarCompra() {
        alert("¡Gracias por tu compra! El total a pagar es: " + totalElement.textContent + " Pesos Arg. A disfrutar del Mate!");
        carrito = [];
        mostrarCarrito();

        // Limpiar el carrito y actualizar el almacenamiento local
        carrito = [];
        localStorage.removeItem("carrito");
        mostrarCarrito();
    }
});
