export class Should {
  webElement = null;

  constructor(webElement) {
    this.webElement = webElement;
  }

  customShould(condition, value = null) {
    value
      ? this.webElement.should(condition, value)
      : this.webElement.should(condition);
  }

  beVisible() {
    this.webElement.should('be.visible');
  }

  notVisible() {
    this.webElement.should('not.be.visible');
  }

  haveLength(length) {
    this.webElement.should('have.length', length);
  }

  notExist() {
    this.webElement.should('not.exist');
  }

  exist() {
    this.webElement.should('exist');
  }

  containsText(text) {
    this.webElement.should('contains.text', text);
  }

  notContainsText(text) {
    this.webElement.should('not.contains.text', text);
  }

  equal(value) {
    this.webElement.should('equal', value);
  }

  notEqual(value) {
    this.webElement.should('not.equal', value);
  }

  include(text) {
    this.webElement.should('include', text);
  }

  matchRegExp(regExp) {
    this.webElement.invoke('text').then((text) => {
      expect(text).to.match(regExp);
    });
  }

  valueMatchRegExp(regExp) {
    this.webElement.should('match', regExp);
  }
}
