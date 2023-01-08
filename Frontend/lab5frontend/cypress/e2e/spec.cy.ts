
beforeEach((() => {
  cy.visit('/');
  cy.get('*[id^="qsLoginBtn"]:first').click();
  cy.origin('https://dev-w46fc54fomx63ya8.us.auth0.com', () => {
    cy.get(' * [class="input ce09e4a4b ca6b0879c"]').type('jrt@isep.ipp.pt');
    cy.get(' * [class="input ce09e4a4b c6c12cff0"]').type('jr123');
    cy.get('*[type="submit"]').click();
})
}));



describe('Testing page existence and the title', () => {
  it('Visits the initial page and checks the page title', () => {
    cy.contains('ElectricGo');
  })
});

describe('Testing routing for warehouses', () => {

  it('has the button "Warehouses"', () => {
    cy.contains('Warehouses');
  })

  it('Navigates to warehouses', () => {
    cy.get('*[id^="war"]').click({ force: true });
    cy.url().should('include', '/warehouses');
    cy.contains('Create new Warehouse');
  })

})

describe('Testing routing for deliveries', () => {

  it('has the button "Deliveries"', () => {
    cy.contains('Deliveries');
  })

  it('Navigates to warehouses', () => {
    cy.get('*[id^="deliver"]').click({ force: true });
    cy.url().should('include', '/deliveries');
    cy.contains('Create new Delivery');
  })

})

describe('Testing routing for trucks', () => {


  it('has the button "Trucks"', () => {
    cy.contains('Trucks');
  })

  it('Navigates to trucks', () => {
    cy.get('*[id^="trucks"]').click({ force: true });
    cy.url().should('include', '/trucks');
    cy.contains('Create new Truck');
  })

})

describe('Testing routing for Warehouse Routes', () => {

  it('has the button "Warehouse Routes"', () => {
    cy.contains('Warehouse Routes');
  })

  it('Navigates to warehouses', () => {
    cy.get('*[id^="routes"]').click({ force: true });
    cy.url().should('include', '/warehouse-routes');
    cy.contains('Create new Warehouse Route');
  })

})

describe('Testing routing for Packages', () => {


  it('has the button "Packages"', () => {
    cy.contains('Packages');
  })

  it('Navigates to packages', () => {
    cy.get('*[id^="package"]').click({ force: true });
    cy.url().should('include', '/packages');
    cy.contains('Package a new delivery');
  })

})

describe('Testing routing for Planning', () => {

  it('has the button "Planning"', () => {
    cy.contains('Planning');
  })

  it('Navigates to Planning', () => {
    cy.get('*[id^="plan"]').click({ force: true });
    cy.url().should('include', '/planning');
  })

})

describe('Testing page for warehouse creation', () => {
  beforeEach(() => {
    cy.get('*[id^="war"]').click({ force: true });
    cy.get('*[id^="warAdd"]').click();
  });

  it('Button navigates to the creation form', () => {
    cy.url().should('include', '/warehouse/create');
  })

  it('All the forms are empty', () => {
    cy.get('input').should('be.empty');
  })

  it('Adding Warehouse button exists and works', () => {
    cy.get('*[class^="button is-info"]').click();
  })

  it('Adding an actual warehouse', () => {

    cy.get('*[placeholder^="e.g. W01"]').type('W99');
    cy.get('*[placeholder^="e.g. Arouca"]').type('Test');
    cy.get('*[placeholder^="e.g. R. Catassol 23, 4465-743"]').type('Test test test');
    cy.get('*[placeholder^="e.g. 41.216039"]').type('1');
    cy.get('*[placeholder^="e.g. -8.614372"]').type('1');

    cy.get('*[class^="button is-info"]').click();
  })

  it('Checking if the Return button works', () => {
    cy.get('*[id^="retButton"]').click();
    cy.url().should('include', '/warehouses');
  })
})

describe('Testing page for truck creation', () => {

  beforeEach(() => {
    cy.get('*[id^="trucks"]').click({ force: true });
    cy.get('*[id^="trAdd"]').click();
  });

  it('Button navigates to the creation form', () => {

    cy.url().should('include', '/truck/create');
  })

  it('All the forms are empty', () => {
    cy.get('input').should('be.empty');
  })

  it('Adding Truck button exists and works', () => {
    cy.get('*[class^="button is-info"]').click();
  })

  it('Adding an actual Truck', () => {

    cy.get('*[placeholder^="e.g. BE4SZ5"]').type('BETEST');
    cy.get('*[placeholder^="e.g. 7500 kg"]').type('7400');
    cy.get('*[placeholder^="e.g. 100 km"]').type('100');
    cy.get('*[placeholder^="e.g. 4300 kg"]').type('4000');
    cy.get('*[placeholder^="e.g. 60 min"]').type('59');
    cy.get('*[placeholder^="e.g. 80 kWh"]').type('81');

    cy.get('*[class^="button is-info"]').click();
  })
  

})


describe('Testing page for route creation', () => {

  beforeEach(() => {
    cy.get('*[id^="routes"]').click({ force: true });
    cy.get('*[id^="roAdd"]').click();
  });

  it('Button navigates to the creation form', () => {
    cy.url().should('include', '/warehouse-route/create');
  })

  it('Adding Route button exists and works', () => {
    cy.get('*[class^="button is-info"]').click();
  })

  it('Adding an actual Route', () => {

    cy.get('*[placeholder^="e.g. 100km"]').type('120');
    cy.get('*[placeholder^="e.g. 64 kWh"]').type('50');
    cy.get('*[placeholder^="e.g. 60 min"]').type('50');
    cy.get('*[placeholder^="e.g. 20 min"]').type('17');

    cy.get('*[class^="button is-info"]').click();
  })

})


describe('Testing page for package creation', () => {

  beforeEach(() => {
    cy.get('*[id^="package"]').click({ force: true });
    cy.get('*[id^="packAdd"]').click();
  });

  it('Button navigates to the creation form', () => {
    cy.url().should('include', '/package/create');

  })

  it('Adding an actual Package', () => {

    cy.get('*[placeholder^="e.g. 25"]').type('24');
    cy.get('*[placeholder^="e.g. 3"]').type('5');
    cy.get('*[placeholder^="e.g. 0"]').type('0');

    cy.get('*[class^="button is-info"]').click();
  })

})

