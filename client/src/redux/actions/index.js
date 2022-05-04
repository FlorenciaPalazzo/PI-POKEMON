import { 
  GET_ALL_POKEMONS,
  GET_POKEMONS_NAME,
  GET_POKEMONS_ID,
  GET_POKEMONS_TYPE,
  FILTER_BY_TYPE, 
  CLEAR_PAGE,
  FILTER_CREATED,
  FILTER_ORDER,
  FILTER_ORDER_FUERZA,
  POST_POKEMON } from "./action_types";
import  axios from 'axios';


export function getAllPokemons(){
        
        return async function(dispatch){ 
            const response =  await axios.get(`http://localhost:3001/pokemons`) 
            const payload = await response.data
            dispatch({type: GET_ALL_POKEMONS , payload })
            }      
}


export function getPokemonsId(id){
        
    return async function(dispatch){ 
        const response =  await axios.get(`http://localhost:3001/pokemons/${id}`) 
        const payload = await response.data
        dispatch({type: GET_POKEMONS_ID , payload })
        } 
}

export function getPokemonsName(nombre){
        
    return async function(dispatch){ 
        const response =  await axios.get(`http://localhost:3001/pokemons?nombre=${nombre}`) 
        const payload = await response.data
        dispatch({type: GET_POKEMONS_NAME , payload })
        } 
}



export function getPokemonsType(){
        
  return async function(dispatch){ 
      const response =  await axios.get(`http://localhost:3001/types`) 
      const payload = await response.data
      dispatch({type: GET_POKEMONS_TYPE , payload })
      } 
}


export function postPokemon (payload){
  return async function(dispatch){
    const response= await axios.post("http://localhost:3001/pokemons",payload)
    return response 
  }
}


export function filterPokemonsbyType(payload){
  return{
    type: FILTER_BY_TYPE,
    payload
  }
}



export function filterCreated(payload){
  return{
    type: FILTER_CREATED,
    payload
  }
}


export function filterOrder(payload){
  return{
    type: FILTER_ORDER,
    payload
  }
}


export function filterOrderFuerza(payload){
  return{
    type: FILTER_ORDER_FUERZA,
    payload
  }
}



export function clearPage(){
    return {
      type: CLEAR_PAGE
    }
  }










 