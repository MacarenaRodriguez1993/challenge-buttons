import React from "react";
import { Box, Button, Modal, TextField, Typography } from "@mui/material";
const ButtonAdd = ({
  handleAddButton,
  handleChange,
  handleClose,
  handleOpen,
  open,
}) => {
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
          <Typography variant="h4" style={{ marginBottom: "1em" }}>
            + Agregar Botón{" "}
          </Typography>
          <TextField
            id="outlined-basic"
            label="Texto para crear el boton"
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
            <Button onClick={handleClose}>Cerrar</Button>
          </div>
        </Box>
      </Modal>
    </>
  );
};
export default ButtonAdd;
