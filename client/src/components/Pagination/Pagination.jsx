import React from "react";
import './Pagination.css'


export default function Pagination({pokemonsForPage,allPokemons, pagination}) {

const pageNumbers=[];
const pages= allPokemons/pokemonsForPage

 for(let i = 1; i <= Math.ceil(pages); i++){
     pageNumbers.push(i)
 }
 return(
     <nav>
        
             {
                 pageNumbers&&pageNumbers.map(n=>(
                     <button key={n} className="pagination" 
                     onClick={()=>pagination(n)}>{n}
                     </button>
                 ))
             }
        

     </nav>
 )
 

}