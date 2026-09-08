/**
 * UI Talks 6.0 - Countdown Timer
 * Counts down to Talksnovation & Awarding Day (October 3, 2026)
 */

function updateCountdown() {
    const target = new Date("2026-10-03T00:00:00+07:00").getTime();
    const diff = target - Date.now();
    if (diff <= 0) return;

    const days = document.getElementById("cd-days");
    const hours = document.getElementById("cd-hours");
    const minutes = document.getElementById("cd-minutes");
    const seconds = document.getElementById("cd-seconds");

    if (days) days.textContent = String(Math.floor(diff / 86400000)).padStart(2, "0");
    if (hours) hours.textContent = String(Math.floor((diff / 3600000) % 24)).padStart(2, "0");
    if (minutes) minutes.textContent = String(Math.floor((diff / 60000) % 60)).padStart(2, "0");
    if (seconds) seconds.textContent = String(Math.floor((diff / 1000) % 60)).padStart(2, "0");
}

updateCountdown();
setInterval(updateCountdown, 1000);
