import "./App.css";
import { useEffect, useState } from "react";
import { getGifs } from "./fetch";

function App() {
  const [term, setTerm] = useState("");
  const [imageURLArray, setImageURLArray] = useState([]);
  const [gameBegin, setGameBegin] = useState(false);

  useEffect(() => {
    console.log("updated arr: " + imageURLArray);
  }, [imageURLArray]);

  function handleInputChange(value) {
    setTerm(value);
  }

  async function handleKey(key) {
    if (key === "Enter") {
      const gifsJSON = await getGifs(term, 5);
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
  }

  return (
    <>
      <header><div id = "title">Memory Game!</div></header>

      <main>
        <label htmlFor="search">
          <input
            type="text"
            value={term}
            onChange={(e) => handleInputChange(e.target.value)}
            onKeyDown={(e) => handleKey(e.key)}
            id="search"
          />
          <button>Search</button>
        </label>

        <div id="help-text">Search something in the box above to start the game!</div>
      </main>
    </>
  );
}

export default App;
