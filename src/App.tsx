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

enum WinnerStates {
  Player,
  Dealer,
  Draw,
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

  const calculateTotalScore = (currentState: TDealerState | TPlayerState) => {
    return currentState.map((e) => e.score).reduce((acc, cur) => acc + cur, 0);
  };

  const getInitialCards = () => {
    setDealerState([getRandomCard(), getRandomCard()]);
    setPlayerState([getRandomCard(), getRandomCard()]);
  };

  const getAdditionalPlayerCard = () => {
    setPlayerState([...playerState, getRandomCard()]);
  };

  const getAdditionalDealerCards = () => {
    const currentScore = calculateTotalScore(dealerState);
    const newCardsArray = [];
    while (
      currentScore + newCardsArray.reduce((acc, curr) => acc + curr.score, 0) <
      17
    ) {
      newCardsArray.push(getRandomCard());
    }
    setDealerState([...dealerState, ...newCardsArray]);
  };

  const checkWinner = () => {
    const totalPlayerScore = calculateTotalScore(playerState);
    const totalDealerScore = calculateTotalScore(dealerState);

    if (
      (totalPlayerScore > totalDealerScore && totalPlayerScore <= 21) ||
      totalDealerScore > 21
    ) {
      return WinnerStates.Player;
    } else if (
      (totalDealerScore > totalPlayerScore && totalDealerScore <= 21) ||
      totalPlayerScore > 21
    ) {
      return WinnerStates.Dealer;
    } else {
      return WinnerStates.Draw;
    }
  };

  const hasPlayerWon = () => {
    return checkWinner() === WinnerStates.Player;
  };

  const hasPlayerLost = () => {
    return calculateTotalScore(playerState) > 21;
  };

  const winner = checkWinner();

  return (
    <div className="App">
      <div className="size ">
        <div className="titel-img">
          <img src="./titel.jpg" alt="cards" className="titel-img"></img>
        </div>
        Black Jack {gameState}
        <div className="titel-img">
          <img src="./titel.jpg" alt="cards" className="titel-img"></img>
        </div>
      </div>
      <div className="App-header">
        {gameState === GameStates.Result && (
          <p>
            {winner === WinnerStates.Player
              ? "Congratulations, You've won!"
              : winner === WinnerStates.Dealer
              ? "Game Over, You've lost!"
              : "Draw! No Winner in this round."}
          </p>
        )}

        {gameState === GameStates.Start && (
          <StartButton
            onClick={() => {
              getInitialCards();
              if (hasPlayerWon()) {
                setGameState(GameStates.Result);
              } else {
                setGameState(GameStates.Player);
              }
            }}
          ></StartButton>
        )}

        {gameState === GameStates.Player && (
          <>
            <button
              onClick={() => {
                getAdditionalPlayerCard();
                if (hasPlayerWon() || hasPlayerLost()) {
                  setGameState(GameStates.Result);
                }
              }}
            >
              Hit
            </button>
            <StandButton
              handleClick={() => {
                setGameState(GameStates.Dealer);
                getAdditionalDealerCards();
                setGameState(GameStates.Result);
              }}
            ></StandButton>
          </>
        )}
        {gameState === GameStates.Result && (
          <div>
            <div>
              <button
                onClick={() => {
                  setGameState(GameStates.Start);
                  setPlayerState([]);
                  setDealerState([]);
                }}
              >
                Restart
              </button>
            </div>
          </div>
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
