import React, { useState, useEffect } from "react";
import axios from "axios";
import Header from "./components/Header";
import Content from "./components/Content";

const App = () => {
  const [data, setData] = useState(null);
  const [cart, setCart] = useState([]);

  const addItem = (itemId) => {
    const exist = cart.find((cartItem) => cartItem.id === itemId);
    if (exist) {
      const index = cart.indexOf(exist);
      const nextCart = [...cart];
      nextCart[index] = {
        ...nextCart[index],
        amount: nextCart[index].amount + 1,
      };
      setCart(nextCart);
    } else {
      // add
      // find item in data
      let item = null;
      data.categories.forEach((category) => {
        category.meals.forEach((menu) => {
          if (menu.id === itemId) {
            item = menu;
          }
        });
      });
      if (item === null) {
        console.error(`Cannot find item ${itemId}`);
        return;
      }
      const nextCart = [...cart];
      nextCart.push({
        id: itemId,
        title: item.title,
        price: item.price,
        amount: 1,
      });
      setCart(nextCart);
    }
  };

  const removeItem = (itemId) => {
    const exist = cart.find((cartItem) => cartItem.id === itemId);
    if (!exist) {
      console.error(`Cannot remove item not in cart !`);
      return;
    }
    const index = cart.indexOf(exist);
    const nextCart = [...cart];
    nextCart[index] = {
      ...nextCart[index],
      amount: nextCart[index].amount - 1,
    };
    const cartNotZero = nextCart.filter((cartItem) => cartItem.amount > 0);
    setCart(cartNotZero);
  };

  useEffect(() => {
    const fetchData = async () => {
      const response = await axios.get(
        "https://lereacteur-deliveroo-api.herokuapp.com"
      );

      setData(response.data);
    };

    fetchData();
  }, []);

  return (
    <div>
      <Header restaurant={data ? data.restaurant : null} />
      <Content
        menu={data ? data.categories : null}
        cart={cart}
        addItem={addItem}
        removeItem={removeItem}
      />
    </div>
  );
};

export default App;
