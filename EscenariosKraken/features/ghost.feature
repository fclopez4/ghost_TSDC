Feature: Iniciar una conversación

@user1 @web
Scenario: Inicio de sesion en ghost
  Given I navigate to page "http://localhost:3001/ghost/"
  And I wait for 2 seconds
  When I enter email ghost "<USER_NAME_GHOST>"
  And I wait for 2 seconds
  And I enter password ghost "<PASSWORD_GHOST>"
  And I wait for 2 seconds
  And I click next ghost
  And I wait for 4 seconds
  Then I should see "Perspicapps" title
  And I click on button profile ghost
  And I wait for 2 seconds
  And I click on button sign out ghost
  And I wait for 2 seconds
  Then I should see "Sign In - Perspicapps" title