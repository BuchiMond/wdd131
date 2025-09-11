// Dynamically set the current year in the footer
document.getElementById("currentyear").textContent = new Date().getFullYear();

// Dynamically set the last modified date/time in the footer
document.getElementById("lastModified").textContent = "Last Modified: " + document.lastModified;

// temples.js
document.addEventListener("DOMContentLoaded", () => {
    const hamburger = document.getElementById("hamburger");
    const navMenu = document.querySelector("nav ul");

    hamburger.addEventListener("click", () => {
        navMenu.classList.toggle("show");

        // Toggle between hamburger (☰) and close (X)
        if (hamburger.textContent === "☰") {
            hamburger.textContent = "✖"; // X symbol
        } else {
            hamburger.textContent = "☰"; // back to hamburger
        }
    });
});
