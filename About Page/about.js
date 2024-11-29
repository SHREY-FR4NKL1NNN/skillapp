document.addEventListener("DOMContentLoaded", () => {
    const faqTitles = document.querySelectorAll(".faq-title");
    const teamTitles = document.querySelectorAll(".team-title");

    // FAQ Toggle
    faqTitles.forEach(title => {
        title.addEventListener("click", () => {
            const content = title.nextElementSibling;
            content.style.display = content.style.display === "block" ? "none" : "block";
        });
    });

    // Team Member Toggle
    teamTitles.forEach(title => {
        title.addEventListener("click", () => {
            const content = title.nextElementSibling;
            content.style.display = content.style.display === "block" ? "none" : "block";
        });
    });
});
