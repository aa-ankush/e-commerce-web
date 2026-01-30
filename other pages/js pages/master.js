// Variable to hold the raw data from the JSON file
let masterData = [];

async function loadProductsByCategory(requestedSub) {
    try {
        // 1. Fetch the master Men or Women file
        const response = await fetch('../../men-products.json');
        masterData = await response.json();

        // 2. Filter the array to find only the items for the current page
        // For example: if requestedSub is 'kurta', it only keeps kurtas.
        const filteredProducts = masterData.filter(item => item.subcategory === requestedSub);

        // 3. Send the filtered list to your existing display function
        renderProducts(filteredProducts);
        
        // 4. Dynamically update the page title
        document.getElementById('category-title').innerText =`Home/men/ ${requestedSub.toUpperCase()}` 
        
    } catch (error) {
        console.error("Failed to load products:", error);
    }
}


function renderProducts(data) {
    const grid = document.getElementById('product-grid');

    grid.innerHTML = data.map(product => {
        // Dynamically build the path: e.g., assets/images/men/shirts/1.jpg
        const dynamicPath = `../../assets/images/men/${product.subcategory}s/${product.img}`;
        

        return `
            <a href="product-detail.html?id=${product.id}" class="product-card">
                <div class="image-wrapper">
                    <button type="button" class="wishlist-btn" 
                onclick="event.preventDefault(); event.stopPropagation(); handleWishlistClick(${product.id}, this)">
                <i class="icon" data-lucide="heart"></i>
            </button>
                    <img src="${dynamicPath}" alt="${product.name}">
                </div>
                <div class="info-area">
                    <h3>${product.name}</h3>
                    <span class="price">₹ ${product.price}</span>
                </div>
            </a>
        `;
    }).join('');
    
    lucide.createIcons();
    document.getElementById('item-count').innerText = data.length;

    
    
}

// function sortProducts() {
//     const sortBy = document.getElementById('sort-options').value;
    
//     // Get the current subcategory being viewed (we can store this in a variable)
//      const currentSub = document.getElementsByClassName('category-title').innerText.toLowerCase();
    
//     // Start with only the items belonging to this category
//      let dataToSort = masterData.filter(item => item.subcategory === currentSub);
    

//     if (sortBy === 'price-low') {
//         dataToSort.sort((a, b) => a.price - b.price);
//     } else if (sortBy === 'price-high') {
//         dataToSort.sort((a, b) => b.price - a.price);
//     } else if (sortBy === 'popularity') {
//         dataToSort.sort((a, b) => b.popularity - a.popularity);
//     }else if (sortBy === 'popularity') {
//          data.sort((a, b) => b.popularity - a.popularity);
//     }

    
//     renderProducts(dataToSort);
// }

function sortProducts() {
    const sortBy = document.getElementById('sort-options').value;
    const titleElement = document.getElementById('category-title'); // Use ID for better accuracy

    if (!titleElement) return;

    // Convert "SHIRTS" to "shirt" correctly
    let currentSub = titleElement.innerText.toLowerCase().trim();
    if (currentSub.endsWith('s')) {
        currentSub = currentSub.slice(0, -1); // Removes only the last character
    }

    // Filter the master data using the cleaned string
    let dataToSort = masterData.filter(item => item.subcategory === currentSub);

    // Perform the sort
    if (sortBy === 'price-low') {
        dataToSort.sort((a, b) => a.price - b.price);
    } else if (sortBy === 'price-high') {
        dataToSort.sort((a, b) => b.price - a.price);
    } else if (sortBy === 'popularity') {
        dataToSort.sort((a, b) => b.popularity - a.popularity);
    }

    renderProducts(dataToSort); // Redraw the grid with sorted items
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
            }else {
                endMessage.classList.remove('visible');
            }
        });
    }, {
        threshold: 0.1 // Triggers when 10% of the message is visible
    });

    observer.observe(endMessage);
}

// Call this function inside your DOMContentLoaded or after your products load
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