const Router = require("express");
const router = Router();
const { Button } = require("../db");
const {
  getButtons,
  createButton,
  deleteButton,
  updateButton,
} = require("../controllers/controller");
//RUTA PARA TRAER TODOS LOS BOTONES
router.get("/", async (req, res) => {
  try {
    const buttons = await getButtons();
    return res.status(200).json(buttons);
  } catch (error) {
    return res.status(400).json({ error: error.message });
  }
});

//RUTA PARA CREAR UN BOTON
router.post("/", async (req, res) => {
  try {
    const newButton = await createButton(req.body);
    return res.status(200).json(newButton);
  } catch (error) {
    return res.status(400).json({ error: error.message });
  }
});

//RUTA PARA ELIMINAR UN BOTON
router.delete("/:id", async (req, res) => {
  try {
    const { id } = req.params;
    await deleteButton(id);
    return res.status(200).json({ msj: "Activity deleted sucessfully" });
  } catch (error) {
    return res.status(400).send({ error: err.message });
  }
});

//RUTA PARA EDITAR UN BOTON
router.put("/", async (req, res) => {
  try {
    const update = await updateButton(req.body);
    return res.status(200).json(update);
  } catch (error) {
    return res.status(404).send({ error: err.message });
  }
});

module.exports = router;
