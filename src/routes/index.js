const { Router } = require('express');
// Importar todos los routers;
// Ejemplo: const authRouter = require('./auth.js');
const getDogs = require("../controllers/getDogs.js");
const getTemperaments = require("../controllers/getTemperaments.js");
const getDogById = require("../controllers/getDogById.js");
const getDogByName = require("../controllers/getDogByName.js");
const postDog = require("../controllers/postDog.js");

const router = Router();

router.get("/dogs", getDogs);
router.get("/temperaments", getTemperaments);
router.get("/dogs/name", getDogByName);
router.get("/dogs/:idBreed", getDogById);
router.post("/dogs", postDog);


// Configurar los routers
// Ejemplo: router.use('/auth', authRouter);


module.exports = router;
