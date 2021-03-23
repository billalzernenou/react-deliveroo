import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import App from "./App";

describe("app.js", () => {
  it("check menu unicity", async () => {
    render(<App />);
    const menu = await screen.findByTestId("menu");
    expect(menu).toBeDefined();
  });

  it("check the menuItems is an array", async () => {
    render(<App />);
    const menuItems = await screen.findAllByTestId("menu-items");
    //expect an array
    expect(menuItems.length).toBeDefined();
  });

  it("check the menuItems is an array", async () => {
    render(<App />);
    const menuItem = await screen.findAllByTestId("menu-item");
    //expect an array
    expect(menuItem.length).toBeDefined();
  });

  // *****************************
  // *********add cart *************
  // *****************************

  it("add cart", async () => {
    const { container } = render(<App />);

    // user event click on menu item card
    const tab = await screen.findAllByTestId("menu-item-card");
    // click in one of returned cards => this case optionally choose the first one
    userEvent.click(tab[0]);

    // look for displayed total
    const TotalPrice = await screen.findByText("Total");

    //then
    expect(TotalPrice).toBeInTheDocument();
  });

  // *****************************
  // *********add cart *************
  // *****************************

  it("add and quantity features", async () => {
    const { container } = render(<App />);

    // find item cards
    const tab = await screen.findAllByTestId("menu-item-card");
    //user event click to add
    userEvent.click(tab[0]);

    //get diffrent displayed prices to compare
    let itemsPricesTab = await screen.findAllByTestId("item-price");
    let feesAmmountTab = await screen.findByTestId("fees-amount");
    let totalPriceCardTab = await screen.findByTestId("cart-amount");

    // let TotalPriceCalculated = tab[0].
    //assign returned values
    let itemsPrice =
      itemsPricesTab[0][Object.keys(itemsPricesTab[1])[1]].children;
    let feesAmmount =
      feesAmmountTab[Object.keys(feesAmmountTab)[1]].children[0];
    let TotalPrice =
      totalPriceCardTab[Object.keys(totalPriceCardTab)[1]].children[0];
    // console.log(itemsPricesTab[0][Object.keys(itemsPricesTab[1])[1]].children);
    // console.log(feesAmmountTab[Object.keys(feesAmmountTab)[1]].children[0]);
    // console.log(
    //   totalPriceCardTab[Object.keys(totalPriceCardTab)[1]].children[0]
    // );
    // then
    expect(parseInt(TotalPrice)).toEqual(
      parseInt(itemsPrice) + parseInt(feesAmmount)
    );

    // add an other item
    userEvent.click(tab[2]);

    //get diffrent displayed prices to compare
    itemsPricesTab = await screen.findAllByTestId("item-price");
    feesAmmountTab = await screen.findByTestId("fees-amount");
    totalPriceCardTab = await screen.findByTestId("cart-amount");
    //get ammounts
    itemsPrice += itemsPricesTab[2][Object.keys(itemsPricesTab[2])[1]].children;
    feesAmmount = feesAmmountTab[Object.keys(feesAmmountTab)[1]].children[0];
    TotalPrice =
      totalPriceCardTab[Object.keys(totalPriceCardTab)[1]].children[0];
    //then
    expect(parseInt(TotalPrice)).toEqual(
      parseInt(itemsPrice) + parseInt(feesAmmount)
    );
  });
});
