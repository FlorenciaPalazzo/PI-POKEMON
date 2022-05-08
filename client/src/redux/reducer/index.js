import { 
  GET_ALL_POKEMONS,
  GET_POKEMONS_NAME,
  GET_POKEMONS_ID,
  GET_POKEMONS_TYPE,

  FILTER_BY_TYPE,
  FILTER_CREATED,
  FILTER_ORDER,
  FILTER_ORDER_FUERZA,

  POST_POKEMON,

  CLEAR_PAGE,} from "../actions/action_types";
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
        pokemons_copy:payload,  
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
      
    
      ///FILTER TYPE///
      case FILTER_BY_TYPE : 
     
      const allPokemonsType = state.pokemons_copy
     const allPokemonsType2= allPokemonsType.filter((t) =>{
          if(t.tipo?.includes(payload)){
            return t
          }
        })  

      if(allPokemonsType2.length === 0){
        alert('No hay pokemones con ese tipo')
      }else{
        return{  
        ...state,
         pokemons: allPokemonsType2  
          }
      }
      

      ///FILTER CREATED///   
      case FILTER_CREATED :
        const allPokemons= state.pokemons_copy
    
        if(payload === "created"){
            const arr= allPokemons.filter( e => typeof e.id !== "number" )

            if(arr.length === 0){
              alert('No hay pokemons creados')
              
            }else{
              return {
                ...state,
                pokemons: arr
              }
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



        ///FILTER ORDER NAME A-Z///
        case  FILTER_ORDER:
          if(payload === "all"){
            return{
              ...state,
              pokemons: [...state.pokemons_copy]
            }
          }
          if(payload === "asc"){
            return{
              ...state,
              pokemons: [...state.pokemons_copy].sort((a,b)=>{
                if(a.nombre > b.nombre) return 1
                if(a.nombre < b.nombre) return -1
                return 0
              })
            }
          }
          if(payload === "desc"){
            return{
              ...state,
              pokemons: [...state.pokemons_copy].sort((a,b)=>{
                if(a.nombre > b.nombre) return -1
                if(a.nombre < b.nombre) return 1
                return 0
              })
            }
          }


        ///FILTER ORDER FUERZA///
        case  FILTER_ORDER_FUERZA:

          if(payload === "all"){
            return{
              ...state,
              pokemons: [...state.pokemons_copy]
            }
          }
          
          if(payload === "menor"){
            return{
              ...state,
              pokemons: [...state.pokemons_copy].sort((a,b)=>{
                if(a.fuerza > b.fuerza) return 1
                if(a.fuerza < b.fuerza) return -1
                return 0
              })
            }
          }     
          
          if(payload === "mayor"){
            return{
              ...state,
              pokemons: [...state.pokemons_copy].sort((a,b)=>{
                if(a.fuerza > b.fuerza) return -1
                if(a.fuerza < b.fuerza) return 1
                return 0
              })
            }
          }

          //POST POKEMONS
          case POST_POKEMON: return{
            ...state,
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

