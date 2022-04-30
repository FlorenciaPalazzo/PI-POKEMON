import React from "react";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { clearPage, getPokemonsId } from "../../redux/actions";

//import { Link } from "react-router-dom";


export  default function Detail (){

    const {id} = useParams()  
  const dispatch = useDispatch()
  const detailPokemon = useSelector((state) => state.pokemon_detail)
 

  useEffect(()=>{
      dispatch(getPokemonsId(id))

    return ()=>{
      dispatch(clearPage())
    }
  },[dispatch,id])


  
    return(
        <div>
           { detailPokemon.nombre?
           <div>
                <h1>{detailPokemon.nombre}</h1>
                <img src={detailPokemon.img} alt="img not found" ></img>
                <h3>Tipo: {detailPokemon.tipo}</h3>
                <h3>Vida: {detailPokemon.vida}</h3>
                <h3>Fuerza: {detailPokemon.fuerza}</h3>
                <h3>Defensa: {detailPokemon.defensa}</h3>
                <h3>Velocidad: {detailPokemon.velocidad}</h3>
                <h3>Altura: {detailPokemon.altura}</h3>
                <h3>Peso: {detailPokemon.peso}</h3>
            </div>
            :
            (<h1>CARGANDO....</h1>) 
            }     
        </div>

    )

}