
import React from "react";
import {useState, useEffect} from 'react'
import {useDispatch, useSelector} from 'react-redux'
import { Link } from "react-router-dom";
import Card from "../Card/Card";
import {getAllPokemons,getPokemonsType} from '../../redux/actions';

import Pagination from "../Pagination/Pagination";
import Search from '../Search/Search'

import NavBar from "../Navbar/NavBar";

import './Home.css'


export default function Home() {
 
  const dispatch = useDispatch()

  const allPokemons = useSelector((state) => state.pokemons)
  const types= useSelector((state)=> state.pokemon_types)
  
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


  function handleClick(e){
    e.preventDefault(); 
    dispatch(getAllPokemons())
  }

    return (
      
  <div className="home_background">

      
    <div className='navbar_bg'>
     
      <div className="navbar_inicio_box">
          <Link to='/home' ><button className='navbar_btn_inicio' onClick={(e)=> handleClick(e)} ></button></Link>
      </div>
      
      <div className="navbar_btn_crear_box">
        <Link to='/home/create'><button className="navbar_btn_crear" >Crea un Pokemon</button></Link>
      </div>

      
      <div>
        <NavBar setCurrentPage={setCurrentPage}/>
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




