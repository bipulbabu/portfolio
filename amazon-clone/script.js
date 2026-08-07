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

    cartItems.innerHTML = cart.map((item, index) => `

        <div class="cart-item">

            <div>
                <strong>${item.name}</strong>

                <br>

                <span>
                    ₹${item.price.toLocaleString("en-IN")}
                </span>
            </div>

            <button
                onclick="removeFromCart(${index})"
                title="Remove item"
                style="
                    border:0;
                    background:none;
                    cursor:pointer;
                    font-size:16px;
                ">
                <i class="fa-solid fa-trash"></i>
            </button>

        </div>

    `).join("");

    const total = cart.reduce(
        (sum, item) => sum + item.price,
        0
    );

    cartTotal.textContent =
        `₹${total.toLocaleString("en-IN")}`;
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

    if (cart.length === 0) {

        showToast("Your cart is empty");

        return;
    }

    showToast("Checkout page coming soon!");
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
   SEARCH
========================= */

function searchProducts() {

    const searchInput =
        document.getElementById("searchInput");

    const categorySelect =
        document.getElementById("category");

    if (!searchInput || !categorySelect) return;

    const search =
        searchInput.value.trim().toLowerCase();

    const category =
        categorySelect.value;

    const result = products.filter(product => {

        const matchesSearch =
            product.name
                .toLowerCase()
                .includes(search);

        const matchesCategory =
            category === "all" ||
            product.category === category;

        return matchesSearch && matchesCategory;
    });

    displayProducts(result);

    document.getElementById("products")
        ?.scrollIntoView({
            behavior: "smooth"
        });
}


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
