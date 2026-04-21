const WEATHER_ICONS = {
    "01d": "☀️",
    "01n": "🌙",
    "02d": "⛅",
    "02n": "⛅",
    "03d": "☁️",
    "03n": "☁️",
    "04d": "☁️",
    "04n": "☁️",
    "09d": "🌧️",
    "09n": "🌧️",
    "10d": "🌦️",
    "10n": "🌧️",
    "11d": "⛈️",
    "11n": "⛈️",
    "13d": "❄️",
    "13n": "❄️",
    "50d": "🌫️",
    "50n": "🌫️",
};

async function loadWeather() {
    const el = document.getElementById("weather-location");
    if (!el) return;

    try {
        const response = await fetch(
            "https://luiscarlospando.com/api/getWeather"
        );
        if (!response.ok) throw new Error(`HTTP ${response.status}`);

        const data = await response.json();
        const emoji = WEATHER_ICONS[data.icon] || "🌡️";
        const tooltip = `${emoji} ${data.temp}°C — ${data.description}<br><small>Sensación: ${data.feels_like}°C · Humedad: ${data.humidity}%</small>`;

        // Update Bootstrap 4 tooltip
        $(el).attr("data-original-title", tooltip).tooltip("dispose").tooltip();
    } catch (e) {
        console.warn("Weather fetch failed:", e);
    }
}

document.addEventListener("DOMContentLoaded", loadWeather);
