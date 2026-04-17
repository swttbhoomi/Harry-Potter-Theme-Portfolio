// Initialize AOS for Scroll Animations
document.addEventListener("DOMContentLoaded", () => {
    AOS.init({
        duration: 800,
        once: false,
        offset: 100,
    });
});

// Preloader
window.addEventListener("load", () => {
    const preloader = document.getElementById("preloader");
    setTimeout(() => {
        preloader.style.opacity = "0";
        setTimeout(() => {
            preloader.style.display = "none";
        }, 500);
    }, 1000); // Wait 1s just for the magic effect
});

// Custom Cursor (Magic Wand / Sparkle)
const cursor = document.querySelector(".cursor-wand");
document.addEventListener("mousemove", (e) => {
    cursor.style.left = e.clientX + "px";
    cursor.style.top = e.clientY + "px";
});

// Theme Toggle (Lumos / Nox)
const themeToggleBtn = document.getElementById("theme-toggle");
const html = document.documentElement;
const themeIcon = themeToggleBtn.querySelector("i");

const currentTheme = localStorage.getItem("theme") || "light";
html.setAttribute("data-theme", currentTheme);
updateThemeIcon(currentTheme);

themeToggleBtn.addEventListener("click", () => {
    const newTheme = html.getAttribute("data-theme") === "light" ? "dark" : "light";
    html.setAttribute("data-theme", newTheme);
    localStorage.setItem("theme", newTheme);
    updateThemeIcon(newTheme);
});

function updateThemeIcon(theme) {
    if (theme === "dark") {
        themeIcon.classList.remove("fa-moon");
        themeIcon.classList.add("fa-sun");
    } else {
        themeIcon.classList.remove("fa-sun");
        themeIcon.classList.add("fa-moon");
    }
}

// Navbar Scrolled State & Back to Top
const navbar = document.getElementById("navbar");
const backToTopBtn = document.getElementById("back-to-top");

window.addEventListener("scroll", () => {
    if (window.scrollY > 50) {
        navbar.classList.add("scrolled");
    } else {
        navbar.classList.remove("scrolled");
    }

    if (window.scrollY > 500) {
        backToTopBtn.classList.add("visible");
    } else {
        backToTopBtn.classList.remove("visible");
    }
});

backToTopBtn.addEventListener("click", () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
});

// Hamburger Menu
const hamburger = document.querySelector(".hamburger");
const navLinks = document.querySelector(".nav-links");

hamburger.addEventListener("click", () => {
    navLinks.classList.toggle("nav-active");
});

document.querySelectorAll(".nav-links li a").forEach(link => {
    link.addEventListener("click", () => {
        navLinks.classList.remove("nav-active");
    });
});

// Typewriter Effect
const roles = ["Wizard ⚡", "Developer 💻", "Seeker 🧹"];
let roleIndex = 0;
let charIndex = 0;
let isDeleting = false;
const typewriterElement = document.getElementById("typewriter");

function type() {
    const currentRole = roles[roleIndex];

    if (isDeleting) {
        typewriterElement.textContent = currentRole.substring(0, charIndex - 1);
        charIndex--;
    } else {
        typewriterElement.textContent = currentRole.substring(0, charIndex + 1);
        charIndex++;
    }

    let typeSpeed = isDeleting ? 50 : 100;

    if (!isDeleting && charIndex === currentRole.length) {
        typeSpeed = 2000; // Pause at end of word
        isDeleting = true;
    } else if (isDeleting && charIndex === 0) {
        isDeleting = false;
        roleIndex = (roleIndex + 1) % roles.length;
        typeSpeed = 500; // Pause before typing new word
    }

    setTimeout(type, typeSpeed);
}
type(); // Start

// Project Filtering
const filterBtns = document.querySelectorAll(".filter-btn");
const projects = document.querySelectorAll(".project-card");

