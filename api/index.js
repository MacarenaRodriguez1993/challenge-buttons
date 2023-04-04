require("dotenv").config();
const server = require("./src/app");
const { sequelize } = require("./src/db");
const { PORT } = process.env;

sequelize.sync({ force: true }).then(() => {
  server.listen(PORT, () => {
    console.log(`SERVIDOR CORRIENDO EN EL PUERTO ${PORT}`);
  });
});
