import React from 'react'

import { useDispatch, useSelector } from 'react-redux';
import {useEffect} from 'react'
import {Link} from 'react-router-dom'

import { filterPokemonsbyType, getAllPokemons,getPokemonsType, filterCreated} from '../../redux/actions';
import Search from '../Search/Search'

import './navBar.css'




export default function NavBar() {

  const types= useSelector((state)=> state.pokemon_types)

  const dispatch  = useDispatch()

  
  useEffect(()=>{
    
    dispatch(getPokemonsType())
  },[dispatch])
  

  
  function handleClick(e){
    e.preventDefault();
    dispatch(getAllPokemons())
  }
  

 function handleTypes(e){
    dispatch(filterPokemonsbyType(e.target.value))
  }

function handleFilterCreated(e){
    dispatch(filterCreated(e.target.value))
  }




  return(
   
    <div className='bg'>
        <ul>
            <li>
            <Link to='/home' ><button onClick={(e)=> handleClick(e)}>POKEHOME</button></Link>
            </li>

            <select>
                <option value={'asc'}>Asc</option>
                <option value={'desc'}>Desc</option>
              </select>

            <li>
               <Search/>
            </li>
            <li>
              <button>Crea tu pokeamigo</button>
            </li>
            
        </ul>

            <div>
               <select onChange={(e)=> handleTypes(e)}>
                                  <option value="">Tipo:</option> 
                 {types?.map((p, i )=>(<option key={i}value={p}>{p}</option>))}  
                  
              </select> 
            </div>


            <div>
            <select onChange={(e)=> handleFilterCreated(e)}>
                <option value={"All"}>Todos</option>
                <option value={"created"}>Creado</option>
                <option value={"api"}>Existente</option>
              </select>
            </div>

    </div>
    )
  }

