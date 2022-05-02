import React from "react";
import {useState, useEffect} from 'react'
import {useDispatch, useSelector} from 'react-redux'
//import { Link } from "react-router-dom";
import Card from "../Card/Card";
import { getAllPokemons } from "../../redux/actions/index";
import NavBar from "../NavBar/NavBar";
import Pagination from "../Pagination/Pagination";



export default function Home() {
 
  const dispatch = useDispatch()
  const allPokemons = useSelector((state) => state.pokemons)
  
 
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
  },[dispatch])


    return (
      
    <div>
     
      <NavBar />
     
      <Pagination
      pokemonsForPage={pokemonsForPage}
      allPokemons={allPokemons.length}
      pagination={pagination}
      />    
        { currentPokemons?
       currentPokemons.map(p => <Card 
        nombre={p.nombre} img={p.img} tipo={p.tipo} id={p.id} key={p.id}
       />  
        ):(<h1>Cargando....</h1>)         
      
      }
    </div>
       
    ) 
}




