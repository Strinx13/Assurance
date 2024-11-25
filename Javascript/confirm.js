document.addEventListener('DOMContentLoaded', () => {
    displayOrderSummary();
});

function displayOrderSummary() {
    // Recuperar los datos del localStorage
    const fullName = localStorage.getItem('fullName');
    const address = localStorage.getItem('address');
    const city = localStorage.getItem('city');
    const state = localStorage.getItem('state');
    const zipCode = localStorage.getItem('zipCode');
    const country = localStorage.getItem('country');
    const cart = JSON.parse(localStorage.getItem('cart')) || [];

    // Mostrar los datos en el HTML
    const orderSummary = document.getElementById('order-summary');
    orderSummary.innerHTML = `
        <h3 class="text-2xl text-gray-700 font-bold mb-4">Shipping Address</h3>
        <p><strong>Full Name:</strong> ${fullName}</p>
        <p><strong>Address:</strong> ${address}</p>
        <p><strong>City:</strong> ${city}</p>
        <p><strong>State:</strong> ${state}</p>
        <p><strong>Zip Code:</strong> ${zipCode}</p>
        <p><strong>Country:</strong> ${country}</p>

        <h3 class="text-2xl text-gray-700 font-bold mt-6 mb-4">Cart Items</h3>
        ${cart.length > 0 ? cart.map(item => `
            <div class="mb-4">
                <p><strong>Product:</strong> ${item.name}</p>
                <p><strong>Quantity:</strong> ${item.quantity}</p>
                <p><strong>Price:</strong> ${item.price}</p>
            </div>
        `).join('') : '<p>No items in the cart</p>'}
    `;
}

document.getElementById('confirm-button').addEventListener('click', () => {
    Swal.fire({
        title: 'Purchase Confirmed!',
        text: 'Your purchase has been confirmed. Thank you for shopping with us!',
        icon: 'success',
        confirmButtonText: 'OK'
    }).then(() => {
        // Redirigir a una página de confirmación o inicio
        window.location.href = 'index.html'; // Cambia esto a la URL correcta de tu página de inicio
    });
});