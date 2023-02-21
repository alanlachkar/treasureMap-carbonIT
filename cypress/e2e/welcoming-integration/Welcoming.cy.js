/// <reference types="cypress" />
import { expect } from 'chai';

describe('Welcoming flow', () => {
  beforeEach(() => {
    cy.visit('/');
  });

  it('Check charset in the document', () => {
    cy.document().should('have.property', 'charset').and('eq', 'UTF-8');
  });

  it("Check tab's title", () => {
    cy.title().should('include', 'Treasure Map App');
  });

  // it('Check what contain in the first post', () => {
  //   cy.get('#postId1').should('be.visible');
  //   cy.get('[data-testid="bodyId1"]').should(
  //     'have.text',
  //     'quia et suscipit\nsuscipit recusandae consequuntur expedita et cum\nreprehenderit molestiae ut ut quas totam\nnostrum rerum est autem sunt rem eveniet architecto'
  //   );
  // });
});
