'use strict';
// Función para alternar clases de forma segura
const elementToggleFunc = function (elem) {
  if (elem) elem.classList.toggle("active");
}

// --- SIDEBAR TOGGLE ---
const sidebar = document.querySelector("[data-sidebar]");
const sidebarBtn = document.querySelector("[data-sidebar-btn]");

if (sidebarBtn && sidebar) {
  sidebarBtn.addEventListener("click", function () { 
    elementToggleFunc(sidebar); 
  });
}

// --- TESTIMONIALS / MODAL ---
const testimonialsItem = document.querySelectorAll("[data-testimonials-item]");
const modalContainer = document.querySelector("[data-modal-container]");
const modalCloseBtn = document.querySelector("[data-modal-close-btn]");
const overlay = document.querySelector("[data-overlay]");

const modalImg = document.querySelector("[data-modal-img]");
const modalTitle = document.querySelector("[data-modal-title]");
const modalText = document.querySelector("[data-modal-text]");

const testimonialsModalFunc = function () {
  if (modalContainer) modalContainer.classList.toggle("active");
  if (overlay) overlay.classList.toggle("active");
}

if (testimonialsItem.length > 0) {
  testimonialsItem.forEach(item => {
    item.addEventListener("click", function () {
      if (modalImg) {
        modalImg.src = this.querySelector("[data-testimonials-avatar]")?.src || "";
        modalImg.alt = this.querySelector("[data-testimonials-avatar]")?.alt || "";
      }
      if (modalTitle) {
        modalTitle.innerHTML = this.querySelector("[data-testimonials-title]")?.innerHTML || "";
      }
      if (modalText) {
        modalText.innerHTML = this.querySelector("[data-testimonials-text]")?.innerHTML || "";
      }

      testimonialsModalFunc();
    });
  });
}

if (modalCloseBtn) modalCloseBtn.addEventListener("click", testimonialsModalFunc);
if (overlay) overlay.addEventListener("click", testimonialsModalFunc);

// --- FILTROS Y SELECT PERSONALIZADO ---
const select = document.querySelector("[data-select]");
const selectItems = document.querySelectorAll("[data-select-item]");
const selectValue = document.querySelector("[data-selecct-value]");
const filterBtn = document.querySelectorAll("[data-filter-btn]");
const filterItems = document.querySelectorAll("[data-filter-item]");

if (select) {
  select.addEventListener("click", function () { 
    elementToggleFunc(this); 
  });
}

const filterFunc = function (selectedValue) {
  filterItems.forEach(item => {
    if (selectedValue === "all" || selectedValue === item.dataset.category) {
      item.classList.add("active");
    } else {
      item.classList.remove("active");
    }
  });
}

selectItems.forEach(item => {
  item.addEventListener("click", function () {
    let selectedValue = this.innerText.toLowerCase();
    if (selectValue) selectValue.innerText = this.innerText;
    elementToggleFunc(select);
    filterFunc(selectedValue);
  });
});

if (filterBtn.length > 0) {
  let lastClickedBtn = filterBtn[0];

  filterBtn.forEach(btn => {
    btn.addEventListener("click", function () {
      let selectedValue = this.innerText.toLowerCase();
      if (selectValue) selectValue.innerText = this.innerText;
      filterFunc(selectedValue);

      if (lastClickedBtn) lastClickedBtn.classList.remove("active");
      this.classList.add("active");
      lastClickedBtn = this;
    });
  });
}

// --- FORMULARIO DE CONTACTO ---
const form = document.querySelector("[data-form]");
const formInputs = document.querySelectorAll("[data-form-input]");
const formBtn = document.querySelector("[data-form-btn]");

if (form && formBtn && formInputs.length > 0) {
  formInputs.forEach(input => {
    input.addEventListener("input", function () {
      if (form.checkValidity()) {
        formBtn.removeAttribute("disabled");
      } else {
        formBtn.setAttribute("disabled", "");
      }
    });
  });
}

// --- NAVEGACIÓN DE PÁGINAS ---
const navigationLinks = document.querySelectorAll("[data-nav-link]");
const pages = document.querySelectorAll("[data-page]");

if (navigationLinks.length > 0 && pages.length > 0) {
  navigationLinks.forEach(link => {
    link.addEventListener("click", function () {
      const targetPage = this.innerHTML.trim().toLowerCase();

      pages.forEach((page, index) => {
        if (targetPage === page.dataset.page) {
          page.classList.add("active");
          if (navigationLinks[index]) navigationLinks[index].classList.add("active");
          window.scrollTo(0, 0);
        } else {
          page.classList.remove("active");
          if (navigationLinks[index]) navigationLinks[index].classList.remove("active");
        }
      });
    });
  });
}
