export class PageElements {
  get productLink() {
    return cy.get(".woocommerce-loop-product__link");
  }

  get cartButton() {
    return cy.get('a[href*="https://cms.demo.katalon.com/cart/"]');
  }

  get addToCartButton() {
    return cy.get(".ajax_add_to_cart");
  }

  get itemRemoveButton() {
    return cy.get(".remove");
  }

  get cartProductPrice() {
    return cy.get(".product-price");
  }

  get cartItem() {
    return cy.get(".cart_item");
  }
}
