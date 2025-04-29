// Function to load the cart into the checkout page
function loadCheckoutCart() {
    const savedCart = JSON.parse(localStorage.getItem('favouriteCart')) || [];
    const tableBody = document.getElementById('table-body');
    const totalAmount = document.getElementById('total-amount');

    tableBody.innerHTML = ''; // Clear existing table rows
    let grandTotal = 0;

    savedCart.forEach(item => {
        const row = document.createElement('tr');

        const nameCell = document.createElement('td');
        nameCell.textContent = item.name;
        row.appendChild(nameCell);

        const quantityCell = document.createElement('td');
        quantityCell.textContent = item.quantity;
        row.appendChild(quantityCell);

        const priceCell = document.createElement('td');
        priceCell.textContent = `$${item.price.toFixed(2)}`;
        row.appendChild(priceCell);

        const totalCell = document.createElement('td');
        totalCell.textContent = `$${(item.price * item.quantity).toFixed(2)}`;
        row.appendChild(totalCell);

        tableBody.appendChild(row);

        grandTotal += item.price * item.quantity;
    });

    totalAmount.textContent = `$${grandTotal.toFixed(2)}`;
}

// Ensure this is called after the DOM is ready
document.addEventListener('DOMContentLoaded', function () {
    loadCheckoutCart(); // Load the cart items
});


// Call this function when the page loads to populate the cart
document.addEventListener('DOMContentLoaded', function () {
    loadCheckoutCart(); // Load the cart items
});

// Show or hide card details based on payment method
document.addEventListener('DOMContentLoaded', function () {
    const paymentMethodSelect = document.getElementById('payment-method');
    const cardDetailsSection = document.getElementById('card-details');

    paymentMethodSelect.addEventListener('change', function () {
        if (paymentMethodSelect.value === 'card') {
            cardDetailsSection.style.display = 'block';
        } else {
            cardDetailsSection.style.display = 'none';
        }
    });

    // Optional: Checkout form submission
    const checkoutForm = document.getElementById('checkout-form');
    if (checkoutForm) {
        checkoutForm.addEventListener('submit', function (event) {
            event.preventDefault();
            alert('Thank you! Your order has been placed.');
            localStorage.removeItem('favouriteCart'); // Clear the cart after checkout
            window.location.href = 'index.html'; // Redirect to homepage or order page
        });
    }
});
