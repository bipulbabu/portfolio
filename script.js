// ===========================
// PREMIUM PORTFOLIO SCRIPT
// ===========================

// Typing Animation
const typingElement = document.getElementById("typing");
const words = [
    "Bipul Babu",
    "Web Developer",
    "AI Enthusiast",
    "Computer Science Student"
];

let wordIndex = 0;
let charIndex = 0;
let deleting = false;

function typeEffect() {

    const currentWord = words[wordIndex];

    if (!deleting) {

        typingElement.textContent =
            currentWord.substring(0, charIndex++);

        if (charIndex > currentWord.length) {
            deleting = true;
            setTimeout(typeEffect, 1200);
            return;
        }

    } else {

        typingElement.textContent =
            currentWord.substring(0, charIndex--);

        if (charIndex < 0) {
            deleting = false;
            wordIndex++;

            if (wordIndex >= words.length)
                wordIndex = 0;
        }

    }

    setTimeout(typeEffect, deleting ? 60 : 120);
}

typeEffect();


// ===========================
// Dark Mode
// ===========================

const themeBtn = document.getElementById("theme-btn");

themeBtn.onclick = () => {

    document.body.classList.toggle("dark");

    if(document.body.classList.contains("dark")){
        themeBtn.innerHTML="☀️";
    }else{
        themeBtn.innerHTML="🌙";
    }

};


// ===========================
// Scroll Reveal
// ===========================

const observer = new IntersectionObserver(entries=>{

entries.forEach(entry=>{

if(entry.isIntersecting){

entry.target.classList.add("show");

}

});

});

document.querySelectorAll(".card,.project-card,.skill").forEach(el=>{

el.classList.add("hidden");

observer.observe(el);

});


// ===========================
// Back To Top
// ===========================

const topBtn=document.getElementById("topBtn");

window.addEventListener("scroll",()=>{

if(window.scrollY>400){

topBtn.style.display="block";

}else{

topBtn.style.display="none";

}

});

topBtn.onclick=()=>{

window.scrollTo({

top:0,

behavior:"smooth"

});

};






// Close menu when clicking a navigation link

document.querySelectorAll("#nav-links a").forEach(link => {

    link.addEventListener("click", () => {

        navLinks.classList.remove("active");

        menuIcon.classList.remove("fa-xmark");
        menuIcon.classList.add("fa-bars");

    });

});


// Close menu when clicking outside

document.addEventListener("click", (event) => {

    const navbar = document.querySelector("nav");

    if (
        navLinks.classList.contains("active") &&
        !navbar.contains(event.target)
    ) {

        navLinks.classList.remove("active");

        menuIcon.classList.remove("fa-xmark");
        menuIcon.classList.add("fa-bars");

    }

});



// ===== MOBILE HAMBURGER MENU =====

const menuToggle = document.getElementById("menu-toggle");
const navLinks = document.getElementById("nav-links");
const menuIcon = menuToggle.querySelector("i");

menuToggle.addEventListener("click", () => {

    navLinks.classList.toggle("active");

    if (navLinks.classList.contains("active")) {
        menuIcon.classList.remove("fa-bars");
        menuIcon.classList.add("fa-xmark");
    } else {
        menuIcon.classList.remove("fa-xmark");
        menuIcon.classList.add("fa-bars");
    }

});


// Close menu after clicking a link
document.querySelectorAll("#nav-links a").forEach(link => {
    link.addEventListener("click", () => {

        navLinks.classList.remove("active");

        menuIcon.classList.remove("fa-xmark");
        menuIcon.classList.add("fa-bars");

    });
});

