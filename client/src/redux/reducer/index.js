import { GET_ALL_POKEMONS,GET_POKEMONS_NAME,GET_POKEMONS_TYPE,GET_POKEMONS_ID,CLEAR_PAGE, FILTER_BY_TYPE } from "../actions/action_types";
const initialState = {
    pokemons: [],
    pokemon_detail: [],
    pokemon_types: [],
   

  };
  
  export default function reducer(state = initialState, { type, payload }) {
    switch (type) {

      case GET_ALL_POKEMONS: return{
        ...state,
        pokemons: payload
      }
      case GET_POKEMONS_NAME:return{
        ...state,
        pokemons : payload

      }
      
      case GET_POKEMONS_ID: return{
        ...state,
        pokemon_detail: payload
        
      }

      case GET_POKEMONS_TYPE: return{ 
          ...state,
          pokemon_types: payload 
      }


      case FILTER_BY_TYPE: 
      const allPokemons= state.pokemons
      const statusFiltered= allPokemons.filter(el => el.tipo === payload)
        return{
        ...state,
        pokemons: statusFiltered
        
      }

      case CLEAR_PAGE: return{
        ...state,
        pokemon_detail:[]

      }
      default:
        return state;
    }
  }




