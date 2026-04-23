const navButton = document.getElementById("navButton");
const navIconImg = document.getElementById("navIconImg");
const nav = document.getElementById("nav");
const heroButton = document.getElementById("heroButton");
const featuredVillas = document.getElementById("featuredVillas");
const modal = document.getElementById("modal");
const modalImg = document.querySelector(".modal img");
const modalTitle = document.querySelector(".modal h2");
const modalPrice = document.querySelector(".modal .modal-container .price");
const modalVillaSpecs = document.querySelector(".modal .villa-specs");
const main = document.querySelector("main");
const modalVillaDescription = document.querySelector(
  ".modal .modal-container .description",
);
const header = document.querySelector("header");
const footer = document.querySelector("footer");
const villasDetails = [
  ["Azure Coast Villa", [460, 5, 4], "Simple Modern Design"],
  ["Smart Haven Villa", [300, 4, 3], "Complete Smart Home System"],
  ["Nova Glass Villa", [420, 5, 4], "Great User Interface"],
  ["Royal Palace Villa", [480, 5, 4], "Luxurious Classic Design"],
  ["Green Horizon Villa", [250, 3, 2], "Wide Green Spaces"],
  ["Palm Elite Residence", [550, 6, 5], "Spacious Swimming Pool"],
];
let lastFocusedElement;
let navAppearance = true;
let mainNav = innerWidth > 700;
let modalAppearance = false;

// Navbar
window.addEventListener("load", () => {
  if (mainNav) {
    navButton.style.display = "none";
  } else {
    navButton.style.display = "block";
    closeNav();
    
  }
});
window.addEventListener("resize", () => {
  mainNav = innerWidth > 700;
  if (mainNav) {
    navButton.style.display = "none";
    nav.style.display = "block";
    navAppearance = true;
   
  } else {
    navButton.style.display = "block";
    closeNav();
  }
});
navButton.addEventListener("click", navToggle);

// Hero button
heroButton.addEventListener("click", () => {
  location.hash = "featuredVillas";
  featuredVillas.scrollIntoView();
});

// Modal Appearance

featuredVillas.addEventListener("click", (e) => {
  let element = e.target.tagName;
  let parent = e.target.parentElement;
  
  if (element === "BUTTON") {
    lastFocusedElement = e.target;
    if (navAppearance && !mainNav) {
      closeNav();
    }
    if (!modalAppearance) {
      bluring();
    }
    modalAppearance = true;
 modal.style.display = "flex";
    noScroll(true);

    disableEvents();
    
   
    modalImg.src = parent.querySelector("img").src;
    modalTitle.textContent = parent.querySelector("h2").textContent;
    modalPrice.textContent = parent.querySelector("p").textContent;
    modalVillaSpecs.children[0].textContent =
      getMoreDetails(parent.querySelector("h2").textContent)[1][0] + "m²";
    modalVillaSpecs.children[1].textContent =
      getMoreDetails(parent.querySelector("h2").textContent)[1][1] +
      " Bedrooms";
   modalVillaSpecs.children[2].textContent =
      getMoreDetails(parent.querySelector("h2").textContent)[1][2] +
      " Bathrooms";
    modalVillaDescription.textContent = getMoreDetails(
      parent.querySelector("h2").textContent,
    )[2];
   
    e.stopPropagation();
    document.addEventListener("click", clickOutModal);
    document.addEventListener("keydown", closeModalByEscape)
  }
  
});

footer.querySelector("p").textContent =
  `©${new Date().getFullYear()} - Virella Homes | All rights reserved`;

// Functions
function openNav() {
  navAppearance = true;
  nav.style.display = "block";
  navIconImg.src = "icons/close.png";
  navIconImg.alt = "Close Button Icon";
  navButton.setAttribute("aria-label", "Close navigation menu")
  
}
function closeNav() {
  navAppearance = false;
  nav.style.display = "none";
  navIconImg.src = "icons/burger-bar.png";
  navIconImg.alt = "Burger Menu Button Icon";
  navButton.setAttribute("aria-label", "Open navigation menu")
  
}
function closeModal() {


 
  bluring();
  disableEvents();
  document.removeEventListener("touchmove", prevent);
  document.removeEventListener("click", clickOutModal);
  modalAppearance = false;
  modal.style.display = "none";
   noScroll(false);
   document.removeEventListener("keydown", closeModalByEscape)
   
}
function navToggle() {
  if (!navAppearance) {
    openNav();
  } else {
    closeNav();
  }
}
function getMoreDetails(name) {
  for (const index in villasDetails) {
    if (villasDetails[index][0] === name) {
      return villasDetails[index];
    }
  }
}
function bluring() {
  let elements = main.querySelectorAll(":scope  section:not(.modal)");

  for (let i = 0; i < elements.length; i++) {
    elements[i].classList.toggle("blur");
  }
  header.classList.toggle("blur");
  footer.classList.toggle("blur");
}

function disableEvents() {
  let elements = document.querySelectorAll(
    "a, button:not(.button-icon-close), .card",
  );
  for (let i = 0; i < elements.length; i++) {
    if (elements[i].inert) {
      elements[i].inert = false;
    } else {
      elements[i].inert = true;
    }
  }
}
function noScroll(opened) {
  const scrollBarWidth =
    window.innerWidth - document.documentElement.clientWidth;
  document.body.style.paddingRight = scrollBarWidth + "px";
  header.style.paddingRight = scrollBarWidth + "px";

  document.addEventListener("touchmove", prevent, { passive: false });
  document.documentElement.classList.toggle("no-scroll");
  document.body.classList.toggle("no-scroll");

  if (!opened && lastFocusedElement) {
lastFocusedElement.focus()

  } else {
    
    modal.focus();
    
  }
}
function prevent(e) {
  e.preventDefault();
}

function clickOutModal(e) {
  let inside = false;
  let elements = modal.querySelectorAll(
    ":scope *:not(.button-icon-close):not(.button-icon-close img)",
  );
  for (let i = 0; i < elements.length; i++) {
    if (e.target === elements[i]) {
      inside = true;
      break;
    }
  }
  if (e.target !== modal && !inside) {
    closeModal();
  }
 
}
function closeModalByEscape (e) {
if (e.key === "Escape") {
  closeModal()
}
}