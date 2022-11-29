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
    const randomCard = card[randomNumberCard];
    const randomSymbol = symbols[randomNumberSymbol];

    const score = {
      A: 11,
      Q: 10,
      K: 10,
      J: 10,
      10: 10,
      9: 9,
      8: 8,
      7: 7,
      6: 6,
      5: 5,
      4: 4,
      3: 3,
      2: 2,
    };

    return {
      name: randomCard,
      symbol: randomSymbol,
      score: score[randomCard],
    };
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
              const dealerRandomCard1 = getRandomCard();
              const dealerRandomCard2 = getRandomCard();
              setDealerState([dealerRandomCard1, dealerRandomCard2]);
              const randomCard1 = getRandomCard();
              const randomCard2 = getRandomCard();
              setPlayerState([randomCard1, randomCard2]);
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
        {playerState && (
          <p>
            Player:
            {playerState
              .map((e) => {
                return e.name;
              })
              .join(" ")}
          </p>
        )}
        {dealerState && (
          <p>
            Dealer:
            {dealerState
              .map((e) => {
                return e.name;
              })
              .join(" ")}
          </p>
        )}

        {playerState && (
          <p>
            Player:
            {playerState
              .map((e) => {
                return e.score;
              })
              .reduce((acc, cur) => {
                if (acc + cur > 21) {
                  return (
                    <div>
                      <button
                        onClick={() => {
                          setPlayerState();
                          setDealerState();
                        }}
                      >
                        Restart
                      </button>
                    </div>
                  );
                }
                return acc + cur;
              })}
          </p>
        )}
        {dealerState && (
          <p>
            Dealer:
            {dealerState
              .map((e) => {
                return e.score;
              })
              .reduce((acc, cur) => {
                return acc + cur;
              })}
          </p>
        )}
      </div>
    </div>
  );
}

export default App;
