import { createRightSections } from "./phone-cards.js";
import { initializePagination } from "./pagination.js";
import { updateSlider } from "./price-filter.js";


let originalData = [];
let filteredData = [];
let currentPage = 1;
const itemsPerPage = 5;

async function loadData() {
  try {
    const response = await fetch("phone-data.json");
    if (!response.ok) {
      throw new Error("Network response was not ok");
    }
    const data = await response.json();
    originalData = data.rightSections;
    filteredData = originalData;
    attachFilterListeners();
    updateDisplay(filteredData);
  } catch (error) {
    console.error("Error loading data:", error);
  }
}

const ramConditions = {
  "4 GB": (ram) => ram === 4,
  "3 GB": (ram) => ram === 3,
  "2 GB": (ram) => ram === 2,
  "1 GB and Below": (ram) => ram <= 1,
  "8 GB and Above": (ram) => ram >= 8,
  "6 GB": (ram) => ram === 6,
  "6 GB Above": (ram) => ram > 6,
};

function applyFilters(data) {
  const brandFilters = getSelectedBrands();
  const ramFilters = getSelectedRAM();
  const ratings = getSelectedRatings();
  const priceRange = getSelectedPriceRange();

  return data.filter((item) => {
    const brandMatch = brandFilters.length
      ? brandFilters.includes(item.name.split(" ")[0].toUpperCase())
      : true;

    const ramMatch = ramFilters.length
      ? ramFilters.some((filter) => {
          if (item.RAM === "Not Specified") return false;
          const itemRAM = parseInt(item.RAM);
          return ramConditions[filter] ? ramConditions[filter](itemRAM) : false;
        })
      : true;

    const ratingMatch = ratings.length
      ? ratings.some((rating) => parseFloat(item.ratings) >= parseFloat(rating))
      : true;

    const priceMatch = priceRange
      ? item.price >= priceRange.min && item.price <= priceRange.max
      : true;

    return brandMatch && ramMatch && ratingMatch && priceMatch;
  });
}

function getSelectedBrands() {
  const selected = [];
  document
    .querySelectorAll('.filter-section.brand input[type="checkbox"]:checked')
    .forEach((input) => {
      selected.push(input.value.toUpperCase());
    });
  return selected;
}

function getSelectedRatings() {
  const selected = [];
  document
    .querySelectorAll(
      '.filter-section.customer-ratings input[type="checkbox"]:checked'
    )
    .forEach((input) => {
      selected.push(input.value);
    });
  return selected;
}

function getSelectedRAM() {
  const selected = [];
  document
    .querySelectorAll('.filter-section.ram input[type="checkbox"]:checked')
    .forEach((input) => {
      selected.push(input.value);
    });
  return selected;
}

function getSelectedPriceRange() {
  const minPriceSelect = document.getElementById("min-price");
  const maxPriceSelect = document.getElementById("max-price");

  const minPrice = parseInt(minPriceSelect.value) || 0;
  const maxPrice =
    maxPriceSelect.value === "30000+"
      ? Infinity
      : parseInt(maxPriceSelect.value);

  return { min: minPrice, max: maxPrice };
}

function updateDisplay(data) {
  const rightSection = document.querySelector(".right-sec");
  const paginationContainer = document.querySelector(".pagination");

  if (data.length === 0) {
    rightSection.innerHTML = "<div>No results found</div>";
    paginationContainer.style.display = "none";
    return;
  } else {
    paginationContainer.style.display = "block";
  }

  currentPage = 1;
  const paginatedData = paginate(data);
  createRightSections(paginatedData);
  initializePagination(data, itemsPerPage);
}

function paginate(data) {
  const start = (currentPage - 1) * itemsPerPage;
  const end = start + itemsPerPage;
  return data.slice(start, end);
}

