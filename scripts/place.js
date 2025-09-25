// Footer year and last modified
document.getElementById("currentyear").textContent = new Date().getFullYear();
document.getElementById("lastModified").textContent =
    "Last Modified: " + document.lastModified;

// Static values for weather
const temperature = 25; // °C
const windSpeed = 5; // km/h

// Wind chill calculation (Celsius version)
function calculateWindChill(tempC, speedKmh) {
    return (
        13.12 +
        0.6215 * tempC -
        11.37 * Math.pow(speedKmh, 0.16) +
        0.3965 * tempC * Math.pow(speedKmh, 0.16)
    ).toFixed(1);
}

// Display wind chill only if conditions are valid
const windChillElement = document.getElementById("windchill");
if (temperature <= 10 && windSpeed > 4.8) {
    windChillElement.textContent = "Wind Chill: " + calculateWindChill(temperature, windSpeed) + " °C";
} else {
    windChillElement.textContent = "Wind Chill: N/A (not applicable)";
}
