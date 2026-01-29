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
            <div class="product-card" onclick="window.location.href='../html pages/product-detail.html?id=${item.id}'">
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