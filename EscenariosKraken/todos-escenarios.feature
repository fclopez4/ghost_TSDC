Feature: Ghost
@user1 @web
#Escenario 1
Scenario: Inicio de sesion en ghost
  Given I navigate to page "http://localhost:3001/ghost/"
  And I wait for 2 seconds
  When I enter email ghost "<USER_NAME_GHOST>"
  And I wait for 2 seconds
  And I enter password ghost "<PASSWORD_GHOST>"
  And I wait for 2 seconds
  And I click next ghost
  And I wait for 4 seconds
  Then I should see "Dashboard" title body
  And Take a screenshot "EP01-01"
  And I click on button profile ghost
  And I wait for 2 seconds
  And I click on button sign out ghost
  And I wait for 2 seconds
  Then I should see "Sign In - Perspicapps" title head
  And Take a screenshot "EP01-02"

@user2 @web
#Escenario 2
Scenario: Crear Post
  Given I navigate to page "http://localhost:3001/ghost/"
  And I wait for 2 seconds
  When I enter email ghost "<USER_NAME_GHOST>"
  And I wait for 2 seconds
  And I enter password ghost "<PASSWORD_GHOST>"
  And I wait for 2 seconds
  And I click next ghost
  And I wait for 4 seconds
  And I navigate to page "http://localhost:3001/ghost/#/posts"
  And I wait for 2 seconds
  And I click on new post
  And I wait for 2 seconds
  And I fill the post
  And I wait for 2 seconds
  And I click on publish post
  And I wait for 1 seconds
  And I click on continue, final review
  And I wait for 1 seconds
  And I click on Publish post, Right now
  And Take a screenshot "EP02-01"
  And I wait for 2 seconds
  And I navigate to page "http://localhost:3001/ghost/#/posts"
  And I wait for 4 seconds
  When I filter by published posts
  And Take a screenshot "EP02-02"
  And I wait for 2 seconds
  Then I should see the post
  And Take a screenshot "EP02-03"

@user3 @web
#Escenario 3
Scenario: Editar Post
  Given I navigate to page "http://localhost:3001/ghost/"
  And I wait for 2 seconds
  When I enter email ghost "<USER_NAME_GHOST>"
  And I wait for 2 seconds
  And I enter password ghost "<PASSWORD_GHOST>"
  And I wait for 2 seconds
  And I click next ghost
  And I wait for 4 seconds
  And I navigate to page "http://localhost:3001/ghost/#/posts"
  And I wait for 2 seconds
  And I click on new post
  And I wait for 2 seconds
  And I fill the post
  And I wait for 2 seconds
  And Take a screenshot "EP03-01"
  And I navigate to page "http://localhost:3001/ghost/#/posts"
  And I wait for 2 seconds
  And I click on post
  And I edit the post
  And Take a screenshot "EP03-02"
  And I wait for 2 seconds
  And I click on publish post
  And I wait for 1 seconds
  And I click on continue, final review
  And I wait for 1 seconds
  And I click on Publish post, Right now
  And I wait for 2 seconds
  And I navigate to page "http://localhost:3001/ghost/#/posts"
  When I filter by published posts
  And I wait for 2 seconds
  Then I should see the post
  And Take a screenshot "EP03-03"

@user4 @web
#Escenario 4
Scenario: Eliminar Post
  Given I navigate to page "http://localhost:3001/ghost/"
  And I wait for 2 seconds
  When I enter email ghost "<USER_NAME_GHOST>"
  And I wait for 2 seconds
  And I enter password ghost "<PASSWORD_GHOST>"
  And I wait for 2 seconds
  And I click next ghost
  And I wait for 4 seconds
  And I navigate to page "http://localhost:3001/ghost/#/posts"
  And I wait for 2 seconds
  And I click on new post
  And I wait for 2 seconds
  And I fill the post
  And I wait for 2 seconds
  And I navigate to page "http://localhost:3001/ghost/#/posts"
  And Take a screenshot "EP04-01"
  And I wait for 2 seconds
  And I filter by Draft posts
  And I wait for 2 seconds
  And I rigth click on post
  And I wait for 1 seconds
  And I click on delete post
  And I do not confirm elimination
  And I wait for 1 seconds
  And I filter by Draft posts
  Then I should see the post
  And I wait for 1 seconds
  And I rigth click on post
  And I wait for 1 seconds
  And I click on delete post
  Then I confirm elimination
  And I wait for 2 seconds
  And I filter by Draft posts
  Then The post should not be visible
  And Take a screenshot "EP04-01"

