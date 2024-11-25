// Reemplaza 'your_public_key' con tu clave pública de Commerce.js
const commerce = new Commerce('pk_574919663617f04516faf34b4a1de7e4d0e411112f096', true);

document.addEventListener('DOMContentLoaded', () => {
    fetchProducts();
    renderCart();

    // Añade el evento para vaciar el carrito
    document.getElementById('empty-cart')?.addEventListener('click', emptyCart);
    // Añade el evento para comprar
    document.getElementById('buy-cart')?.addEventListener('click', buyCart);
});

async function fetchProducts() {
    try {
        const { data: products } = await commerce.products.list();
        const productsContainer = document.getElementById('products-container');
        productsContainer.innerHTML = products.map(product => renderProduct(product)).join('');
    } catch (error) {
        console.error('Error fetching products', error);
    }
}

function renderProduct(product) {
    return `
        <div class="w-full md:w-1/3 xl:w-1/4 p-6 flex flex-col">
            <a href="product.html?id=${product.id}">
                <img class="product-image hover:grow hover:shadow-lg" src="${product.image.url}" alt="${product.name}">
                <div class="pt-3 flex items-center justify-between">
                    <p class="text-gray-900">${product.name}</p>
                </div>
                <p class="pt-1 text-gray-900">${product.price.formatted_with_symbol}</p>
            </a>
                    <svg onclick="addToCart('${product.id}')" class="h-6 w-6 fill-current text-gray-500 hover:text-black cursor-pointer" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
                        <path d="M19 11h-6V5a1 1 0 0 0-2 0v6H5a1 1 0 0 0 0 2h6v6a1 1 0 0 0 2 0v-6h6a1 1 0 0 0 0-2z"/>
                    </svg>
        </div>
    `;
}

async function addToCart(productId) {
    try {
        await commerce.cart.add(productId, 1);
        Swal.fire('Success', 'Product added to cart!', 'success');
        renderCart();
    } catch (error) {
        console.error('Error adding to cart', error);
        Swal.fire('Error', 'Unable to add product to cart', 'error');
    }
}

function renderCart() {
    // Aquí puedes implementar la lógica para actualizar la UI del carrito si es necesario
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

function buyCart() {
    // Implementa aquí la lógica para proceder a la compra
    Swal.fire('Feature Coming Soon', 'Checkout process is coming soon!', 'info');
}
