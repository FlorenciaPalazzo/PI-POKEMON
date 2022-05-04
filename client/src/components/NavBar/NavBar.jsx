import React from 'react'

import { useDispatch, useSelector } from 'react-redux';
import {useEffect} from 'react'
import {Link} from 'react-router-dom'

import { filterPokemonsbyType, getAllPokemons,getPokemonsType, filterCreated, filterOrder, filterOrderFuerza} from '../../redux/actions';
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
  e.preventDefault();
  
    dispatch(filterPokemonsbyType(e.target.value))
  }

function handleFilterCreated(e){
  e.preventDefault();
  
    dispatch(filterCreated(e.target.value))
  }


  function handlefilterOrderAZ(e){
    e.preventDefault()
    
    dispatch(filterOrder(e.target.value))
  }

  function handlefilterOrderFuerza(e){
    e.preventDefault()
    
    dispatch(filterOrderFuerza(e.target.value))
    
  }

  

  return(
   
    <div className='bg'>
     
            <div className='alineado'>
                <Link to='/home' ><button onClick={(e)=> handleClick(e)}>POKEHOME</button></Link>
            </div>


            <div className='alineado'>
               <Search/>
            </div>
            
            <div className='alineado'>
              <Link to='/home/create'><button>Crea tu pokeamigo</button></Link>
             </div>
            
           
        
           
          <div className='alineado'>
              <select onChange={(e)=> handlefilterOrderAZ(e)}>
                  <option value="">Orden Alfabético:</option> 
                  <option value={'all'}>Todos</option>
                  <option value={'asc'}>Ascendente</option>
                  <option value={'desc'}>Descendente</option>
              </select>
            </div> 

            
          <div className='alineado'>
              <select onChange={(e)=> handlefilterOrderFuerza(e)}>
                  <option value="">Orden Fuerza:</option> 
                  <option value={'all'}>Todos</option>
                  <option value={'mayor'}>Mayor</option>
                  <option value={'menor'}>Menor</option>
              </select>
            </div> 
          

            <div className='alineado'>
              <select onChange={(e)=> handleTypes(e)}>
                                  <option value="">Tipo:</option> 
                 {types?.map((p, i )=>(<option key={i}value={p}>{p}</option>))}  
                  
              </select> 
            </div> 


            <div className='alineado'>
            <select onChange={(e)=> handleFilterCreated(e)}>
                <option value={"All"}>Todos</option>
                <option value={"created"}>Creado</option>
                <option value={"api"}>Existente</option>
              </select>
            </div>

    </div>
    )
  }

