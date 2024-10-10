// import { updateDisplay } from "./filter.js";
// import { applyFilters } from "./filter.js";
// import { handleSort } from "./sorting.js";
// import { initializePagination } from "./pagination.js";

// document.addEventListener("DOMContentLoaded", () => {
//   let phoneData = [];
//   let flipkartData;
//   let lastSelectedSort = "relevance";
//   let filteredData = []; // Declare filteredData here

//   function loadData() {
//     fetch("./phone-data.json")
//       .then((response) => response.json())
//       .then((data) => {
//         if (data && Array.isArray(data.rightSections)) {
//           phoneData = data.rightSections;
//           filteredData = [...phoneData]; // Initialize filteredData with the original phoneData
//           handleSort(filteredData, lastSelectedSort); // Use filteredData here
//         } else {
//           console.error(
//             "Fetched data does not have a rightSections array:",
//             data
//           );
//         }
//       })
//       .catch((error) => console.error("Error loading data:", error));
//   }

//   function createMobileHeader() {
//     const header = document.createElement("div");
//     header.className = "mobile-header";

//     const logoDiv = document.createElement("div");
//     logoDiv.className = "header-logo";

//     const backIcon = document.createElement("span");
//     backIcon.className = "back-icon";
//     backIcon.innerText = "←";

//     const logo = document.createElement("img");
//     logo.src = "flipkart-logo.png";
//     logo.alt = "Flipkart Logo";
//     logo.className = "flipkart-logo";

//     logoDiv.appendChild(backIcon);
//     logoDiv.appendChild(logo);
//     header.appendChild(logoDiv);

//     const buttonDiv = document.createElement("div");
//     buttonDiv.className = "header-buttons";

//     const filterButton = document.createElement("button");
//     filterButton.className = "filter-button";
//     filterButton.innerText = "Filters";
//     buttonDiv.appendChild(filterButton);

//     const sortButton = document.createElement("button");
//     sortButton.className = "sort-button";
//     sortButton.innerText = "Sort";
//     buttonDiv.appendChild(sortButton);

//     header.appendChild(buttonDiv);
//     document.body.prepend(header);

//     return { filterButton, sortButton };
//   }

//   function createMobileSortOverlay(flipkartData, phoneData) {
//     if (!Array.isArray(phoneData)) {
//       console.error(
//         "createMobileSortOverlay: phoneData is not an array",
//         phoneData
//       );
//       return;
//     }

//     const overlay = document.createElement("div");
//     overlay.className = "sort-overlay";

//     const backButton = document.createElement("button");
//     backButton.innerText = "Back";
//     backButton.className = "back-button";
//     overlay.appendChild(backButton);

//     const sortContainer = document.createElement("div");
//     sortContainer.className = "sort-container";

//     const sortOptionsList = flipkartData.right.div1[0].filters;

//     sortOptionsList.forEach((option) => {
//       const radioItem = document.createElement("div");
//       radioItem.className = "radio-item";

//       const radio = document.createElement("input");
//       radio.type = "radio";
//       radio.name = "sort-option";
//       radio.value = option.cls;
//       if (option.cls === lastSelectedSort) {
//         radio.checked = true;
//       }

//       const label = document.createElement("label");
//       label.innerText = option.text;

//       radioItem.appendChild(radio);
//       radioItem.appendChild(label);
//       sortContainer.appendChild(radioItem);

//       radio.addEventListener("change", () => {
//         lastSelectedSort = radio.value;
//         console.log("Sorting with criteria:", radio.value);
//         handleSort(phoneData, radio.value);
//         overlay.remove();
//       });
//     });

//     overlay.appendChild(sortContainer);
//     document.body.appendChild(overlay);

//     backButton.addEventListener("click", () => {
//       overlay.remove();
//     });
//   }

//   // function createMobileFilterOverlay(flipkartData) {
//   //   const overlay = document.createElement("div");
//   //   overlay.className = "filter-overlay";

//   //   const backButton = document.createElement("button");
//   //   backButton.innerText = "Back";
//   //   backButton.className = "back-button";
//   //   overlay.appendChild(backButton);

//   //   const filterContainer = document.createElement("div");
//   //   filterContainer.className = "filter-container";
//   //   overlay.appendChild(filterContainer);

//   //   const leftSection = document.createElement("div");
//   //   leftSection.className = "left-section";

//   //   const rightSection = document.createElement("div");
//   //   rightSection.className = "right-section";

