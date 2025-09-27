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

const temples = [
    {
        templeName: "Aba Nigeria",
        location: "Aba, Nigeria",
        dedicated: "2005, August, 7",
        area: 11500,
        imageUrl:
            "https://content.churchofjesuschrist.org/templesldsorg/bc/Temples/photo-galleries/aba-nigeria/400x250/aba-nigeria-temple-lds-273999-wallpaper.jpg",
    },
    {
        templeName: "Manti Utah",
        location: "Manti, Utah, United States",
        dedicated: "1888, May, 21",
        area: 74792,
        imageUrl:
            "https://content.churchofjesuschrist.org/templesldsorg/bc/Temples/photo-galleries/manti-utah/400x250/manti-temple-768192-wallpaper.jpg",
    },
    {
        templeName: "Payson Utah",
        location: "Payson, Utah, United States",
        dedicated: "2015, June, 7",
        area: 96630,
        imageUrl:
            "https://content.churchofjesuschrist.org/templesldsorg/bc/Temples/photo-galleries/payson-utah/400x225/payson-utah-temple-exterior-1416671-wallpaper.jpg",
    },
    {
        templeName: "Yigo Guam",
        location: "Yigo, Guam",
        dedicated: "2020, May, 2",
        area: 6861,
        imageUrl:
            "https://content.churchofjesuschrist.org/templesldsorg/bc/Temples/photo-galleries/yigo-guam/400x250/yigo_guam_temple_2.jpg",
    },
    {
        templeName: "Washington D.C.",
        location: "Kensington, Maryland, United States",
        dedicated: "1974, November, 19",
        area: 156558,
        imageUrl:
            "https://content.churchofjesuschrist.org/templesldsorg/bc/Temples/photo-galleries/washington-dc/400x250/washington_dc_temple-exterior-2.jpeg",
    },
    {
        templeName: "Lima Perú",
        location: "Lima, Perú",
        dedicated: "1986, January, 10",
        area: 9600,
        imageUrl:
            "https://content.churchofjesuschrist.org/templesldsorg/bc/Temples/photo-galleries/lima-peru/400x250/lima-peru-temple-evening-1075606-wallpaper.jpg",
    },
    {
        templeName: "Mexico City Mexico",
        location: "Mexico City, Mexico",
        dedicated: "1983, December, 2",
        area: 116642,
        imageUrl:
            "https://content.churchofjesuschrist.org/templesldsorg/bc/Temples/photo-galleries/mexico-city-mexico/400x250/mexico-city-temple-exterior-1518361-wallpaper.jpg",
    },
];

// --------------- Elements ---------------
const gallery = document.querySelector(".gallery");
const nav = document.querySelector("header nav");
const navList = nav?.querySelector("ul");
const navLinks = nav?.querySelectorAll("a");
const hamburgerBtn = document.getElementById("hamburger");

// --------------- Helpers ----------------
function getDedicatedYear(dedicatedStr) {
    const yearPart = (dedicatedStr || "").split(",")[0].trim();
    const yr = parseInt(yearPart, 10);
    return Number.isFinite(yr) ? yr : null;
}

function formatArea(area) {
    return `${Number(area).toLocaleString()} sq ft`;
}

function clearActiveLinks() {
    navLinks?.forEach((a) => a.classList.remove("active"));
}

function setActiveLink(hashName) {
    clearActiveLinks();
    const link = Array.from(navLinks || []).find(
        (a) => (a.getAttribute("href") || "").replace("#", "") === hashName
    );
    if (link) link.classList.add("active");
}

function buildCard(t) {
    const card = document.createElement("article");
    card.className = "temple-card";

    const name = document.createElement("h3");
    name.className = "temple-card__title";
    name.textContent = t.templeName;

    const meta = document.createElement("div");
    meta.className = "temple-card__meta";
    meta.innerHTML = `
    <p><span class="label">Location:</span> ${t.location}</p>
    <p><span class="label">Dedicated:</span> ${t.dedicated}</p>
    <p><span class="label">Area:</span> ${formatArea(t.area)}</p>
  `;

    const img = document.createElement("img");
    img.className = "temple-card__img";
    img.src = t.imageUrl;
    img.alt = `${t.templeName} Temple`;
    img.loading = "lazy";
    img.decoding = "async";
    img.width = 400;   // helps reserve space
    img.height = 260;  // consistent aspect ratio with CSS

    // Text first, then image (per requirement)
    card.append(name, meta, img);
    return card;
}

function renderTemples(list) {
    gallery.innerHTML = "";
    if (!list.length) {
        const empty = document.createElement("p");
        empty.className = "empty-state";
        empty.textContent = "No temples match this filter.";
        gallery.appendChild(empty);
        return;
    }
    list.forEach((t) => gallery.appendChild(buildCard(t)));
}

function applyFilter(filterName) {
    let filtered = temples;

    switch (filterName) {
        case "old":
            filtered = temples.filter((t) => {
                const y = getDedicatedYear(t.dedicated);
                return y !== null && y < 1900;
            });
            break;
        case "new":
            filtered = temples.filter((t) => {
                const y = getDedicatedYear(t.dedicated);
                return y !== null && y > 2000;
            });
            break;
        case "large":
            filtered = temples.filter((t) => Number(t.area) > 90000);
            break;
        case "small":
            filtered = temples.filter((t) => Number(t.area) < 10000);
            break;
        case "home":
        default:
            filtered = temples.slice();
    }

    setActiveLink(filterName);
    renderTemples(filtered);
}

// ------------- Events / Init -------------
function onNavClick(e) {
    e.preventDefault();
    const section = (e.currentTarget.getAttribute("href") || "#home").replace("#", "");
    window.location.hash = section;

    // Close mobile menu after selection
    navList?.classList.remove("show");
    hamburgerBtn?.setAttribute("aria-expanded", "false");

    applyFilter(section);
}

function initNav() {
    navLinks?.forEach((a) => a.addEventListener("click", onNavClick));

    // Hamburger toggle (adds/removes .show on <ul>)
    hamburgerBtn?.addEventListener("click", () => {
        const isOpen = navList?.classList.toggle("show");
        hamburgerBtn.setAttribute("aria-expanded", String(!!isOpen));
    });
}

function initFromHash() {
    const section = (window.location.hash || "#home").replace("#", "");
    applyFilter(section || "home");
}

document.addEventListener("DOMContentLoaded", () => {
    initNav();
    initFromHash();
});