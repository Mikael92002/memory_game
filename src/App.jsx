import "./App.css";
import { useEffect, useState } from "react";
import { getGifs } from "./fetch";
import { Card } from "./card";

function App() {
  const [term, setTerm] = useState("");
  const [imageURLArray, setImageURLArray] = useState([]);
  const [gameBegin, setGameBegin] = useState(false);
  const [score, setScore] = useState(0);

  // useEffect watches for state changes and shuffles cards based on state:
  const [clickedCard, setClickedCard] = useState(null);

  const [clickedCardSet, setClickedCardSet] = useState(new Set());

  useEffect(() => {
    function shuffleCards() {
      setImageURLArray((prev) => {
        let newArr = [...prev];
        for (let i = 0; i < prev.length; i++) {
          let randIndex = getRandInteger(0, prev.length-1);
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

  function handleCardClick(imageURL){
    if(clickedCardSet.has(imageURL)){
      setScore(0);
    }
    else{
      setScore((prevScore)=>{
        return prevScore + 1;
      })

      setClickedCardSet((prevSet)=>{
        return new Set([...prevSet, imageURL]);
      })
    }
    setClickedCard(imageURL);

  }

  async function handleKey(key) {
    if (key === "Enter") {
      setGifs();
    }
  }

  async function setGifs() {
    const gifsJSON = await getGifs(term, 9);
    if (gifsJSON !== 404) {
      let gifsArray = gifsJSON.data;
      let newArr = [];
      setGameBegin(true);
      for (let item of gifsArray) {
        newArr.push(item.images.original.url);
      }
      setImageURLArray(newArr);
    }
  }

  function getRandInteger(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
  }

  return (
    <>
      <header>
        <div id="title">Memory Game!</div>
      </header>
      {gameBegin && <div id="score">Score:{score}</div>}
      <main>
        {!gameBegin && (
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
      </main>
    </>
  );
}

export default App;
