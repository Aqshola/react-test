describe("Login functionality",()=>{

    it("should redirect to login if not loggedin",()=>{
        cy.visit("http://localhost:3000/")
        cy.url().should("include","/login")
    })

    it("show error message if failed to login",()=>{
        cy.visit("http://localhost:3000/login");
        cy.get("#email").type("mustreallywrongemail@email.com");
        cy.get("#password").type("wrongpassword");
        cy.get("#login-btn").click();
        cy.contains("Invalid login credentials");
    })

    it("should redirect to main page if login success",()=>{
        cy.visit("http://localhost:3000/login");
        cy.get("#email").type(Cypress.env("email"));
        cy.get("#password").type(Cypress.env("password"));
        cy.get("#login-btn").click();
        cy.url().should("be.equals","http://localhost:3000/");
    })

    it("should be able to log out after login",()=>{
        cy.visit("http://localhost:3000/login");
        cy.get("#email").type(Cypress.env("email"));
        cy.get("#password").type(Cypress.env("password"));
        cy.get("#login-btn").click();
        

        cy.get("#logout-btn",{timeout:10000}).click();
        cy.url().should("be.equals","http://localhost:3000/login");

    })
})