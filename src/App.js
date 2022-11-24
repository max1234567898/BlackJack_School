import { useState } from "react";
import "./App.css";
import { StartButton } from "./start/StartButton";

function App() {
  const [playerState, setPlayerState] = useState();
  const [dealerState, setDealerState] = useState();
  const card = [
    "2",
    "3",
    "4",
    "5",
    "6",
    "7",
    "8",
    "9",
    "10",
    "J",
    "Q",
    "K",
    "A",
  ];

  const symbols = ["Hearts", "Clubs", "Diamonds", "Spades"];

  const getRandomCard = () => {
    const randomNumberCard = Math.floor(Math.random() * card.length);
    const randomNumberSymbol = Math.floor(Math.random() * symbols.length);
    const randomCard = card.slice(randomNumberCard, randomNumberCard + 1);
    const randomSymbol = symbols.slice(
      randomNumberSymbol,
      randomNumberSymbol + 1
    );

    return [randomCard, randomSymbol];
  };

  return (
    <div className="App">
      <div className="size ">
        <div className="titel-img">
          <img src="./titel.jpg" alt="cards" className="titel-img"></img>
        </div>
        Black Jack
        <div className="titel-img">
          <img src="./titel.jpg" alt="cards" className="titel-img"></img>
        </div>
      </div>
      <div className="App-header">
        {!playerState && (
          <StartButton
            onClick={() => {
              const dealerRandomCard = getRandomCard();
              setDealerState(dealerRandomCard);
              const randomCard = getRandomCard();
              setPlayerState(randomCard);
            }}
          ></StartButton>
        )}
        {playerState && (
          <button
            onClick={() => {
              const randomCard = getRandomCard();
              setPlayerState([...playerState, randomCard]);
            }}
          >
            Hit
          </button>
        )}

        {playerState && <p>Player{playerState.join(",")}</p>}
        {dealerState && <p>Dealer{dealerState.join(",")}</p>}
      </div>
    </div>
  );
}

export default App;
