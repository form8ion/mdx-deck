Feature: Deck

  Scenario: Initial Deck
    When the project is scaffolded
    Then an initial deck is available
    And smoke tests are wired up
    And the deck can be deployed as a static site
