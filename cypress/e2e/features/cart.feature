Feature: Cart functionality

  Scenario: Test the cart
    Given I add four random items to my cart
    When I view my cart
    Then I find total four items listed in my cart
    When I search and remove the lowest price item
    Then I am able to verify three items in my cart