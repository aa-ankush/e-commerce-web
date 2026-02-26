

function loadSiteComponents() {
    const componentsHTML = `
    <div class="nav-container">
        <nav class="navbar">
            <div class="nav-top">
                <div class="nav-left">
                    <i data-lucide="menu" class="icon" id="menuBtn"></i>
                </div>
                <a href="../../index.html"><div class="nav-center">
                    <div class="logo-circle">M&W</div>
                    <span class="logo-text">STUDIO</span>
                </div></a>
                <div class="nav-right">
                    
                    <a href="wishlist.html" class="wishlist-link cart-icon">
            <i data-lucide="heart"></i>
            <span class="wishlist-count cart-count-badge" id="wishlist-badge">0</span>
        </a>
        <a href="cart.html" class="cart-icon">
            <i data-lucide="shopping-bag"></i>
            <span class="cart-count-badge" id="cart-badge">0</span>
        </a>
                    
                    <div class="user-icon" id="profileBtn"><i data-lucide="user" class="icon-small"></i></div>
                </div>
            </div>
            <div class="nav-bottom">
                <div class="pill-tags">
                    <a href="../../index.html" class="pill">Men Fashion</a>
                    <a href="../../women.html" class="pill">Women Fashion</a>
                </div>
                <div class="search-container">
                    <input type="text" id="main-search"  placeholder="Find your Fashion">
                    <button class="search-btn" onclick="executeSearch()"><i data-lucide="search"></i></button>
                </div>
                <div class="pill-tags">
                    <a href="../html-pages/men-accessories.html" class="pill">Men Accessories</a>
                    <a href="../html-pages/women-accessories.html" class="pill">Women Accessories</a>
                </div>
            </div>
        </nav>
    </div>

    <div class="menu-overlay" id="menuOverlay"></div>
    <nav class="side-menu" id="sideMenu">
        <div class="menu-header">
            <h3>CATEGORIES</h3>
            <button class="close-btn" id="closeMenu">&times;</button>
        </div>
        <ul class="menu-list">
            <li class="menu-item has-submenu">
                <a href="men-shirts.html">MEN <i data-lucide="chevron-right"></i></a>
                <div class="submenu">
                    <a href="men-shirt.html">Shirt</a>
                    <a href="men-tshirt.html">T-Shirt</a>
                    <a href="men-kurta.html">Winter wear</a>
                    <a href="men-bottom.html">Bottom Wear</a>
                </div>
            </li>
            <li class="menu-item has-submenu">
                <a href="#">WOMEN <i data-lucide="chevron-right"></i></a>
                <div class="submenu">
                    <a href="women-dress.html">Dresses</a>
                    <a href="women-tops.html">Tops & Tees</a>
                    <a href="women-kurti.html">Kurti</a>
                    <a href="women-bottwear.html">Bottom Wear</a>
                </div>
            </li>
            <li class="menu-item"><a href="newarrival.html">New Arrival</a></li>
           <li class="menu-item has-submenu">
               <a href="#">ACCESSORIES <i data-lucide="chevron-right"></i></a>
               <div class="submenu">
                  <a href="men-accessories.html">Men</a>
                  <a href="">Women</a>
               </div>
            </li>
            <li class="menu-item"><a href="../../index.html">Home</a></li>
        </ul>
    </nav>

    <div class="login-modal-overlay" id="loginModal">
        <div class="login-container">
            <div class="login-image">
                <img src="../../assets/pexels-rfera-432059.jpg" alt="Login Image">
            </div>
            <div class="login-form">
                <button class="close-modal" id="closeLogin">&times;</button>
                <h2>LOGIN OR SIGNUP</h2>
                <div class="input-group">
                    <span>+91 | </span>
                    <input type="tel" placeholder="Enter mobile number" maxlength="10">
                </div>
                <button class="otp-btn">SEND OTP</button>
            </div>
        </div>
    </div>
    `;

    // Inject into the placeholder
    document.getElementById('header-placeholder').innerHTML = componentsHTML;

    // Initialize Logic and Icons
    lucide.createIcons();
    initInteractions();
}




