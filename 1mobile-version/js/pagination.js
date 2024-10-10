import { createRightSections } from "./phone-cards.js";
import { attachSortListeners } from "./sorting.js";

let currentPage = 1;
let currentData = [];

export function initializePagination(items, itemsPerPage) {
  const paginationContainer = document.querySelector(".pagination");
  const totalPages = Math.ceil(items.length / itemsPerPage);
  paginationContainer.innerHTML = "";
  currentPage = 1;
  for (let i = 1; i <= totalPages; i++) {
    const pageButton = document.createElement("button");
    pageButton.textContent = i;
    pageButton.className = "page-button";

    pageButton.onclick = () => {
      currentPage = i;
      paginateItems(i, items, itemsPerPage);
    };
    paginationContainer.appendChild(pageButton);
  }

  paginateItems(currentPage, items, itemsPerPage);
}

function paginateItems(pageNumber, items, itemsPerPage) {
  const startIndex = (pageNumber - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const itemsToDisplay = items.slice(startIndex, endIndex);
  updateDisplay(itemsToDisplay);
  updateActivePageButton(pageNumber);
  togglePaginationButtons(itemsToDisplay.length > 0);
}

function updateDisplay(items) {
  const rightSectionsMain = document.querySelector(".right-sec-main");
  if (!rightSectionsMain) {
    console.error("Error: .right-sec-main element not found in the DOM");
    return;
  }

  rightSectionsMain.innerHTML = "";
  createRightSections(items);
}

document.addEventListener("DOMContentLoaded", () => {
  loadData();
});

async function loadData() {
  try {
    const response = await fetch("phone-data.json");
    const data = await response.json();
    if (!data.rightSections) {
      console.error("Error: rightSections not found in the data");
      return;
    }

    currentData = data.rightSections;
    initializePagination(currentData, 5);
    attachSortListeners(currentData, 5);
  } catch (error) {
    console.error("Error loading data:", error);
  }
}

function updateActivePageButton(pageNumber) {
  const pageButtons = document.querySelectorAll(".page-button");
  pageButtons.forEach((button, index) => {
    button.classList.remove("active");
    if (index + 1 === pageNumber) {
      button.classList.add("active");
    }
  });
}

function togglePaginationButtons(shouldDisplay) {
  const paginationContainer = document.querySelector(".pagination");
  paginationContainer.style.display = shouldDisplay ? "flex" : "none";
}
