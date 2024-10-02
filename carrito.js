// Obtenemos los elementos del carrito
const addToCartButtons = document.querySelectorAll('.add-to-cart-btn');
const cartItems = document.getElementById('cart-items');
const totalPriceElement = document.getElementById('total-price');
const cartCountElement = document.getElementById('cart-count');
const carritoSection = document.getElementById('carrito');

let totalPrice = 0;
let cart = {};

// Función para actualizar la lista de productos en el carrito
function updateCartDisplay() {
    cartItems.innerHTML = ''; // Limpiar el carrito antes de actualizar
    for (let product in cart) {
        const cartItem = document.createElement('li');
        cartItem.innerHTML = `${cart[product].name} - ${cart[product].price.toFixed(2)} bs x ${cart[product].quantity} = ${(cart[product].price * cart[product].quantity).toFixed(2)} bs 
            <button class="remove-btn" data-product="${product}">Eliminar</button>`;
        cartItems.appendChild(cartItem);
    }

    // Actualizar el número de productos en el ícono del carrito
    cartCountElement.textContent = Object.keys(cart).reduce((acc, product) => acc + cart[product].quantity, 0);

    // Agregar eventos de eliminar a cada botón
    const removeButtons = document.querySelectorAll('.remove-btn');
    removeButtons.forEach(button => {
        button.addEventListener('click', () => {
            const productName = button.getAttribute('data-product');
            removeFromCart(productName);
        });
    });
}

// Función para eliminar un producto del carrito
function removeFromCart(productName) {
    if (cart[productName]) {
        // Actualizar el precio total
        totalPrice -= cart[productName].price * cart[productName].quantity;
        totalPriceElement.textContent = totalPrice.toFixed(2);

        // Eliminar el producto del carrito
        delete cart[productName];
        updateCartDisplay();
    }
}

// Agregar el evento a cada botón
addToCartButtons.forEach(button => {
    button.addEventListener('click', () => {
        const productName = button.getAttribute('data-product');
        const productPrice = parseFloat(button.getAttribute('data-price'));

        // Si el producto ya está en el carrito, aumentar la cantidad
        if (cart[productName]) {
            cart[productName].quantity += 1;
        } else {
            // Si no está en el carrito, agregarlo
            cart[productName] = {
                name: productName,
                price: productPrice,
                quantity: 1
            };
        }

        // Actualizar el precio total
        totalPrice += productPrice;
        totalPriceElement.textContent = totalPrice.toFixed(2);

        // Actualizar la visualización del carrito
        updateCartDisplay();
    });
});