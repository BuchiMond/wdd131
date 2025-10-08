const products = [
    { id: "fc-1888", name: "Flux Capacitor", averagerating: 4.5 },
    { id: "fc-2050", name: "Power Laces", averagerating: 4.7 },
    { id: "fs-1987", name: "Time Circuits", averagerating: 3.5 },
    { id: "ac-2000", name: "Low Voltage Reactor", averagerating: 3.9 },
    { id: "jj-1969", name: "Warp Equalizer", averagerating: 5.0 }
];

// Wait until the DOM is fully loaded
document.addEventListener("DOMContentLoaded", () => {
    const select = document.getElementById("productSelect");

    products.forEach(product => {
        const option = document.createElement("option");
        option.value = product.id;
        option.textContent = product.name;
        select.appendChild(option);
    });
});

document.addEventListener("DOMContentLoaded", () => {
    // Run review counter only on review.html
    if (window.location.pathname.endsWith("review.html")) {
        let count = localStorage.getItem("reviewCount");
        count = count ? parseInt(count) : 0;

        // Increase by 1 every time the page loads (after form submission)
        count++;
        localStorage.setItem("reviewCount", count);

        // Show total reviews submitted
        const reviewCount = document.getElementById("reviewCount");
        if (reviewCount) {
            reviewCount.textContent = `You have completed ${count} review${count === 1 ? "" : "s"}.`;
        }
    }
});
