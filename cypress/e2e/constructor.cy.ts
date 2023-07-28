const ingredients = '[data-cy=ingredients]';
const constructor = '[data-cy=constructor]';
const firstBun = '[data-cy=constructor-bun-1]'
const secondBun = '[data-cy=constructor-bun-2]'
const constructorBottom = '[data-cy=constructor-bottom]'
const orderButton = '[data-cy=get-order]'
const email = 'input[name=email]'
const password = 'input[name=password]'
const closeButton = '#react-modals svg'
const order = 'идентификатор заказа'
const ingredientDetail = 'Детали ингредиента'
const bun = 'Краторная булка N-200i'
const firstIngredient = 'Биокотлета из марсианской Магнолии'
const secondIngredient = 'Филе Люминесцентного тетраодонтимформа'
const totalPrice = '2667'
const userName = 'ma3ca3@icloud.com'
const userPassword = '11111111'

describe("drags ingredients to constructor works correctly", function () {
  beforeEach(function () {
    cy.intercept("GET", "api/ingredients", { fixture: "ingredients.json" })
    cy.viewport(1300, 800)
    cy.visit('/')
  })

  it('Should drag bun', function () {
    cy.get(ingredients)
      .contains(bun)
      .trigger('dragstart')
    cy.get(constructor).trigger('drop')
    cy.get('[data-cy=counter-643d69a5c3f7b9001cfa093c]').contains('2')
    cy.get(firstBun)
      .contains(bun)
      .should('exist')
    cy.get(secondBun)
      .contains(bun)
      .should('exist')
    cy.get(constructorBottom)
      .contains('1255')
  })

  it('should drag ingredient', function () {
    cy.get(ingredients)
      .contains(firstIngredient)
      .trigger('dragstart')
    cy.get(constructor).trigger('drop')
    cy.get('[data-cy=counter-643d69a5c3f7b9001cfa0941]').contains('1')

    cy.get(ingredients)
      .contains(secondIngredient)
      .trigger('dragstart')
    cy.get(constructor).trigger('drop')
    cy.get('[data-cy=counter-643d69a5c3f7b9001cfa093e]').contains('1')

    cy.get(constructor)
      .contains(firstIngredient)
      .should('exist')
    cy.get(constructor)
      .contains(secondIngredient)
      .should('exist')
    cy.get(constructorBottom)
      .contains('1412')
  })
});

describe("ingredient modal works correctly", function () {
  beforeEach(function () {
    cy.intercept("GET", "api/ingredients", { fixture: "ingredients.json" })
    cy.viewport(1300, 800)
    cy.visit('/')
  })

  it('should open modal', function () {
    cy.contains(ingredientDetail).should('not.exist')
    cy.contains(bun).click()
    cy.contains(ingredientDetail).should('exist')
    cy.get('#react-modals').contains(bun).should('exist')
  })

  it('should close modal on button click', function () {
    cy.contains(ingredientDetail).should('not.exist')
    cy.contains(bun).click()
    cy.contains(ingredientDetail).should('exist')
    cy.get(closeButton).click()
    cy.contains(ingredientDetail).should('not.exist')
  })

  it('should close modal on overlay click', function () {
    cy.contains(bun).click()
    cy.contains(ingredientDetail).should('exist')
    cy.get('[data-cy=modal-overlay]').click({ force: true })
    cy.contains(ingredientDetail).should('not.exist')
  })
});


describe('create order works correctly', function () {
  beforeEach(function () {
    cy.intercept("GET", "api/ingredients", { fixture: "ingredients.json" })
    cy.intercept('POST', 'api/orders', {fixture: 'order.json'})
    cy.intercept('POST', 'api/auth/login', {fixture: 'user.json'})
    cy.viewport(1300, 800)
    cy.visit('/')
  })
  it('should create order doesnt login', function () {
    cy.get(ingredients)
    .contains(bun)
    .trigger('dragstart')
    cy.get(constructor).trigger('drop')

    cy.get(firstBun)
      .contains(bun)
      .should('exist')
    cy.get(secondBun)
      .contains(bun)
      .should('exist')
    cy.get(ingredients)
      .contains(firstIngredient)
      .trigger('dragstart')
    cy.get(constructor).trigger('drop')
    cy.get(ingredients)
      .contains(secondIngredient)
      .trigger('dragstart')
    cy.get(constructor).trigger('drop')

    cy.get(constructor)
      .contains(firstIngredient)
      .should('exist')
    cy.get(constructor)
      .contains(secondIngredient)
      .should('exist')
    cy.get(constructorBottom)
      .contains(totalPrice)
    cy.get(orderButton).
      click();

    cy.get(email).type(userName)

    // {enter} causes the form to submit
    cy.get(password).type(`${userPassword}{enter}`)

    cy.contains(order).should('not.exist')
    cy.get(constructorBottom)
      .contains(totalPrice)
    cy.get(orderButton).
      click();

    cy.contains(order).should('exist')
    cy.get(closeButton).click()
    cy.contains(order).should('not.exist')    
  })

  it('should create order with login', function () {
    cy.visit('login')
    
    cy.get(email).type(userName)

    // {enter} causes the form to submit
    cy.get(password).type(`${userPassword}{enter}`)

    cy.contains(order).should('not.exist')
    cy.get(ingredients)
    .contains(bun)
    .trigger('dragstart')
    cy.get(constructor).trigger('drop')

    cy.get(firstBun)
      .contains(bun)
      .should('exist')
    cy.get(secondBun)
      .contains(bun)
      .should('exist')
    cy.get(ingredients)
      .contains(firstIngredient)
      .trigger('dragstart')
    cy.get(constructor).trigger('drop')
    cy.get(ingredients)
      .contains(secondIngredient)
      .trigger('dragstart')
    cy.get(constructor).trigger('drop')

    cy.get(constructor)
      .contains(firstIngredient)
      .should('exist')
    cy.get(constructor)
      .contains(secondIngredient)
      .should('exist')
    cy.get(constructorBottom)
      .contains(totalPrice)
    cy.get(orderButton).
      click();
    cy.contains(order).should('exist')
    cy.get(closeButton).click()
    cy.contains(order).should('not.exist')    
  })
})