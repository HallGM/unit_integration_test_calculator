import React from "react";
import Calculator from "../containers/Calculator";
import { mount, configure } from "enzyme";
import Adapter from "enzyme-adapter-react-16";

configure({ adapter: new Adapter() });

describe("Calculator", () => {
  let container;
  let buttons = {};
  let runningTotal;

  beforeEach(() => {
    container = mount(<Calculator />);
    for (let i = 0; i < 10; i++) {
      buttons[i] = container.find(`#number${i}`);
    }
    ["divide", "multiply", "subtract", "equals"].forEach((value) => {
      buttons[value] = container.find(`#operator-${value}`);
    });
    buttons.add = container.find("#operator_add");
    buttons.clear = container.find("#clear");
    runningTotal = container.find("#running-total");
  });

  it("should change running total on number enter", () => {
    buttons[4].simulate("click");
    expect(runningTotal.text()).toEqual("4");
  });

  it("should be able to add two numbers", () => {
    buttons[1].simulate("click");
    buttons.add.simulate("click");
    buttons[4].simulate("click");
    buttons.equals.simulate("click");
    expect(runningTotal.text()).toEqual("5");
  });

  it("should be able to subtract two numbers", () => {
    buttons[7].simulate("click");
    buttons.subtract.simulate("click");
    buttons[4].simulate("click");
    buttons.equals.simulate("click");
    expect(runningTotal.text()).toEqual("3");
  });

  it("should be able to multiply two numbers", () => {
    buttons[3].simulate("click");
    buttons.multiply.simulate("click");
    buttons[5].simulate("click");
    buttons.equals.simulate("click");
    expect(runningTotal.text()).toEqual("15");
  });

  it("should be able to divide two numbers", () => {
    buttons[2].simulate("click");
    buttons[1].simulate("click");
    buttons.divide.simulate("click");
    buttons[7].simulate("click");
    buttons.equals.simulate("click");
    expect(runningTotal.text()).toEqual("3");
  });

  it("should be able to concatenate two numbers", () => {
    buttons[3].simulate("click");
    buttons[8].simulate("click");
    expect(runningTotal.text()).toEqual("38");
  });

  it("should be able to chain multiple operations together", () => {
    buttons[2].simulate("click");
    buttons.add.simulate("click");
    buttons[3].simulate("click");
    buttons.add.simulate("click");
    buttons[4].simulate("click");
    buttons.equals.simulate("click");
    expect(runningTotal.text()).toEqual("9");
  });

  it("should be able to clear the running total without changing the running calculation", () => {
    buttons[3].simulate("click");
    buttons.add.simulate("click");
    buttons.clear.simulate("click");
    expect(runningTotal.text()).toEqual("0");
    buttons[4].simulate("click");
    buttons.equals.simulate("click");
    expect(runningTotal.text()).toEqual("7");

    buttons[3].simulate("click");
    buttons.add.simulate("click");
    buttons[3].simulate("click");
    buttons.clear.simulate("click");
    expect(runningTotal.text()).toEqual("0");
    buttons[2].simulate("click");
    buttons.equals.simulate("click");
    expect(runningTotal.text()).toEqual("5");

  });
});
