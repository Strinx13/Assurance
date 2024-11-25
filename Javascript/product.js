document.addEventListener('DOMContentLoaded', () => {
    const params = new URLSearchParams(window.location.search);
    const productId = params.get('id');
    const productDetailsContainer = document.getElementById('product-details');

    // Inicializa Commerce.js con tu clave API pública
    const commerce = new Commerce('pk_574919663617f04516faf34b4a1de7e4d0e411112f096', true);

    // Obtener los detalles del producto desde Commerce.js
    commerce.products.retrieve(productId).then(product => {
        if (product) {
            // Cambiar el título de la página
            document.title = product.name;

            const productDetailCard = document.createElement('div');
            productDetailCard.className = 'bg-white p-6 rounded-lg shadow-lg flex flex-row items-start';

            productDetailCard.innerHTML = `
                <img src="${product.image.url}" alt="${product.name}" class="product-image flex-shrink-0 mr-4">
                <div class="flex flex-col flex-grow">
                    <h2 class="text-lg text-gray-900 font-large font-bold title-font mb-2">${product.name}</h2>
                    <p class="leading-relaxed font-medium mb-4">${product.description}</p>
                    <div class="flex items-center justify-between">
                        <span class="text-xl font-bold text-gray-900">${product.price.formatted_with_symbol}</span>
                        <button class="bg-blue-500 text-white px-3 py-1 rounded add-to-cart">Add to Cart</button>
                    </div>
                </div>
            `;

            // Agregar el producto al carrito
            productDetailCard.querySelector('.add-to-cart').addEventListener('click', () => {
                addToCart(product);
            });

            productDetailsContainer.appendChild(productDetailCard);
        } else {
            console.error('Product data is undefined');
        }
    }).catch(error => console.error('Error fetching product details:', error));
});

function addToCart(product) {
    let cart = JSON.parse(localStorage.getItem('cart')) || [];
    cart.push({
        id: product.id,
        name: product.name,
        image: product.image.url,
        price: product.price.formatted
    });
    localStorage.setItem('cart', JSON.stringify(cart));
    
    Swal.fire({
        title: 'Producto agregado',
        text: `El producto "${product.name}" ha sido agregado al carrito.`,
        icon: 'success',
        confirmButtonText: 'OK'
    });
}
