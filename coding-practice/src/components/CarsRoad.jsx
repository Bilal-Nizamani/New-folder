import React, { useEffect, useState, useRef } from "react";

const CarsRoad = ({ arrayOfWrittenWords, orginalString, newMatchStarting }) => {
  orginalString = orginalString.split(" ");
  const [marginLeft, setMarginLeft] = useState(0);

  const carRoad = useRef("");
  useEffect(() => {
    let roadWidth = carRoad.current.offsetWidth;
    const writenTxtPercent =
      ((arrayOfWrittenWords.length - 1) * 100) / orginalString.length;

    if (writenTxtPercent > 0) {
      setMarginLeft((roadWidth - 60) * (writenTxtPercent / 100));
    }
    if (newMatchStarting) {
      setMarginLeft(0);
    }
  }, [arrayOfWrittenWords, orginalString, newMatchStarting]);
  return (
    <>
      <div ref={carRoad} className=" h-[100px] relative w-[500px] bg-slate-400">
        <div
          style={{ left: marginLeft }}
          className={`h-[30px], absolute  ${marginLeft}  bg-black m-[10px] rounded-md , w-[50px]`}
        >
          Car
        </div>
      </div>
    </>
  );
};

export default CarsRoad;
