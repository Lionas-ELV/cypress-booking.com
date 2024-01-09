const dayjs = require('dayjs')
import Visitor from '../support/pageObjects/SiteVisitor';

describe('template spec', () => {
  const  today = dayjs();
  const  weekAfter = today.add(7, 'day');
  before(() => {
    Visitor.goToSite();
  });
  it('passes', () => {
    expect(true).to.equal(true);
    // Проверяем, что мы находимся на правильной странице
    cy.url().should('include', 'booking.com');

    // Вводим город в поле поиска
    cy.intercept('https://accommodations.booking.com/autocomplete.json').as('search');
    cy.get('input[name="ss"]').type('Paris');
    cy.wait('@search');
    cy.get('div#autocomplete-results [data-testid="autocomplete-results-options"] li[id^="autocomplete-result-"]:contains("Paris"):nth(0)').click();

    cy.get(`span[data-date="${today.format('YYYY-MM-DD')}"]`).should(($el) => {
      // note that the Command Log does not show much information
      // for thrown errors while it retries
      if (!Cypress.dom.isVisible($el)) {
        cy.get('[data-testid="searchbox-dates-container"]').should('not.exist').click();
      }
    })

    // Выбираем даты
    // cy.get('[data-testid="searchbox-dates-container"]').should('not.exist').click();
    cy.get(`span[data-date="${today.format('YYYY-MM-DD')}"]`).click();
    cy.get(`span[data-date="${weekAfter.format('YYYY-MM-DD')}"]`).click();

    cy.intercept('POST', '**/*').as('allRequests');

    cy.get('button:contains("Search")').click();

    cy.wait('@allRequests', { timeout: 10000 });

    // Проверяем, что есть результаты поиска
    cy.get('[data-testid="property-card"]').should('have.length.greaterThan', 0);

    // Выбираем первый отель из результатов
    cy.get('[data-testid="property-card"]')
        .first()
        .find('[data-testid="title"]')
        .invoke('removeAttr', 'target')
        .click();

    // Проверяем, что мы перешли на страницу отдельного отеля
    cy.url().should('include', 'hotel');
  })
})
