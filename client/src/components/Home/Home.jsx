
import React from "react";
import {useState, useEffect} from 'react'
import {useDispatch, useSelector} from 'react-redux'
import { Link } from "react-router-dom";
import Card from "../Card/Card";
import { filterPokemonsbyType, getAllPokemons,getPokemonsType, filterCreated, filterOrder, filterOrderFuerza} from '../../redux/actions';

import Pagination from "../Pagination/Pagination";
import Search from '../Search/Search'

import './Home.css'


export default function Home() {
 
  const dispatch = useDispatch()

  const allPokemons = useSelector((state) => state.pokemons)
  const types= useSelector((state)=> state.pokemon_types)
  
  const [order, setOrder] = useState("")

  const[currentPage, setCurrentPage]= useState(1)
  const[pokemonsForPage, setPokemonsForPage]= useState(12)
  const indexOfLastPokemon = currentPage * pokemonsForPage
  const indexOfFirstCharacter = indexOfLastPokemon - pokemonsForPage
  const currentPokemons= allPokemons.slice(indexOfFirstCharacter, indexOfLastPokemon)


  const pagination = (pageNumber)=>{
    setCurrentPage(pageNumber)
  }


  useEffect(()=>{
    dispatch(getAllPokemons())
    dispatch(getPokemonsType())
  },[dispatch])


  ///////////////////////////////////////////////////

  function handleClick(e){
    e.preventDefault(); 
    dispatch(getAllPokemons())
  }
  
 function handleTypes(e){
  e.preventDefault();
  dispatch(filterPokemonsbyType(e.target.value))
  setCurrentPage(1)
  setOrder(`Ordenado ${e.target.value}`)
  }

function handleFilterCreated(e){
  e.preventDefault();
  dispatch(filterCreated(e.target.value))
  setCurrentPage(1)
  setOrder(`Ordenado ${e.target.value}`)
  }


  function handlefilterOrderAZ(e){
    e.preventDefault() 
    dispatch(filterOrder(e.target.value))
    setCurrentPage(1)
    setOrder(`Ordenado ${e.target.value}`)
   
  }

  function handlefilterOrderFuerza(e){
    e.preventDefault()
    dispatch(filterOrderFuerza(e.target.value))
     setCurrentPage(1)
  setOrder(`Ordenado ${e.target.value}`)
    
  }
////////////////////////////////////////

    return (
      
    <div className="home_background">

      
    <div className='bg'>
     
      <div className="navbar_inicio_box">
          <Link to='/home' ><button className='navbar_btn_inicio' onClick={(e)=> handleClick(e)} ></button></Link>
      </div>
      
      <div className="navbar_btn_crear_box">
        <Link to='/home/create'><button className="navbar_btn_crear" >Crea un Pokemon</button></Link>
      </div>

    <div className="navbar_alineado">

      <div className="navbar_select">
          <select  className="navbar_select_design" onChange={(e)=> handlefilterOrderAZ(e)}>
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
      
      </div>


      <div className='search_box'>
          <Search/>
      </div>

      

    </div>


    <div>
        <Pagination
        pokemonsForPage={pokemonsForPage}
        allPokemons={allPokemons.length}
        pagination={pagination}
        />    
          { currentPokemons.length?
        currentPokemons.map(p => <Card 
          nombre={p.nombre} img={p.img} tipo={p.tipo} id={p.id} key={p.id}
        />  
          )
          :
          <div className="home_cargadp_box">
          <img src='https://i.gifer.com/DD0.gif' width= '150px' alt='cargandoo..' />
          <h2>Cargando pagina...</h2>
          </div>
          
        }   
      </div>

    </div> 
    ) 
}


// //c.img? c.img: <img src='url'/>


// <div>
//       <img src='mario.gif' width= '500px' alt='cargandoo..' />
//       <h1 className='cargando'>Cargando...</h1>
//      </div>
    


