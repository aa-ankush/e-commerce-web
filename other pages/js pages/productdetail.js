async function loadProductDetail() {
    // 1. Get the ID from the URL (e.g., ?id=3)
    const urlParams = new URLSearchParams(window.location.search);
    const productId = parseInt(urlParams.get('id'));
    const gender = urlParams.get('gender') || 'men'; // Default to men if missing
    try {
        // 2. Fetch the same JSON file you used for the listing
        const response = await fetch(`../../${gender}-products.json`);
        const products = await response.json();

        // 3. Find the specific product that matches the ID
        const product = products.find(p => p.id === productId);

        if (product) {
            renderDetail(product, gender);
            // NEW: Load related products based on subcategory
            loadRelatedProducts(products, product,gender);
        } else {
            document.getElementById('detail-content').innerHTML = "<h2>Product Not Found</h2>";
        }
    } catch (error) {
        console.error("Error loading product details:", error);
    }
   
}

function renderDetail(product,gender) {
    const container = document.getElementById('detail-content');
    const dynamicPath = `../../assets/images/${gender}/${product.subcategory}s/${product.img}`;

    container.innerHTML = `
        <div class="detail-images">
           
            <img src="${dynamicPath}" alt="${product.name}">
        </div>
        <div class="detail-info">
            <p class="breadcrumb">Home / Men / ${product.cat}</p>
            <h1>${product.name}</h1>
            <p class="price">₹ ${product.price}</p>
            <p class="tax-info">Price incl. of all taxes</p>
            
            <div class="size-selector">
                <p>Select a size: <a href="#">SIZE CHART</a></p>
                <div class="size-buttons">
                    <button>S</button><button>M</button><button>L</button><button>XL</button>
                </div>
            </div>

             <button class="btn-add-cart" onclick="addToCart(${product.id})">
                    <i data-lucide="shopping-cart"></i> Add to cart
                </button>
                 <button type="button" class="wishlist-btn"
                onclick="event.preventDefault(); event.stopPropagation(); handleWishlistClick(${product.id}, this)">
                <i class="icon" data-lucide="heart">wishlist</i>
            </button>
            
            <div class="product-description">
                <h4>Product Description</h4>
                <p>This ${product.name} features a premium heavy gauge fabric, perfect for a modern oversized fit.</p>
            </div>
        </div>
    `;
}

loadProductDetail();


function loadRelatedProducts(allProducts, currentProduct,gender) {
    const relatedGrid = document.getElementById('related-grid');
    

    // Filter for products in the same subcategory, excluding current ID
    const related = allProducts
        .filter(p => p.subcategory === currentProduct.subcategory && p.id !== currentProduct.id)
       // Show only the first 4 results

    relatedGrid.innerHTML = related.map(item => `
        <div class="product-card" onclick="window.location.href='product-detail.html?id=${item.id}&gender=${gender}'">
            <div class="related-images">
                <img src="../../assets/images/${gender}/${item.subcategory}s/${item.img}" alt="${item.name}">
            </div>
            <div class="product-info">
                <h3>${item.name}</h3>
                <p>₹ ${item.price}</p>
            </div>
        </div>
    `).join('');
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

// Call this function inside your DOMContentLoaded or after your products load
document.addEventListener('DOMContentLoaded', () => {
    // ... your existing fetch logic ...
    initScrollObserver();
});


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
