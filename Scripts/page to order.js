// Initialize the cart
let cart = [];

// Function to add item to the cart
function addToCart(itemName, price, quantity) {
    // Ensure the quantity is a valid number
    quantity = parseInt(quantity);
    if (isNaN(quantity) || quantity < 1) {
        alert("Please enter a valid quantity.");
        return;
    }

    // Check if the item already exists in the cart
    const existingItemIndex = cart.findIndex(item => item.name === itemName);
    if (existingItemIndex !== -1) {
        // If item exists, update the quantity and total
        cart[existingItemIndex].quantity += quantity;
        cart[existingItemIndex].total = cart[existingItemIndex].price * cart[existingItemIndex].quantity;
    } else {
        // If item doesn't exist, add it to the cart
        cart.push({
            name: itemName,
            price: price,
            quantity: quantity,
            total: price * quantity
        });
    }

    // Update the cart table
    updateCartTable();
}

// Function to update the cart table
function updateCartTable() {
    const cartBody = document.getElementById('cart-body');
    cartBody.innerHTML = ''; // Clear the current table contents

    let totalPrice = 0;

    // Loop through each item in the cart
    cart.forEach((item, index) => {
        totalPrice += item.total;

        const row = document.createElement('tr');

        // Create table data for each item
        const itemCell = document.createElement('td');
        itemCell.textContent = item.name;
        row.appendChild(itemCell);

        const priceCell = document.createElement('td');
        priceCell.textContent = `$${item.price.toFixed(2)}`;
        row.appendChild(priceCell);

        const quantityCell = document.createElement('td');
        quantityCell.textContent = item.quantity;
        row.appendChild(quantityCell);

        const totalCell = document.createElement('td');
        totalCell.textContent = `$${item.total.toFixed(2)}`;
        row.appendChild(totalCell);

        // Add a delete button for each item
        const deleteCell = document.createElement('td');
        const deleteButton = document.createElement('button');
        deleteButton.textContent = 'Delete';
        deleteButton.onclick = function () {
            deleteFromCart(index);
        };
        deleteCell.appendChild(deleteButton);
        row.appendChild(deleteCell);

        // Append the row to the cart table
        cartBody.appendChild(row);
    });

    // Add a total row
    const totalRow = document.createElement('tr');
    const emptyCell = document.createElement('td');
    emptyCell.setAttribute('colspan', '4');
    emptyCell.textContent = 'Total';
    totalRow.appendChild(emptyCell);

    const totalPriceCell = document.createElement('td');
    totalPriceCell.textContent = `$${totalPrice.toFixed(2)}`;
    totalRow.appendChild(totalPriceCell);

    cartBody.appendChild(totalRow);
}

// Function to delete an item from the cart
function deleteFromCart(index) {
    cart.splice(index, 1);
    updateCartTable();
}

// Function to save cart to local storage
function saveToFavourites() {
    localStorage.setItem('favouriteCart', JSON.stringify(cart));
    alert("Your cart has been saved as a favourite!");
}

// Function to apply saved favourites from local storage
function applyFavourites() {
    const fav = localStorage.getItem('favouriteCart');
    if (fav) {
        cart = JSON.parse(fav);
        updateCartTable(); // Corrected from renderCart() to updateCartTable()
        alert("Favourites applied!");
    } else {
        alert("No favourites saved yet.");
    }
}
