// Dynamically set the current year in the footer
document.getElementById("currentyear").textContent = new Date().getFullYear();

// Dynamically set the last modified date/time in the footer
document.getElementById("lastModified").textContent = "Last Modified: " + document.lastModified;
