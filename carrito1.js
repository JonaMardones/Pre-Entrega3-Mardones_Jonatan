document.addEventListener("DOMContentLoaded", () => {
    const productosContenedor = document.querySelector(".productos"); 
    const carritoLista = document.getElementById("carrito-lista");
    const totalElement = document.getElementById("total");
    const vaciarCarritoBoton = document.getElementById("vaciando-carrito");
    const finalizarCompraBoton = document.getElementById("finalizar-compra");

   
    let carrito = JSON.parse(localStorage.getItem("carrito")) || [];

   
    fetch("productos.json")
        .then(response => response.json())
        .then(productos => {
            mostrarProductos(productos);
            agregarListeners(productos);
            mostrarCarrito();
        });

    function mostrarProductos(productos) {
        productosContenedor.innerHTML = "";
        productos.forEach(producto => {
            const divDelProducto = document.createElement("div");
            divDelProducto.classList.add("producto");
            divDelProducto.innerHTML = `<img src="${producto.imagen}" alt="${producto.nombre}">
                <h3>${producto.nombre}</h3>
                <p>Precio: ${producto.precio} Pesos Arg</p>
                <button data-id="${producto.id}" class="agregar-carrito">Agregar al Carrito</button>`;
            productosContenedor.appendChild(divDelProducto);
        });
    }

    function agregarListeners(productos) {
        const agregarCarritoButtons = document.querySelectorAll(".agregar-carrito");
        agregarCarritoButtons.forEach(button => {
            button.addEventListener("click", () => {
                const idDelProducto = parseInt(button.getAttribute("data-id"));
                const productoSelec = productos.find(producto => producto.id === idDelProducto);
                if (productoSelec) {
                    agregarAlCarrito(productoSelec);
                }
            });
        });
        finalizarCompraBoton.addEventListener("click", finalizarCompra);
    }

    function agregarAlCarrito(producto) {
        const itemDelCarrito = carrito.find(item => item.id === producto.id);
        if (itemDelCarrito) {
            itemDelCarrito.cantidad++;
        } else {
            carrito.push({ ...producto, cantidad: 1 });
        }
        mostrarCarrito();

        localStorage.setItem("carrito", JSON.stringify(carrito));

        Swal.fire({
            icon: 'success',
            title: 'Producto agregado al carrito',
            text: `${producto.nombre} se ha añadido al carrito.`,
            showConfirmButton: true,
            timer: 1500 // Mostrar el mensaje durante 1.5 segundos
        });
    }
   
    vaciarCarritoBoton.addEventListener('click', () => {
        carrito.length = 0;
        mostrarCarrito();
    });

    function mostrarCarrito() {
        carritoLista.innerHTML = "";
        let total = 0;
        carrito.forEach(item => {
            const itemLista = document.createElement("li");
            itemLista.innerHTML = `${item.nombre} x${item.cantidad} - ${item.precio * item.cantidad} Pesos Arg`;
            carritoLista.appendChild(itemLista);
            total += item.precio * item.cantidad;
        });
        totalElement.textContent = total.toFixed(2);

        
        localStorage.setItem("carrito", JSON.stringify(carrito));
    }

    function finalizarCompra() {
        alert("¡Gracias por tu compra! El total a pagar es: " + totalElement.textContent + " Pesos Arg. A disfrutar del Mate!");
        carrito = [];
        mostrarCarrito();
        
        carrito = [];
        localStorage.removeItem("carrito");
        mostrarCarrito();
    }
    //Agregando sweet alert En proceso
    /*Swal.fire({
        icon: 'success',
        title: '¡Gracias por tu compra!',
        text: `El total a pagar es: ${totalElement.textContent} ARS`,
        confirmButtonText: 'Cerrar'
    }).then(() => {*/
        // Limpiar el carrito y eliminar el almacenamiento local
        carrito = [];
        localStorage.removeItem("carrito");
        mostrarCarrito();
    });


