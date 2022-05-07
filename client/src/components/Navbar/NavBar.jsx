import React from 'react'
import { useDispatch, useSelector } from 'react-redux';
import {useEffect} from 'react'
import { filterPokemonsbyType,getPokemonsType, filterCreated, filterOrder, filterOrderFuerza} from '../../redux/actions';

import './navBar.css'


export default function NavBar({setCurrentPage}) {
 
  const types= useSelector((state)=> state.pokemon_types)
  
  const dispatch  = useDispatch()


  useEffect(()=>{
    
    dispatch(getPokemonsType())
    
  },[dispatch])

  
  // function handleClick(e){
  //   e.preventDefault(); 
  //   dispatch(getAllPokemons())
  // }
  
 function handleTypes(e){
  e.preventDefault();
  dispatch(filterPokemonsbyType(e.target.value))
  setCurrentPage(1)
  }

function handleFilterCreated(e){
  e.preventDefault();
  dispatch(filterCreated(e.target.value))
  setCurrentPage(1)
  }


  function handlefilterOrderAZ(e){
    e.preventDefault() 
    dispatch(filterOrder(e.target.value))
    setCurrentPage(1) 
  }

  function handlefilterOrderFuerza(e){
    e.preventDefault()
    dispatch(filterOrderFuerza(e.target.value))
    setCurrentPage(1) 
  }

  

  return(
   
    <div className="navbar_alineado">
     
            {/* <div >
                <Link to='/home' ><button className='navbar_btn_inicio' onClick={(e)=> handleClick(e)} ></button></Link>
            </div>
            
            <div className="navbar_btn_crear_box">
              <Link to='/home/create'><button>Crea un Pokemon</button></Link>
             </div> */}
            
          <div className="navbar_select">
              <select className="navbar_select_design" onChange={(e)=> handlefilterOrderAZ(e)}>
                  <option value="">Orden Alfabético:</option> 
                  <option value={'all'}>Todos</option>
                  <option value={'asc'}>Ascendente</option>
                  <option value={'desc'}>Descendente</option>
              </select>
            </div> 

            
          <div className="navbar_select">
              <select className="navbar_select_design" onChange={(e)=> handlefilterOrderFuerza(e)}>
                  <option value="">Orden Fuerza:</option> 
                  <option value={'all'}>Todos</option>
                  <option value={'mayor'}>Mayor</option>
                  <option value={'menor'}>Menor</option>
              </select>
            </div> 
          

            <div className="navbar_select">
              <select className="navbar_select_design" onChange={(e)=> handleTypes(e)}>
                                  <option value="">Tipo:</option> 
                 {types?.map((p, i )=>(<option key={i}value={p}>{p}</option>))}  
                  
              </select> 
            </div> 


            <div className="navbar_select">
            <select className="navbar_select_design" onChange={(e)=> handleFilterCreated(e)}>
                <option value={"All"}>Todos</option>
                <option value={"created"}>Creado</option>
                <option value={"api"}>Existente</option>
              </select>
            </div>

            {/* <div className='search_box'>
               <Search/>
            </div> */}
    </div>
    )
  }

