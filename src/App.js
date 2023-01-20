import "./styles.css";
import React, { useCallback, useEffect, useState } from "react";

export default function App() {
  const [curr, setCurr] = useState({ player: null, symb: null });
  const [winner, setWinner] = useState(null);
  const patterns = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6]
  ];
  const [grid, setGrid] = useState(Array.from({ length: 9 }));

  /*const didWin = useCallback(() => {
    console.log(grid, "called");
    for (let index in patterns) {
      const pattern = patterns[index];
      if (
        grid[pattern[0]] === grid[pattern[1]] &&
        grid[pattern[1]] === grid[pattern[2]] &&
        grid[pattern[0]] !== undefined
      ) {
        console.log(grid[pattern[0]]);
      }
    }
  }, [grid, curr]);*/

  useEffect(() => {
    for (let index in patterns) {
      const pattern = patterns[index];
      if (
        grid[pattern[0]] === grid[pattern[1]] &&
        grid[pattern[1]] === grid[pattern[2]] &&
        grid[pattern[0]] !== undefined
      ) {
        setWinner(curr.player);
        //alert(`${curr.player} won`);
      }
    }
  }, [grid, curr]);

  useEffect(() => {
    if (winner) {
      alert(`${curr.player} won`);
    }
  }, [winner]);

  const onClick = useCallback(
    (indx) => {
      if (winner) return;
      if (!curr.symb) {
        const temp = [...grid];
        temp[indx] = "X";
        setGrid(temp);
        setCurr({ symb: "X", player: "A" });
      } else {
        if (curr.symb === "X") {
          const temp = [...grid];
          temp[indx] = "O";
          setGrid(temp);
          setCurr({ symb: "O", player: "B" });
          //didWin();
        } else {
          const temp = [...grid];
          temp[indx] = "X";
          setGrid(temp);
          setCurr({ symb: "X", player: "A" });
          //didWin();
        }
      }
    },
    [curr, grid, winner]
  );

  return (
    <div className="App">
      {grid.map((row, rIndex) => {
        return (
          <div
            className="box"
            key={rIndex}
            onClick={() => {
              onClick(rIndex);
            }}
          >
            {row}
          </div>
        );
      })}
    </div>
  );
}
