const revealElements = document.querySelectorAll(".reveal");

revealElements.forEach((element, index) => {
    element.style.setProperty("--reveal-delay", `${index * 70}ms`);
});

const observer = new IntersectionObserver(
    (entries, currentObserver) => {
        entries.forEach((entry) => {
            if (!entry.isIntersecting) {
                return;
            }

            entry.target.classList.add("is-visible");
            currentObserver.unobserve(entry.target);
        });
    },
    {
        threshold: 0.15,
        rootMargin: "0px 0px -10% 0px",
    }
);

revealElements.forEach((element) => {
    observer.observe(element);
});

const menuButton = document.querySelector("#hamburguer");
const menuPanel = document.querySelector("#menu-lateral");
const menuCloseButton = document.querySelector("#menu-fechar");
const menuOverlay = document.querySelector("#menu-overlay");
const menuLinks = document.querySelectorAll(".menu a");

if (menuButton && menuPanel && menuCloseButton && menuOverlay) {
    const closeMenu = () => {
        menuPanel.classList.remove("is-open");
        menuOverlay.classList.remove("is-visible");
        document.body.classList.remove("menu-aberto");
        menuButton.setAttribute("aria-expanded", "false");
        menuPanel.setAttribute("aria-hidden", "true");
    };

    const openMenu = () => {
        menuPanel.classList.add("is-open");
        menuOverlay.classList.add("is-visible");
        document.body.classList.add("menu-aberto");
        menuButton.setAttribute("aria-expanded", "true");
        menuPanel.setAttribute("aria-hidden", "false");
    };

    menuButton.addEventListener("click", () => {
        const isOpen = menuPanel.classList.contains("is-open");
        if (isOpen) {
            closeMenu();
            return;
        }

        openMenu();
    });

    menuCloseButton.addEventListener("click", closeMenu);
    menuOverlay.addEventListener("click", closeMenu);

    menuLinks.forEach((link) => {
        link.addEventListener("click", closeMenu);
    });

    document.addEventListener("keydown", (event) => {
        if (event.key === "Escape") {
            closeMenu();
        }
    });

    window.addEventListener("resize", () => {
        if (window.innerWidth >= 768) {
            closeMenu();
        }
    });
}