@user5 @web
#Escenario 5
Scenario: Listar Post
  Given I navigate to page "http://localhost:3001/ghost/"
  And I wait for 2 seconds
  When I enter email ghost "<USER_NAME_GHOST>"
  And I wait for 2 seconds
  And I enter password ghost "<PASSWORD_GHOST>"
  And I wait for 2 seconds
  And I click next ghost
  And I wait for 4 seconds
  And I navigate to page "http://localhost:3001/ghost/#/posts"
  And I wait for 2 seconds
  And I click on new post
  And I wait for 2 seconds
  And I fill the post
  And I wait for 2 seconds
  And I navigate to page "http://localhost:3001/ghost/#/posts"
  And Take a screenshot "EP05-01"
  And I wait for 2 seconds
  And I filter by Draft posts
  And I wait for 2 seconds
  Then I should see the post
  And I wait for 2 seconds
  And I filter by published posts
  And I wait for 2 seconds
  Then The post should not be visible
  And Take a screenshot "EP05-02"

@user6 @web
#Escenario 6
Scenario: Crear Pagina
  Given I navigate to page "http://localhost:3001/ghost/"
  And I wait for 2 seconds
  When I enter email ghost "<USER_NAME_GHOST>"
  And I wait for 2 seconds
  And I enter password ghost "<PASSWORD_GHOST>"
  And I wait for 2 seconds
  And I click next ghost
  And I wait for 4 seconds
  And I navigate to page "http://localhost:3001/ghost/#/pages"
  And Take a screenshot "EP06-01"
  And I wait for 2 seconds
  And I click on new page
  And I wait for 2 seconds
  And I fill the page
  And I wait for 2 seconds
  And I click on publish page
  And I wait for 1 seconds
  And I click on continue, final review
  And I wait for 1 seconds
  And I click on Publish page, Right now
  And I wait for 2 seconds
  And I navigate to page "http://localhost:3001/ghost/#/pages"
  And I wait for 4 seconds
  When I filter by published page
  And I wait for 2 seconds
  Then I should see the page
  And Take a screenshot "EP06-01"

@user7 @web
#Escenario 7
Scenario: Editar Pagina
  Given I navigate to page "http://localhost:3001/ghost/"
  And I wait for 2 seconds
  When I enter email ghost "<USER_NAME_GHOST>"
  And I wait for 2 seconds
  And I enter password ghost "<PASSWORD_GHOST>"
  And I wait for 2 seconds
  And I click next ghost
  And I wait for 4 seconds
  And I navigate to page "http://localhost:3001/ghost/#/pages"
  And Take a screenshot "EP07-01"
  And I wait for 2 seconds
  And I click on new page
  And I wait for 2 seconds
  And I fill the page
  And I wait for 2 seconds
  And I navigate to page "http://localhost:3001/ghost/#/pages"
  And Take a screenshot "EP07-02"
  And I wait for 2 seconds
  And I click on page
  And I edit the page
  And I wait for 2 seconds
  And I click on publish page
  And I wait for 1 seconds
  And I click on continue, final review
  And I wait for 1 seconds
  And I click on Publish page, Right now
  And I wait for 2 seconds
  And I navigate to page "http://localhost:3001/ghost/#/pages"
  And I wait for 2 seconds
  When I filter by published page
  And I wait for 2 seconds
  Then I should see the page
  And Take a screenshot "EP07-03"

@user8 @web
#Escenario 8
Scenario: Eliminar Page
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
  And Take a screenshot "EP08-01"
  And I wait for 2 seconds
  And I filter by Draft page
  And I rigth click on page
  And I wait for 1 seconds
  And I click on delete page
  And I do not confirm elimination
  And I wait for 1 seconds
  And I filter by Draft page
  And I wait for 1 seconds
  Then I should see the page
  And Take a screenshot "EP08-02"
  And I wait for 2 seconds
  And I rigth click on page
  And I wait for 1 seconds
  And I click on delete page
  Then I confirm elimination
  And I wait for 2 seconds
  And I filter by Draft page
  Then The page should not be visible
  And Take a screenshot "EP08-03"

@user9 @web
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
  And Take a screenshot "EP09-01"
  And I wait for 2 seconds
  And I click on new page
  And I wait for 2 seconds
  And I fill the page
  And I wait for 2 seconds
  And I navigate to page "http://localhost:3001/ghost/#/pages"
  And Take a screenshot "EP09-02"
  And I wait for 2 seconds
  And I filter by Draft page
  And I wait for 2 seconds
  Then I should see the page
  And I wait for 2 seconds
  And I filter by published page
  And I wait for 2 seconds
  Then The page should not be visible
  And Take a screenshot "EP09-03"