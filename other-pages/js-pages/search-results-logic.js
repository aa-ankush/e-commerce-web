async function loadSearchResults() {
    const params = new URLSearchParams(window.location.search);
    const query = params.get('q');

    // 1. Get the gender context from the URL
    const genderContext = params.get('gender') || 'men';


    if (!query) return;

    document.getElementById('search-title').innerText = `Search Results for "${query}"`;


    try {
        // 2. Fetch ONLY the relevant JSON file
        const response = await fetch(`../../${genderContext}-products.json`);
        const products = await response.json();

        // 3. Filter as usual
        const searchTerms = query.toLowerCase().split(" ");
        const filteredResults = products.filter(product => {
            const productData = `${product.name} ${product.subcategory} ${product.cat}`.toLowerCase();
            return searchTerms.every(term => productData.includes(term));
        });

        // 4. Render results
        renderSearchResults(filteredResults, genderContext);
    }

    
    catch (error) {
        console.error("Failed to load products:", error);
    }
 
}

function renderSearchResults(filteredResults, ) {
    const grid = document.getElementById('search-results-grid');

    grid.innerHTML = filteredResults.map(product => {
        // Automatically detect gender based on your ID range (e.g., Women start at 604)
        const gender = (product.id >= 604) ? 'women' : 'men';

        // Construct the correct path for either gender
        const dynamicPath = `../../assets/images/${gender}/${product.subcategory}s/${product.img}`;

        return `
            <a href="product-detail.html?id=${product.id}&gender=${gender}" class="product-card">
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

    if (window.lucide) lucide.createIcons();
}

document.addEventListener('DOMContentLoaded', loadSearchResults);

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



document.addEventListener('DOMContentLoaded', () => {
    const searchInput = document.getElementById('main-search');

    if (searchInput) {
        searchInput.addEventListener('keypress', (e) => {
            if (e.key === 'Enter') {
                executeSearch();
            }
        });
    }
});


// Function to persist search text in the input field
function persistSearchQuery() {
    const urlParams = new URLSearchParams(window.location.search);
    const query = urlParams.get('q'); // 'q' is the parameter from executeSearch()

    if (query) {
        const searchInput = document.getElementById('main-search');
        if (searchInput) {
            searchInput.value = decodeURIComponent(query);
        }
    }
}


document.addEventListener('DOMContentLoaded', persistSearchQuery);