//   //   const selectedFilters = {
//   //     BRAND: [],
//   //     PRICE: [],
//   //   };

//   //   if (
//   //     flipkartData &&
//   //     flipkartData.leftSidebar &&
//   //     Array.isArray(flipkartData.leftSidebar)
//   //   ) {
//   //     const leftSidebarData = flipkartData.leftSidebar[0];

//   //     if (Array.isArray(leftSidebarData.sections)) {
//   //       leftSidebarData.sections.forEach((section) => {
//   //         const titleDiv = document.createElement("div");
//   //         titleDiv.className = "filter-title";
//   //         titleDiv.innerText = section.title;

//   //         titleDiv.addEventListener("click", () => {
//   //           rightSection.innerHTML = "";

//   //           if (section.title === "PRICE") {
//   //             const priceOptions = [
//   //               { label: "Rs. 10000 and Below", value: "10000" },
//   //               { label: "Rs. 10000 - Rs. 15000", value: "10000-15000" },
//   //               { label: "Rs. 15000 - Rs. 20000", value: "15000-20000" },
//   //               { label: "Rs. 20000 - Rs. 30000", value: "20000-30000" },
//   //               { label: "Rs. 30000 and Above", value: "30000+" },
//   //             ];

//   //             priceOptions.forEach((priceOption) => {
//   //               const checkboxItem = document.createElement("div");
//   //               checkboxItem.className = "checkbox-item";

//   //               const checkbox = document.createElement("input");
//   //               checkbox.type = "checkbox";
//   //               checkbox.value = priceOption.value;
//   //               checkbox.checked = selectedFilters.PRICE.includes(
//   //                 priceOption.value
//   //               );
//   //               checkboxItem.appendChild(checkbox);

//   //               const label = document.createElement("label");
//   //               label.innerText = priceOption.label;
//   //               checkboxItem.appendChild(label);

//   //               checkbox.addEventListener("change", () => {
//   //                 if (checkbox.checked) {
//   //                   selectedFilters.PRICE.push(priceOption.value);
//   //                 } else {
//   //                   selectedFilters.PRICE = selectedFilters.PRICE.filter(
//   //                     (price) => price !== priceOption.value
//   //                   );
//   //                 }
//   //               });

//   //               rightSection.appendChild(checkboxItem);
//   //             });
//   //           } else if (section.options) {
//   //             section.options.forEach((option) => {
//   //               const checkboxItem = document.createElement("div");
//   //               checkboxItem.className = "checkbox-item";

//   //               const checkbox = document.createElement("input");
//   //               checkbox.type = "checkbox";
//   //               checkbox.value = option;
//   //               checkbox.checked = selectedFilters.BRAND.includes(
//   //                 option.toUpperCase()
//   //               );
//   //               checkboxItem.appendChild(checkbox);

//   //               const label = document.createElement("label");
//   //               label.innerText = option;
//   //               checkboxItem.appendChild(label);

//   //               checkbox.addEventListener("change", () => {
//   //                 if (checkbox.checked) {
//   //                   selectedFilters.BRAND.push(option.toUpperCase());
//   //                 } else {
//   //                   selectedFilters.BRAND = selectedFilters.BRAND.filter(
//   //                     (brand) => brand !== option.toUpperCase()
//   //                   );
//   //                 }
//   //               });

//   //               rightSection.appendChild(checkboxItem);
//   //             });
//   //           }
//   //         });

//   //         leftSection.appendChild(titleDiv);
//   //       });
//   //     }
//   //   }

//   //   const applyButton = document.createElement("button");
//   //   applyButton.innerText = "Apply";

//   //   // Add the event listener for the Apply button
//   //   applyButton.addEventListener("click", () => {
//   //     // Gather selected filters from the overlay
//   //     const selectedBrands = selectedFilters.BRAND;
//   //     const selectedPriceRanges = selectedFilters.PRICE;

//   //     // Update the filters in filter.js
//   //     const brandFilters = selectedBrands.map((brand) => brand.toUpperCase());
//   //     const priceFilter =
//   //       selectedPriceRanges.length > 0 ? selectedPriceRanges : null;

//   //     // Apply the filters to the data
//   //     filteredData = applyFilters(phoneData, brandFilters, priceFilter); // Use phoneData here
//   //     updateDisplay(filteredData);
//   //     // updateSelectedFilters();

//   //     // Debugging: Log the filtered data
//   //     console.log(filteredData);

