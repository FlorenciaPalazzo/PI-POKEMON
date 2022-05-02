import { GET_ALL_POKEMONS,GET_POKEMONS_NAME,GET_POKEMONS_ID,CLEAR_PAGE,FILTER_BY_TYPE,GET_POKEMONS_TYPE,FILTER_CREATED,FILTER_ORDER,FILTER_ORDER_FUERZA } from "../actions/action_types";
const initialState = {
    pokemons: [],
    pokemons_copy:[],
   
    
    pokemon_detail: [],
    pokemon_types: [],
    
    order: ""
   

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
      return{  
        ...state,
         pokemons: allPokemonsType2  
         
      }



      ///FILTER CREATED///   
      case FILTER_CREATED :
        const allPokemons= state.pokemons_copy
    
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



        ///FILTER ORDER NAME A-Z///
        case  FILTER_ORDER:

        if(payload === 'asc'){
        let sort= state.pokemons_copy.sort(function(a,b){

            if(a.nombre > b.nombre){
            return 1
             }
            if(b.nombre > a.nombre){
            return -1
              }
             return 0  
        })
         return {
           ...state,
           pokemons: sort
         }
        }else if(payload === 'desc'){
            let sortZ=state.pokemons_copy.sort(function(a,b){

            if(a.nombre > b.nombre){
              return -1
            }
            if(b.nombre > a.nombre){
              return 1
            }

            })
            return{
              ...state,
              pokemons: sortZ
            }
        }



        ///FILTER ORDER FUERZA///
        case  FILTER_ORDER_FUERZA:

        if(payload === 'menor'){
        let sort= state.pokemons_copy.sort(function(a,b){

            if(a.fuerza > b.fuerza){
            return 1
             }
            if(b.fuerza > a.fuerza){
            return -1
              }
             return 0  
        })
         return {
           ...state,
           pokemons: sort
         }
        }else if(payload === 'mayor'){
            let sortZ=state.pokemons_copy.sort(function(a,b){

            if(a.fuerza > b.fuerza){
              return -1
            }
            if(b.fuerza > a.fuerza){
              return 1
            }

            })
            return{
              ...state,
              pokemons: sortZ
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




        //  let ordenPorNombre = payload === 'asc'?

        //    state.pokemons.sort(function(a,b){
        //       if(a.nombre > b.nombre){
        //         return 1
        //       }
        //       if(b.nombre > a.nombre){
        //         return -1
        //       }
        //       return 0
        //    }):
          
        //   state.pokemons.sort(function(a,b){
        //     if(a.nombre > b.nombre){
        //       return -1
        //     }
        //     if(b.nombre > a.nombre){
        //       return 1
        //     }
        //     return 0
        //  })

        //  console.log(ordenPorNombre)
        //  return{
        //    ...state,
        //    pokemons: ordenPorNombre
        //   } 