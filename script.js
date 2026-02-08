
const slides = document.querySelectorAll('.slide');
let currentSlide = 0;

function nextSlide() {
    // Remove 'active' class from current slide
    slides[currentSlide].classList.remove('active');

    // Move to next slide, or back to start if at the end
    currentSlide = (currentSlide + 1) % slides.length;

    // Add 'active' class to the new slide
    slides[currentSlide].classList.add('active');
}

// Change image every 5000ms (5 seconds)
setInterval(nextSlide, 5000);



// side-menu---------------------------------------------
const menuBtn = document.querySelector('.nav-left');
const sideMenu = document.getElementById('sideMenu');
const closeBtn = document.getElementById('closeMenu');
const overlay = document.getElementById('menuOverlay');

// Function to Open Menu
menuBtn.addEventListener('click', () => {
    sideMenu.classList.add('active');
    overlay.classList.add('active');
    console.log("click");

});

// Function to Close Menu
const hideMenu = () => {
    sideMenu.classList.remove('active');
    overlay.classList.remove('active');
};

closeBtn.addEventListener('click', hideMenu);
overlay.addEventListener('click', hideMenu);

// Re-initialize icons for the menu arrows
lucide.createIcons();


// login-------------------------------------------container
// Get elements
const profileIcon = document.querySelector('.user-icon'); // Replace with your profile icon class
const loginModal = document.getElementById('loginModal');
const closeLogin = document.getElementById('closeLogin');

// Open Modal when clicking Profile
profileIcon.addEventListener('click', () => {
    loginModal.classList.add('show');
});

// Close Modal when clicking the 'X'
closeLogin.addEventListener('click', () => {
    loginModal.classList.remove('show');
});

// Close Modal when clicking outside the box
window.addEventListener('click', (e) => {
    if (e.target === loginModal) {
        loginModal.classList.remove('show');
    }
});

// testimonial---------------------------------------section
// Initialize Icons
lucide.createIcons();

const track = document.getElementById('track');
const prevBtn = document.getElementById('prevBtn');
const nextBtn = document.getElementById('nextBtn');
const cards = document.querySelectorAll('.testimonial-card');

let index = 0;

function updateSlider() {
    // Calculate width of one card + gap
    const cardWidth = cards[0].offsetWidth + 25;
    track.style.transform = `translateX(-${index * cardWidth}px)`;
}

nextBtn.addEventListener('click', () => {
    // Prevent sliding past the last available view
    if (index < cards.length - 3) {
        index++;
        updateSlider();
    }
});

prevBtn.addEventListener('click', () => {
    if (index > 0) {
        index--;
        updateSlider();
    }
});

// Update on window resize to keep it aligned
window.addEventListener('resize', updateSlider);

// new arrival------------------------------------------------------

let currentSlideIndex = 0;

async function initArrivalSlider() {
    const container = document.querySelector('.arrival.container');
    const gender = container ? container.getAttribute('data-gender') : 'men';

    const response = await fetch(`${gender}-products.json`);
    const products = await response.json();

    // Get the latest 6 products (sorted by date)
    const newArrivals = products.sort((a, b) => b.date - a.date).slice(0, 10);

    const track = document.getElementById('arrival-track');

    track.innerHTML = newArrivals.map(item => `
    <a href="other-pages/html-pages/product-detail.html?id=${item.id}&gender=${gender}" class="slide-item">
            <img src="assets/images/${gender}/${item.subcategory}s/${item.img}" alt="${item.name}">
            <div class="slide-content">
                <h3>${item.subcategory}<br><span>${item.cat}<span/></h3>
                <p>STARTING AT ₹${item.price}</p>
            </div>
        </a>
    `).join('');

    setInterval(autoSlide, 3000);
}

function autoSlide() {
    const track = document.getElementById('arrival-track');
    const totalSlides = document.querySelectorAll('.slide-item').length;

    // Move by 1 slide width at a time
    currentSlideIndex++;

    if (currentSlideIndex > totalSlides - 3) {
        currentSlideIndex = 0; // Reset to beginning
    }

    const movePercentage = currentSlideIndex * (100 / 3);
    track.style.transform = `translateX(-${movePercentage}%)`;
}

