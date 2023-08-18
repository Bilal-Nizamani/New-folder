"use client";
import React, { useEffect, useState, useRef } from "react";
import Counter from "./Counter";
import CarsRoad from "./CarsRoad";

// adds1strng to 2strng from given inde to frst strng length-1
function manipulateString(
  string1,
  string2,
  index,
  className = "text-green-500 font-bold"
) {
  if (index < 0 || index >= string2.length) {
    throw new Error("Index out of bounds");
  }

  const spanStart = `<span class='${className}'>`;
  const spanEnd = "</span>";

  const result =
    string2.substring(0, index) +
    spanStart +
    string2.substring(index, index + string1.length) +
    spanEnd +
    string2.substring(index + string1.length);

  return result;
}
// changes bg from given index to first string length

function changeBackgroundColor(length, inputString, index) {
  if (index < 0 || index >= inputString.length) {
    throw new Error("Index out of bounds");
  }

  const spanStart = `<span style="background-color: red;">`;
  const spanEnd = "</span>";

  const result =
    inputString.substring(0, index) +
    spanStart +
    inputString.substring(index, index + length) +
    spanEnd +
    inputString.substring(index + length);

  return result;
}

const RaceGame = () => {
  const [rndNum, setRndNum] = useState(1);

  const [currText, setCurrText] = useState("");
  // userTExt
  const [currUserText, setCurrUserText] = useState("");
  // gameend or not
  const [gameEnd, setGameEnd] = useState(true);
  // to show speed or not or reset car
  const [newMatchStarting, setNewMatchStarting] = useState(true);

  // completed-game or Not;
  const [isRaceCompleted, setIsRaceCompleted] = useState(false);
  // start-game-counting
  const [count, setCount] = useState(2);
  const [isCounting, setIsCounting] = useState(false);

  const [rightText, setRightText] = useState([]);
  // const rightText = [""];

  // const [wrongText, setWrongText] = useState("");
  let wrongText = "";
  //
  const [orginalString, setOrginalString] = useState("");
  // array of strings
  const [originalStringArray, setOriginalStringArray] = useState([]);

  const inputRef = useRef(null);

  const texts = [
    // "Beneath the starry sky, a lone wolf howls...",
    "In the heart of the city, neon lights flicker...",
    // "The sun is shining brightly in the sky.",
    // "A cozy fireplace crackles as the snow falls outside.",
    // "The aroma of freshly baked bread fills the air.",
    // "Children are laughing and playing in the park.",
    // "Stars twinkle like diamonds in the night sky.",
    // "Raindrops tap gently on the windowpane.",
    // "The waves crash against the rocky shore.",
    // "Birds chirp merrily in the morning breeze.",
    // "A field of wildflowers sways in the wind.",
    // "The city comes alive with neon lights and bustling streets.",
  ];

  // starttime counter
  const startCounting = () => {
    const startingText = "Starting....";
    gameEnder(startingText);
    setIsCounting(true);
    setCount(2); // Reset count to 5 when starting again
    setIsRaceCompleted(false);
    setNewMatchStarting(true);
    setRightText([]);
  };
  // starting is completed here and starting race here
  const countingCompleted = () => {
    if (inputRef.current) {
      setTimeout(() => {
        inputRef.current.focus(); // Focus on the input element after a short delay
      }, 100);
    }
    startGame();
  };

  // start-Game
  const startGame = () => {
    const rndmNum = Math.floor(Math.random() * texts.length);
    setRndNum(rndNum);
    setCurrText(texts[rndmNum]);
    setOrginalString(texts[rndmNum]);
    setOriginalStringArray(texts[rndmNum].split(" "));
    setCurrUserText("");
    setGameEnd(false);
    setNewMatchStarting(false);
  };
  // space remover from string
  function rmSpce(inputString) {
    return inputString.replace(/ /g, "");
  }
  // conver array into string
  function modifyString(inputArray) {
    if (!Array.isArray(inputArray)) {
      throw new Error("Input must be an array");
    }
    return inputArray.join(" ");
  }

  // this function ends the game
  const gameEnder = (startingGameText) => {
    setCurrText(startingGameText);
    setGameEnd(true);
    setCurrUserText("");
  };
  // function to compare string and colors to letters ///
  const stringHandler = (userInput) => {
    let isMatch1 = true;

    // cheking if user completed race

    if (
      originalStringArray.length === 1 &&
      userInput === originalStringArray[0]
    ) {
      const gameWinText = "You won";
      setRightText([]);
      setOriginalStringArray([]);
      gameEnder(gameWinText);
      setIsRaceCompleted(true);

      return;
    }
    if (
      wrongText.length === 0 &&
      userInput[userInput.length - 1] === " " &&
      rmSpce(userInput) === originalStringArray[0]
    ) {
      // adding new logic here to check word by word
      setCurrUserText("");
      setRightText((old) => {
        old.pop();
        old.push(rmSpce(userInput));
        old.push("");
        return old;
      });
      setOriginalStringArray((oldVl) => {
        oldVl.shift();
        return oldVl;
      });
      return;
    } else if (wrongText.length > 0) {
      wrongText = userInput;
    }

    for (let i = 0; i < userInput.length; i++) {
      if (userInput[i] !== originalStringArray[0][i]) {
        isMatch1 = false;
        break;
      }
    }
    if (isMatch1) {
      rightText.length > 0
        ? (rightText[rightText.length - 1] = rmSpce(userInput))
        : (rightText[rightText.length] = rmSpce(userInput));

      setCurrText(() => {
        return manipulateString(modifyString(rightText), orginalString, 0);
      });
    } else {
      let startWrongInx = rightText[rightText?.length - 1]?.length;
      wrongText = userInput.slice(startWrongInx);

      setCurrText(() => {
        return changeBackgroundColor(
          wrongText.length,
          orginalString,
          modifyString(rightText).length
        );
      });
    }
  };

  // user type input
  const handleInput = (e) => {
    const text = e.target.value;
    setCurrUserText(e.target.value);

    stringHandler(text);
  };

  // start game timer
  useEffect(() => {
    if (isCounting && count > 0) {
      const timer = setTimeout(() => {
        setCount((prevCount) => prevCount - 1);
      }, 1000);

      return () => clearTimeout(timer);
    } else if (isCounting && count === 0) {
      countingCompleted();
      setIsCounting(false);
    }
  }, [count, isCounting]);

  return (
    <>
      <div className=" absolute top-8 left-5" id="title">
        Typing Game
      </div>
      <div
        className={`flex m-auto text-[3.5rem] absolute ${
          count < 1 && "hidden"
        } top-[3%]`}
      >
        {count}
      </div>
      <CarsRoad
        arrayOfWrittenWords={rightText}
        orginalString={orginalString}
        newMatchStarting={newMatchStarting}
      />

      <div id="text" dangerouslySetInnerHTML={{ __html: currText }}></div>
      {/* <div> {modifyString(originalStringArray)}</div> */}
      <div>
        {/* <span className="text-green-800">{modifyString(rightText)}</span>
        <span className="text-red-700">{wrongText}</span> */}
      </div>
      <div className="m-auto  flex items-center justify-center">
        <input
          ref={inputRef}
          type="text"
          disabled={gameEnd}
          value={currUserText}
          onChange={handleInput}
          className={`p-2 border-2 border-gray-900 w-100% mx-2  ${
            gameEnd ? "border-[1px] select-none pointer-events-none" : ""
          } `}
        />
        <Counter
          gameEnd={gameEnd}
          arrayOfWrittenWords={rightText}
          newMatchStarting={newMatchStarting}
        />
      </div>
      <button
        onPaste={(e) => {
          e.preventDefault();
        }}
        onClick={startCounting}
      >
        Play New
      </button>
    </>
  );
};

export default RaceGame;
