/// <reference types="cypress" />

describe('MapPage flow', () => {
  beforeEach(() => {
    cy.visit('/');
  });

  it('Check charset in the document', () => {
    cy.document().should('have.property', 'charset').and('eq', 'UTF-8');
  });

  it("Check tab's title", () => {
    cy.title().should('include', 'Treasure Map App');
  });

  it('Check what contain in the first post', () => {
    cy.get('input[type=file]').selectFile('cypress/fixtures/round1.txt');
    cy.get('input[type=file]').selectFile({
      contents: Cypress.Buffer.from(
        'C - 3 - 4\r\nM - 1 - 0\r\nM - 2 - 1\r\nT - 0 - 3 - 2\r\nT - 1 - 3 - 3\r\nA - Lara - 1 - 1 - S - AADADAGGA'
      ),
      fileName: 'round1.txt'
    });
  });
});
