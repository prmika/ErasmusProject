describe('Testing page existence and the title', () => {
  it('Visits the initial page and checks the page title', () => {
    cy.visit('/');
    cy.contains('ElectricGo');
  })
})


describe('Testing routing for warehouses', () => {
  beforeEach(() => {
    cy.visit('/');
  });

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
  beforeEach(() => {
    cy.visit('/');
  });

  it('has the button "Deliveries"', () => {
    cy.contains('Deliveries');
  })

  it('Navigates to deliveries', () => {
    cy.get('*[id^="deliver"]').click({ force: true });
    cy.url().should('include', '/deliveries');
    cy.contains('Create new Delivery');
  })

})

describe('Testing routing for trucks', () => {
  beforeEach(() => {
    cy.visit('/');
  });

  it('has the button "Trucks"', () => {
    cy.contains('Trucks');
  })

  it('Navigates to warehouses', () => {
    cy.get('*[id^="trucks"]').click({ force: true });
    cy.url().should('include', '/trucks');
    cy.contains('Create new Truck');
  })

})

describe('Testing routing for Warehouse Routes', () => {
  beforeEach(() => {
    cy.visit('/');
  });

  it('has the button "Warehouse Routes"', () => {
    cy.contains('Warehouse Routes');
  })

  it('Navigates to routes', () => {
    cy.get('*[id^="routes"]').click({ force: true });
    cy.url().should('include', '/warehouse-routes');
    cy.contains('Create new Warehouse Route');
  })

})

describe('Testing routing for Packages', () => {
  beforeEach(() => {
    cy.visit('/');
  });

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
  beforeEach(() => {
    cy.visit('/');
  });

  it('has the button "Planning"', () => {
    cy.contains('Planning');
  })

  it('Navigates to Planning', () => {
    cy.get('*[id^="plan"]').click({ force: true });
    cy.url().should('include', '/planning');
  })

})

describe('Testing page for warehouse creation', () => {

  it('Button navigates to the creation form', () => {
    cy.visit('/warehouses');
    cy.get('button').click();
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

  it('Button navigates to the creation form', () => {
    cy.visit('/trucks');
    cy.get('button').click();
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


describe('Testing page for delivery creation', () => {

  it('Button navigates to the creation form', () => {
    cy.visit('/deliveries');
    cy.get('button:first').click();
  })

  it('Adding Delivery button exists and works', () => {
    cy.get('*[class^="button is-info"]').click();
  })

  it('Adding an actual Delivery', () => {

    cy.get('*[placeholder^="e.g. D01"]').type('D11');
    cy.get('*[placeholder^="e.g. 50kg"]').type('30');
    cy.get('*[placeholder^="e.g. 60 min"]').type('50');
    cy.get('*[placeholder^="e.g. 30 min"]').type('30');
    cy.get('*[id^="dateDel"]').type('2022-12-15');

    cy.get('*[class^="button is-info"]').click();
  })


})


describe('Testing page for route creation', () => {

  it('Button navigates to the creation form', () => {
    cy.visit('/warehouse-routes');
    cy.get('button').click();
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

  it('Button navigates to the creation form', () => {
    cy.visit('/packages');
    cy.get('button').click();
  })

  it('Adding an actual Package', () => {

    cy.get('*[placeholder^="e.g. 25"]').type('24');
    cy.get('*[placeholder^="e.g. 3"]').type('5');
    cy.get('*[placeholder^="e.g. 0"]').type('0');
    cy.get('*[id^="IdSelect"]').type('D11');

    cy.get('*[class^="button is-info"]').click();
  })

})

describe('Testing option updating a truck', () => {

  it('Update button exists and navigates to the update form', () => {
    cy.visit('/trucks');
    cy.get('*[class^="button is-warning"]:first').click();
  })

  it('Updating the data', () => {
    cy.get(' * [placeholder^= "tare"').clear();
    cy.get(' * [placeholder^= "tare"').type('1500');
    cy.get('*[id^="save"]').click();
  })

})


describe('Testing option updating a Warehouse', () => {

  it('Update button exists and navigates to the update form', () => {
    cy.visit('/warehouses');
    cy.get('*[class^="button is-warning"]:first').click();
  })

  it('Updating the data', () => {
    cy.get(' * [placeholder^= "Latitude"').clear();
    cy.get(' * [placeholder^= "Latitude"').type('45');

  })

})
