// Variable to hold the raw data from the JSON file
let masterData = [];

// Add 'gender' as a parameter
async function loadProductsByCategory(gender, requestedSub) {
    try {
        // Use the gender parameter to pick the right JSON file
        const response = await fetch(`../../${gender}-products.json`);
        masterData = await response.json();

        const filteredProducts = masterData.filter(item => item.subcategory === requestedSub);
        renderProducts(filteredProducts, gender); // Pass gender to the renderer

        document.getElementById('category-title').innerText = `Home/${gender}/${requestedSub.toUpperCase()}`;

    } catch (error) {
        console.error("Failed to load products:", error);
    }
}


function renderProducts(data, gender) {
    const grid = document.getElementById('product-grid');

    // 1. Get the current wishlist from storage
    const wishlist = JSON.parse(localStorage.getItem('mw_wishlist')) || [];

    grid.innerHTML = data.map(product => {
        // Dynamically build the path: e.g., assets/images/men/shirts/1.jpg
        const dynamicPath = `../../assets/images/${gender}/${product.subcategory}s/${product.img}`;

        // 2. Check if this specific item is already liked
        const isLiked = wishlist.includes(product.id) ? 'active' : '';


        return `
            <a href="product-detail.html?id=${product.id}&gender=${gender}" class="product-card">
                <div class="image-wrapper">
                    <button type="button" class="wishlist-btn ${isLiked}" 
                onclick="event.preventDefault(); event.stopPropagation(); handleWishlistClick(${product.id}, this)">
                <i class="icon" data-lucide="heart"></i>
            </button>
                    <img src="${dynamicPath}" alt="${product.name}">
                </div>
                <div class="info-area">
                    <h3>${product.name}</h3>
                    <p>${product.cat}</p>
                    <span class="price">₹ ${product.price}</span>
                </div>
            </a>
        `;
    }).join('');

    lucide.createIcons();
    document.getElementById('item-count').innerText = data.length;



}



function sortProducts() {
    const sortBy = document.getElementById('sort-options').value;
    const titleElement = document.getElementById('category-title');

    if (!titleElement || !masterData.length) return;

    // 1. Get Gender and Subcategory from the breadcrumb
    // Breadcrumb format: "Home/men/SHIRT"
    const pathParts = titleElement.innerText.split('/');
    const currentGender = pathParts[1].toLowerCase(); // This gets 'men'
    let currentSub = pathParts[2].toLowerCase().trim(); // This gets 'shirt'

    // 2. Handle pluralization for filtering
    if (currentSub.endsWith('s')) {
        currentSub = currentSub.slice(0, -1);
    }

    // 3. Filter the master data
    let dataToSort = masterData.filter(item => item.subcategory === currentSub);

    // 4. Perform the sort
    if (sortBy === 'price-low') {
        dataToSort.sort((a, b) => a.price - b.price);
    } else if (sortBy === 'price-high') {
        dataToSort.sort((a, b) => b.price - a.price);
    } else if (sortBy === 'popularity') {
        dataToSort.sort((a, b) => b.popularity - a.popularity);
    }

    // 5. FIX: Pass the 'currentGender' so image paths work!
    renderProducts(dataToSort, currentGender);
}






// wishlist--------------------------------
function handleWishlistClick(id, button) {
    let wishlist = JSON.parse(localStorage.getItem('mw_wishlist')) || [];

    // If the ID is already there, remove it (unlike). If not, add it (like).
    if (wishlist.includes(id)) {
        wishlist = wishlist.filter(itemId => itemId !== id);
        button.classList.remove('active');
    } else {
        wishlist.push(id);
        button.classList.add('active');
    }

    localStorage.setItem('mw_wishlist', JSON.stringify(wishlist));
    updateWishlistBadge(); // Update the navbar number immediately
}




// popup message

function initScrollObserver() {
    const endMessage = document.getElementById('end-of-list');

    // The observer looks for the endMessage div
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                // If the user sees the bottom, add the 'visible' class
                endMessage.classList.add('visible');
            } else {
                endMessage.classList.remove('visible');
            }
        });
    }, {
        threshold: 0.1 // Triggers when 10% of the message is visible
    });

    observer.observe(endMessage);
}


document.addEventListener('DOMContentLoaded', () => {
    // ... your existing fetch logic ...
    initScrollObserver();
});


// cart logic------------------------------------------------------------------

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
