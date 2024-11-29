document.addEventListener("DOMContentLoaded", () => {
    const faqTitles = document.querySelectorAll(".faq-title");

    faqTitles.forEach(title => {
        title.addEventListener("click", () => {
            const content = title.nextElementSibling;

            if (content.style.display === "block") {
                content.style.display = "none";
            } else {
                content.style.display = "block";
            }
        });
    });
});
