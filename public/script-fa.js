const header = document.querySelector("[data-header]");
const menu = document.querySelector(".fa-menu");
const nav = document.querySelector(".fa-nav");
const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)");

const closeMenu = () => {
  menu?.setAttribute("aria-expanded", "false");
  nav?.classList.remove("is-open");
  document.body.classList.remove("menu-open");
};

menu?.addEventListener("click", () => {
  const open = menu.getAttribute("aria-expanded") === "true";
  menu.setAttribute("aria-expanded", String(!open));
  nav?.classList.toggle("is-open", !open);
  document.body.classList.toggle("menu-open", !open);
});

nav?.querySelectorAll("a").forEach((link) => link.addEventListener("click", closeMenu));
window.addEventListener("scroll", () => header?.classList.toggle("is-scrolled", window.scrollY > 30), { passive: true });

document.querySelectorAll("[data-language]").forEach((link) => {
  link.addEventListener("click", () => localStorage.setItem("ea_language", link.dataset.language));
});

document.querySelectorAll("[data-year]").forEach((year) => {
  year.textContent = String(new Date().getFullYear());
});

if (reducedMotion.matches || !("IntersectionObserver" in window)) {
  document.querySelectorAll(".reveal").forEach((element) => element.classList.add("is-visible"));
} else {
  const observer = new IntersectionObserver(
    (entries) => entries.forEach((entry) => {
      if (!entry.isIntersecting) return;
      entry.target.classList.add("is-visible");
      observer.unobserve(entry.target);
    }),
    { threshold: 0.1, rootMargin: "0px 0px -5%" },
  );
  document.querySelectorAll(".reveal").forEach((element, index) => {
    element.style.transitionDelay = `${Math.min(index % 3, 2) * 60}ms`;
    observer.observe(element);
  });
}
