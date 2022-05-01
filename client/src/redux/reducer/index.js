import { GET_ALL_POKEMONS,GET_POKEMONS_NAME,GET_POKEMONS_ID,CLEAR_PAGE,FILTER_BY_TYPE,GET_POKEMONS_TYPE,FILTER_CREATED } from "../actions/action_types";
const initialState = {
    pokemons: [],
    pokemons_copy:[],
    pokemon_detail: [],
    pokemon_types: [],
    
   

  };
  
  export default function reducer(state = initialState, { type, payload }) {
    switch (type) {

      case GET_ALL_POKEMONS: return{
        ...state,
        pokemons: payload,
        pokemons_copy:payload
        
      }
      case GET_POKEMONS_NAME:return{
        ...state,
        pokemons : payload

      }
      
      case GET_POKEMONS_ID: return{
        ...state,
        pokemon_detail: payload
        
      }



       ///FILTER TYPE///

      
      case GET_POKEMONS_TYPE: return{ 
          ...state,
          pokemon_types: payload 
      }

       
      case FILTER_BY_TYPE : 
      const allPokemonsType = state.pokemons_copy
     const allPokemonsType2= allPokemonsType.filter((t) =>{
        if(t.tipo?.includes(payload)){
          return t
        }
      })   
      return{  
        ...state,
          pokemons: allPokemonsType2  
      }


      ///FILTER CREATED///   
      case FILTER_CREATED :
        const allPokemons= state.pokemons_copy
        //console.log(allPokemons)
       // const createdFilter = payload === "created" ? allPokemons.filter( e => e.createdInDb ): allPokemons.filter(e=> !e.createdInDb)
        
        if(payload === "created"){
          return {
            ...state,
            pokemons: allPokemons.filter( e => typeof e.id !== "number" )
          }
        }
        if(payload=== "api"){
          return{ 
            ...state,
            pokemons: allPokemons.filter(e => typeof e.id === "number")
          }
        }

        if(payload=== "All"){
          return{ 
            ...state,
            pokemons: allPokemons,
          }
        }

    ///PARA LIMPIAR LA PAGINA///
      case CLEAR_PAGE: return{
        ...state,
        pokemon_detail:[]

      }
      default:
        return state;
    }
  }



