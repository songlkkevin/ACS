document.addEventListener("DOMContentLoaded", () => {
  const sections = [...document.querySelectorAll(".content-section")];
  const links = [...document.querySelectorAll(".nav-link[data-section]")];

  function updateActiveLink() {
    const marker = window.scrollY + 140;
    let activeId = sections[0] ? sections[0].id : "";
    sections.forEach((section) => {
      if (section.offsetTop <= marker) activeId = section.id;
    });
    links.forEach((link) => {
      const active = link.dataset.section === activeId;
      link.classList.toggle("active", active);
      if (active) link.setAttribute("aria-current", "location");
      else link.removeAttribute("aria-current");
    });
  }

  links.forEach((link) => {
    link.addEventListener("click", () => {
      const mobileMenu = link.closest("details");
      if (mobileMenu) mobileMenu.removeAttribute("open");
    });
  });

  updateActiveLink();
  window.addEventListener("scroll", updateActiveLink, { passive: true });
});
