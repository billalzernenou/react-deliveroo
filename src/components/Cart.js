import React from "react";
import PlusIcon from "./PlusIcon";
import MinusIcon from "./MinusIcon";

const Cart = (props) => {
  const { cart, addItem, removeItem } = props;
  const empty = cart.length === 0;

  const deliveryFees = 2.5;
  let subTotal = 0;
  cart.forEach((cartItem) => {
    subTotal += cartItem.price * cartItem.amount;
  });

  const total = subTotal + deliveryFees;

  return (
    <div className="Cart">
      <div className="Cart--card">
        <button className={"Cart--validate" + (empty ? " Cart--disabled" : "")}>
          Valider mon panier
        </button>
        {empty ? (
          <div className="Cart--empty">Votre panier est vide</div>
        ) : (
          <div>
            <div className="Cart--items">
              {cart.map((cartItem) => {
                return (
                  <div key={cartItem.id} className="Cart--line">
                    <div className="Cart--counter">
                      <span
                        data-testid="minus-button"
                        onClick={() => removeItem(cartItem.id)}
                      >
                        <MinusIcon
                          size={20}
                          style={{ cursor: "pointer", color: "#00CEBD" }}
                        />
                      </span>
                      <span data-testid="counter">{cartItem.amount}</span>
                      <span
                        data-testid="plus-button"
                        onClick={() => addItem(cartItem.id)}
                      >
                        <PlusIcon
                          size={20}
                          style={{ cursor: "pointer", color: "#00CEBD" }}
                        />
                      </span>
                    </div>
                    <span className="Cart--item-name">{cartItem.title}</span>
                    <span className="Cart--amount">
                      {Number(cartItem.price).toFixed(2).replace(".", ",") +
                        " €"}
                    </span>
                  </div>
                );
              })}
            </div>
            <div className="Cart--results">
              <div className="Cart--result-line">
                <span className="Cart--result-name">Sous-total</span>
                <span className="Cart--amount">
                  {subTotal.toFixed(2).replace(".", ",")} €
                </span>
              </div>
              <div className="Cart--result-line">
                <span className="Cart--result-name">Frais de livraison</span>
                <span data-testid="fees-amount">
                  {deliveryFees.toFixed(2).replace(".", ",")} €
                </span>
              </div>
            </div>
            <div className="Cart--total">
              <span className="Cart--result-name">Total</span>
              <span className="Cart--amount" data-testid="cart-amount">
                {total.toFixed(2).replace(".", ",")} €
              </span>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Cart;
