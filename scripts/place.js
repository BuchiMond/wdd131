// Footer year and last modified
document.getElementById("currentyear").textContent = new Date().getFullYear();
document.getElementById("lastModified").textContent =
    "Last Modified: " + document.lastModified;

// Static values for weather
const temperature = 25; // °C
const windSpeed = 5; // km/h

// Wind chill calculation (Celsius version)
function calculateWindChill(tempC, speedKmh) {
    // Formula only applies if temp <= 10°C and windspeed > 4.8 km/h
    if (tempC <= 10 && speedKmh > 4.8) {
        return (
            13.12 +
            0.6215 * tempC -
            11.37 * Math.pow(speedKmh, 0.16) +
            0.3965 * tempC * Math.pow(speedKmh, 0.16)
        ).toFixed(1);
    } else {
        return "N/A (not applicable)";
    }
}

// Display wind chill
const windChillElement = document.getElementById("windchill");
windChillElement.textContent =
    "Wind Chill: " + calculateWindChill(temperature, windSpeed) + " °C";
