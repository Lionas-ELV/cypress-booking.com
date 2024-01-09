import {Should} from "./helpers/ShouldClass";

class InitialModal {
    _modalLocator = 'div[role="dialog"]'
    _closeIcon = 'button[aria-label="Dismiss sign-in info."]'

    get modalContainer() {
        return cy.get(this._modalLocator);
    }

    get closeIcon() {
        return this.modalContainer.find(this._closeIcon)
    }

    get should() {
        return new Should(this.modalContainer);
    }
}

export default new  InitialModal();
