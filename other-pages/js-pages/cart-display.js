async function renderCart() {
    const cartIds = JSON.parse(localStorage.getItem('mw_cart')) || [];
    const container = document.getElementById('cart-items-container');

    // 1. GET QUANTITIES FROM STORAGE (This fixes the "not defined" error)
    const quantities = JSON.parse(localStorage.getItem('mw_cart_qty')) || {};

    const [menRes, womenRes] = await Promise.all([
        fetch('../../men-products.json'),
        fetch('../../women-products.json')
    ]);

    const allProducts = [...await menRes.json(), ...await womenRes.json()];
    const cartProducts = allProducts.filter(p => cartIds.includes(p.id));

    let totalPrice = 0;
    let totalItemsCount = 0;

    if (cartProducts.length === 0) {
        container.innerHTML = "<p>Your bag is empty.</p>";
        document.getElementById('total-price').innerText = "0";
        document.getElementById('total-qty').innerText = "0";
        return;
    }

    container.innerHTML = `
    <div class="cart-header">
        <span>Product</span>
        <span>Price</span>
        <span>Quantity</span>
        <span>Total</span>
    </div>
    ${cartProducts.map(item => {
        const gender = (item.id >= 604) ? 'women' : 'men';

        // Use quantity from storage or default to 1
        const qty = quantities[item.id] || 1;
        const itemTotal = item.price * qty;

        totalPrice += itemTotal;
        totalItemsCount += qty;

        return `
            <div class="cart-row">
                <div class="product-col">
                    <img src="../../assets/images/${gender}/${item.subcategory}s/${item.img}" alt="${item.name}">
                    <div class="product-info">
                        <h4>${item.name}</h4>
                        <button class="remove-link" onclick="removeFromCart(${item.id})">Remove</button>
                    </div>
                </div>
                <div class="price-col">₹${item.price}</div>
                <div class="quantity-col">
                    <div class="qty-selector">
                        <button onclick="updateQuantity(${item.id}, -1)">-</button>
                        <span>${qty.toString().padStart(2, '0')}</span>
                        <button onclick="updateQuantity(${item.id}, 1)">+</button>
                    </div>
                </div>
                <div class="total-col">₹${itemTotal}</div>
            </div>
        `;
    }).join('')}`;

    document.getElementById('total-price').innerText = totalPrice;
    document.getElementById('total-qty').innerText = totalItemsCount;
}
function removeFromCart(id) {
    let cart = JSON.parse(localStorage.getItem('mw_cart')) || [];
    cart = cart.filter(itemId => itemId !== id);
    localStorage.setItem('mw_cart', JSON.stringify(cart));
    renderCart(); // Refresh page
    updateCartBadge(); // Update navbar
}

document.addEventListener('DOMContentLoaded', renderCart);
