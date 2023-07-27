describe("drags ingredients to constructor works correctly", function () {
  beforeEach(function () {
    cy.intercept("GET", "api/ingredients", { fixture: "ingredients.json" })
    cy.viewport(1300, 800)
    cy.visit('http://localhost:3000/react-burger')
  })

  it('Should drag bun', function () {
    cy.get('[data-cy=ingredients]')
      .contains('Краторная булка N-200i')
      .trigger('dragstart')
    cy.get('[data-cy=constructor]').trigger('drop')
    cy.get('[data-cy=counter-643d69a5c3f7b9001cfa093c]').contains('2')
    cy.get('[data-cy=constructor-bun-1]')
      .contains('Краторная булка N-200i')
      .should('exist')
    cy.get('[data-cy=constructor-bun-2]')
      .contains('Краторная булка N-200i')
      .should('exist')
    cy.get('[data-cy=constructor-bottom]')
      .contains('1255')
  })

  it('should drag ingredient', function () {
    cy.get('[data-cy=ingredients]')
      .contains('Биокотлета из марсианской Магнолии')
      .trigger('dragstart')
    cy.get('[data-cy=constructor]').trigger('drop')
    cy.get('[data-cy=counter-643d69a5c3f7b9001cfa0941]').contains('1')

    cy.get('[data-cy=ingredients]')
      .contains('Филе Люминесцентного тетраодонтимформа')
      .trigger('dragstart')
    cy.get('[data-cy=constructor]').trigger('drop')
    cy.get('[data-cy=counter-643d69a5c3f7b9001cfa093e]').contains('1')

    cy.get('[data-cy=constructor]')
      .contains('Биокотлета из марсианской Магнолии')
      .should('exist')
    cy.get('[data-cy=constructor]')
      .contains('Филе Люминесцентного тетраодонтимформа')
      .should('exist')
    cy.get('[data-cy=constructor-bottom]')
      .contains('1412')
  })
});

describe("ingredient modal works correctly", function () {
  beforeEach(function () {
    cy.intercept("GET", "api/ingredients", { fixture: "ingredients.json" })
    cy.viewport(1300, 800)
    cy.visit('http://localhost:3000/react-burger')
  })

  it('should open modal', function () {
    cy.contains('Детали ингредиента').should('not.exist')
    cy.contains('Краторная булка N-200i').click()
    cy.contains('Детали ингредиента').should('exist')
    cy.get('#react-modals').contains('Краторная булка N-200i').should('exist')
  })

  it('should close modal on button click', function () {
    cy.contains('Детали ингредиента').should('not.exist')
    cy.contains('Краторная булка N-200i').click()
    cy.contains('Детали ингредиента').should('exist')
    cy.get('#react-modals svg').click()
    cy.contains('Детали ингредиента').should('not.exist')
  })

  it('should close modal on overlay click', function () {
    cy.contains('Краторная булка N-200i').click()
    cy.contains('Детали ингредиента').should('exist')
    cy.get('[data-cy=modal-overlay]').click({ force: true })
    cy.contains('Детали ингредиента').should('not.exist')
  })
});


describe('create order works correctly', function () {
  beforeEach(function () {
    cy.intercept("GET", "api/ingredients", { fixture: "ingredients.json" })
    cy.intercept('POST', 'api/orders', {fixture: 'order.json'})
    cy.intercept('POST', 'api/auth/login', {fixture: 'user.json'})
    cy.viewport(1300, 800)
    cy.visit('http://localhost:3000/react-burger')
  })
  it('should create order doesnt login', function () {
    cy.get('[data-cy=ingredients]')
    .contains('Краторная булка N-200i')
    .trigger('dragstart')
    cy.get('[data-cy=constructor]').trigger('drop')

    cy.get('[data-cy=constructor-bun-1]')
      .contains('Краторная булка N-200i')
      .should('exist')
    cy.get('[data-cy=constructor-bun-2]')
      .contains('Краторная булка N-200i')
      .should('exist')
    cy.get('[data-cy=ingredients]')
      .contains('Биокотлета из марсианской Магнолии')
      .trigger('dragstart')
    cy.get('[data-cy=constructor]').trigger('drop')
    cy.get('[data-cy=ingredients]')
      .contains('Филе Люминесцентного тетраодонтимформа')
      .trigger('dragstart')
    cy.get('[data-cy=constructor]').trigger('drop')

    cy.get('[data-cy=constructor]')
      .contains('Биокотлета из марсианской Магнолии')
      .should('exist')
    cy.get('[data-cy=constructor]')
      .contains('Филе Люминесцентного тетраодонтимформа')
      .should('exist')
    cy.get('[data-cy=constructor-bottom]')
      .contains('2667')
    cy.get('[data-cy=get-order]').
      click();

    cy.get('input[name=email]').type('ma3ca3@gmail.com')

    // {enter} causes the form to submit
    cy.get('input[name=password]').type(`${'2121123q'}{enter}`)

    cy.contains('идентификатор заказа').should('not.exist')
    cy.get('[data-cy=constructor-bottom]')
      .contains('2667')
    cy.get('[data-cy=get-order]').
      click();

    cy.contains('идентификатор заказа').should('exist')
    cy.get('#react-modals svg').click()
    cy.contains('идентификатор заказа').should('not.exist')    
  })

  it('should create order with login', function () {
    cy.visit('http://localhost:3000/react-burger/login')
    
    cy.get('input[name=email]').type('ma3ca3@gmail.com')

    // {enter} causes the form to submit
    cy.get('input[name=password]').type(`${'2121123q'}{enter}`)

    cy.contains('идентификатор заказа').should('not.exist')
    cy.get('[data-cy=ingredients]')
    .contains('Краторная булка N-200i')
    .trigger('dragstart')
    cy.get('[data-cy=constructor]').trigger('drop')

    cy.get('[data-cy=constructor-bun-1]')
      .contains('Краторная булка N-200i')
      .should('exist')
    cy.get('[data-cy=constructor-bun-2]')
      .contains('Краторная булка N-200i')
      .should('exist')
    cy.get('[data-cy=ingredients]')
      .contains('Биокотлета из марсианской Магнолии')
      .trigger('dragstart')
    cy.get('[data-cy=constructor]').trigger('drop')
    cy.get('[data-cy=ingredients]')
      .contains('Филе Люминесцентного тетраодонтимформа')
      .trigger('dragstart')
    cy.get('[data-cy=constructor]').trigger('drop')

    cy.get('[data-cy=constructor]')
      .contains('Биокотлета из марсианской Магнолии')
      .should('exist')
    cy.get('[data-cy=constructor]')
      .contains('Филе Люминесцентного тетраодонтимформа')
      .should('exist')
    cy.get('[data-cy=constructor-bottom]')
      .contains('2667')
    cy.get('[data-cy=get-order]').
      click();
    cy.contains('идентификатор заказа').should('exist')
    cy.get('#react-modals svg').click()
    cy.contains('идентификатор заказа').should('not.exist')    
  })
})