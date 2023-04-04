const { Button } = require("../db");

const getButtons = async () => {
  try {
    return await Button.findAll();
  } catch (error) {
    return error.mesagge;
  }
};

const createButton = async (data) => {
  try {
    const { text, count } = data;
    return await Button.create({ text, count });
  } catch (error) {
    return error.message;
  }
};
const deleteButton = async (id) => {
  const buttonDeleted = await Button.destroy({ where: { id } });
  if (buttonDeleted > 0) {
    return "Boton eliminado";
  } else {
    throw new Error("Error, el id no existe");
  }
};
const updateButton = async (data) => {
  const { id, text, count } = data;
  try {
    const button = await Button.findByPk(id);

    if (text) button.text = text;
    if (count) button.count = count;
    const but = await button.save();
    console.log(but);
    return button;
  } catch (error) {
    return err.message;
  }
};

module.exports = { getButtons, createButton, deleteButton, updateButton };
