import { filterItems } from "./filter.js";
import { handleSort } from "./sorting.js";

document.addEventListener("DOMContentLoaded", () => {
  let phoneData = [];
  let flipkartData;
  let lastSelectedSort = "relevance";
  let filteredData = [];

  function loadData() {
    fetch("./phone-data.json")
      .then((response) => response.json())
      .then((data) => {
        if (data && Array.isArray(data.rightSections)) {
          phoneData = data.rightSections;
          filteredData = [...phoneData];
          handleSort(filteredData, lastSelectedSort);
        } else {
          console.error(
            "Fetched data does not have a rightSections array:",
            data
          );
        }
      })
      .catch((error) => console.error("Error loading data:", error));
  }

  function createMobileHeader() {
    const header = document.createElement("div");
    header.className = "mobile-header";

    const logoDiv = document.createElement("div");
    logoDiv.className = "header-logo";
    const backDiv = document.createElement("div");
    backDiv.className = "back-div";
    const backIcon = document.createElement("img");
    backIcon.className = "back-icon";
    backIcon.src = "assets/back-button-mobile.svg";
    backIcon.alt = "back-icon";

    const logo = document.createElement("img");
    logo.src = "assets/flipkart-logo-mobile.png";
    logo.alt = "Flipkart Logo";
    logo.className = "flipkart-logo";
    backDiv.appendChild(backIcon);
    logoDiv.appendChild(backDiv);
    logoDiv.appendChild(logo);
    header.appendChild(logoDiv);
    const headerFlex = document.createElement("div");
    headerFlex.className = "header-flex";
    const searchIcon = document.createElement("img");
    searchIcon.className = "search-icon";
    searchIcon.src = "mobile-assets/search.svg";
    searchIcon.alt = "search-icon";

    const cart = document.createElement("img");
    cart.src = "mobile-assets/add-to-cart.svg";
    cart.alt = "cart Logo";
    cart.className = "cart-logo";
    const text = document.createElement("span");
    text.innerHTML = "Login";
    headerFlex.appendChild(searchIcon);
    headerFlex.appendChild(cart);
    headerFlex.appendChild(text);
    logoDiv.appendChild(headerFlex);
    const buttonDiv = document.createElement("div");
    buttonDiv.className = "header-buttons";

    const filterButton = document.createElement("button");
    filterButton.className = "filter-button";
    const filterText = document.createElement("span");
    filterText.innerText = "Filters";
    const filterImg = document.createElement("img");
    filterImg.src = "assets/filter.svg";
    filterButton.appendChild(filterImg);
    filterButton.appendChild(filterText);
    buttonDiv.appendChild(filterButton);

    const sortButton = document.createElement("button");
    sortButton.className = "sort-button";
    const sortText = document.createElement("span");
    sortText.innerText = "Sort";
    const sortIcon = document.createElement("img");
    sortIcon.src = "assets/sort.svg";
    sortButton.appendChild(sortIcon);
    sortButton.appendChild(sortText);
    buttonDiv.appendChild(sortButton);

    header.appendChild(buttonDiv);
    document.body.prepend(header);

    return { filterButton, sortButton };
  }

  function createMobileSortOverlay(flipkartData, phoneData) {
    if (!Array.isArray(phoneData)) {
      console.error(
        "createMobileSortOverlay: phoneData is not an array",
        phoneData
      );
      return;
    }

    const overlay = document.createElement("div");
    overlay.className = "sort-overlay";

    const backButton = document.createElement("img");
    backButton.innerText = "Back";
    backButton.className = "back-button";
    backButton.src = "assets/back-button-mobile.svg";
    backButton.alt = "back-icon";
    overlay.appendChild(backButton);

    const sortContainer = document.createElement("div");
    sortContainer.className = "sort-container";

    const sortOptionsList = flipkartData.right.div1[0].filters;

    sortOptionsList.forEach((option) => {
      const radioItem = document.createElement("div");
      radioItem.className = "radio-item";

      const radio = document.createElement("input");
      radio.type = "radio";
      radio.name = "sort-option";
      radio.value = option.cls;
      if (option.cls === lastSelectedSort) {
        radio.checked = true;
      }

      const label = document.createElement("label");
      label.innerText = option.text;

      radioItem.appendChild(radio);
      radioItem.appendChild(label);
      sortContainer.appendChild(radioItem);

      radio.addEventListener("change", () => {
        lastSelectedSort = radio.value;
        console.log("Sorting with criteria:", radio.value);
        handleSort(phoneData, radio.value);
        overlay.remove();
      });
    });

    overlay.appendChild(sortContainer);
    document.body.appendChild(overlay);

    backButton.addEventListener("click", () => {
      overlay.remove();
    });
  }
  function createMobileFilterOverlay(flipkartData) {
    const overlay = document.createElement("div");
    overlay.className = "filter-overlay";

    const backButton = document.createElement("img");
    backButton.innerText = "Back";
    backButton.className = "back-button";
    backButton.src = "assets/back-button-mobile.svg";
    backButton.alt = "back-icon";

    const filterHeader = document.createElement("div");
    const filterSpan = document.createElement("span");
    filterSpan.innerText = "Filters";

    filterHeader.className = "filter-header";
    filterHeader.appendChild(filterSpan);
    filterHeader.appendChild(backButton);
    overlay.appendChild(filterHeader);

    const filterContainer = document.createElement("div");
    filterContainer.className = "filter-container";
    overlay.appendChild(filterContainer);

    const leftSection = document.createElement("div");
    leftSection.className = "left-section";

    const rightSection = document.createElement("div");
    rightSection.className = "right-section";
    const emptyState = document.createElement("div");
    emptyState.className = "empty-state";
    emptyState.innerText = "Select a filter to see options";
    rightSection.appendChild(emptyState);

    const selectedFilters = {
      BRAND: [],
      PRICE: [],
    };

    if (flipkartData?.leftSidebar?.[0]?.sections) {
      flipkartData.leftSidebar[0].sections.forEach((section) => {
        const titleDiv = document.createElement("div");
        titleDiv.className = "filter-title";
        titleDiv.innerText = section.title;

        titleDiv.addEventListener("click", () => {
          rightSection.innerHTML = "";

          if (section.title === "PRICE") {
            const priceOptions = [
              { label: "Rs. 10000 and Below", value: "10000" },
              { label: "Rs. 10000 - Rs. 15000", value: "10000-15000" },
              { label: "Rs. 15000 - Rs. 20000", value: "15000-20000" },
              { label: "Rs. 20000 - Rs. 30000", value: "20000-30000" },
              { label: "Rs. 30000 and Above", value: "30000+" },
            ];

            priceOptions.forEach((priceOption) => {
              const checkboxItem = document.createElement("div");
              checkboxItem.className = "checkbox-item";

              const checkbox = document.createElement("input");
              checkbox.type = "checkbox";
              checkbox.value = priceOption.value;

              checkbox.checked = selectedFilters.PRICE.includes(
                priceOption.value
              );
              checkboxItem.appendChild(checkbox);

              const label = document.createElement("label");
              label.innerText = priceOption.label;
              checkboxItem.appendChild(label);

              checkbox.addEventListener("change", () => {
                if (checkbox.checked) {
                  selectedFilters.PRICE.push(priceOption.value);
                } else {
                  selectedFilters.PRICE = selectedFilters.PRICE.filter(
                    (price) => price !== priceOption.value
                  );
                }
              });

              rightSection.appendChild(checkboxItem);
            });
          } else if (section.options) {
            section.options.forEach((option) => {
              const checkboxItem = document.createElement("div");
              checkboxItem.className = "checkbox-item";

              const checkbox = document.createElement("input");
              checkbox.type = "checkbox";
              checkbox.value = option;

              checkbox.checked = selectedFilters.BRAND.includes(
                option.toUpperCase()
              );
              checkboxItem.appendChild(checkbox);

              const label = document.createElement("label");
              label.innerText = option;
              checkboxItem.appendChild(label);

              checkbox.addEventListener("change", () => {
                if (checkbox.checked) {
                  selectedFilters.BRAND.push(option.toUpperCase());
                } else {
                  selectedFilters.BRAND = selectedFilters.BRAND.filter(
                    (brand) => brand !== option.toUpperCase()
                  );
                }
              });

              rightSection.appendChild(checkboxItem);
            });
          }
        });

        leftSection.appendChild(titleDiv);
      });
    }

    filterContainer.appendChild(leftSection);
    filterContainer.appendChild(rightSection);

    const applyButton = document.createElement("button");
    applyButton.innerText = "Apply";
    applyButton.className = "apply-button";
    overlay.appendChild(applyButton);

    document.body.appendChild(overlay);

    backButton.addEventListener("click", () => {
      overlay.remove();
    });

    applyButton.addEventListener("click", () => {
      applyMobileFilters(selectedFilters);
      overlay.remove();
    });
  }

  function applyMobileFilters(mobileFilters) {
    if (mobileFilters.BRAND) {
      document
        .querySelectorAll('.filter-section.brand input[type="checkbox"]')
        .forEach((checkbox) => {
          checkbox.checked = mobileFilters.BRAND.includes(
            checkbox.value.toUpperCase()
          );
        });
    }

    if (mobileFilters.PRICE) {
      const priceCheckboxes = document.querySelectorAll(
        '.right-section input[type="checkbox"]'
      );
      priceCheckboxes.forEach((checkbox) => {
        checkbox.checked = mobileFilters.PRICE.includes(checkbox.value);
      });
    }

    filterItems();
  }
  fetch("./ui-structure.json")
    .then((response) => response.json())
    .then((data) => {
      flipkartData = data;
      const { filterButton, sortButton } = createMobileHeader();

      filterButton.addEventListener("click", () => {
        createMobileFilterOverlay(flipkartData);
      });

      sortButton.addEventListener("click", () => {
        createMobileSortOverlay(flipkartData, filteredData);
      });
    })
    .catch((error) => console.error("Error loading UI structure:", error));

  loadData();
});
