// Function to add a product to the cart
function addToCart(productId) {
    // 1. Get current cart from localStorage or start with empty array
    let cart = JSON.parse(localStorage.getItem('mw_cart')) || [];

    // 2. Check if item is already in cart (to avoid duplicates)
    if (!cart.includes(productId)) {
        cart.push(productId);
        localStorage.setItem('mw_cart', JSON.stringify(cart));

        // 3. Update the navbar count immediately
        updateCartBadge();

        // 4. Visual feedback
        alert("Item added to bag!");
    } else {
        alert("This item is already in your bag.");
    }
}

// Function to update the red number in the navbar
function updateCartBadge() {
    const cart = JSON.parse(localStorage.getItem('mw_cart')) || [];
    const badge = document.getElementById('cart-badge'); // Ensure this ID exists in your navbar
    if (badge) {
        badge.innerText = cart.length;
        badge.style.display = cart.length > 0 ? 'flex' : 'none';
    }
}

// Run update on every page load
document.addEventListener('DOMContentLoaded', updateCartBadge);
