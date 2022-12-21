import { useEffect, useState } from "react";
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
  const [winnerState, setWinnerState] = useState<WinnerStates | null>(null);

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
    const randomCard = getRandomCard();
    if (randomCard.name === "A" && calculateTotalScore(playerState) >= 11) {
      randomCard.score = 1;
    }
    setPlayerState([...playerState, randomCard]);
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

  const showDealerScore = () => {
    if (gameState === GameStates.Dealer || gameState === GameStates.Result) {
      return (
        <div>
          {dealerState.map((e) => e.score).reduce((acc, cur) => acc + cur, 0)}
        </div>
      );
    } else {
      return <div>{dealerState.map((e) => e.score).slice(0, 1)}</div>;
    }
  };

  useEffect(() => {
    const totalPlayerScore = calculateTotalScore(playerState);

    // Checks if totalPlayerScore is = or above 21
    if (totalPlayerScore === 21) {
      getAdditionalDealerCards();
      setGameState(GameStates.Result);
    } else if (totalPlayerScore > 21) {
      setGameState(GameStates.Result);
    }
  }, [playerState]);

  useEffect(() => {
    const totalPlayerScore = calculateTotalScore(playerState);
    const totalDealerScore = calculateTotalScore(dealerState);

    if (gameState === GameStates.Result) {
      if (
        (totalPlayerScore > totalDealerScore && totalPlayerScore <= 21) ||
        totalDealerScore > 21
      ) {
        setWinnerState(WinnerStates.Player);
      } else if (
        (totalDealerScore > totalPlayerScore && totalDealerScore <= 21) ||
        totalPlayerScore > 21
      ) {
        setWinnerState(WinnerStates.Dealer);
      } else {
        setWinnerState(WinnerStates.Draw);
      }
    }
  }, [playerState, dealerState, gameState]);

  return (
    <div className="App">
      <div className="size ">
        <img src="./blackjack_logo-removebg-preview.png" alt="bjlogo" />
      </div>
      <div className="App-header">
        {gameState === GameStates.Result && (
          <p>
            {winnerState === WinnerStates.Player
              ? "Congratulations, You've won!"
              : winnerState === WinnerStates.Dealer
              ? "Game Over, You've lost!"
              : "Draw! No Winner in this round."}
          </p>
        )}

        {gameState === GameStates.Start && (
          <StartButton
            onClick={() => {
              getInitialCards();
              setGameState(GameStates.Player);
            }}
          ></StartButton>
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
              {dealerState.map((e, index) => {
                if (gameState === GameStates.Player && index === 1) {
                  return <Card key={e.id}></Card>;
                } else {
                  return (
                    <Card key={e.id} value={e.name} symbol={e.symbol}></Card>
                  );
                }
              })}
            </div>
          </>
        )}
        {showDealerScore()}

        {gameState === GameStates.Player && (
          <>
            <div className="gap-for-buttons">
              <button
                onClick={() => {
                  getAdditionalPlayerCard();
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
            </div>
          </>
        )}
      </div>
    </div>
  );
}

export default App;
