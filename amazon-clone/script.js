const products = [
    {
        id: 1,
        name: "Wireless Headphones",
        category: "electronics",
        price: 1499,
        oldPrice: 2499,
        icon: "🎧",
        rating: "★★★★★"
    },
    {
        id: 2,
        name: "Smart Watch",
        category: "electronics",
        price: 1999,
        oldPrice: 2999,
        icon: "⌚",
        rating: "★★★★☆"
    },
    {
        id: 3,
        name: "Laptop",
        category: "electronics",
        price: 49999,
        oldPrice: 59999,
        icon: "💻",
        rating: "★★★★★"
    },
    {
        id: 4,
        name: "Running Shoes",
        category: "fashion",
        price: 1299,
        oldPrice: 1999,
        icon: "👟",
        rating: "★★★★☆"
    },
    {
        id: 5,
        name: "Premium T-Shirt",
        category: "fashion",
        price: 699,
        oldPrice: 999,
        icon: "👕",
        rating: "★★★★☆"
    },
    {
        id: 6,
        name: "Backpack",
        category: "fashion",
        price: 999,
        oldPrice: 1499,
        icon: "🎒",
        rating: "★★★★★"
    },
    {
        id: 7,
        name: "Programming Book",
        category: "books",
        price: 599,
        oldPrice: 899,
        icon: "📚",
        rating: "★★★★★"
    },
    {
        id: 8,
        name: "JavaScript Guide",
        category: "books",
        price: 749,
        oldPrice: 1099,
        icon: "📖",
        rating: "★★★★☆"
    }
];

let cart = JSON.parse(localStorage.getItem("shopzoneCart")) || [];

let wishlist =
    JSON.parse(localStorage.getItem("shopzoneWishlist")) || [];

function toggleWishlist(id) {
    const product = products.find(item => item.id === id);
    if (!product) return;

    if (wishlist.includes(id)) {
        wishlist = wishlist.filter(item => item !== id);
        showToast(`${product.name} removed from wishlist`);
    } else {
        wishlist.push(id);
        showToast(`${product.name} added to wishlist ❤️`);
    }

    localStorage.setItem(
        "shopzoneWishlist",
        JSON.stringify(wishlist)
    );

    displayProducts();
    updateWishlistCount();
displayWishlist();
}

/* =========================
   WISHLIST PANEL
========================= */

function updateWishlistCount() {
    const count = document.getElementById("wishlistCount");

    if (count) {
        count.textContent = wishlist.length;
    }
}


function openWishlist() {
    const overlay = document.getElementById("wishlistOverlay");

    if (overlay) {
        overlay.style.display = "flex";
    }

    displayWishlist();
}


function closeWishlist() {
    const overlay = document.getElementById("wishlistOverlay");

    if (overlay) {
        overlay.style.display = "none";
    }
}


function displayWishlist() {

    const container = document.getElementById("wishlistItems");

    if (!container) return;

    const savedProducts = products.filter(product =>
        wishlist.includes(product.id)
    );

    if (savedProducts.length === 0) {

        container.innerHTML = `
            <div class="wishlist-empty">
                <i class="fa-regular fa-heart"></i>
                <h3>Your wishlist is empty</h3>
                <p>Add products you love ❤️</p>
            </div>
        `;

        return;
    }

    container.innerHTML = savedProducts.map(product => `

        <div class="wishlist-item">

            <div class="wishlist-item-info">

                <h3>${product.icon} ${product.name}</h3>

                <strong>
                    ₹${product.price.toLocaleString("en-IN")}
                </strong>

            </div>

            <button
                class="wishlist-remove"
                onclick="toggleWishlist(${product.id})">
                <i class="fa-solid fa-trash"></i>
            </button>

        </div>

    `).join("");
}

/* =========================
   PRODUCT DISPLAY
========================= */

