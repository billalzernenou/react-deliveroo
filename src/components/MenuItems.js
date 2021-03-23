import React from "react";
import MenuItem from "./MenuItem";

const MenuItems = (props) => {
  const { name, items, addItem } = props;
  return (
    <div className="MenuItems" data-testid="menu-items">
      <h2>{name}</h2>
      <div className="MenuItems--items">
        {items.map((item) => {
          return (
            <MenuItem
              key={item.id}
              item={item}
              onClick={() => {
                addItem(item.id);
              }}
            />
          );
        })}
      </div>
    </div>
  );
};

export default MenuItems;
