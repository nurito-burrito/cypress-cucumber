/// <reference types="Cypress" />
import { Given, When, Then } from "@badeball/cypress-cucumber-preprocessor";
import { PageElements } from "../../../pageObjects/pageElements";

const pageElements = new PageElements();

Given("I add four random items to my cart", () => {
  cy.visit("/");
  pageElements.productLink.should("be.visible");

  const times = 4;
  for (let i = 0; i < times; i++) {
    clickonRandomItem();
  }
});

When("I view my cart", () => {
  pageElements.cartButton.eq(0).click();
});

Then("I find total four items listed in my cart", () => {
  pageElements.itemRemoveButton.should("have.length", 4);
});

When("I search and remove the lowest price item", () => {
  removeLowestPricedItem();
});

// When("I am able to remove the lowest price item from my cart", function () {});

Then("I am able to verify three items in my cart", () => {
  pageElements.itemRemoveButton.should("have.length", 3);
});

// Define a variable to store used indices
const usedIndices = [];

function clickonRandomItem() {
  pageElements.addToCartButton
    .should("have.length.gt", 1)
    // get the number of elements
    .its("length")
    .then((n) => {
      // Generate a random index not in usedIndices
      let k;
      do {
        k = Cypress._.random(0, n - 1);
      } while (usedIndices.includes(k));

      // Add the index to usedIndices
      usedIndices.push(k);

      cy.log(`picked random index ${k}`);
      // get all elements again and pick one
      pageElements.addToCartButton
        .eq(k)
        .click()
        .should(
          "have.attr",
          "class",
          "button product_type_simple add_to_cart_button ajax_add_to_cart added"
        );
    });
}

const removeLowestPricedItem = () => {
  // Implement logic to identify and remove the lowest-priced item from the cart.
  // This can be done by selecting the cart items, finding the lowest-priced one,
  // and then clicking a "remove" button or performing the necessary action.
  pageElements.cartItem.should("be.visible").then(($items) => {
    let lowestPrice = Number.MAX_VALUE;
    let lowestPriceIndex = -1;

    $items.each((index, item) => {
      const price = parseFloat(
        Cypress.$(item).find(".product-price").text().replace("$", "")
      );

      if (price < lowestPrice) {
        lowestPrice = price;
        lowestPriceIndex = index;
      }
    });

    if (lowestPriceIndex !== -1) {
      // Click the "remove" button of the lowest-priced item
      cy.wrap($items.eq(lowestPriceIndex)).find(".remove").click();
    }
  });
};