function displayProducts(list = products) {

    const grid = document.getElementById("productGrid");

    if (!grid) return;

    if (list.length === 0) {
        grid.innerHTML = `
            <div style="grid-column:1/-1;text-align:center;padding:50px">
                <h3>No products found</h3>
                <p style="margin-top:8px;color:#667085">
                    Try another search or category.
                </p>
            </div>
        `;
        return;
    }

    grid.innerHTML = list.map(product => `

        <div class="product-card">

            <div class="product-image">
    ${product.icon}

<button
    class="wishlist-btn ${wishlist.includes(product.id) ? "active" : ""}"
    onclick="toggleWishlist(${product.id})"
    title="Wishlist">
    <span>${wishlist.includes(product.id) ? "♥" : "♡"}</span>
</button>

</div>

            <div class="product-info">

                <h3>${product.name}</h3>

                <div class="rating">
                    ${product.rating}
                </div>

                <div class="price">
                    ₹${product.price.toLocaleString("en-IN")}
                    <span class="old-price">
                        ₹${product.oldPrice.toLocaleString("en-IN")}
                    </span>
                </div>

                <button
                    class="add-cart"
                    onclick="addToCart(${product.id})">
                    <i class="fa-solid fa-cart-plus"></i>
                    Add to Cart
                </button>

            </div>

        </div>

    `).join("");
}


/* =========================
   ADD TO CART
========================= */

function addToCart(id) {

    const product = products.find(item => item.id === id);

    if (!product) return;

    cart.push(product);

    saveCart();
    updateCart();

    showToast(`${product.name} added to cart`);
}


/* =========================
   UPDATE CART
========================= */

function updateCart() {

    const cartCount = document.getElementById("cartCount");
    const cartItems = document.getElementById("cartItems");
    const cartTotal = document.getElementById("cartTotal");

    if (cartCount) {
        cartCount.textContent = cart.length;
    }

    if (!cartItems || !cartTotal) return;

    if (cart.length === 0) {

        cartItems.innerHTML = `
            <div style="text-align:center;padding:30px 10px">
                <div style="font-size:45px">🛒</div>
                <h3 style="margin-top:12px">Your cart is empty</h3>
                <p style="color:#667085;margin-top:6px">
                    Add some products to get started.
                </p>
            </div>
        `;

        cartTotal.textContent = "₹0";
        return;
    }

    /* Group same products */
    const groupedCart = {};

    cart.forEach(item => {
        if (!groupedCart[item.id]) {
            groupedCart[item.id] = {
                product: item,
                quantity: 0
            };
        }

        groupedCart[item.id].quantity++;
    });

    cartItems.innerHTML = Object.values(groupedCart).map(item => {

        const product = item.product;
        const quantity = item.quantity;

        return `
            <div class="cart-item">

                <div>
                    <strong>${product.name}</strong>

                    <br>

                    <span>
                        ₹${product.price.toLocaleString("en-IN")}
                    </span>
                </div>

                <div style="
                    display:flex;
                    align-items:center;
                    gap:10px;
                    margin-left:15px;
                ">

                    <button
                        onclick="changeQuantity(${product.id}, -1)"
                        style="
                            width:30px;
                            height:30px;
                            border:1px solid #ddd;
                            background:white;
                            border-radius:6px;
                            cursor:pointer;
                            font-size:18px;
                        ">
                        −
                    </button>

                    <strong>${quantity}</strong>

                    <button
                        onclick="changeQuantity(${product.id}, 1)"
                        style="
                            width:30px;
                            height:30px;
                            border:1px solid #ddd;
                            background:white;
                            border-radius:6px;
                            cursor:pointer;
                            font-size:18px;
                        ">
                        +
                    </button>

                    <button
                        onclick="removeProductFromCart(${product.id})"
                        title="Remove item"
                        style="
                            border:0;
                            background:none;
                            cursor:pointer;
                            font-size:16px;
                            margin-left:5px;
                        ">
                        🗑️
                    </button>

                </div>

            </div>
        `;

    }).join("");

    const total = cart.reduce(
        (sum, item) => sum + item.price,
        0
    );

    cartTotal.textContent =
        `₹${total.toLocaleString("en-IN")}`;
}


