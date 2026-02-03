async function renderCart() {
    const cartIds = JSON.parse(localStorage.getItem('mw_cart')) || [];
    const container = document.getElementById('cart-items-container');

    const [menRes, womenRes] = await Promise.all([
        fetch('../../men-products.json'),
        fetch('../../women-products.json')
    ]);

    const menProducts = await menRes.json();
    const womenProducts = await womenRes.json();

    // 2. Merge them into one master array
    const allProducts = [...menProducts, ...womenProducts];


    // 3. Filter for items actually in the user's cart
    const cartProducts = allProducts.filter(p => cartIds.includes(p.id));
    let totalPrice = 0;

    // 4. Display the items
    if (cartProducts.length === 0) {
        container.innerHTML = "<p>Your bag is empty.</p>";
        return;
    }

    container.innerHTML = container.innerHTML = `
    <div class="cart-header">
        <span>Product</span>
        <span>Price</span>
        <span>Quantity</span>
        <span>Total</span>
    </div>
    ${cartProducts.map(item => {
        const gender = (item.id >= 604) ? 'women' : 'men';
        const itemTotal = item.price; // Since quantity is 1 for now
        totalPrice += itemTotal;

        return `
            <div class="cart-row">
                <div class="product-col">
                    <img src="../../assets/images/${gender}/${item.subcategory}s/${item.img}" alt="${item.name}">
                    <div class="product-info">
                        <h4>${item.name}</h4>
                        <p class="variant">${item.subcategory}</p>
                        <button class="remove-link" onclick="removeFromCart(${item.id})">Remove</button>
                    </div>
                </div>
                <div class="price-col">₹${item.price}</div>
                <div class="quantity-col">
                    <div class="qty-selector">
                        <button>-</button>
                        <span>01</span>
                        <button>+</button>
                    </div>
                </div>
                <div class="total-col">₹${itemTotal}</div>
            </div>
        `;
    }).join('')}`;



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
