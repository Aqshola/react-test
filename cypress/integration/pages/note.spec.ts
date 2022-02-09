const login = () => {
  cy.visit("http://localhost:3000/login");
  cy.get("#email").type(Cypress.env("email"));
  cy.get("#password").type(Cypress.env("password"));
  cy.get("#login-btn").click();
};

describe("basic note functionality", () => {
    beforeEach(()=>{
        login()
    })

    it("should be able to create a new note", () => {
        cy.get("#title-input").type("test note cypress");
        cy.get("#content-input").type("test note content cypress");
        cy.get("#add-note-btn").click();
        cy.contains("Create note success");
        cy.get("#note-list",{timeout:2000}).should("contain","test note cypress");
    })

    it("should show detail note",()=>{
        cy.contains("test note cypress").click();
        cy.get("#note-title").should("contain","test note cypress");
    })

    it("should be able to delete note",()=>{
        cy.contains("Delete").click();
        cy.get("#note-list").should("not.contain","test note cypress");
    })

    
});
