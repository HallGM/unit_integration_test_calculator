describe("Calculator", () => {
  let display;
  let buttons = {};
  let clickSequence;
  beforeEach(() => {
    cy.visit("http://localhost:3000");

    for (let i = 0; i < 10; i++) {
      buttons[i] = () => cy.get(`#number${i}`);
    }
    ["divide", "multiply", "subtract", "equals"].forEach((value) => {
      buttons[value] = () => cy.get(`#operator-${value}`);
    });
    buttons.add = () => cy.get("#operator_add");
    buttons.decimal = () => cy.get("#decimal");
    display = () => cy.get(".display");

    clickSequence = (...buttonSequence) => {
      return buttonSequence.forEach((buttonId) => buttons[buttonId]().click());
    };
  });

  it("should have working number buttons", () => {
    buttons[2]().click();
    display().should("contain", "2");
  });

  it("should display the running total", () => {
    clickSequence(3, "add", 4, "add");
    display().should("contain", "7");
  });

  it("should be able to add two numbers", () => {
    clickSequence(1,'add', 4, "equals")
    display().should("contain", "5");
  });

  it("should be able to subtract two numbers", () => {
    clickSequence(7, "subtract", 4, "equals")
    display().should("contain", "3");
  });

  it("should be able to multiply two numbers", () => {
    clickSequence(3, "multiply", 5, "equals")
    display().should("contain", "15");
  });

  it("should be able to divide two numbers", () => {
    clickSequence(2, 1, "divide", 7, "equals")
    display().should("contain", "3");
  });

  it("should be able to chain together multiple operations", () => {
    clickSequence(3, "add", 2, "add", 2, "equals");
    display().should("contain", "7");
  });

  it("should work with negative numbers", () => {
    clickSequence(1, "subtract", 8, "equals");
    display().should("contain", "-7");
  });

  it("should work with decimals", () => {
    clickSequence(1, "decimal", 9, "subtract", 0, "decimal", 5, "equals");
    display().should("contain", "1.4");
  });

  it("should work with very large numbers", () => {
    clickSequence(1, 0, 0, 0, 0, 0, 0, "add", 1, 0, 0, 0, 0, 0, 0, "equals");
    display().should("contain", "2000000");
  });

  it("should get error when divide by zero", () => {
    clickSequence(5, "divide", 0, "equals");
    display().should("contain", "error");
  });
});
