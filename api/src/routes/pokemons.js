const { Router } = require('express');
const axios = require('axios');
const {Pokemon,Type}= require('../db');
const router = Router();

//Trae la info de la api y luego concatena con db
//Busca por nombre en la Api y en la db


const getApi = async ()=> {

try{
let arrayDataPokemons=[]; 

let apiUrl = (await axios.get(`https://pokeapi.co/api/v2/pokemon`)).data  
let apiUrl20= (await axios.get(apiUrl.next)).data
let apiUrl40= [...apiUrl.results,...apiUrl20.results]
//console.log(apiUrl)
//console.log(apiUrl40)

let getData = async(i) =>{
    let pokemonData = await axios.get(apiUrl40[i].url)
    let pokemon={
        id: pokemonData.data.id,
        img: pokemonData.data.sprites.other.dream_world.front_default, 
        tipo: pokemonData.data.types.map((data)=> data.type.name),
        nombre: pokemonData.data.name.charAt(0).toUpperCase()+ pokemonData.data.name.slice(1),
        vida: pokemonData.data.stats[0].base_stat,
        fuerza: pokemonData.data.stats[1].base_stat,
        defensa: pokemonData.data.stats[2].base_stat,
        velocidad: pokemonData.data.stats[5].base_stat,
        altura: pokemonData.data.height,
        peso: pokemonData.data.weight,            
    }
arrayDataPokemons.push(pokemon)
}

for(let i = 0; i < apiUrl40.length ; i++){
await getData(i)
}

return arrayDataPokemons
}catch (err){
    console.log(err)
}                  
}



//trae la info de la db
const getDB = async ()=>{
    let getData = await Pokemon.findAll({ 
        include:{
            model: Type,
            attributes: ['nombre'],

            through:{
                attributes: [],
            }
        }
    }) 
    

    //[{ }{ }{ }]
  getData = getData.map(({
    id,
    img , 
    types, // ES EL NOOMBRE DE LA TABLA DE SQL
    nombre, 
    vida,
    fuerza, 
    defensa, 
    velocidad ,
    altura, 
    peso   
   }) =>({

    id,
    img , 
    tipo: types.map((t)=>t.nombre),
    nombre, 
    vida,
    fuerza, 
    defensa, 
    velocidad ,
    altura, 
    peso   

   })
   
   )
   return getData

}



//Trae info Api + info DB
const getAllPokemonsApiDB= async() =>{
    const apiData= await getApi();
    const dBData = await getDB();
    const allDataApiDB= dBData.concat(apiData);
    return allDataApiDB;
}



router.get('/',async (req, res) => {
    
try{
    let { nombre } = req.query
    let allDataApiDB = await getAllPokemonsApiDB();

    if(nombre){
        let allDataName = await allDataApiDB.filter(p =>p.nombre.toLowerCase()===nombre.toLowerCase())
        console.log(nombre)
        console.log(allDataName)
            if(!allDataName.length){
                return res.status(404).send('No existe el nombre del pokemon')    
            }
            
            res.status(200).send(allDataName) //devuelve el nombre del pokemon
            
    }else{
       res.status(200).send(allDataApiDB) //devuelve todos los pokemones
    }
}catch(err){
   
    res.status(404).send(err)
}
})



//Busqueda por ID
router.get('/:id',async (req, res) => {
    let {id} = req.params

    if(!id.includes('-')){
        try{
                const apiUrl = await axios.get(`https://pokeapi.co/api/v2/pokemon/${id.toLowerCase()}`)
                const idApi={
                        id: apiUrl.data.id,
                        img: apiUrl.data.sprites.other.dream_world.front_default, 
                        tipo: apiUrl.data.types.map((data)=> data.type.name),
                        nombre: apiUrl.data.name.charAt(0).toUpperCase()+apiUrl.data.name.slice(1),
                        vida: apiUrl.data.stats[0].base_stat,
                        fuerza: apiUrl.data.stats[1].base_stat,
                        defensa: apiUrl.data.stats[2].base_stat,
                        velocidad: apiUrl.data.stats[5].base_stat,
                        altura: apiUrl.data.height,
                        peso: apiUrl.data.weight,
                }
                res.status(200).send(idApi)
        }catch (err){
            res.status(404).send('No se encontro tu pokemon por id en la Api')
        }

    }else{

    try{
        const idDB= await Pokemon.findByPk(id,{include: Type})
        console.log(idDB)
        const idDBData={
                id: idDB.id,
                img: idDB.img, 
                tipo: idDB.types.map((t) => t.nombre),     
                nombre: idDB.nombre.charAt(0).toUpperCase()+idDB.nombre.slice(1),
                vida: idDB.vida,
                fuerza: idDB.fuerza,
                defensa: idDB.defensa,
                velocidad: idDB.velocidad,
                altura: idDB.altura,
                peso: idDB.peso
        }
            if(idDB){
                res.status(200).send(idDBData)
            }
        
        }catch(err){
            res.status(404).send('No se encontro tu pokemon por id en la Base de datos')
        }
    }       

})



//Crea un nuevo Pokemon
router.post('/',async (req, res,next) => {

    let ={
        img, 
        nombre ,
        tipo,
        vida,
        fuerza ,
        defensa,
        velocidad,
        altura,
        peso,
    }= req.body

    if(!nombre){
        res.status(404).send('Ingrese nombre de Pokemon para poder crearlo')
    }

    if(!img){
        img ="https://i.gifer.com/6Dnm.gif"
    }     
    try{

    let pokemonCreated = await Pokemon.create({
        img, 
        nombre ,
        vida,
        fuerza ,
        defensa,
        velocidad,
        altura,
        peso,})
    
    let typeDb = await Type.findAll({
        where: {nombre: tipo}
    
    })
    //console.log(typeDb)

    pokemonCreated.addType(typeDb)
    res.send('Pokemon Creado')

}catch (err){
    // next(err)
    res.status(404).send(err)
}

})


module.exports = router;
