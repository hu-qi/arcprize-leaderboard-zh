"use strict";
function openModal(modalId) {
    if (!modalId)
        return;
    const modalContainer = document.getElementById("modal-container");
    const modalDynamic = document.getElementById("modal-dynamic");
    const modal = document.getElementById(modalId);
    if (!modalContainer || !modalDynamic || !modal)
        return;
    modalDynamic.innerHTML = modal.innerHTML;
    modalContainer.style.display = "block";
}
function closeModal() {
    const modalContainer = document.getElementById("modal-container");
    const modalDynamic = document.getElementById("modal-dynamic");
    if (!modalContainer || !modalDynamic)
        return;
    modalContainer.style.display = "none";
    modalDynamic.innerHTML = "";
}
// Use event delegation for modal buttons (works with Next.js client-side navigation)
document.addEventListener("click", (e) => {
    const target = e.target;
    if (!target)
        return;
    const modalBtn = target.closest(".modal-btn");
    if (modalBtn) {
        e.preventDefault();
        const modalId = modalBtn.getAttribute("data-modal-id");
        openModal(modalId);
    }
    // Handle modal close button
    if (target.closest("#modal-container .close")) {
        closeModal();
    }
    // Handle clicking outside modal content to close
    if (target.id === "modal-container") {
        closeModal();
    }
});
// Handle logo scroll effect
document.addEventListener("scroll", () => {
    const logo = document.querySelector(".logo");
    if (logo) {
        if (window.scrollY > 0) {
            logo.classList.add("scrolled");
        }
        else {
            logo.classList.remove("scrolled");
        }
    }
});
