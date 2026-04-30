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
