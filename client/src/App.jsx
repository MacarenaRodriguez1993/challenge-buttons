import { useEffect, useState } from "react";
import "./App.css";
import axios from "axios";
import ButtonList from "./components/buttonList/buttonList";
import ButtonAdd from "./components/buttonAdd/buttonAdd";
import { Box } from "@mui/material";

const App = () => {
  const [buttons, setButtons] = useState([]);
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const [input, setInput] = useState({
    text: "",
  });

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
    console.log(input);
    await axios
      .post("http://localhost:3001/", input)
      .then((response) => {
        setButtons([...buttons, response.data]);
      })
      .catch((error) => {
        console.log("Error", error);
      });
    setOpen(false);
  };
  const deleteButton = async (id) => {
    await axios
      .delete(`http://localhost:3001/${id}`)
      .then((response) => {
        const updateButtons = buttons.filter((b) => b.id !== id);
        setButtons(updateButtons);
      })
      .catch((error) => {
        console.log(error);
      });
  };
  const handleClick = async (data) => {
    data.count++;
    await axios.put(`http://localhost:3001`, data);
    const updateButtons = buttons.map((b) => {
      if (b.id === data.id) {
        return { ...b };
      } else {
        return b;
      }
    });
    setButtons(updateButtons);
  };
  const handleChange = (e) => {
    setInput({
      ...input,
      text: e.target.value,
    });
  };

  return (
    <>
      <div className="App">
        <header>
          <h1 style={{ textAlign: "start" }}>Botones App</h1>
        </header>
        <Box style={{ textAlign: "center", margin: "2em" }}>
          <ButtonAdd
            open={open}
            handleAddButton={handleAddButton}
            handleChange={handleChange}
            handleOpen={handleOpen}
            handleClose={handleClose}
          />
        </Box>

        <ButtonList
          buttons={buttons}
          deleteButton={deleteButton}
          handleClick={handleClick}
        />
      </div>
      ;
    </>
  );
};

export default App;
