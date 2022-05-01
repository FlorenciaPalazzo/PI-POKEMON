const { Router } = require('express');
const axios = require('axios');
const {Type}= require('../db');
const router = Router();

router.get('/',async (req, res) => {

let apiUrl = await axios.get(`https://pokeapi.co/api/v2/type`)   

try{
       let getData = await apiUrl.data.results.map((e) =>e.name)

       let tipos= await getData.map(t=>
                    Type.create({nombre:t})
                    )

        res.status(200).send(getData)      

  }catch (err){
    console.log(err)}

})


module.exports = router;




