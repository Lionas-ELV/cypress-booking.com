import InitialModal from './InitialModal';

class SiteVisitor {
    goToSite() {
        cy.visit('/');
        this.closeInitialModal();
    }

    closeInitialModal() {
        cy.customWaitForSync(() => {
            return cy.document().then((doc) => {
                let el = null;
                try {
                    el = doc.querySelector(InitialModal._modalLocator);
                } catch (e) {
                    console.warn(e);
                }

                if (el && el.checkVisibility) {
                    return el.checkVisibility();
                }
                return false;
            });
        }, {
            tries: 10
        }).then((isVisible) => {
            if (isVisible) {
                InitialModal.closeIcon.click();
                InitialModal.should.notExist();
            }
        });
    }
}

export default new SiteVisitor();
