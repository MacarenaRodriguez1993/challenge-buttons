import { useEffect, useState } from "react";
import "./App.css";
import axios from "axios";
const App = () => {
  const [buttons, setButtons] = useState([]);
  useEffect(() => {
    getButtons();
  }, []);

  const getButtons = async () => {
    await axios
      .get("http://localhost:3001/")
      .then((response) => {
        setButtons(response.data);
      })
      .catch((error) => {
        console.log("Error feching", error);
      });
  };
  const handleAddButton = async () => {
    const data = {
      text: "boton",
    };
    await axios
      .post("http://localhost:3001/", data)
      .then((response) => {
        setButtons([...buttons, response.data]);
      })
      .catch((error) => {
        console.log("Error", error);
      });
  };
  return (
    <>
      <div className="App">
        <header>
          <h1>Botones App</h1>
        </header>
        <div style={{ display: "flex", justifyContent: "space-around" }}>
          <h2>Botones</h2>
          <button onClick={handleAddButton}>Agregar nuevo boton</button>
        </div>
        <div>
          {buttons.map((b) => (
            <button key={b.id}>
              {b.text} {b.id}
            </button>
          ))}
        </div>
      </div>
      ;
    </>
  );
};

export default App;
