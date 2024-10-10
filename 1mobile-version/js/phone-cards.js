import {  attachFilterListeners } from "./filter.js";
import { attachSortListeners } from "./sorting.js";
import { initializePagination } from "./pagination.js";

let originalData = [];

document.addEventListener("DOMContentLoaded", () => {
  fetch("phone-data.json")
    .then((response) => {
      if (!response.ok) {
        throw new Error("Network response was not ok");
      }
      return response.json();
    })
    .then((data) => {
      originalData = data.rightSections;
      createRightSections(originalData);
      attachFilterListeners();
      attachSortListeners(originalData); 
      initializePagination(originalData);
    })
    .catch((error) => {
      console.error("Error fetching phone data:", error);
    });
});

export function createRightSections(items) {
  const rightSectionsMain = document.querySelector(".right-sec-main");
  if (!rightSectionsMain) {
    console.error("Error: .right-sec-main element not found in the DOM");
    return;
  }

  rightSectionsMain.innerHTML = "";

  const rightSections = document.createElement("div");
  rightSections.className = "right-sec";
  rightSectionsMain.appendChild(rightSections);

  items.forEach((item) => {
    const rightSecBox = document.createElement("div");
    rightSecBox.className = "right-sec-div";
    const rightSection = document.createElement("section");
    rightSection.className = "right-Section";

    const imgRel = document.createElement("div");
    imgRel.className = "img-rel";
    const imageDiv = document.createElement("div");
    imageDiv.className = "image-div";

    const productImage = document.createElement("img");
    productImage.src = item.image;
    productImage.alt = "Product Image";

    const compareDiv = document.createElement("div");
    compareDiv.className = "compare";
    const checkboxDiv = document.createElement("div");
    const checkbox = document.createElement("input");
    checkbox.type = "checkbox";
    checkboxDiv.appendChild(checkbox);
    const compareSpan = document.createElement("span");
    compareSpan.innerHTML = "Add to Compare";
    compareDiv.append(checkboxDiv, compareSpan);

    const heartDiv = document.createElement("div");
    heartDiv.className = "heart";
    const heartImg = document.createElement("img");
    heartImg.src =item.heart;
    heartDiv.appendChild(heartImg);

    const date = document.createElement("div");
    date.innerHTML = `<span data-date="${item.date}"></span>`;
    imageDiv.append(productImage, compareDiv, heartDiv);
    imgRel.appendChild(imageDiv);
    rightSection.appendChild(imgRel);

    const row = document.createElement("div");
    row.className = "row";
    const rowLeft = document.createElement("div");
    rowLeft.className = "row-left";

    const heading = document.createElement("h2");
    heading.innerHTML = `<span class="brand"> ${item.name} </span>  (${item.color} ,${item.storage})`;

    const subTitle = document.createElement("div");
    subTitle.className = "sub-title";
    const ratingBtn = document.createElement("div");
    ratingBtn.className = "rating-btn";
    const ratingSpan = document.createElement("span");
    ratingSpan.innerHTML = item.ratings;
    const ratingImg = document.createElement("img");
    ratingImg.src = item.ratingStar;
    ratingBtn.append(ratingSpan, ratingImg);

    const reviewsDiv = document.createElement("div");
    reviewsDiv.className = "reviews";
    const reviewsSpan = document.createElement("span");
    reviewsSpan.innerHTML = `${item.ratingsCount} Ratings & ${item.reviews} Reviews`;
    reviewsDiv.appendChild(reviewsSpan);
    subTitle.append(ratingBtn, reviewsDiv);

    const features = document.createElement("ul");
    features.className = "features";
    const featureItems = [
      `${item.storage} ROM`,
      item.display,
      item.cameras,
      item.processor,
      item.warranty,
    ];

    featureItems.forEach((text) => {
      const li = document.createElement("li");
      li.innerHTML = text;
      features.appendChild(li);
    });

    rowLeft.append(heading, subTitle, features);
    row.appendChild(rowLeft);

    const rowRight = document.createElement("div");
    rowRight.className = "row-right";
    const priceDetails = document.createElement("div");
    priceDetails.className = "price-details";
    const priceDiv = document.createElement("div");
    priceDiv.className = "price";

    const currPriceSpan = document.createElement("span");
    currPriceSpan.className = "curr-price";
    currPriceSpan.innerHTML = `₹${item.price}`;
    const orgPriceDiv = document.createElement("div");
    orgPriceDiv.className = "org-price";
    orgPriceDiv.innerHTML = `₹${item.originalPrice}`;
    const discountSpan = document.createElement("span");
    discountSpan.className = "discount";
    discountSpan.innerHTML = item.discount;
    orgPriceDiv.appendChild(discountSpan);
    priceDiv.append(currPriceSpan, orgPriceDiv);

    const deliverySpan = document.createElement("span");
    deliverySpan.className = "delivery";
    deliverySpan.innerHTML = item.delivery;
    priceDetails.append(priceDiv, deliverySpan);

    const deal = document.createElement("span");
    deal.className = "deal";
    deal.innerHTML = item.deal;
    priceDetails.append(deal);

    const fLogoDiv = document.createElement("div");
    fLogoDiv.className = "f-logo";
    const fLogoImg = document.createElement("img");
    fLogoImg.src = item.fLogo;
    fLogoDiv.appendChild(fLogoImg);

    const offersDiv = document.createElement("div");
    offersDiv.className = "offers";
    const offersSpan = document.createElement("span");
    offersSpan.innerHTML = item.specialOffers;
    offersDiv.appendChild(offersSpan);

    const stockDiv = document.createElement("div");
    stockDiv.className = "stock";
    const stockSpan = document.createElement("span");
    stockSpan.innerHTML = item.stock;
    stockDiv.appendChild(stockSpan);

    rowRight.append(priceDetails, fLogoDiv, offersDiv, stockDiv);
    row.appendChild(rowRight);
    rightSecBox.appendChild(row);
    rightSection.appendChild(rightSecBox);
    rightSections.appendChild(rightSection);
  });
}