// Initialize when page loads
document.addEventListener('DOMContentLoaded', initArrivalSlider);


//search-result---------------------------------------------------------------
function executeSearch() {
    const searchInput = document.getElementById('main-search');
    const query = searchInput.value.trim();

    // 1. Detect current context (Men or Women)
    // We check if the 'women' index or category page is active
    const isWomenSection = window.location.href.includes('women');
    const currentGender = isWomenSection ? 'women' : 'men'

    if (query) {
        // This line is responsible for the "Jump" to the new page
        window.location.href = `other-pages/html-pages/search-result.html?q=${encodeURIComponent(query)}&gender=${currentGender}`;
    }
    console.log("you click the button");

}


const searchInput = document.getElementById('main-search');

searchInput.addEventListener('keydown', function (event) {
    if (event.key === 'Enter') {
        // This stops the page from doing its default "form reload"
        event.preventDefault();

        // Triggers your existing search function
        executeSearch();
    }
});


let cartIcon = document.querySelector(".cart-icon");
cartIcon.addEventListener("click", () => {
    console.log("cart icon was clicked");
    window.location.href = `other-pages/html-pages/cart.html`;

})



// deal & trending section 


async function loadHomeSections() {
    const container = document.querySelector('.container[data-gender]');
    const gender = container ? container.getAttribute('data-gender') : 'men';

    try {
        const response = await fetch(`${gender}-products.json`);
        const products = await response.json();

        // 1. Logic for Trending Now (Items with high popularity)
        const trendingItems = products.filter(p => p.popularity >= 90).slice(0, 10);
        renderHomeGrid('trending-grid', trendingItems, gender);

        // 2. Logic for Deal of the Day (Specific IDs or a random selection)
        const dealItems = products.filter(p => p.id >= 301 && p.id <= 700).slice(0, 10);
        renderHomeGrid('deal-grid', dealItems, gender);

    } catch (error) {
        console.error("Error loading home sections:", error);
    }
}

// Reusable render function to keep your HTML clean
function renderHomeGrid(containerId, items, gender) {
    const grid = document.getElementById(containerId);
    if (!grid) return;

    grid.innerHTML = items.map(item => `
    <div class="product-card" onclick="window.location.href='other-pages/html-pages/product-detail.html?id=${item.id}&gender=${gender}'">
            <div class="image-container">
                <img src="assets/images/${gender}/${item.subcategory}s/${item.img}" alt="${item.name}">
                 <button type="button" class="wishlist-btn"
                onclick="event.preventDefault(); event.stopPropagation(); handleWishlistClick(${item.id}, this)">
                <i class="icon" data-lucide="heart">wishlist</i>
            </button>
            </div>
            <div class="product-info">
                <div class="product-header">
                    <p class="product-name">${item.name}</p>
                    <div class="product-actions">
                        
                    </div>
                </div>
                <div class="price-row">
                    <span class="original-price">₹1,749</span>
                    <span class="current-price">₹${item.price}</span>
                    <span class="discount">60% OFF</span>
                </div>
            </div>
        </div>
    `).join('');

    // Refresh icons
    lucide.createIcons();
}

document.addEventListener('DOMContentLoaded', loadHomeSections);



function moveSlider(containerId, direction) {
    const container = document.getElementById(containerId);
    if (!container) return;

    const scrollAmount = container.querySelector('.product-card').offsetWidth + 20; // Card width + gap
    container.scrollBy({
        left: direction * scrollAmount,
        behavior: 'smooth'
    });
}
// wishlist---------------------------------------------------------------------------------------------------
// Add this function to update the red number on the heart
function updateWishlistBadge() {
    const wishlist = JSON.parse(localStorage.getItem('mw_wishlist')) || [];
    const badge = document.getElementById('wishlist-badge');
    if (badge) {
        badge.innerText = wishlist.length;
        badge.style.display = wishlist.length > 0 ? 'flex' : 'none';
    }
}


// CRITICAL: Call this function when the page first loads
document.addEventListener('DOMContentLoaded', updateWishlistBadge)



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