import { useEffect, useState } from "react";
import "./App.css";
import axios from "axios";
import ButtonList from "./components/buttonList/buttonList";
import ButtonAdd from "./components/buttonAdd/buttonAdd";
import { Box, Typography } from "@mui/material";

const App = () => {
  const [buttons, setButtons] = useState([]);
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const [input, setInput] = useState({
    text: "",
  });
  const [error, setError] = useState();
  const api_url = process.env.REACT_APP_API_URL;

  useEffect(() => {
    getButtons();
  }, []);
  const getButtons = async () => {
    await axios
      .get(api_url)
      .then((response) => {
        setButtons(response.data);
      })
      .catch((error) => {
        setError(error.message);
      });
  };
  const handleAddButton = async () => {
    console.log(input);
    await axios
      .post(api_url, input)
      .then((response) => {
        setButtons([...buttons, response.data]);
      })
      .catch((error) => {
        setError(error.message);
      });
    setOpen(false);
  };
  const deleteButton = async (id) => {
    await axios
      .delete(`${api_url}/${id}`)
      .then((response) => {
        const updateButtons = buttons.filter((b) => b.id !== id);
        setButtons(updateButtons);
      })
      .catch((error) => {
        setError(error.message);
      });
  };
  const handleClick = async (data) => {
    data.count++;
    await axios.put(api_url, data);
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
        {error && (
          <Typography style={{ textAlign: "center", marginTop: "1em" }}>
            {error}
          </Typography>
        )}
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
