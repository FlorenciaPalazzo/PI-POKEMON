import React from "react";


export default function Pagination({pokemonsForPage,allPokemons, pagination}) {

const pageNumbers=[];
const pages= allPokemons/pokemonsForPage

 for(let i = 0; i <= Math.ceil(pages); i++){
     pageNumbers.push(i+1)
 }
 return(
     <nav>
         <ul>
             {
                 pageNumbers&&pageNumbers.map(n=>(
                     <li key={n}>
                     <a onClick={()=>pagination(n)}>{n}</a>
                     </li>
                 ))
             }
         </ul>

     </nav>
 )

}