// Reemplaza 'your_public_key' con tu clave pública de Commerce.js
const commerce = new Commerce('pk_574919663617f04516faf34b4a1de7e4d0e411112f096', true);

document.addEventListener('DOMContentLoaded', () => {
    renderCart();

    // Añade el evento para vaciar el carrito
    document.getElementById('empty-cart')?.addEventListener('click', emptyCart);
    // Añade el evento para comprar
    document.getElementById('buy-cart')?.addEventListener('click', buyCart);
});

async function renderCart() {
    try {
        const cart = await commerce.cart.retrieve();
        console.log('Cart data:', cart); // Agregamos esta línea para depuración

        if (!cart || !cart.line_items) {
            throw new Error('Cart is empty or cart data is not available.');
        }

        const cartContainer = document.getElementById('cart-container');
        cartContainer.innerHTML = cart.line_items.map(item => renderCartItem(item)).join('');
        updateCartCount(cart.total_items);
    } catch (error) {
        console.error('Error rendering cart', error);
        Swal.fire('Error', error.message, 'error');
    }
}

function renderCartItem(item) {
    return `
        <div class="flex items-center justify-between p-4 border-b">
            <img src="${item.image.url}" alt="${item.name}" class="w-20 h-20 object-cover">
            <div class="flex flex-col justify-between">
                <p>${item.name}</p>
                <p>${item.price.formatted_with_symbol}</p>
            </div>
            <p>${item.quantity}</p>
            <button onclick="removeFromCart('${item.id}')" class="text-red-500 hover:text-red-700">Remove</button>
        </div>
    `;
}

async function removeFromCart(itemId) {
    try {
        await commerce.cart.remove(itemId);
        Swal.fire('Success', 'Item removed from cart!', 'success');
        renderCart();
    } catch (error) {
        console.error('Error removing item from cart', error);
        Swal.fire('Error', 'Unable to remove item from cart', 'error');
    }
}

function updateCartCount(count) {
    const cartCountElement = document.getElementById('cart-count');
    cartCountElement.textContent = count;
}

function emptyCart() {
    commerce.cart.empty()
        .then((response) => {
            Swal.fire('Success', 'Cart has been emptied!', 'success');
            renderCart();
        })
        .catch((error) => {
            console.error('Error emptying cart', error);
            Swal.fire('Error', 'Unable to empty cart', 'error');
        });
}


