// SFRP Application Script

const form = document.getElementById("applicationForm"); const submitBtn = document.getElementById("submitBtn"); const progressBar = document.getElementById("progressFill"); const confirmation = document.getElementById("confirmation"); const errorBox = document.getElementById("error"); const adminKey = document.getElementById("adminKey"); const adminPanel = document.getElementById("adminPanel"); const unlockAdmin = document.getElementById("unlockAdmin"); const adminPassword = document.getElementById("adminPassword"); const adminActions = document.getElementById("adminActions"); const autofillBtn = document.getElementById("autofillForm"); const themeToggle = document.getElementById("toggleTheme");

const WEBHOOK_URL = "https://discord.com/api/webhooks/1397667334197477406/eZ71Y9AGK1C7tVth-yMrtaeROiTQXBT8u8fFmc0xoGvb-QcaFjeAImTPh13_nK4eNu4A";

function saveToLocalStorage() { const data = new FormData(form); data.forEach((value, key) => { localStorage.setItem(key, value); }); }

function loadFromLocalStorage() { const elements = form.elements; for (let el of elements) { if (el.name && localStorage.getItem(el.name)) { if (el.type === "checkbox" || el.type === "radio") { el.checked = localStorage.getItem(el.name) === "true"; } else { el.value = localStorage.getItem(el.name); } } } }

function updateProgress() { const total = form.querySelectorAll("[required]").length; const filled = Array.from(form.querySelectorAll("[required]")).filter( el => (el.type === "checkbox" || el.type === "radio") ? el.checked : el.value.trim() !== "" ).length; const percent = Math.floor((filled / total) * 100); progressBar.style.width = percent + "%"; progressBar.textContent = percent + "%"; progressBar.style.background = linear-gradient(to right, #4facfe, #00f2fe); submitBtn.disabled = filled !== total; }

function showConfirmation(success) { confirmation.textContent = success ? "Application submitted successfully!" : "Failed to submit application."; confirmation.style.display = "block"; confirmation.style.color = success ? "#0f0" : "#f00"; }

function sendToWebhook(data) { fetch(WEBHOOK_URL, { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ embeds: [ { title: "New SFRP Staff Application", color: 7506394, fields: Object.entries(data).map(([key, value]) => ({ name: key, value: value || "None", inline: false })) } ] }) }).then(res => { if (res.ok) showConfirmation(true); else throw new Error("Submission failed"); }).catch(() => showConfirmation(false)); }

form.addEventListener("input", () => { saveToLocalStorage(); updateProgress(); });

form.addEventListener("submit", e => { e.preventDefault(); const formData = new FormData(form); const data = {}; for (let [key, value] of formData.entries()) { if (data[key]) { data[key] += ", " + value; } else { data[key] = value; } } sendToWebhook(data); });

unlockAdmin.addEventListener("click", () => { if (adminPassword.value === "3434") { adminActions.style.display = "block"; } else { alert("Wrong password"); } });

autofillBtn.addEventListener("click", () => { const sample = form.elements; for (let el of sample) { if (el.name) { if (el.type === "checkbox" || el.type === "radio") { el.checked = true; } else { el.value = "Sample Answer"; } } } updateProgress(); });

themeToggle.addEventListener("click", () => { document.body.classList.toggle("dark"); localStorage.setItem("theme", document.body.classList.contains("dark") ? "dark" : "light"); });

// Load on start loadFromLocalStorage(); updateProgress();

if (localStorage.getItem("theme") === "dark") { document.body.classList.add("dark"); }

