import { useEffect, useState } from "react";
import "./App.css";
import axios from "axios";
import { Box, Button, Modal, TextField, Typography } from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";

const App = () => {
  const [buttons, setButtons] = useState([]);
  const [open, setOpen] = useState(false);
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
  const handleOpen = () => setOpen(true);
  const style = {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    width: 400,
    bgcolor: "background.paper",
    border: "2px solid #000",
    boxShadow: 24,
    p: 4,
  };
  return (
    <>
      <div className="App">
        <header>
          <h1>Botones App</h1>
        </header>
        <div style={{ display: "flex", justifyContent: "end", margin: "1em" }}>
          <div>
            <Button
              variant="contained"
              color="success"
              onClick={handleOpen}
              size="large"
            >
              + Agregar Nuevo Botón
            </Button>
            <Modal
              open={open}
              aria-labelledby="modal-modal-title"
              aria-describedby="modal-modal-description"
            >
              <Box sx={style}>
                <Typography variant="h4">+ Agregar Botón </Typography>
                <TextField
                  id="outlined-basic"
                  label="Text new Button"
                  variant="outlined"
                  onChange={(e) => handleChange(e)}
                />
                <br />
                <div
                  style={{
                    display: "flex",
                    justifyContent: "space-between",
                    paddingTop: "0.5em",
                  }}
                >
                  <Button
                    variant="contained"
                    color="success"
                    onClick={handleAddButton}
                  >
                    Crear Boton
                  </Button>
                  <Button onClick={() => setOpen(false)}>Cerrar</Button>
                </div>
              </Box>
            </Modal>
          </div>
        </div>
        <div
          style={{
            display: "grid",
            justifyContent: "center",
            margin: "auto",
          }}
        >
          {buttons.map((b) => (
            <div style={{ display: "flex", justifyContent: "space-around" }}>
              <Button
                variant="contained"
                color="secondary"
                size="medium"
                key={b.id}
                onClick={() => handleClick(b)}
              >
                {b.text} {b.id}
              </Button>
              <Typography>Se hicieron {b.count} Clicks</Typography>
              <Button
                variant="outlined"
                color="error"
                startIcon={<DeleteIcon />}
                onClick={() => deleteButton(b.id)}
              ></Button>
            </div>
          ))}
        </div>
      </div>
      ;
    </>
  );
};

export default App;
