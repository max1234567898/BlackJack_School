import { useState } from "react";
import "./App.css";
import { StandButton } from "./stand/StandButton";
import { Card } from "./start/Card";
import { StartButton } from "./start/StartButton";

type TScoreMap = {
  [key: string]: number
}

function App() {
  const [playerState, setPlayerState] = useState();
  const [dealerState, setDealerState] = useState();
 
  // Karten noch aus dem Deck löschen nach dem sie gezogen
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


  type TGetRandomCard = {
    name: string;
    symbol: string;
    score: number;
  }

  const getRandomCard = (): TGetRandomCard => {
    const randomNumberCard = Math.floor(Math.random() * card.length);
    const randomNumberSymbol = Math.floor(Math.random() * symbols.length);
    const randomCard = card[randomNumberCard];
    const randomSymbol = symbols[randomNumberSymbol];

    // Ass als 11 oder 1 entgegen nehmen
   
    const score: TScoreMap = {
      "A": 11,
      "Q": 10,
      "K": 10,
      "J": 10,
      "10": 10,
      "9": 9,
      "8": 8,
      "7": 7,
      "6": 6,
      "5": 5,
      "4": 4,
      "3": 3,
      "2": 2,
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
              const playerScore =
              dealerState.map((e) => {
                return e.score;
              })
              .reduce((acc, cur) => acc + cur);

              if (playerScore === 21) {
                return <p>YOU WON!</p>
              }
              const randomCard = getRandomCard();
              setPlayerState([...playerState, randomCard]);
            }}
          >
            Hit
          </button>
        )}
        {dealerState && (
        <StandButton 
            onClick={() => {
              const dealerScore =
              dealerState.map((e) => {
                return e.score;
              })
              .reduce((acc, cur) => acc + cur);

              if (dealerScore < 17) {
              const randomCard = getRandomCard();
              setDealerState([...dealerState, randomCard]);
              }
              else if (dealerScore > 21) {
                return (<p>Dealer busted, YOU WIN!</p>);
              }
              }
          } ></StandButton>
        )}
        {playerState && (
          <>
          <p>Player:</p>
          <div className="card-wrapper">
            {playerState
              .map((e) => {
                return <Card value={e.name} symbol={e.symbol}></Card>;
              })
              }
          </div>
          </>
        )}
        {dealerState && (
          <>
          <p>Dealer:</p>
          <div className="card-wrapper">
            {dealerState
              .map((e) => {
                return <Card value={e.name} symbol={e.symbol}></Card>;
              })
              }
          </div>
          </>
        )}

        {playerState && (
          <div>
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
          </div>
        )}
        {dealerState && (
          <div>
            Dealer:
            {dealerState
              .map((e) => {
                return e.score;
              })
              .reduce((acc, cur) => {
                return acc + cur;
              })}
          </div>
        )}
      </div>
    </div>
  );
}

export default App;
