import { useState } from "react";
import { uid } from "uid";
import "./App.css";
import { StandButton } from "./stand/StandButton";
import { Card } from "./start/Card";
import { StartButton } from "./start/StartButton";

type TScoreMap = {
  [key: string]: number;
};

type TGetRandomCard = {
  id: string;
  name: string;
  symbol: string;
  score: number;
};

enum GameStates {
  Start,
  Player,
  Dealer,
  Result,
}

type TDealerState = TGetRandomCard[];
type TPlayerState = TGetRandomCard[];
type TGameState = GameStates;

function App() {
  const [playerState, setPlayerState] = useState<TPlayerState | []>([]);
  const [dealerState, setDealerState] = useState<TDealerState | []>([]);
  const [gameState, setGameState] = useState<TGameState>(GameStates.Start);

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

  const getRandomCard = (): TGetRandomCard => {
    const randomNumberCard = Math.floor(Math.random() * card.length);
    const randomNumberSymbol = Math.floor(Math.random() * symbols.length);
    const randomCard = card[randomNumberCard];
    const randomSymbol = symbols[randomNumberSymbol];

    // Ass als 11 oder 1 entgegen nehmen

    const score: TScoreMap = {
      A: 11,
      Q: 10,
      K: 10,
      J: 10,
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
      id: uid(16),
      name: randomCard,
      symbol: randomSymbol,
      score: score[randomCard],
    };
  };

  const totalPlayerScore = playerState
    .map((e) => e.score)
    .reduce((acc, cur) => acc + cur, 0);

  function playerGetsTwoCards() {
    const dealerRandomCard1 = getRandomCard();
    const dealerRandomCard2 = getRandomCard();
    setDealerState([dealerRandomCard1, dealerRandomCard2]);
    const playerRandomCard1 = getRandomCard();
    const playerRandomCard2 = getRandomCard();
    setPlayerState([playerRandomCard1, playerRandomCard2]);
    if (totalPlayerScore === 21) {
      checkWinner();
    }
  }

  function checkWinner() {
    console.log("check winner");
  }

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
        {gameState === GameStates.Start && (
          <StartButton
            onClick={() => {
              playerGetsTwoCards();
              setGameState(GameStates.Player);
            }}
          ></StartButton>
        )}
        {gameState === GameStates.Player && (
          <>
            <button
              onClick={() => {
                const playerScore = dealerState
                  .map((e) => {
                    return e.score;
                  })
                  .reduce((acc, cur) => acc + cur, 0);

                if (playerScore === 21) {
                  return <p>YOU WON!</p>;
                }
                const randomCard = getRandomCard();
                setPlayerState([...playerState, randomCard]);
              }}
            >
              Hit
            </button>
            <StandButton
              handleClick={() => {
                const dealerScore = dealerState
                  .map((e) => e.score)
                  .reduce((acc, cur) => acc + cur);

                if (dealerScore < 17) {
                  const randomCard = getRandomCard();
                  setDealerState([...dealerState, randomCard]);
                } else if (dealerScore > 21) {
                  return <p>Dealer busted, YOU WIN!</p>;
                }
              }}
            ></StandButton>
          </>
        )}
        {playerState.length !== 0 && (
          <>
            <p>Player:</p>
            <div className="card-wrapper">
              {playerState.map((e) => {
                return (
                  <Card key={e.id} value={e.name} symbol={e.symbol}></Card>
                );
              })}
            </div>

            {playerState.length !== 0 && (
              <div>
                {playerState
                  .map((e) => e.score)
                  .reduce((acc, cur) => acc + cur, 0)}
              </div>
            )}
          </>
        )}

        {dealerState.length !== 0 && (
          <>
            <p>Dealer:</p>
            <div className="card-wrapper">
              {dealerState.map((e) => {
                return (
                  <Card key={e.id} value={e.name} symbol={e.symbol}></Card>
                );
              })}
            </div>
          </>
        )}

        {playerState.length !== 0 && (
          <div>
            {totalPlayerScore > 21 && (
              <div>
                <button
                  onClick={() => {
                    setPlayerState([]);
                    setDealerState([]);
                  }}
                >
                  Restart
                </button>
              </div>
            )}
          </div>
        )}

        {dealerState.length !== 0 && (
          <div>
            {dealerState.map((e) => e.score).reduce((acc, cur) => acc + cur, 0)}
          </div>
        )}
      </div>
    </div>
  );
}

export default App;
