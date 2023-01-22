import "./App.css";
import axios from "axios";
import { useState, useEffect, useRef } from "react";
import Card from "./Card";

function App() {
  const [search, setSearch] = useState("");
  const [hsdata, setHsData] = useState([]);

  useEffect(() => {
    const options = {
      method: "GET",
      url: `https://omgvamp-hearthstone-v1.p.rapidapi.com/cards/${search}`,
      headers: {
        "X-RapidAPI-Key": "bcbdf03864msh34ccf7b9c42eda4p12d748jsn062fb40a2698",
        "X-RapidAPI-Host": "omgvamp-hearthstone-v1.p.rapidapi.com",
      },
    };

    axios
      .request(options)
      .then(function (response) {
        console.log(response.data);
        setHsData(response.data);
      })
      .catch(function (error) {
        console.error(error);
      });
  }, [search]);
  console.log(hsdata);

  const inputRef = useRef(null);

  const handleButtonClick = () => {
    setSearch(inputRef.current.value);
  };

  return (
    <div className="App">
      <h1>Search for any card</h1>
      <input type="text" placeholder="Search..." ref={inputRef} />
      <button className="submitbtn" onClick={handleButtonClick}>
        Submit
      </button>
      {hsdata.map((card) => (
        <div key={card.cardId}>
          <Card
            key={card.Id}
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
  );
}

export default App;