function initInteractions() {
    // Side Menu Logic
    const menuBtn = document.querySelector('.nav-left');
    const sideMenu = document.getElementById('sideMenu');
    const menuOverlay = document.getElementById('menuOverlay');
    const closeMenu = document.getElementById('closeMenu');

    menuBtn.onclick = () => { sideMenu.classList.add('active'); menuOverlay.classList.add('active'); };
    menuBtn.addEventListener('click', () => {
        console.log("menu btn wass clicked");

    })
    closeMenu.onclick = () => { sideMenu.classList.remove('active'); menuOverlay.classList.remove('active'); };
    menuOverlay.onclick = () => { sideMenu.classList.remove('active'); menuOverlay.classList.remove('active'); };

    // Login Modal Logic
    const profileBtn = document.getElementById('profileBtn');
    const loginModal = document.getElementById('loginModal');
    const closeLogin = document.getElementById('closeLogin');

    profileBtn.onclick = () => loginModal.classList.add('show');
    closeLogin.onclick = () => loginModal.classList.remove('show');
    window.onclick = (e) => { if (e.target === loginModal) loginModal.classList.remove('show'); };
}

document.addEventListener('DOMContentLoaded', loadSiteComponents);

// footer

function loadFooter(params) {
    const footerHTML = `<footer class="footer">
  <div class="footer-container">
    <div class="footer-row">
      <div class="footer-col brand-info">
        <h2 class="footer-logo">Krist</h2>
        <div class="contact-details">
          <p><i class="fas fa-phone-alt"></i> (704) 555-0127</p>
          <p><i class="far fa-envelope"></i> krist@example.com</p>
          <p><i class="fas fa-map-marker-alt"></i> 3891 Ranchview Dr. Richardson, California 62639</p>
        </div>
      </div>

      <div class="footer-col">
        <h4>Information</h4>
        <ul>
          <li><a href="#">My Account</a></li>
          <li><a href="#">Login</a></li>
          <li><a href="#">My Cart</a></li>
          <li><a href="#">My Wishlist</a></li>
          <li><a href="#">Checkout</a></li>
        </ul>
      </div>

      <div class="footer-col">
        <h4>Service</h4>
        <ul>
          <li><a href="#">About Us</a></li>
          <li><a href="#">Careers</a></li>
          <li><a href="#">Delivery Information</a></li>
          <li><a href="#">Privacy Policy</a></li>
          <li><a href="#">Terms & Conditions</a></li>
        </ul>
      </div>

      <div class="footer-col subscribe-col">
        <h4>Subscribe</h4>
        <p class="sub-text">Enter your email below to be the first to know about new collections and product launches.</p>
        <div class="input-group">
          <i class="far fa-envelope"></i>
          <input type="email" placeholder="Your Email">
          <button type="submit"><i class="fas fa-arrow-right"></i></button>
        </div>
      </div>
    </div>

    <hr class="footer-line">

    <div class="footer-bottom">
      <div class="payment-methods">
        <img src="https://img.icons8.com/color/48/visa.png" alt="visa">
        <img src="https://img.icons8.com/color/48/mastercard.png" alt="mastercard">
        <img src="https://img.icons8.com/color/48/google-pay.png" alt="gpay">
        <img src="https://img.icons8.com/color/48/amex.png" alt="amex">
        <img src="https://img.icons8.com/color/48/paypal.png" alt="paypal">
      </div>
      
      <p class="copy-text">&copy; 2023 Krist All Rights are reserved</p>

      <div class="social-links">
        <a href="#"><i class="fab fa-facebook-f"></i></a>
        <a href="#"><i class="fab fa-instagram"></i></a>
        <a href="#"><i class="fab fa-twitter"></i></a>
      </div>
    </div>
  </div>
</footer>`;

    document.getElementById("footer").innerHTML = footerHTML
}

// CRITICAL: Call this function when the page first loads
document.addEventListener('DOMContentLoaded', loadFooter);



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
        window.location.href = `../html-pages/search-result.html?q=${encodeURIComponent(query)}&gender=${currentGender}`;
    }
    console.log("you click the button");

}


const searchInput = document.getElementById('main-search');

searchInput.addEventListener('keydown', function (event) {
    if (event.key === 'Enter') {
        event.preventDefault();
        executeSearch();
    }
});


let cartIcon = document.querySelector(".cart-icon");
cartIcon.addEventListener("click", () => {
    console.log("cart icon was clicked");
    window.location.href = `/other-pages/html-pages/cart.html`;

})

