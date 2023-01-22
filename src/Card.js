import React from "react";

const Card = ({ name, img, cardSet, faction, playerClass, type, race }) => {
  return (
    <div className="card">
      {cardSet ? <h3>Card set: {cardSet}</h3> : ""}
      {name ? <h2>Name: {name}</h2> : ""}
      {img ? <img src={img} alt={name} /> : ""}
      {faction ? <h4>Faction: {faction}</h4> : ""}
      {playerClass ? <h4> Class: {playerClass}</h4> : ""}
      {type ? <h4>Type: {type}</h4> : ""}
      {race ? <h4>Race: {race}</h4> : ""}
    </div>
  );
};

export default Card;
