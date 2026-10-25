// Theme: follow the system setting, remember the visitor's choice
const root = document.documentElement;
const saved = localStorage.getItem("theme");
const systemDark = window.matchMedia("(prefers-color-scheme: dark)").matches;
root.dataset.theme = saved || (systemDark ? "dark" : "light");

document.getElementById("theme").addEventListener("click", () => {
  const next = root.dataset.theme === "dark" ? "light" : "dark";
  root.dataset.theme = next;
  localStorage.setItem("theme", next);
});

// Highlight the nav link of the section on screen
const links = document.querySelectorAll("#nav a");
const sections = [...links].map(a => document.querySelector(a.getAttribute("href")));
const observer = new IntersectionObserver(entries => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      links.forEach(a => a.classList.toggle("active", a.getAttribute("href") === "#" + entry.target.id));
    }
  });
}, { rootMargin: "-40% 0px -55% 0px" });
sections.forEach(s => s && observer.observe(s));

// Copy email button
const copyBtn = document.getElementById("copy");
copyBtn.addEventListener("click", async () => {
  try {
    await navigator.clipboard.writeText("aryangogavale01@gmail.com");
    copyBtn.textContent = "Copied";
  } catch {
    copyBtn.textContent = "Press Ctrl+C on the email above";
  }
  setTimeout(() => (copyBtn.textContent = "Copy email"), 2000);
});

// Footer year
document.getElementById("year").textContent = new Date().getFullYear();
