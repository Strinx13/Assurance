document.addEventListener('DOMContentLoaded', () => {
    const form = document.getElementById('payment-form');

    form.addEventListener('submit', (event) => {
        event.preventDefault();

        // Obtener los datos del formulario
        const cardNumber = document.getElementById('card-number').value;
        const expirationDate = document.getElementById('expiration-date').value;
        const cvv = document.getElementById('cvv').value;
        const billingAddress = document.getElementById('billing-address').value;

        // Guardar los datos en el almacenamiento local
        const paymentInfo = {
            cardNumber,
            expirationDate,
            cvv,
            billingAddress
        };

        localStorage.setItem('paymentInfo', JSON.stringify(paymentInfo));

        // Mostrar un mensaje de éxito
        Swal.fire({
            icon: 'success',
            title: 'Payment Info Saved',
            text: 'Your payment information has been saved successfully.',
            confirmButtonText: 'OK'
        });

        // Limpiar el formulario
        form.reset();
    });
});
