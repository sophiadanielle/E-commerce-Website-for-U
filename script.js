let cart = [];

function addToCart(productName, productPrice) {
    console.log("Adding to cart:", productName, productPrice);
    const product = cart.find(item => item.name === productName);
    if (product) {
        product.quantity += 1;
    } else {
        cart.push({ name: productName, price: productPrice, quantity: 1 });
    }
    updateCartCount();
    updateCartItems();
}

function updateCartCount() {
    const cartCount = cart.reduce((total, item) => total + item.quantity, 0);
    document.getElementById('cart-count').textContent = cartCount;
}

function updateCartItems() {
    const cartItemsContainer = document.getElementById('cart-items');
    cartItemsContainer.innerHTML = '';
    cart.forEach(item => {
        const cartItem = document.createElement('div');
        cartItem.className = 'cart-item';
        cartItem.innerHTML = `
            <p>${item.name} - ₱${item.price} x ${item.quantity}</p>
        `;
        cartItemsContainer.appendChild(cartItem);
    });
    updateCartTotal();
}

function updateCartTotal() {
    const total = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);
    document.getElementById('cart-total').textContent = total.toFixed(2);
}

function toggleCart() {
    const cartModal = document.getElementById('cart-modal');
    cartModal.style.display = cartModal.style.display === 'none' ? 'block' : 'none';
}

function checkout() {
    if (cart.length === 0) {
        alert("Your cart is empty!");
        return;
    }

    const deliveryDate = calculateDeliveryDate();
    let message = "Thank you for your purchase!\n\n";
    message += "Items:\n";
    cart.forEach(item => {
        message += `- ${item.name} x ${item.quantity} - ₱${item.price * item.quantity}\n`;
    });
    message += `\nTotal: ₱${calculateTotal()}\n`;
    message += `\nExpected Delivery Date: ${deliveryDate}`;

    alert(message);

    // Reset cart
    cart = [];
    updateCartCount();
    updateCartItems();
    toggleCart();
}

function calculateTotal() {
    return cart.reduce((sum, item) => sum + item.price * item.quantity, 0).toFixed(2);
}

function calculateDeliveryDate() {
    // Add 3 days for delivery date from today
    const today = new Date();
    const deliveryDate = new Date(today);
    deliveryDate.setDate(deliveryDate.getDate() + 3);

    // Format delivery date as "Day, Month Date, Year"
    const options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };
    return deliveryDate.toLocaleDateString('en-PH', options);
}
