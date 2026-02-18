async function loadNewArrivalsPage() {
    const params = new URLSearchParams(window.location.search);
    const gender = params.get('gender') || 'men'; //

    try {
        const response = await fetch(`../../${gender}-products.json`); //
        const products = await response.json();

        // 1. Sort the products by date (Newest First)
        // Numerically, 202501 is larger than 202412, so b - a works perfectly.
        const sortedProducts = products.sort((a, b) => b.date - a.date);

        // 2. Decide how many "new" items to show (e.g., top 20 latest items)
        const latestItems = sortedProducts.slice(0, 100);

        renderNewArrivalGrid(latestItems, gender); //
    } catch (error) {
        console.error("Error loading products:", error);
    }
}

function renderNewArrivalGrid(data, gender) {
    const grid = document.getElementById('new-arrival-grid');

    grid.innerHTML = data.map(item => {
        // Build the image path using gender and subcategory
        const imgPath = `../../assets/images/${gender}/${item.subcategory}s/${item.img}`;

        return `
            <div class="product-card" onclick="window.location.href='../html-pages/product-detail.html?id=${item.id}'">
                <div class="image-container">
                    <img class="img" src="../../assets/images/men/${item.subcategory}s/${item.img}" alt="${item.name}">
                     <button type="button" class="wishlist-btn"
                onclick="event.preventDefault(); event.stopPropagation(); handleWishlistClick(${item.id}, this)">
                <i class="icon" data-lucide="heart">wishlist</i>
            </button>
                </div>
                <div class="product-info">
                    <div class="product-header">
                        <p class="product-name">${item.name}</p>
                        <div class="product-actions">
                            <i data-lucide="bookmark"></i>
                        </div>
                    </div>
                    <div class="price-row">
                        <span class="original-price">₹1,749</span>
                        <span class="current-price">₹${item.price}</span>
                        <span class="discount">SPECIAL OFFER</span>
                    </div>
                </div>
            </div>
        `;
    }).join('');

    if (window.lucide) lucide.createIcons();
}

// Add this at the end of new-arrival.js
document.addEventListener('DOMContentLoaded', loadNewArrivalsPage);







// offers-logic.js
async function loadOffers() {
    try {
        const response = await fetch('../../men-products.json');
        const products = await response.json();

        // Filter products that have a high discount or specific offer flag
        // Example: Items under 1200 as "Offers"
        const offerItems = products.filter(p => p.price < 1200);

        const grid = document.getElementById('offers-grid');
        if (!grid) return;

        grid.innerHTML = offerItems.map(item => `
            <div class="product-card" onclick="window.location.href='../html-pages/product-detail.html?id=${item.id}'">
                <div class="image-container">
                    <img class="img" src="../../assets/images/men/${item.subcategory}s/${item.img}" alt="${item.name}">
                     <button type="button" class="wishlist-btn"
                onclick="event.preventDefault(); event.stopPropagation(); handleWishlistClick(${item.id}, this)">
                <i class="icon" data-lucide="heart">wishlist</i>
            </button>
                </div>
                <div class="product-info">
                    <div class="product-header">
                        <p class="product-name">${item.name}</p>
                        <div class="product-actions">
                            <i data-lucide="bookmark"></i>
                        </div>
                    </div>
                    <div class="price-row">
                        <span class="original-price">₹1,749</span>
                        <span class="current-price">₹${item.price}</span>
                        <span class="discount">SPECIAL OFFER</span>
                    </div>
                </div>
            </div>
        `).join('');

        lucide.createIcons();
    } catch (error) {
        console.error("Error loading offers:", error);
    }
}

document.addEventListener('DOMContentLoaded', loadOffers);