function changeQuantity(id, change) {

    const product = products.find(item => item.id === id);

    if (!product) return;

    if (change === 1) {

        cart.push(product);

    } else if (change === -1) {

        const index = cart.findIndex(item => item.id === id);

        if (index !== -1) {
            cart.splice(index, 1);
        }
    }

    saveCart();
    updateCart();
}


function removeProductFromCart(id) {

    cart = cart.filter(item => item.id !== id);

    saveCart();
    updateCart();

    showToast("Product removed from cart");
}



/* =========================
   REMOVE FROM CART
========================= */

function removeFromCart(index) {

    if (index < 0 || index >= cart.length) return;

    const removed = cart[index];

    cart.splice(index, 1);

    saveCart();
    updateCart();

    showToast(`${removed.name} removed`);
}


/* =========================
   SAVE CART
========================= */

function saveCart() {

    localStorage.setItem(
        "shopzoneCart",
        JSON.stringify(cart)
    );
}


/* =========================
   OPEN CART
========================= */

function openCart() {

    const overlay =
        document.getElementById("cartOverlay");

    if (overlay) {
        overlay.style.display = "flex";
    }

    updateCart();
}


/* =========================
   CLOSE CART
========================= */

function closeCart() {

    const overlay =
        document.getElementById("cartOverlay");

    if (overlay) {
        overlay.style.display = "none";
    }
}


/* =========================
   CHECKOUT
========================= */

function checkout() {
    openCheckout();
}

/* =========================
   CATEGORY FILTER
========================= */

function filterCategory(category) {

    let filteredProducts;

    if (category === "all") {

        filteredProducts = products;

    } else {

        filteredProducts = products.filter(
            product => product.category === category
        );
    }

    displayProducts(filteredProducts);

    const productsSection =
        document.getElementById("products");

    if (productsSection) {

        productsSection.scrollIntoView({
            behavior: "smooth"
        });
    }
}


/* =========================
   PRODUCT SEARCH
========================= */

function performSearch(inputId) {
    const input = document.getElementById(inputId);

    if (!input) return;

    const query = input.value.trim().toLowerCase();

    const categories = document.querySelector(".categories");
    const hero = document.querySelector(".hero");
    const productsSection = document.getElementById("products");

    if (!query) {
        displayProducts(products);

        if (categories) categories.style.display = "";
        if (hero) hero.style.display = "";

        return;
    }

    const results = products.filter(product =>
        product.name.toLowerCase().includes(query) ||
        product.category.toLowerCase().includes(query)
    );

    if (results.length === 0) {
        displayProducts([]);
        showToast("No product found");
        return;
    }

    /* Search result ko sabse pehle dikhana */
    if (categories) categories.style.display = "none";
    if (hero) hero.style.display = "none";

    displayProducts(results);

    if (productsSection) {
        productsSection.scrollIntoView({
            behavior: "smooth",
            block: "start"
        });
    }
}


/* Desktop search */
function searchProducts() {
    performSearch("searchInput");
}


/* Mobile search */
function mobileSearchProducts() {
    performSearch("mobileSearchInput");
}


/* Search with Enter */
document.addEventListener("DOMContentLoaded", () => {

    const searchInput =
        document.getElementById("searchInput");

    const mobileSearchInput =
        document.getElementById("mobileSearchInput");

    if (searchInput) {
        searchInput.addEventListener("keydown", event => {
            if (event.key === "Enter") {
                searchProducts();
            }
        });
    }

    if (mobileSearchInput) {
        mobileSearchInput.addEventListener("keydown", event => {
            if (event.key === "Enter") {
                mobileSearchProducts();
            }
        });
    }

});


/* =========================
   MOBILE MENU
========================= */

function toggleMenu() {

    const menu =
        document.getElementById("mobileMenu");

    if (!menu) return;

    menu.style.display =
        menu.style.display === "block"
            ? "none"
            : "block";
}


/* =========================
   NEWSLETTER
========================= */

