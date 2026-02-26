async function loadCheckoutSummary() {
    const cartIds = JSON.parse(localStorage.getItem('mw_cart')) || [];
    const summaryContainer = document.getElementById('order-summary');

    const [menRes, womenRes] = await Promise.all([
        fetch('../../men-products.json'),
        fetch('../../women-products.json')
    ]);

    const allProducts = [...await menRes.json(), ...await womenRes.json()];
    const cartProducts = allProducts.filter(p => cartIds.includes(p.id));

    let total = 0;
    const itemsHtml = cartProducts.map(item => {
        total += item.price;
        const gender = (item.id >= 601) ? 'women' : 'men'; //
        return `
            <div class="summary-item">
                <img src="../../assets/images/${gender}/${item.subcategory}s/${item.img}" width="50">
                <div class="item-info">
                    <p>${item.name}</p>
                    <span>₹${item.price}</span>
                </div>
            </div>
        `;
    }).join('');

    // Prepend items before the totals
    summaryContainer.insertAdjacentHTML('afterbegin', itemsHtml);
    document.getElementById('subtotal').innerText = `₹${total}`;
    document.getElementById('grand-total').innerText = `₹${total}`;
}

document.addEventListener('DOMContentLoaded', loadCheckoutSummary);


// payment method

// Step 1: Reveal the payment section
function processCheckout() {
    // Hide the 'Continue' button and show payment
    document.querySelector('.continue-btn').style.display = 'none';
    const paymentSection = document.getElementById('payment-section');
    paymentSection.style.display = 'block';

    // Scroll to the payment section smoothly
    paymentSection.scrollIntoView({ behavior: 'smooth' });
    console.log("button was clicked");
    
}


function processCheckout() {
    // 1. Select all required inputs and selects
    const requiredElements = document.querySelectorAll('input[required], select[required]');
    let allValid = true;
    let firstMissingField = null;

    // 2. Loop through every single required field
    requiredElements.forEach(el => {
        if (!el.value.trim() || el.value === "") {
            allValid = false;
            el.style.border = "2px solid #ff4d4d"; // Red border for errors

            if (!firstMissingField) firstMissingField = el;
        } else {
            el.style.border = "1px solid #ddd"; // Reset to normal
        }
    });

    // 3. Final Decision
    if (allValid) {
        // Hide the current button and show the payment rectangle
        document.querySelector('.continue-btn').style.display = 'none';
        const paymentSection = document.getElementById('payment-section');
        paymentSection.style.display = 'block';

        // Smooth scroll to the payment options
        paymentSection.scrollIntoView({ behavior: 'smooth' });
    } else {
        // Use your custom notification from master.js
        showNotification("All fields are required. Please check the red boxes.");

        // Focus on the first empty box to help the user
        if (firstMissingField) firstMissingField.focus();
    }
}




// Step 2: Complete the order
function completeOrder() {
    const selectedPayment = document.querySelector('input[name="payment"]:checked');

    if (!selectedPayment) {
        showNotification("Please select a payment method!"); // Using your custom alert
        return;
    }

    // Show final success notification
    showNotification("Order Placed! Your items are on the way.");

    // Clear the cart after a successful order
    localStorage.removeItem('mw_cart');

    // Optional: Redirect to home page after 3 seconds
    setTimeout(() => {
        window.location.href = "../../index.html";
    }, 2000);
}


function showNotification(message) {
    const alertBar = document.getElementById('custom-alert');
    const alertMsg = document.getElementById('alert-message');

    if (!alertBar) return;

    // Set the message dynamically
    alertMsg.innerText = message;

    // Show the bar
    alertBar.classList.add('show');

    // Hide it automatically after 3 seconds
    setTimeout(() => {
        alertBar.classList.remove('show');
    }, 3000);
}

function processCheckout() {
    const requiredElements = document.querySelectorAll('input[required], select[required]');
    let allValid = true;

    requiredElements.forEach(el => {
        if (!el.value.trim()) {
            allValid = false;
            el.style.border = "2px solid red";
        } else {
            el.style.border = "1px solid #ddd";
        }
    });

    if (allValid) {
        // Show the modal like your login container
        document.getElementById('paymentModal').style.display = 'flex';
    } else {
        showNotification("Please fill all required fields first!");
    }
}

function closePaymentModal() {
    document.getElementById('paymentModal').style.display = 'none';
}


window.addEventListener('click', (e) => {
    const modal = document.getElementById('paymentModal');
    if (e.target === modal) {
        closePaymentModal();
    }
});