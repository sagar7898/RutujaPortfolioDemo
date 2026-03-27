const roles = [
    "Backend Engineer (.NET)  ",
    "AI & Automation Developer  ",
    "API & Integration Specialist  "
];

let roleIndex = 0;
let charIndex = 0;
let currentText = "";
let deleting = false;

function typeEffect() {

    const element = document.getElementById("typing");

    if (roleIndex >= roles.length) {
        roleIndex = 0;
    }

    let fullText = roles[roleIndex];

    if (deleting) {
        currentText = fullText.substring(0, charIndex--);
    } else {
        currentText = fullText.substring(0, charIndex++);
    }

    element.textContent = currentText;

    if (!deleting && charIndex === fullText.length) {
        deleting = true;
        setTimeout(typeEffect, 1000);
        return;
    }

    if (deleting && charIndex === 0) {
        deleting = false;
        roleIndex++;
    }

    setTimeout(typeEffect, deleting ? 50 : 100);

}

typeEffect();



document.addEventListener("DOMContentLoaded", function () {

    const elements = document.querySelectorAll(".hero-title, .hero-subtitle, .hero-description");

    elements.forEach((el, index) => {
        el.style.opacity = 0;
        el.style.transform = "translateY(20px)";

        setTimeout(() => {
            el.style.transition = "all 0.8s ease";
            el.style.opacity = 1;
            el.style.transform = "translateY(0)";
        }, 200 * index);
    });

});


const aboutSection = document.querySelector(".about-section");

window.addEventListener("scroll", () => {
    const position = aboutSection.getBoundingClientRect().top;
    const screenPosition = window.innerHeight / 1.2;

    if (position < screenPosition) {
        aboutSection.style.opacity = 1;
        aboutSection.style.transform = "translateY(0)";
    }
});


const cards = document.querySelectorAll(".project-card");

cards.forEach((card, index) => {
    card.style.opacity = 0;
    card.style.transform = "translateY(30px)";

    setTimeout(() => {
        card.style.transition = "0.6s ease";
        card.style.opacity = 1;
        card.style.transform = "translateY(0)";
    }, 200 * index);
});


const timelineItems = document.querySelectorAll(".timeline-item");

timelineItems.forEach((item, index) => {
    item.style.opacity = 0;
    item.style.transform = "translateY(30px)";

    setTimeout(() => {
        item.style.transition = "0.6s ease";
        item.style.opacity = 1;
        item.style.transform = "translateY(0)";
    }, 200 * index);
});


const archNodes = document.querySelectorAll(".arch-node");
const archInfo = document.getElementById("archExplanation");

archNodes.forEach(node => {

    node.addEventListener("mouseenter", () => {

        archInfo.innerText = node.getAttribute("data-info");

    });

});