export function attachFilterListeners() {
  document
    .querySelectorAll('.filter-section.brand input[type="checkbox"]')
    .forEach((input) => {
      input.addEventListener("change", filterItems);
    });

  document
    .querySelectorAll('.filter-section.customer-ratings input[type="checkbox"]')
    .forEach((input) => {
      input.addEventListener("change", filterItems);
    });

  document
    .querySelectorAll('.filter-section.ram input[type="checkbox"]')
    .forEach((input) => {
      input.addEventListener("change", filterItems);
    });

  const clearAllButton = document.querySelector(".remove-items.sec2-remove-items");
  if (clearAllButton) {
    clearAllButton.addEventListener("click", clearAllFilters);
  }

  const minPriceSelect = document.getElementById("min-price");
  const maxPriceSelect = document.getElementById("max-price");

  if (minPriceSelect && maxPriceSelect) {
    minPriceSelect.addEventListener("change", filterItems);
    maxPriceSelect.addEventListener("change", filterItems);
  }
}

export function filterItems() {
  filteredData = applyFilters(originalData);
  updateDisplay(filteredData);
  updateSelectedFilters();
}

function clearAllFilters() {
  document
    .querySelectorAll('.filter-section input[type="checkbox"]')
    .forEach((checkbox) => {
      checkbox.checked = false;
    });

  clearPriceFilter(); 

  filteredData = applyFilters(originalData);
  updateDisplay(filteredData);
  updateSelectedFilters();
}

function updateSelectedFilters() {
  const selectedFiltersDiv = document.querySelector(".selected-filters");
  selectedFiltersDiv.innerHTML = "";

  const brandFilters = getSelectedBrands();
  const ramFilters = getSelectedRAM();
  const ratingFilters = getSelectedRatings();
  const priceRange = getSelectedPriceRange();

  const allSelectedFilters = [
    ...brandFilters,
    ...ramFilters,
    ...ratingFilters,
  ];

  if (!(priceRange.min === 0 && priceRange.max === Infinity)) {
    const displayMaxPrice = priceRange.max === Infinity ? "30000+" : priceRange.max;
    allSelectedFilters.push(`${priceRange.min}-${displayMaxPrice}`);
  }

  allSelectedFilters.forEach((filter) => {
    const span = document.createElement("span");
    span.innerText = filter;
    const cross = document.createElement("span");
    cross.innerText = "✕";
    cross.className = "remove-filter";
    cross.addEventListener("click", () => {
      removeFilter(filter);
    });
    span.appendChild(cross);
    selectedFiltersDiv.appendChild(span);
  });

  const clearAllDiv = document.querySelector(".remove-items");
  clearAllDiv.style.display = allSelectedFilters.length > 0 ? "block" : "none";

  updateClearButtonsVisibility();
}

function removeFilter(filter) {
  const brandCheckbox = document.querySelector(
    `.filter-section.brand input[type="checkbox"][value="${filter}"]`
  );
  if (brandCheckbox) {
    brandCheckbox.checked = false;
  }

  const ramCheckbox = document.querySelector(
    `.filter-section.ram input[type="checkbox"][value="${filter}"]`
  );
  if (ramCheckbox) {
    ramCheckbox.checked = false;
  }

  const ratingCheckbox = document.querySelector(
    `.filter-section.customer-ratings input[type="checkbox"][value="${filter}"]`
  );
  if (ratingCheckbox) {
    ratingCheckbox.checked = false;
  }

  filterItems();
}

function updateClearButtonsVisibility() {
  document.querySelectorAll(".filter-section").forEach((section) => {
    const checkboxes = section.querySelectorAll('input[type="checkbox"]:checked');
    const clearButton = section.querySelector(".remove-items");
    clearButton.style.display = checkboxes.length > 0 ? "block" : "none";
  });
}

const clearPriceButton = document.querySelector("sec2-remove-items");
if (clearPriceButton) {
  clearPriceButton.addEventListener("click", clearPriceFilter);
  clearPriceButton.style.display = 'none';
    filterItems(); 
}

function clearPriceFilter() {
  
 const minPriceSelect= document.getElementById("min-price").value = "min";
 const maxPriceSelect=document.getElementById("max-price").value = "30000+";
  updateSlider(minPriceSelect, maxPriceSelect);
  filteredData = applyFilters(originalData);
  updateDisplay(filteredData);
}

document.addEventListener("DOMContentLoaded", () => {
  loadData();
});
