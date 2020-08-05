import React, { useState, useEffect } from "react";
import "./App.css";
import Aims from "./aim.js";

/*
 *? https://type.fit/api/quotes    - quotes json file
 */

const App = () => {
  useEffect(() => {}); // TODO work with localStrage (https://www.robinwieruch.de/local-storage-react)

  const [isLoading, setIsLoading] = useState(false);

  const getAims = async () => {
    setIsLoading(true);
    const response = await import("./data.json");
    const data = response.data.items;
    console.log("-->recieved data", data);
    setAims(data);
    setIsLoading(false);
    const actualCounter = aimCounter - data.length;
    setCounter(actualCounter);
  };

  const [aims, setAims] = useState(() => getAims());
  const [newAim, setNewAim] = useState({ text: "", key: "" });
  const [aimCounter, setCounter] = useState(5);

  const handleInput = (e) => {
    setNewAim({ text: e.target.value, key: Date.now() });
  };

  const addItem = (e) => {
    e.preventDefault();
    if (newAim.text !== "") {
      const newItems = [...aims, { aim: newAim.text, key: newAim.key }];
      setAims(newItems);
      setNewAim({ text: "", key: "" });
      setCounter(aimCounter - 1);
    }
  };

  return (
    <div className="App">
      <form id="aim-form" onSubmit={addItem}>
        <span>You have {aimCounter} to create </span>
        <input
          className="addAim-input"
          type="text"
          placeholder="Enter aim..."
          value={newAim.text}
          onChange={handleInput}
        />
        <button
          className="addAim-button"
          type="submit"
          disabled={aimCounter === 0}
        >
          Add
        </button>
        {isLoading ? <div>Loading ...</div> : <Aims aimList={aims} />}
      </form>
    </div>
  );
};

export default App;
