const menuButton = document.querySelector("[data-menu]");
const navigation = document.querySelector("[data-nav]");

const closeMenu = () => {
  menuButton?.setAttribute("aria-expanded", "false");
  navigation?.classList.remove("is-open");
};

menuButton?.addEventListener("click", () => {
  const isOpen = menuButton.getAttribute("aria-expanded") === "true";
  menuButton.setAttribute("aria-expanded", String(!isOpen));
  navigation?.classList.toggle("is-open", !isOpen);
});

navigation?.querySelectorAll("a").forEach((link) => link.addEventListener("click", closeMenu));

document.querySelectorAll("[data-year]").forEach((node) => {
  node.textContent = String(new Date().getFullYear());
});

const subscriberCountNodes = document.querySelectorAll("[data-youtube-subscribers]");

if (subscriberCountNodes.length) {
  fetch("/api/youtube-channel", { headers: { Accept: "application/json" } })
    .then((response) => {
      if (!response.ok) throw new Error("Subscriber count unavailable");
      return response.json();
    })
    .then(({ formattedSubscriberCount }) => {
      if (!formattedSubscriberCount) return;
      subscriberCountNodes.forEach((node) => {
        node.textContent = formattedSubscriberCount;
        node.closest("[data-youtube-audience]")?.setAttribute("data-live", "true");
      });
    })
    .catch(() => {
      // Keep the server-rendered fallback so the page remains complete offline.
    });
}
