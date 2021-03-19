Feature: WEB - Login/Seguridad 

    Scenario: Como un usuario quisiera iniciar sesión en la aplicación web
        Given Ingreso a la pantalla de login
        When Ingreso con el usuario "user1"
        Then retorna la pagina home

    Scenario: Como un usuario quisiera visualizar la pantalla de login de la aplicación web
        Given Ingreso a la pantalla de login
        When Compruebo los criterios de aceptación
        Then Se visualiza el contenido de la pagina correctamente
    
    Scenario: Como un usuario quisiera cerrar sesión
        Given Ingreso a la pantalla de login
        When Ingreso con el usuario "guser1"
        Then retorna la pagina home y cierro sesión