// =========================
// Typing Animation
// =========================

const text = "Hi, I'm Bipul Babu";
let index = 0;

function typeText() {
    if (index < text.length) {
        document.getElementById("typing").innerHTML += text.charAt(index);
        index++;
        setTimeout(typeText, 100);
    }
}

window.onload = () => {
    typeText();
};

// =========================
// Dark Mode
// =========================

const themeBtn = document.getElementById("theme-btn");

themeBtn.addEventListener("click", () => {
    document.body.classList.toggle("dark");

    if (document.body.classList.contains("dark")) {
        themeBtn.innerHTML = "☀️";
    } else {
        themeBtn.innerHTML = "🌙";
    }
});

// =========================
// Back To Top Button
// =========================

const topBtn = document.getElementById("topBtn");

window.addEventListener("scroll", () => {

    if (window.scrollY > 300) {
        topBtn.style.display = "block";
    } else {
        topBtn.style.display = "none";
    }

    revealCards();
});

topBtn.addEventListener("click", () => {

    window.scrollTo({
        top: 0,
        behavior: "smooth"
    });

});

// =========================
// Scroll Reveal Animation
// =========================

function revealCards() {

    const cards = document.querySelectorAll(".card, .project-card");

    cards.forEach(card => {

        const top = card.getBoundingClientRect().top;

        if (top < window.innerHeight - 100) {

            card.style.opacity = "1";
            card.style.transform = "translateY(0)";

        }

    });

}

document.querySelectorAll(".card, .project-card").forEach(card => {

    card.style.opacity = "0";
    card.style.transform = "translateY(40px)";
    card.style.transition = "0.8s";

});

// First reveal
revealCards();

// =========================
// Smooth Navigation
// =========================

document.querySelectorAll('nav a').forEach(link => {

    link.addEventListener("click", function (e) {

        e.preventDefault();

        const id = this.getAttribute("href");

        document.querySelector(id).scrollIntoView({
            behavior: "smooth"
        });

    });

});