const { Router } = require('express');
// Importar todos los routers;
// Ejemplo: const authRouter = require('./auth.js');
//const axios = require('axios');
const pokemons= require('./pokemons')
const types = require('./types')



// Configurar los routers
// Ejemplo: router.use('/auth', authRouter);

const router = Router();

router.use('/pokemons',pokemons);
router.use('/types',types);


module.exports = router;

