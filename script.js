function darkMode() {
    document.body.classList.toggle("dark");
}
const text = "Web Developer | AI Enthusiast";
let i = 0;

function typing() {
    if (i < text.length) {
        document.getElementById("typing").innerHTML += text.charAt(i);
        i++;
        setTimeout(typing, 100);
    }
}

typing();
const text = "Hi, I'm Bipul Babu";
let i = 0;

function typingEffect() {
    if (i < text.length) {
        document.getElementById("typing").innerHTML += text.charAt(i);
        i++;
        setTimeout(typingEffect, 100);
    }
}

typingEffect();
// Back To Top Button

const topBtn = document.getElementById("topBtn");

window.onscroll = function () {

    if(document.body.scrollTop > 300 || document.documentElement.scrollTop > 300){
        topBtn.style.display="block";
    }else{
        topBtn.style.display="none";
    }

    document.querySelectorAll(".card").forEach(card=>{
        const position = card.getBoundingClientRect().top;

        if(position < window.innerHeight - 100){
            card.classList.add("show");
        }
    });

};

function topFunction(){
    window.scrollTo({
        top:0,
        behavior:"smooth"
    });
}
