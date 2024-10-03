import { initializePagination } from "./pagination.js";

let originalData = [];

export function sortItems(data, criteria) {
  if (originalData.length === 0) {
    originalData = [...data];
  }

  switch (criteria) {
    case "relevance":
      return [...originalData];
    case "popularity":
      return data.sort((a, b) => b.ratingsCount - a.ratingsCount);
    case "lowtoHigh":
      return data.sort((a, b) => a.price - b.price);
    case "highToLow":
      return data.sort((a, b) => b.price - a.price);
    case "newstFirst":
      return data.sort((a, b) => new Date(b.date) - new Date(a.date));
    default:
      return data;
  }
}

export function handleSort(data, criteria) {
  const sortedData = sortItems(data, criteria);
  initializePagination(sortedData, 5);
}

export function attachSortListeners(data, itemsPerPage) {
  const sortOptions = document.querySelectorAll(".filter-txt");

  sortOptions.forEach((option) => {
    option.addEventListener("click", (event) => {
      const target = event.currentTarget;
      console.log("slicked:", target);
      const selectedSort = target.dataset.sort;
      console.log("slected:", selectedSort);

      handleSort(data, selectedSort);
    });
  });
}