filterBtns.forEach(btn => {
    btn.addEventListener("click", () => {
        filterBtns.forEach(b => b.classList.remove("active"));
        btn.classList.add("active");

        const filter = btn.getAttribute("data-filter");

        projects.forEach(project => {
            if (filter === "all" || project.getAttribute("data-category") === filter) {
                project.style.display = "block";
            } else {
                project.style.display = "none";
            }
        });

        AOS.refresh(); // Refresh animations after grid changes
    });
});

// Confetti (Magic Sparks) on Resume Button
const resumeBtn = document.getElementById("resume-btn");
if (resumeBtn && typeof confetti !== "undefined") {
    resumeBtn.addEventListener("click", (e) => {
        e.preventDefault();

        const count = 200;
        const defaults = {
            origin: { y: 0.7 },
            colors: ['#d3a625', '#fbf038', '#cccccc', '#ffffff'] // Gold and silver sparks
        };

        function fire(particleRatio, opts) {
            confetti(Object.assign({}, defaults, opts, {
                particleCount: Math.floor(count * particleRatio)
            }));
        }

        fire(0.25, {
            spread: 26,
            startVelocity: 55,
        });
        fire(0.2, {
            spread: 60,
        });
        fire(0.35, {
            spread: 100,
            decay: 0.91,
            scalar: 0.8
        });
        fire(0.1, {
            spread: 120,
            startVelocity: 25,
            decay: 0.92,
            scalar: 1.2
        });
        fire(0.1, {
            spread: 120,
            startVelocity: 45,
        });

        // Optional: Trigger download here if there was a real file
        // window.open('path_to_resume.pdf');
    });
}

// Testimonial Carousel
const testimonials = document.querySelectorAll(".testimonial-card");
const prevTest = document.getElementById("prev-test");
const nextTest = document.getElementById("next-test");
let currentTestimonial = 0;

if (testimonials.length > 0 && prevTest && nextTest) {
    function showTestimonial(index) {
        testimonials.forEach(t => t.classList.remove("active"));
        testimonials[index].classList.add("active");
    }

    nextTest.addEventListener("click", () => {
        currentTestimonial = (currentTestimonial + 1) % testimonials.length;
        showTestimonial(currentTestimonial);
    });

    prevTest.addEventListener("click", () => {
        currentTestimonial = (currentTestimonial - 1 + testimonials.length) % testimonials.length;
        showTestimonial(currentTestimonial);
    });
}

// Form Validation and Submits
const contactForm = document.getElementById("contact-form");
const formMessage = document.getElementById("form-message");

if (contactForm) {
    contactForm.addEventListener("submit", (e) => {
        e.preventDefault();

        const name = document.getElementById("name").value.trim();
        const email = document.getElementById("email").value.trim();
        const message = document.getElementById("message").value.trim();

        if (!name || !email || !message) {
            formMessage.textContent = "Oops! The owl dropped some information. 🦉 Please fill out all fields.";
            formMessage.style.color = "#740001"; // Gryffindor red for error
            return;
        }

        // Simulate sending spell
        formMessage.textContent = "Casting spell... ✨";
        formMessage.style.color = "var(--accent)";

        setTimeout(() => {
            formMessage.textContent = "Your owl has been sent! 🦉📨";
            formMessage.style.color = "var(--accent)";
            contactForm.reset();

            // Clear message after 5 seconds
            setTimeout(() => {
                formMessage.textContent = "";
            }, 5000);
        }, 1500);
    });
}

// Active Nav Link on Scroll
const sections = document.querySelectorAll("section");
const navItems = document.querySelectorAll(".nav-links li a");

window.addEventListener("scroll", () => {
    let current = "";

    sections.forEach(section => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.clientHeight;
        if (pageYOffset >= (sectionTop - sectionHeight / 3)) {
            current = section.getAttribute("id");
        }
    });

    navItems.forEach(item => {
        item.classList.remove("active");
        if (item.getAttribute("href").includes(current)) {
            item.classList.add("active");
        }
    });
});
