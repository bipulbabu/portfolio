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

let cart = [];

function displayProducts(list = products) {

    const grid = document.getElementById("productGrid");

    if (list.length === 0) {
        grid.innerHTML = `
            <p style="grid-column:1/-1;text-align:center;padding:40px">
                No products found.
            </p>
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

                <button class="add-cart"
                        onclick="addToCart(${product.id})">
                    <i class="fa-solid fa-cart-plus"></i>
                    Add to Cart
                </button>

            </div>

        </div>

    `).join("");
}


function addToCart(id) {

    const product = products.find(item => item.id === id);

    cart.push(product);

    updateCart();

    alert(`${product.name} added to cart!`);
}


function updateCart() {

    document.getElementById("cartCount").textContent = cart.length;

    const cartItems = document.getElementById("cartItems");

    if (cart.length === 0) {
        cartItems.innerHTML = "<p>Your cart is empty.</p>";
        document.getElementById("cartTotal").textContent = "₹0";
        return;
    }

    cartItems.innerHTML = cart.map((item, index) => `
        <div class="cart-item">

            <div>
                <strong>${item.name}</strong>
                <br>
                ₹${item.price.toLocaleString("en-IN")}
            </div>

            <button onclick="removeFromCart(${index})">
                <i class="fa-solid fa-trash"></i>
            </button>

        </div>
    `).join("");

    const total = cart.reduce((sum, item) => sum + item.price, 0);

    document.getElementById("cartTotal").textContent =
        `₹${total.toLocaleString("en-IN")}`;
}


function removeFromCart(index) {

    cart.splice(index, 1);

    updateCart();
}


function openCart() {

    document.getElementById("cartOverlay").style.display = "flex";

    updateCart();
}


function closeCart() {

    document.getElementById("cartOverlay").style.display = "none";
}


function checkout() {

    if (cart.length === 0) {
        alert("Your cart is empty!");
        return;
    }

    alert("Checkout feature coming soon!");
}


function filterCategory(category) {

    if (category === "all") {
        displayProducts(products);
    } else {
        const filtered = products.filter(
            product => product.category === category
        );

        displayProducts(filtered);
    }

    document.getElementById("products")
        .scrollIntoView({ behavior: "smooth" });
}


function searchProducts() {

    const search =
        document.getElementById("searchInput")
            .value
            .toLowerCase();

    const category =
        document.getElementById("category").value;

    let result = products.filter(product => {

        const matchesSearch =
            product.name.toLowerCase().includes(search);

        const matchesCategory =
            category === "all" ||
            product.category === category;

        return matchesSearch && matchesCategory;
    });

    displayProducts(result);
}


function toggleMenu() {

    const menu = document.getElementById("mobileMenu");

    menu.style.display =
        menu.style.display === "block"
            ? "none"
            : "block";
}


function subscribe() {

    alert("Thank you for subscribing!");
}


// Initial products
displayProducts();
updateCart();