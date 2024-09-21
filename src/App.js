import "./App.css";
import { useState, useEffect, useMemo } from "react";

export default function App() {
  const randomiseEmojis = (array) => {
    for (let i = array.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [array[i], array[j]] = [array[j], array[i]];
    }
    return array;
  };

  const [showEmoji, setShowEmoji] = useState(true);
  const [isClickable, setIsClickable] = useState(false);
  const [lives, setLives] = useState(6);
  const [firstClick, setFirstClick] = useState(null);
  const [matchedPair, setMatchedPair] = useState([]);
  const [revealedEmojis, setRevealedEmojis] = useState([]);
  const dummyValues = ["A", "B", "C", "D", "E", "F", "G", "H"];
  const pairedValue = useMemo(
    () => randomiseEmojis([...dummyValues, ...dummyValues]),
    []
  );

  const handleClick = (index) => {
    if (revealedEmojis.includes(index || matchedPair.includes(index))) return;
    if (firstClick === null) {
      setFirstClick(index);
      setRevealedEmojis([...revealedEmojis, index]);
    } else {
      setRevealedEmojis([...revealedEmojis, index]);
      if (pairedValue[firstClick] === pairedValue[index]) {
        setMatchedPair([...matchedPair, firstClick, index]);
        setFirstClick(null);
      } else {
        setTimeout(() => {
          setRevealedEmojis(
            revealedEmojis.filter((i) => i !== firstClick && i !== index)
          );
          setFirstClick(null);
          setLives(lives - 1);
          setIsClickable(true);
        }, 1000);
      }
    }
  };

  useEffect(() => {
    const timer = setTimeout(() => {
      setShowEmoji(false);
    }, 2000);
    return () => clearTimeout(timer);
  });

  const EmojiGrid = () => {
    return (
      <>
        <h2>Lives : {lives}</h2>
        <div className="grid-container">
          {pairedValue.map((val, index) => (
            <div
              className="grid-item"
              key={index}
              type="button"
              disabled={isClickable}
              onClick={() => handleClick(index)}
            >
              {showEmoji ||
              revealedEmojis.includes(index) ||
              matchedPair.includes(index)
                ? val
                : "?"}
            </div>
          ))}
        </div>
      </>
    );
  };

  return <EmojiGrid />;
}