//   //     // Close the overlay
//   //     overlay.remove();
//   //   });

//   //   filterContainer.appendChild(leftSection);
//   //   filterContainer.appendChild(rightSection);
//   //   filterContainer.appendChild(applyButton);

//   //   document.body.appendChild(overlay);

//   //   backButton.addEventListener("click", () => {
//   //     overlay.remove();
//   //   });
//   // }

//   function createMobileFilterOverlay(flipkartData) {
//     const overlay = document.createElement("div");
//     overlay.className = "filter-overlay";

//     const backButton = document.createElement("button");
//     backButton.innerText = "Back";
//     backButton.className = "back-button";
//     overlay.appendChild(backButton);

//     const filterContainer = document.createElement("div");
//     filterContainer.className = "filter-container";
//     overlay.appendChild(filterContainer);

//     const leftSection = document.createElement("div");
//     leftSection.className = "left-section";

//     const rightSection = document.createElement("div");
//     rightSection.className = "right-section";

//     const selectedFilters = {
//         BRAND: [],
//         PRICE: [],
//     };

//     if (flipkartData && flipkartData.leftSidebar && Array.isArray(flipkartData.leftSidebar)) {
//         const leftSidebarData = flipkartData.leftSidebar[0];

//         if (Array.isArray(leftSidebarData.sections)) {
//             leftSidebarData.sections.forEach((section) => {
//                 const titleDiv = document.createElement("div");
//                 titleDiv.className = "filter-title";
//                 titleDiv.innerText = section.title;

//                 titleDiv.addEventListener("click", () => {
//                     rightSection.innerHTML = "";

//                     if (section.title === "PRICE") {
//                         const priceOptions = [
//                             { label: "Rs. 10000 and Below", value: "10000" },
//                             { label: "Rs. 10000 - Rs. 15000", value: "10000-15000" },
//                             { label: "Rs. 15000 - Rs. 20000", value: "15000-20000" },
//                             { label: "Rs. 20000 - Rs. 30000", value: "20000-30000" },
//                             { label: "Rs. 30000 and Above", value: "30000+" },
//                         ];

//                         priceOptions.forEach((priceOption) => {
//                             const checkboxItem = document.createElement("div");
//                             checkboxItem.className = "checkbox-item";

//                             const checkbox = document.createElement("input");
//                             checkbox.type = "checkbox";
//                             checkbox.value = priceOption.value;
//                             checkbox.checked = selectedFilters.PRICE.includes(priceOption.value);
//                             checkboxItem.appendChild(checkbox);

//                             const label = document.createElement("label");
//                             label.innerText = priceOption.label;
//                             checkboxItem.appendChild(label);

//                             checkbox.addEventListener("change", () => {
//                                 if (checkbox.checked) {
//                                     selectedFilters.PRICE.push(priceOption.value);
//                                 } else {
//                                     selectedFilters.PRICE = selectedFilters.PRICE.filter(price => price !== priceOption.value);
//                                 }
//                                 // Log selected price filters
//                                 console.log("Selected Price Filters:", selectedFilters.PRICE);
//                             });

//                             rightSection.appendChild(checkboxItem);
//                         });
//                     } else if (section.options) {
//                         section.options.forEach((option) => {
//                             const checkboxItem = document.createElement("div");
//                             checkboxItem.className = "checkbox-item";

//                             const checkbox = document.createElement("input");
//                             checkbox.type = "checkbox";
//                             checkbox.value = option;
//                             checkbox.checked = selectedFilters.BRAND.includes(option.toUpperCase());
//                             checkboxItem.appendChild(checkbox);

//                             const label = document.createElement("label");
//                             label.innerText = option;
//                             checkboxItem.appendChild(label);

//                             checkbox.addEventListener("change", () => {
//                                 if (checkbox.checked) {
//                                     selectedFilters.BRAND.push(option.toUpperCase());
//                                 } else {
//                                     selectedFilters.BRAND = selectedFilters.BRAND.filter(brand => brand !== option.toUpperCase());
//                                 }
//                                 // Log selected brand filters
//                                 console.log("Selected Brand Filters:", selectedFilters.BRAND);
//                             });

//                             rightSection.appendChild(checkboxItem);
//                         });
//                     }
//                 });

//                 leftSection.appendChild(titleDiv);
//             });
//         }
//     }

//     const applyButton = document.createElement("button");
//     applyButton.innerText = "Apply";

