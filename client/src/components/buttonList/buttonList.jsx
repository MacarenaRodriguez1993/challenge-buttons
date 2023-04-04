import React from "react";
import { Box, Button, Typography } from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
const ButtonList = ({ buttons, handleClick, deleteButton }) => {
  return (
    <>
      {buttons.map((b) => (
        <Box
          style={{
            display: "flex",
            margin: "2em 4em",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <Button
            variant="contained"
            color="secondary"
            style={{ width: "50%", padding: " 1em" }}
            key={b.id}
            onClick={() => handleClick(b)}
          >
            {b.text}
          </Button>
          <Typography style={{ margin: "0 2em" }}>
            Se hicieron {b.count} Clicks
          </Typography>
          <DeleteIcon
            style={{ cursor: "pointer" }}
            color="error"
            onClick={() => deleteButton(b.id)}
          />
        </Box>
      ))}
    </>
  );
};

export default ButtonList;
