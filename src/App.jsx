import "./App.css";
import { useEffect, useState } from "react";
import { getGifs } from "./fetch";
import { Card } from "./card";

function App() {
  const [term, setTerm] = useState("");
  const [imageURLArray, setImageURLArray] = useState([]);
  const [gameBegin, setGameBegin] = useState(false);
  const [score, setScore] = useState(0);
  const [gameWin, setGameWin] = useState(false);

  // useEffect watches for state changes and shuffles cards based on state:
  const [clickedCard, setClickedCard] = useState(null);
  const [clickedCardSet, setClickedCardSet] = useState(new Set());
  const [sliderValue, setSliderValue] = useState(9);

  useEffect(() => {
    function shuffleCards() {
      setImageURLArray((prev) => {
        let newArr = [...prev];
        for (let i = 0; i < prev.length; i++) {
          let randIndex = getRandInteger(0, prev.length - 1);
          let oldValue = newArr[i];
          newArr[i] = newArr[randIndex];
          newArr[randIndex] = oldValue;
        }
        console.log(newArr);
        return newArr;
      });
    }
    shuffleCards();
  }, [clickedCard]);

  function handleInputChange(value) {
    setTerm(value);
  }

  function handleCardClick(imageURL) {
    let oldScore = score;
    if (clickedCardSet.has(imageURL)) {
      setScore(0);
      setClickedCardSet(new Set());
    } else {
      setScore((prevScore) => {
        return prevScore + 1;
      });
      oldScore = oldScore + 1;

      setClickedCardSet((prevSet) => {
        return new Set([...prevSet, imageURL]);
      });
    }
    setClickedCard(crypto.randomUUID());
    if (oldScore >= imageURLArray.length) {
      setGameWin(true);
      setGameBegin(false);
      setImageURLArray([]);
      setTerm("");
    }
  }

  async function handleKey(key) {
    if (key === "Enter") {
      setGifs();
    }
  }

  async function setGifs() {
    let actualTerm = term;
    if(term.trim() === ""){
      actualTerm = "cats";
    }
    const gifsJSON = await getGifs(actualTerm, sliderValue);
    if (gifsJSON !== 404) {
      let gifsArray = gifsJSON.data;
      let newArr = [];
      setGameBegin(true);
      for (let item of gifsArray) {
        newArr.push(item.images.original.url);
      }
      setImageURLArray(newArr);
      setGameWin(false);
      setScore(0);
    }
  }

  function getRandInteger(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
  }

  function handleSliderValue(sliderValue) {
    setSliderValue(sliderValue);
  }

  function handleRestart(){
    setImageURLArray([]);
    setScore(0);
    setClickedCardSet(new Set());
    setGameBegin(false);
    setTerm("");
  }

  return (
    <>
      <header>
        <div id="title">Memory Game!</div>
      </header>
      {gameBegin && (
        <div id="score-container">
          <div class="fake restart">
              <svg
                width="40px"
                height="fit-content"
                viewBox="-7.5 0 32 32"
                version="1.1"
                xmlns="http://www.w3.org/2000/svg"
              >
                <title>restart</title>
                <path d="M15.88 13.84c-1.68-3.48-5.44-5.24-9.040-4.6l0.96-1.8c0.24-0.4 0.080-0.92-0.32-1.12-0.4-0.24-0.92-0.080-1.12 0.32l-1.96 3.64c0 0-0.44 0.72 0.24 1.040l3.64 1.96c0.12 0.080 0.28 0.12 0.4 0.12 0.28 0 0.6-0.16 0.72-0.44 0.24-0.4 0.080-0.92-0.32-1.12l-1.88-1.040c2.84-0.48 5.8 0.96 7.12 3.68 1.6 3.32 0.2 7.32-3.12 8.88-1.6 0.76-3.4 0.88-5.080 0.28s-3.040-1.8-3.8-3.4c-0.76-1.6-0.88-3.4-0.28-5.080 0.16-0.44-0.080-0.92-0.52-1.080-0.4-0.080-0.88 0.16-1.040 0.6-0.72 2.12-0.6 4.36 0.36 6.36s2.64 3.52 4.76 4.28c0.92 0.32 1.84 0.48 2.76 0.48 1.24 0 2.48-0.28 3.6-0.84 4.16-2 5.92-7 3.92-11.12z"></path>
              </svg>
          </div>
          <div id="score">Score:{score}</div>
          <div class="restart">
            <button id="restart-button" onClick={handleRestart}>
              <svg
                width="40px"
                height="fit-content"
                viewBox="-7.5 0 32 32"
                version="1.1"
                xmlns="http://www.w3.org/2000/svg"
              >
                <title>restart</title>
                <path d="M15.88 13.84c-1.68-3.48-5.44-5.24-9.040-4.6l0.96-1.8c0.24-0.4 0.080-0.92-0.32-1.12-0.4-0.24-0.92-0.080-1.12 0.32l-1.96 3.64c0 0-0.44 0.72 0.24 1.040l3.64 1.96c0.12 0.080 0.28 0.12 0.4 0.12 0.28 0 0.6-0.16 0.72-0.44 0.24-0.4 0.080-0.92-0.32-1.12l-1.88-1.040c2.84-0.48 5.8 0.96 7.12 3.68 1.6 3.32 0.2 7.32-3.12 8.88-1.6 0.76-3.4 0.88-5.080 0.28s-3.040-1.8-3.8-3.4c-0.76-1.6-0.88-3.4-0.28-5.080 0.16-0.44-0.080-0.92-0.52-1.080-0.4-0.080-0.88 0.16-1.040 0.6-0.72 2.12-0.6 4.36 0.36 6.36s2.64 3.52 4.76 4.28c0.92 0.32 1.84 0.48 2.76 0.48 1.24 0 2.48-0.28 3.6-0.84 4.16-2 5.92-7 3.92-11.12z"></path>
              </svg>
            </button>
          </div>
        </div>
      )}
      <main>
        {!gameBegin && (
          <>
            <label htmlFor="search">
              <input
                type="text"
                value={term}
                onChange={(e) => handleInputChange(e.target.value)}
                onKeyDown={(e) => handleKey(e.key)}
                id="search"
              />
              <button onClick={setGifs}>Search</button>
            </label>
            <label htmlFor="slider" id="slider-label">
              Number of pics:
              <input
                type="range"
                name="slider"
                value={sliderValue}
                id="slider"
                min="3"
                max="21"
                step="3"
                onInput={(e) => handleSliderValue(e.target.value)}
              />
              <output id="value">{sliderValue}</output>
            </label>
          </>
        )}

        {!gameBegin && (
          <div id="help-text">Search something to start the game!</div>
        )}

        <div id="card-grid">
          {imageURLArray.map((imageURL) => {
            return (
              <Card
                image={imageURL}
                key={imageURL}
                onClick={() => handleCardClick(imageURL)}
              ></Card>
            );
          })}
        </div>
        {gameWin && <div id="game-win-text">Great job! You won!</div>}
      </main>
    </>
  );
}

export default App;
