import { useState, useMemo } from "react";

export default function App() {
  const [range, setRange] = useState([1, 10]);
  const [guess, setGuess] = useState("");
  const randomNumber = useMemo(() => {
    setGuess("");
    return range[0] && range[1] && +range[0] < +range[1]
      ? Math.floor(Math.random() * (+range[1] - +range[0] + 1) + +range[0])
      : null;
  }, [range[0], range[1]]);

  console.log([range, randomNumber]);

  return (
    <div className="flex justify-center items-center flex-col gap-[25px] h-[100vh]">
      <h1 className="text-3xl">
        Guess number between{" "}
        <input
          type="number"
          value={range[0]}
          onChange={(e) => setRange([e.target.value, range[1]])}
          className="border"
          style={{ width: `${Math.max(1, String(range[0]).length) + 0.5}ch` }}
        />{" "}
        to{" "}
        <input
          type="number"
          value={range[1]}
          onChange={(e) => setRange([range[0], e.target.value])}
          className="border w-10"
          style={{ width: `${Math.max(1, String(range[1]).length) + 0.5}ch` }}
        />
      </h1>
      <div className="flex gap-2">
        <input
          type="number"
          className="border rounded-lg"
          value={guess}
          onChange={(e) => setGuess(e.target.value)}
        />
      </div>
      <p
        className={`text-3xl ${
          (+range[0] >= +range[1] && "text-red-500") ||
          (guess == randomNumber && "text-green-500")
        }`}
      >
        {guess
          ? range[0] && range[1]
            ? +range[0] < +range[1]
              ? guess == randomNumber
                ? `${guess} is correct`
                : `${guess} is wrong. ${
                    guess < randomNumber ? "Higher" : "Lower"
                  }`
              : "First value must be lower than the second one"
            : "Range can't be empty"
          : ""}
      </p>
      <button
        className="px-2 py-1 border rounded-lg"
        onClick={() => {
          setGuess("");
          setRange([range[0] === 1 ? "1" : 1, range[1] === 10 ? "10" : 10]);
        }}
      >
        Reset
      </button>
    </div>
  );
}
