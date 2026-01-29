// wishlist-display.js
async function renderWishlist() {
  const wishlistIds = JSON.parse(localStorage.getItem("mw_wishlist")) || [];
  const grid = document.getElementById("wishlist-grid");

  const response = await fetch("../../men-products.json");
  const allProducts = await response.json();

  // Filter: Only show products whose ID is in our wishlist list
  const myItems = allProducts.filter((p) => wishlistIds.includes(p.id));

  if (myItems.length === 0) {
    grid.innerHTML = "<p>Your wishlist is empty!</p>";
    return;
  }
  

  grid.innerHTML = // Inside your renderWishlist function in wishlist-display.js
    grid.innerHTML = myItems
      .map(
        (item) => `
    <div class="wishlist-item" onclick="window.location.href='../html pages/product-detail.html?id=${item.id}'">
        <div class="product-image">
            <img src="../../assets/images/men/${item.subcategory}s/${item.img}" alt="${item.name}">
            <button class="btn-remove" onclick="removeFromWishlist(${item.id})"><i data-lucide="x"></i>    </button>
        </div>
        <div class="product-info">
            <h3 class="product-title">${item.name}</h3>
            
            <div class="price-box">
                <span class="discount-price">₹${item.price}</span>
            </div>
            <div class="action-buttons">
                
                <button class="btn-add-cart" onclick="addToCart(${item.id})">
                    <i data-lucide="shopping-cart"></i> Move to Cart
                </button>
            </div>
        </div>
    </div>
`,
      )
      .join("");
  lucide.createIcons();

  lucide.createIcons();
}

function removeFromWishlist(id) {
  let wishlist = JSON.parse(localStorage.getItem("mw_wishlist")) || [];
  wishlist = wishlist.filter((itemId) => itemId !== id);
  localStorage.setItem("mw_wishlist", JSON.stringify(wishlist));
  renderWishlist(); // Refresh the page
  updateWishlistBadge(); // Update navbar
}

document.addEventListener("DOMContentLoaded", renderWishlist);
