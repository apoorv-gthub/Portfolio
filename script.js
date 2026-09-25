const nav = document.querySelector(".nav");
const menuToggle = document.getElementById("menuToggle");
const themeToggle = document.getElementById("themeToggle");
const themeIcon = document.querySelector(".theme-icon");

menuToggle.addEventListener("click", () => {
  const open = nav.classList.toggle("open");
  menuToggle.setAttribute("aria-expanded", open);
});

document.querySelectorAll(".nav-links a").forEach(link => {
  link.addEventListener("click", () => {
    nav.classList.remove("open");
    menuToggle.setAttribute("aria-expanded", "false");
  });
});

const savedTheme = localStorage.getItem("portfolio-theme");
if (savedTheme) document.documentElement.dataset.theme = savedTheme;

function updateThemeIcon() {
  themeIcon.textContent =
    document.documentElement.dataset.theme === "light" ? "☾" : "☼";
}
updateThemeIcon();

themeToggle.addEventListener("click", () => {
  const isLight = document.documentElement.dataset.theme === "light";
  if (isLight) {
    delete document.documentElement.dataset.theme;
    localStorage.setItem("portfolio-theme", "dark");
  } else {
    document.documentElement.dataset.theme = "light";
    localStorage.setItem("portfolio-theme", "light");
  }
  updateThemeIcon();
});

const observer = new IntersectionObserver(
  entries => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add("visible");
        observer.unobserve(entry.target);
      }
    });
  },
  { threshold: 0.12 }
);

document.querySelectorAll(".reveal").forEach(el => observer.observe(el));

document.getElementById("year").textContent = new Date().getFullYear();
