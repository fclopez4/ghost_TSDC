Feature: Ghost
@user1 @web
#Escenario 9
Scenario: Listar Pagina
  Given I navigate to page "http://localhost:3001/ghost/"
  And I wait for 2 seconds
  When I enter email ghost "<USER_NAME_GHOST>"
  And I wait for 2 seconds
  And I enter password ghost "<PASSWORD_GHOST>"
  And I wait for 2 seconds
  And I click next ghost
  And I wait for 4 seconds
  And I navigate to page "http://localhost:3001/ghost/#/pages"
  And I wait for 2 seconds
  And I click on new page
  And I wait for 2 seconds
  And I fill the page
  And I wait for 2 seconds
  And I navigate to page "http://localhost:3001/ghost/#/pages"
  And I wait for 2 seconds
  And I filter by Draft page
  And I wait for 2 seconds
  Then I should see the page
  And I wait for 2 seconds
  And I filter by published page
  And I wait for 2 seconds
  Then The page should not be visible