// ===============================
// TICKER OPTIMIZATION
// ===============================
function optimizeTrack() {
    const track = document.querySelector(".track");
    const groups = document.querySelectorAll(".group");

    if (track && groups.length > 0) {
        track.style.width = (groups[0].offsetWidth * 2) + "px";
    }
}

window.addEventListener("load", optimizeTrack);
window.addEventListener("resize", optimizeTrack);


// ===============================
// FORM (FORMSPREE HANDLING)
// ===============================
// ===============================
// FORM (FORMSPREE HANDLING)
// ===============================
const contactForm = document.getElementById("contact-form");
const status = document.getElementById("form-status");

if (contactForm && status) {
    contactForm.addEventListener("submit", async function (e) {
        e.preventDefault();

        const btn = this.querySelector(".p-btn");

        // UI loading
        if (btn) {
            btn.textContent = "Sending...";
            btn.disabled = true;
        }

        try {
            const formData = new FormData(this);

            const response = await fetch(this.action, {
                method: "POST",
                body: formData,
                headers: {
                    "Accept": "application/json"
                }
            });

            // Ensure clean formatting for the feedback text
            status.style.fontFamily = "sans-serif";
            status.style.fontSize = "0.95rem";
            status.style.fontWeight = "500";

            if (response.ok) {
                status.textContent = "✅ Message sent successfully!";
                status.style.color = "#0f766e";
                this.reset();
            } else {
                status.textContent = "❌ Something went wrong. Try again.";
                status.style.color = "#c62828";
            }

        } catch (error) {
            console.error("Formspree Error:", error);
            status.style.fontFamily = "sans-serif";
            status.style.fontSize = "0.95rem";
            status.style.fontWeight = "500";
            status.textContent = "❌ Network error. Please try again.";
            status.style.color = "#c62828";
        }

        // reset button
        if (btn) {
            btn.textContent = "Send Message";
            btn.disabled = false;
        }
    });
}


// ===============================
// HAMBURGER MENU
// ===============================
const hamburger = document.getElementById("hamburger");
const mobileMenu = document.getElementById("mobileMenu");

if (hamburger && mobileMenu) {
    hamburger.addEventListener("click", () => {
        hamburger.classList.toggle("open");
        mobileMenu.classList.toggle("open");
    });

    document.querySelectorAll(".mobile-link").forEach(link => {
        link.addEventListener("click", () => {
            hamburger.classList.remove("open");
            mobileMenu.classList.remove("open");
        });
    });
}


// ===============================
// NAVBAR SCROLL EFFECT
// ===============================
const navbar = document.getElementById("navbar");

if (navbar) {
    window.addEventListener("scroll", () => {
        navbar.classList.toggle("scrolled", window.scrollY > 20);
    });
}


// ===============================
// SCROLL REVEAL ANIMATION
// ===============================
const observerOptions = {
    root: null,
    rootMargin: "0px",
    threshold: 0.15
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add("visible");
        }
    });
}, observerOptions);

document.querySelectorAll(".reveal").forEach(el => {
    observer.observe(el);
});


// ===============================
// DEBUG CHECKS
// ===============================
window.addEventListener("DOMContentLoaded", () => {
    console.log("✅ JavaScript Loaded Successfully");

    if (!document.getElementById("contact-form")) {
        console.warn("⚠ contact-form not found");
    }

    if (!document.getElementById("navbar")) {
        console.warn("⚠ navbar not found");
    }

    if (!document.getElementById("hamburger")) {
        console.warn("⚠ hamburger not found");
    }

    if (!document.getElementById("mobileMenu")) {
        console.warn("⚠ mobileMenu not found");
    }
});
