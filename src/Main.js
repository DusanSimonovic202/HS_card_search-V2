import React, { useState, useEffect, useRef } from "react";
import Card from "./Card";
import axios from "axios";
import "./App.css";
import LoadingDots from "./style/LoadingDots";
import { GoogleLogout } from "react-google-login";
import { useNavigate } from "react-router-dom";

function Main() {
  const [search, setSearch] = useState("");
  const [hsdata, setHsData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [isLoading, setIsLoading] = useState(false);
  // const [err, setErr] = useState();

  const clientId =
    "765528753165-ig7si7bahah62hvumrnfnlknpgcaoqf9.apps.googleusercontent.com";

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
        setIsLoading(false);
      })
      .catch((error) => {
        console.error(error);
      });
  }, [search]);

  const inputRef = useRef(null);

  const handleButtonClick = () => {
    setIsLoading(true);
    setSearch(inputRef.current.value);
    setInterval(() => {
      setIsLoading(false);
    }, 3000);
  };
  const logOut = () => {
    navigate("/");
  };
  const navigate = useNavigate();

  return (
    <div className="App" style={loading ? { marginTop: "200px" } : {}}>
      <div className="divlogout">
        <GoogleLogout
          clientId={clientId}
          buttonText="Log out"
          onLogoutSuccess={logOut}
        />
      </div>
      <h1>Welcome to Hearthstone database</h1>
      <h2>You can search here for any card</h2>
      <input type="text" placeholder="Search..." ref={inputRef} />
      <button className="submitbtn" onClick={handleButtonClick}>
        Submit
      </button>
      {loading ? (
        <div className="divsearch">
          <h4>{isLoading ? "Searching" : "We are waing for your search"}</h4>
          <LoadingDots />
        </div>
      ) : (
        <div>
          <h3>{isLoading ? "" : "This is what we found"}</h3>
          <LoadingDots />
          {hsdata
            ?.filter((card) => card.img)
            .map((card, i) => (
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

export default Main;