//     // Add the event listener for the Apply button
//     applyButton.addEventListener("click", () => {
//         // Gather selected filters from the overlay
//         const selectedBrands = selectedFilters.BRAND;
//         const selectedPriceRanges = selectedFilters.PRICE;

//         // Log the selected filters when Apply is clicked
//         console.log("Applying Filters - Selected Brands:", selectedBrands);
//         console.log("Applying Filters - Selected Price Ranges:", selectedPriceRanges);

//         // Update the filters in filter.js
//         const brandFilters = selectedBrands.map(brand => brand.toUpperCase());
//         const priceFilter = selectedPriceRanges.length > 0 ? selectedPriceRanges : null;

//         // Apply the filters to the data
//         filteredData = applyFilters(phoneData, brandFilters, priceFilter); // Use phoneData here
//         updateDisplay(filteredData);

//         // Debugging: Log the filtered data
//         console.log("Filtered Data:", filteredData);

//         // Close the overlay
//         overlay.remove();
//     });

//     filterContainer.appendChild(leftSection);
//     filterContainer.appendChild(rightSection);
//     filterContainer.appendChild(applyButton);

//     document.body.appendChild(overlay);

//     backButton.addEventListener("click", () => {
//         overlay.remove();
//     });
// }

//   // Load UI structure and set up event listeners
//   fetch("./ui-structure.json")
//     .then((response) => response.json())
//     .then((data) => {
//       flipkartData = data;
//       const { filterButton, sortButton } = createMobileHeader();

//       filterButton.addEventListener("click", () => {
//         createMobileFilterOverlay(flipkartData);
//       });

//       sortButton.addEventListener("click", () => {
//         createMobileSortOverlay(flipkartData, filteredData); // Use filteredData here
//       });
//     })
//     .catch((error) => console.error("Error loading UI structure:", error));

//   loadData();
// });

import { filterItems } from "./filter.js";

async function fetchUIStructure() {
  try {
    const response = await fetch("ui-structure.json");
    if (!response.ok) throw new Error("Failed to load UI structure");
    const flipkartData = await response.json();
    return flipkartData;
  } catch (error) {
    console.error(error);
    return null;
  }
}

function createMobileHeader() {
  const header = document.createElement("div");
  header.className = "mobile-header";

  const logoDiv = document.createElement("div");
  logoDiv.className = "header-logo";

  const backIcon = document.createElement("span");
  backIcon.className = "back-icon";
  backIcon.innerText = "←";

  const logo = document.createElement("img");
  logo.src = "flipkart-logo.png";
  logo.alt = "Flipkart Logo";
  logo.className = "flipkart-logo";

  logoDiv.appendChild(backIcon);
  logoDiv.appendChild(logo);
  header.appendChild(logoDiv);

  const buttonDiv = document.createElement("div");
  buttonDiv.className = "header-buttons";

  const filterButton = document.createElement("button");
  filterButton.className = "filter-button";
  filterButton.innerText = "Filters";
  buttonDiv.appendChild(filterButton);

  const sortButton = document.createElement("button");
  sortButton.className = "sort-button";
  sortButton.innerText = "Sort";
  buttonDiv.appendChild(sortButton);

  header.appendChild(buttonDiv);
  document.body.prepend(header);

  return { filterButton, sortButton };
}

function createMobileFilterOverlay(flipkartData) {
  const overlay = document.createElement("div");
  overlay.className = "filter-overlay";

  const backButton = document.createElement("button");
  backButton.innerText = "Back";
  backButton.className = "back-button";
  overlay.appendChild(backButton);

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

  filterItems(); // Trigger the actual filtering logic
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

  const backButton = document.createElement("button");
  backButton.innerText = "Back";
  backButton.className = "back-button";
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

    const label = document.createElement("label");
    label.innerText = option.text;

    radioItem.appendChild(radio);
    radioItem.appendChild(label);
    sortContainer.appendChild(radioItem);

    radio.addEventListener("change", () => {
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

async function loadData() {
  const flipkartData = await fetchUIStructure();
  const { filterButton, sortButton } = createMobileHeader();

  filterButton.addEventListener("click", () => {
    createMobileFilterOverlay(flipkartData);
  });

  sortButton.addEventListener("click", () => {
    createMobileSortOverlay(flipkartData, filteredData); // filteredData should be used here
  });
}

document.addEventListener("DOMContentLoaded", loadData);
