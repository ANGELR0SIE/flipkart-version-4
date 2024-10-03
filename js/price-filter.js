

import { filterItems } from "./filter.js";

let uiStructure;

export function loadUIData() {
  fetch("./ui-structure.json")
    .then((response) => response.json())
    .then((data) => {
      uiStructure = data;
      createPriceRangeSection();
    })
    .catch((error) => console.error("Error loading UI data:", error));
}

export function createPriceRangeSection() {
  if (!uiStructure) {
    console.error("UI structure data not loaded.");
    return;
  }

  const priceData = uiStructure.leftSidebar[0].sections.find(
    (section) => section.title === "PRICE"
  );
  const minOptions = priceData.min;
  const maxOptions = priceData.max;

  const priceRangeSection = document.createElement("section");
  priceRangeSection.id = "price-filter";

  const priceTitle = document.createElement("div");
  priceTitle.className = "price-title";

  const titleSpan = document.createElement("span");
  titleSpan.innerText = "PRICE";
  priceTitle.appendChild(titleSpan);

  const clearSpan = document.createElement("span");
  clearSpan.innerText = "Clear";
  clearSpan.className = "clear-price";
  clearSpan.style.display = "none";
  priceTitle.appendChild(clearSpan);
  priceRangeSection.appendChild(priceTitle);

  const priceRangeContainer = document.createElement("div");
  priceRangeContainer.className = "price-range-container";

  const priceSlider = document.createElement("div");
  priceSlider.className = "price-slider";

  const filledRange = document.createElement("div");
  filledRange.className = "filled-range";
  priceSlider.appendChild(filledRange);

  const sliderLine = document.createElement("div");
  sliderLine.className = "slider-line";
  sliderLine.style.background = "#2874f0";

  const leftHandle = document.createElement("div");
  leftHandle.className = "left-handle handle";

  const rightHandle = document.createElement("div");
  rightHandle.className = "right-handle handle";

  leftHandle.style.left = '0';
  rightHandle.style.left = '100%';

  priceSlider.appendChild(sliderLine);
  priceSlider.appendChild(leftHandle);
  priceSlider.appendChild(rightHandle);
  priceRangeContainer.appendChild(priceSlider);
  priceRangeSection.appendChild(priceRangeContainer);

  const priceValuesDiv = document.createElement("div");
  priceValuesDiv.className = "price-values";

  const minPriceDiv = document.createElement("div");
  minPriceDiv.className = "min-price";
  const minPriceSelect = document.createElement("select");
  minPriceSelect.id = "min-price";
  minOptions.forEach((optionValue) => {
    const option = document.createElement("option");
    option.value = optionValue;
    option.innerText = optionValue === "0" ? "0" : `₹${optionValue}`;
    minPriceSelect.appendChild(option);
  });
  minPriceDiv.appendChild(minPriceSelect);
  priceValuesDiv.appendChild(minPriceDiv);

  const toSpan = document.createElement("span");
  toSpan.innerText = "to";
  priceValuesDiv.appendChild(toSpan);

  const maxPriceDiv = document.createElement("div");
  maxPriceDiv.className = "max-price";
  const maxPriceSelect = document.createElement("select");
  maxPriceSelect.id = "max-price";

  maxOptions.forEach((optionValue) => {
    const option = document.createElement("option");
    option.value = optionValue;
    option.innerText = optionValue === "30000+" ? "30000+" : `₹${optionValue}`;
    if (optionValue === "30000+") {
      option.selected = true;
    }
    maxPriceSelect.appendChild(option);
  });
  maxPriceDiv.appendChild(maxPriceSelect);
  priceValuesDiv.appendChild(maxPriceDiv);

  priceRangeSection.appendChild(priceValuesDiv);

  minPriceSelect.addEventListener("change", () => {
    updateSlider(minPriceSelect.value, maxPriceSelect.value);
    filterMaxOptions(minPriceSelect.value);
    updateClearSpanVisibility(minPriceSelect.value, maxPriceSelect.value);
  });

  maxPriceSelect.addEventListener("change", () => {
    updateSlider(minPriceSelect.value, maxPriceSelect.value);
    filterMinOptions(maxPriceSelect.value);
    updateClearSpanVisibility(minPriceSelect.value, maxPriceSelect.value);
  });

  clearSpan.addEventListener("click", () => {
    minPriceSelect.value = minOptions[0];
    maxPriceSelect.value = maxOptions[maxOptions.length - 1];
    updateSlider(minPriceSelect.value, maxPriceSelect.value);
    updateClearSpanVisibility(minPriceSelect.value, maxPriceSelect.value);
    clearSpan.style.display = 'none';
    filterItems(); 
  });

  updateSlider(minPriceSelect.value, maxPriceSelect.value);

  return priceRangeSection;
}

export function updateSlider(minValue, maxValue) {
  if (!maxValue) {
    console.error("Max value is empty or undefined.");
    return;
  }

  minValue = parseInt(minValue);
  maxValue = maxValue === "30000+" ? 30001 : parseInt(maxValue); // Changed to 30001

  minValue = isNaN(minValue) || minValue < 0 ? 0 : minValue;

  if (isNaN(minValue) || isNaN(maxValue) || maxValue < minValue) {
    console.error("Invalid min or max value.");
    return;
  }

  const leftPercentage = ((minValue / 30000) * 100) || 0;
  const rightPercentage = ((maxValue / 30000) * 100) || 100;

  const leftHandle = document.querySelector(".left-handle");
  const rightHandle = document.querySelector(".right-handle");
  const filledRange = document.querySelector(".filled-range");

  if (leftHandle && rightHandle && filledRange) {
    leftHandle.style.left = `${leftPercentage}%`;
    rightHandle.style.left = `${rightPercentage}%`;

    filledRange.style.left = `${leftPercentage}%`;
    filledRange.style.width = `${rightPercentage - leftPercentage}%`;
    filledRange.style.backgroundColor = "#2874f0";
    filledRange.style.position = 'absolute';
    filledRange.style.height = '100%';
    filledRange.style.zIndex = '1';
    document.querySelector('.slider-line').style.background='#c2c2c2'
  } else {
    console.error("Left or right handle not found in the DOM.");
  }
}

function updateClearSpanVisibility(minValue, maxValue) {
  const clearSpan = document.querySelector(".clear-price");
  if (clearSpan) {
    if (minValue !== "0" || maxValue !== "30000+") {
      clearSpan.style.display = "inline";
    } else {
      clearSpan.style.display = "none";
    }
  }
}

function filterMaxOptions(selectedMin) {
  const maxPriceSelect = document.getElementById("max-price");
  const maxOptions = Array.from(maxPriceSelect.options);
  const selectedMinValue = parseInt(selectedMin);

  maxOptions.forEach((option) => {
    const optionValue = parseInt(option.value);
    if (optionValue <= selectedMinValue && option.value !== "30000+") {
      option.style.display = "none";
    } else {
      option.style.display = "block";
    }
  });
}

function filterMinOptions(selectedMax) {
  const minPriceSelect = document.getElementById("min-price");
  const minOptions = Array.from(minPriceSelect.options);
  const selectedMaxValue = selectedMax === "30000+" ? 30000 : parseInt(selectedMax);

  minOptions.forEach((option) => {
    const optionValue = parseInt(option.value);
    if (optionValue >= selectedMaxValue) {
      option.style.display = "none";
    } else {
      option.style.display = "block";
    }
  });
}

loadUIData();
