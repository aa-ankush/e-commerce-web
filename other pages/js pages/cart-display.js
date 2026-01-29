async function renderCart() {
    const cartIds = JSON.parse(localStorage.getItem('mw_cart')) || [];
    const container = document.getElementById('cart-items-container');
    
    const response = await fetch('../../men-products.json');
    const products = await response.json();

    const cartProducts = products.filter(p => cartIds.includes(p.id));
    let totalPrice = 0;

    if (cartProducts.length === 0) {
        container.innerHTML = "<p>Your bag is empty.</p>";
        return;
    }

    container.innerHTML = cartProducts.map(item => {
        totalPrice += item.price;
        return `
            <div class="cart-item">
                <img src="../../assets/images/men/${item.subcategory}s/${item.img}" width="100">
                <div class="cart-item-details">
                    <h4>${item.name}</h4>
                    <p>Price: ₹${item.price}</p>
                    <button onclick="removeFromCart(${item.id})">Remove</button>
                </div>
            </div>
        `;
    }).join('');

    document.getElementById('total-price').innerText = totalPrice;
    document.getElementById('total-qty').innerText = cartProducts.length;
}

function removeFromCart(id) {
    let cart = JSON.parse(localStorage.getItem('mw_cart')) || [];
    cart = cart.filter(itemId => itemId !== id);
    localStorage.setItem('mw_cart', JSON.stringify(cart));
    renderCart(); // Refresh page
    updateCartBadge(); // Update navbar
}

document.addEventListener('DOMContentLoaded', renderCart);