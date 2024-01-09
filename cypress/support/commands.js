Cypress.Commands.add('customWaitFor', (item, options = {}) => {
        if (typeof item !== 'string' && !(item instanceof Function)) {
            throw new Error(
                'Cypress plugin waitFor: The first parameter should be a string or a function'
            );
        }

        const defaultSettings = {
            timeout: 200,
            tries: 300,
        };
        const SETTINGS = {...defaultSettings, ...options};

        const check = (_item) => {
            if (typeof _item === 'string') {
                return Cypress.$(_item).length > 0;
            }

            return item();
        };

        return new Cypress.Promise((resolve) => {
            let index = 0;
            const interval = setInterval(() => {
                if (check(item)) {
                    clearInterval(interval);
                    resolve(true);
                }
                if (index > SETTINGS.tries) {
                    clearInterval(interval);
                    resolve(false);
                }
                index++;
            }, SETTINGS.timeout);
        });
    }
);

Cypress.Commands.add('customWaitForSync', (checkingCondition, options = {}) => {
    const defaultSettings = {
        timeout: 200,
        tries: 150,
    };
    const SETTINGS = { ...defaultSettings, ...options };
    const message = ['waitForSync works. Current options - '];
    message.push(`tries - ${SETTINGS.tries}, `);
    message.push(`timeout - ${SETTINGS.timeout}. `);
    cy.log(message.join(''));
    return checkingCondition().then((res) => {
        if (!res && SETTINGS.tries > 0) {
            SETTINGS.tries--;
            cy.wait(SETTINGS.timeout);
            return cy.customWaitForSync(checkingCondition, { ...SETTINGS });
        }
        return res;
    });
});
