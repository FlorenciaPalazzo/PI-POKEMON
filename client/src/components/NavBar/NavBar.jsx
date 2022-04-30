import React from 'react'

import { useDispatch, useSelector } from 'react-redux';
import {Link} from 'react-router-dom'

import { filterPokemonsbyType, getAllPokemons} from '../../redux/actions';
import Search from '../Search/Search'

import './navBar.css'



export default function NavBar() {

  const options= useSelector((state)=> state.pokemon_types)

  const dispatch  = useDispatch()
    function handleClick(e){
    e.preventDefault();
    dispatch(getAllPokemons())
  }


  function handleFilterStatus(e){
    dispatch(filterPokemonsbyType(e.target.value))
  }

  return (
   
    <div className='bg'>
        <ul>
            <li>
            <Link to='/home' ><button onClick={(e)=> handleClick(e)}>POKEHOME</button></Link>
            </li>

            <li>
              <select onChange={e=> {handleFilterStatus(e)}}>
                <option value={''}>Tipo</option>
                {
                  options?.map((op)=>(
                    <option value={op.nombre} key={op.id}>{op.nombre}</option>
                  ))
                } 
              </select>
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
    </div>

   
    )
  }

