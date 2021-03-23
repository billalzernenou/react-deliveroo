import React from "react";
import StarIcon from "./StarIcon";

const MenuItem = (props) => {
  const { item, onClick } = props;
  return (
    <div className="MenuItem" data-testid="menu-item">
      <div
        className="MenuItem--card"
        data-testid="menu-item-card"
        onClick={onClick}
      >
        <div className="MenuItem--texts">
          <h3>{item.title}</h3>
          {item.description && item.description.length > 0 && (
            <p>{item.description}</p>
          )}
          <div className="MenuItem--infos">
            <span className="MenuItem--price">
              <span data-testid="item-price">
                {Number(item.price).toFixed(2).replace(".", ",")}
              </span>
              €
            </span>
            {item.popular && (
              <span className="MenuItem--popular">
                <StarIcon size={20} style={{ marginRight: 5 }} /> Populaire
              </span>
            )}
          </div>
        </div>
        {item.picture && (
          <div className="MenuItem--picture">
            <img src={item.picture} alt="" />
          </div>
        )}
      </div>
    </div>
  );
};

export default MenuItem;
