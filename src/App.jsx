import "./App.css";
import { useEffect, useState } from "react";
import axios from "axios";
import Word from "./components/Word";

function App() {
  const [result, setResult] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");

  async function getWord() {
    try {
      const data = await axios.get(`https://api.dictionaryapi.dev/api/v2/entries/en/${searchTerm}`);
      setResult(data.data[0]);
    } catch (error) {
      setResult([]);
    }
  }

  useEffect(() => {
    getWord(searchTerm);
  }, [searchTerm]);

  const debounce = (cb, delay = 500) => {
    let timeout;

    return (...args) => {
      clearTimeout(timeout);
      timeout = setTimeout(() => {
        cb(...args);
      }, delay);
    };
  };

  const debounceTextUpdate = debounce(text => setSearchTerm(text))

  return (
    <div className="App">
      <header>
        <div className="left">
          <div className="logo">
            <svg
              version="1.1"
              xmlns="http://www.w3.org/2000/svg"
              width="32"
              height="32"
              viewBox="0 0 32 32"
              fill="white"
            >
              <title>Excel Dictionary</title>
              <path d="M17 9h-6v19h14v-19h-8zM26 29h-17.006c-1.651 0-2.994-1.343-2.994-2.999v-19.501c0-1.39 1.116-2.5 2.493-2.5h17.507v1h-0.505c-0.818 0-1.495 0.672-1.495 1.5 0 0.834 0.669 1.5 1.495 1.5h0.505v21zM10 28v-19h-1.507c-0.559 0-1.076-0.185-1.493-0.498v17.507c0 1.1 0.893 1.991 1.995 1.991h1.005zM8.493 5c-0.825 0-1.493 0.666-1.493 1.5 0 0.828 0.667 1.5 1.493 1.5h15.007c0 0-0.5-0.79-0.5-1.526s0.5-1.474 0.5-1.474h-15.007z"></path>
            </svg>
            <span>Excel Dictionary</span>
          </div>
        </div>
        <div className="right">
          <div className="font_select">
            <select title="change font" name="font" id="fonts">
              <option value="serif">Serif</option>
            </select>
          </div>
        </div>
      </header>

      <form
        className="search"
        onSubmit={(e) => {
          e.preventDefault();
        }}
      >
        <input
          type="search"
          name="search"
          placeholder="search word"
          id="search"
          onChange={(e) => debounceTextUpdate(e.target.value)}
          autoComplete="off"
        />
        <svg
          version="1.1"
          xmlns="http://www.w3.org/2000/svg"
          width="25"
          height="25"
          viewBox="0 0 32 32"
          fill="white"
        >
          <title>search</title>
          <path d="M19.427 20.427c-1.39 0.99-3.090 1.573-4.927 1.573-4.694 0-8.5-3.806-8.5-8.5s3.806-8.5 8.5-8.5c4.694 0 8.5 3.806 8.5 8.5 0 2.347-0.951 4.472-2.49 6.010l5.997 5.997c0.275 0.275 0.268 0.716-0.008 0.992-0.278 0.278-0.72 0.28-0.992 0.008l-6.081-6.081zM14.5 21c4.142 0 7.5-3.358 7.5-7.5s-3.358-7.5-7.5-7.5c-4.142 0-7.5 3.358-7.5 7.5s3.358 7.5 7.5 7.5v0z"></path>
        </svg>
      </form>

      {searchTerm && result.length < 1 ? (
        <div className="fourOhfour">
          <svg
            version="1.1"
            xmlns="http://www.w3.org/2000/svg"
            width="32"
            height="32"
            viewBox="0 0 32 32"
            fill="white"
          >
            <title>note-important</title>
            <path d="M6 11v15.001c0 0.56 0.451 0.999 1.007 0.999h13.993v-4.994c0-1.119 0.895-2.006 1.998-2.006h4.002v-9h-21zM6 10h21v-2.993c0-0.557-0.447-1.007-0.999-1.007h-19.003c-0.56 0-0.999 0.447-0.999 0.999v3.001zM21.5 28h-14.5c-1.105 0-2-0.902-2-2.001v-18.998c0-1.105 0.902-2.001 2.001-2.001h18.998c1.105 0 2.001 0.894 2.001 1.994v14.006l-6 7h-0.5zM22 26.5l4.7-5.5h-3.703c-0.546 0-0.997 0.452-0.997 1.009v4.491zM15 13h3v8h-3v-8zM16 14v6h1v-6h-1zM15 22h3v3h-3v-3zM16 23v1h1v-1h-1z"></path>
          </svg>
          <h4>
            Couldn't find the word <span>{searchTerm}</span>, check your spelling and try again
          </h4>
        </div>
      ) : !searchTerm ? (
        <h4 className="fourOhfour">Begin by searching a word</h4>
      ) : (
        <Word term={searchTerm || "JavaScript"} result={result} />
      )}
    </div>
  );
}

export default App;
