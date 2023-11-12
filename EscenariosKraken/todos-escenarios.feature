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
  And I click on button profile ghost
  And I wait for 2 seconds
  And I click on button sign out ghost
  And I wait for 2 seconds
  Then I should see "Sign In - Perspicapps" title head

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
  And I navigate to page "http://localhost:3001/ghost/#/posts"
  And I wait for 4 seconds
  When I filter by published posts
  And I wait for 2 seconds
  Then I should see the post

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
  And I navigate to page "http://localhost:3001/ghost/#/posts"
  And I wait for 2 seconds
  And I click on post
  And I edit the post
  And I wait for 2 seconds
  And I click on publish post
  And I wait for 1 seconds
  And I click on continue, final review
  And I wait for 1 seconds
  And I click on Publish post, Right now
  And I navigate to page "http://localhost:3001/ghost/#/posts"
  When I filter by published posts
  And I wait for 2 seconds
  Then I should see the post

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
  And I wait for 2 seconds
  And I filter by Draft posts
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
  And I wait for 2 seconds
  And I filter by Draft posts
  And I wait for 2 seconds
  Then I should see the post
  And I wait for 2 seconds
  And I filter by published posts
  And I wait for 2 seconds
  Then The post should not be visible

@user1 @web
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
  And I navigate to page "http://localhost:3001/ghost/#/pages"
  And I wait for 4 seconds
  When I filter by published page
  And I wait for 2 seconds
  Then I should see the page

@user1 @web
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
  And I wait for 2 seconds
  And I click on new page
  And I wait for 2 seconds
  And I fill the page
  And I wait for 2 seconds
  And I navigate to page "http://localhost:3001/ghost/#/pages"
  And I wait for 2 seconds
  And I click on page
  And I edit the page
  And I wait for 2 seconds
  And I click on publish page
  And I wait for 1 seconds
  And I click on continue, final review
  And I wait for 1 seconds
  And I click on Publish page, Right now
  And I navigate to page "http://localhost:3001/ghost/#/pages"
  And I wait for 2 seconds
  When I filter by published page
  And I wait for 2 seconds
  Then I should see the page

@user4 @web
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
  And I wait for 2 seconds
  And I rigth click on page
  And I wait for 1 seconds
  And I click on delete page
  Then I confirm elimination
  And I wait for 2 seconds
  And I filter by Draft page
  Then The page should not be visible
