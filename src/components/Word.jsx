import React from "react";
import "./Word.css";

const Word = ({ term, result }) => {
  const { meanings, phonetic, phonetics, sourceUrls, word } = result;

  const playAudio = () => {
    let url = phonetics.filter(phon => phon.audio)[0].audio
    const audio = new Audio(url);
    audio.play();
  };

  return (
    <div className="word">
      <div className="title_container">
        <div className="keyword">
          <h1>{word}</h1>
          <p className="transcription">{phonetic}</p>
        </div>
        <div className="play_button" onClick={playAudio}>
          <svg
            version="1.1"
            xmlns="http://www.w3.org/2000/svg"
            width="25"
            height="25"
            viewBox="0 0 32 32"
            fill="#7600bc"
          >
            <title>play audio</title>
            <path d="M6 4l20 12-20 12z"></path>
          </svg>
        </div>
      </div>

      {meanings && meanings.length > 0
        ? meanings.map((meaning, i) => (
            <div key={i} className="results">
              <div className="line">
                <p className="figureOfSpeech">{meaning.partOfSpeech}</p>
                <span></span>
              </div>

              <p className="meanings">Meanings</p>
              <ul className="defUl">
                {meaning?.definitions.map((def, key) => (
                  <li key={key} className="definition">
                    {def.definition}
                    {def.example && <p className="example">Example: {def.example}</p>}
                  </li>
                ))}
              </ul>
            </div>
          ))
        : null}

      <div className="source">
        <p className="desc">Source</p>
        {sourceUrls && sourceUrls.length > 1 ? (
          <a href={sourceUrls[0]}>{sourceUrls[0]}</a>
        ) : (
          <a href="#">{sourceUrls}</a>
        )}
      </div>
    </div>
  );
};

export default Word;
