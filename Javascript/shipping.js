document.getElementById('shipping-form').addEventListener('submit', function(event) {
    event.preventDefault(); // Prevenir el envío del formulario

    // Obtener los valores del formulario
    const fullName = document.getElementById('full-name').value;
    const address = document.getElementById('address').value;
    const city = document.getElementById('city').value;
    const state = document.getElementById('state').value;
    const zipCode = document.getElementById('zip-code').value;
    const country = document.getElementById('country').value;

    // Guardar los valores en localStorage
    localStorage.setItem('fullName', fullName);
    localStorage.setItem('address', address);
    localStorage.setItem('city', city);
    localStorage.setItem('state', state);
    localStorage.setItem('zipCode', zipCode);
    localStorage.setItem('country', country);

    // Redirigir a la página de confirmación de compra
    document.getElementById('shipping-form').addEventListener('submit', function (event) {
        event.preventDefault(); // Evita que el formulario se envíe de la manera tradicional
        window.location.href = 'confirm-purchase.html'; // Redirige a la página de confirmación
    }); // Asegúrate de que el nombre del archivo sea correcto
});