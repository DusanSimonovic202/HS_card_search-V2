import React, { useState, useEffect, useRef } from "react";
import Card from "./Card";
import axios from "axios";
import "./App.css";
import LoadingDots from "./style/LoadingDots";

function App() {
  const [search, setSearch] = useState("");
  const [hsdata, setHsData] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    axios
      .get(
        `https://omgvamp-hearthstone-v1.p.rapidapi.com/cards/search/${search}`,
        {
          headers: {
            "X-RapidAPI-Key":
              "bcbdf03864msh34ccf7b9c42eda4p12d748jsn062fb40a2698",
            "X-RapidAPI-Host": "omgvamp-hearthstone-v1.p.rapidapi.com",
          },
        }
      )
      .then(({ data }) => {
        setHsData(data);
        setLoading(false);
      })
      .catch((error) => {
        console.error(error);
      });
  }, [search]);

  const inputRef = useRef(null);

  const handleButtonClick = () => {
    setSearch(inputRef.current.value);
  };

  return (
    <div className="App" style={loading ? { marginTop: "200px" } : {}}>
      <h1>Welcome to Hearthstone Card database</h1>
      <h2>You can search here for any card</h2>

      <input type="text" placeholder="Search..." ref={inputRef} />
      <button className="submitbtn" onClick={handleButtonClick}>
        Submit
      </button>

      {loading ? (
        <div className="divsearch">
          <h4> We are waing for your search</h4> <LoadingDots />
        </div>
      ) : (
        <div>
          <h3>This is what we found</h3>
          <LoadingDots />
          {hsdata.map((card, i) => (
            <div key={i}>
              <Card
                key={i}
                rarity={card.rarity}
                name={card.name}
                img={card.img}
                cardSet={card.cardSet}
                faction={card.faction}
                playerClass={card.playerClass}
                type={card.type}
                race={card.race}
              />
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default App;