function subscribe() {

    showToast("Thanks for subscribing!");
}


/* =========================
   TOAST NOTIFICATION
========================= */

function showToast(message) {

    let toast =
        document.getElementById("shopToast");

    if (!toast) {

        toast = document.createElement("div");

        toast.id = "shopToast";

        toast.style.cssText = `
            position:fixed;
            bottom:25px;
            right:25px;
            z-index:9999;
            background:#172b4d;
            color:white;
            padding:14px 20px;
            border-radius:8px;
            box-shadow:0 8px 25px rgba(0,0,0,.2);
            font-size:14px;
            transition:opacity .3s;
        `;

        document.body.appendChild(toast);
    }

    toast.textContent = message;
    toast.style.opacity = "1";

    clearTimeout(window.toastTimer);

    window.toastTimer = setTimeout(() => {

        toast.style.opacity = "0";

    }, 2000);
}


/* =========================
   SEARCH WITH ENTER KEY
========================= */

document.addEventListener("DOMContentLoaded", () => {

    const searchInput =
        document.getElementById("searchInput");

    if (searchInput) {

        searchInput.addEventListener(
            "keydown",
            event => {

                if (event.key === "Enter") {
                    searchProducts();
                }

            }
        );
    }

    displayProducts();
    updateCart();
});


function toggleDarkMode() {
    document.body.classList.toggle("dark-mode");

    const isDark =
        document.body.classList.contains("dark-mode");

    localStorage.setItem("shopzoneDarkMode", isDark);

    updateThemeIcon();
}

function updateThemeIcon() {
    const icon = document.getElementById("themeIcon");

    if (!icon) return;

    const isDark =
        document.body.classList.contains("dark-mode");

    icon.className = isDark
        ? "fa-solid fa-sun"
        : "fa-solid fa-moon";
}

function loadDarkMode() {
    if (localStorage.getItem("shopzoneDarkMode") === "true") {
        document.body.classList.add("dark-mode");
    }

    updateThemeIcon();
}

loadDarkMode();

/* =========================
   LOGIN
========================= */

function openLogin() {
    document.getElementById("loginModal").style.display = "flex";
}

function closeLogin() {
    document.getElementById("loginModal").style.display = "none";
}

function loginUser(event) {

    event.preventDefault();

    const email =
        document.getElementById("loginEmail").value;

    if (!email) return;

    localStorage.setItem("shopzoneUser", email);

    closeLogin();

    showToast("Login successful! 👋");
}


/* =========================
   CHECKOUT
========================= */

function openCheckout() {

    if (cart.length === 0) {
        showToast("Your cart is empty");
        return;
    }

    const modal =
        document.getElementById("checkoutModal");

    modal.style.display = "flex";

    displayCheckoutItems();
}


function closeCheckout() {

    document.getElementById("checkoutModal")
        .style.display = "none";
}


function displayCheckoutItems() {

    const container =
        document.getElementById("checkoutItems");

    if (!container) return;

    container.innerHTML = cart.map(item => `
        <div class="checkout-item">

            <span>${item.name}</span>

            <strong>
                ₹${item.price.toLocaleString("en-IN")}
            </strong>

        </div>
    `).join("");

    const total = cart.reduce(
        (sum, item) => sum + item.price,
        0
    );

    document.getElementById("checkoutSubtotal")
        .textContent = `₹${total.toLocaleString("en-IN")}`;

    document.getElementById("checkoutTotal")
        .textContent = `₹${total.toLocaleString("en-IN")}`;
}


/* =========================
   PLACE ORDER
========================= */

function placeOrder() {

    const name =
        document.getElementById("checkoutName").value;

    const phone =
        document.getElementById("checkoutPhone").value;

    const address =
        document.getElementById("checkoutAddress").value;

    if (!name || !phone || !address) {

        showToast("Please fill delivery details");

        return;
    }

    closeCheckout();

    cart = [];

    saveCart();
    updateCart();

    showToast("Order placed successfully! 🎉");
}

updateWishlistCount();




