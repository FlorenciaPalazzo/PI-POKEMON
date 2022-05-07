import React from "react";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { clearPage, getPokemonsId } from "../../redux/actions";
import { Link } from "react-router-dom";
import './detail.css'


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
        <div className="detail_background">

          <div><Link to='/home'><button className="detail_btn_volver">VOLVER POKEHOME</button></Link></div>

           { detailPokemon.nombre?
           <div className="detail_card">

               <div>
                <h1 className="detail_card_nombre">{detailPokemon.nombre}</h1>
              </div>

              <div>
                <img src={detailPokemon.img} alt="img not found"  className="detail_card_image"></img>
              </div>

             <div className="detail_card_box">
                <h3 className="detail_card_detalle" >Vida: {detailPokemon.vida}</h3>
                <h3 className="detail_card_detalle">Fuerza: {detailPokemon.fuerza}</h3>
                <h3 className="detail_card_detalle">Defensa: {detailPokemon.defensa}</h3>
                <h3 className="detail_card_detalle">Velocidad: {detailPokemon.velocidad}</h3>
                <h3 className="detail_card_detalle">Altura: {detailPokemon.altura}</h3>
                <h3 className="detail_card_detalle">Peso: {detailPokemon.peso}</h3>
                <h3 className="detail_card_detalle">Tipo: {detailPokemon.tipo.join("-")}</h3>
              </div>
            </div>
            :
            <div className="home_cargadp_box">
              <img src='https://i.gifer.com/DD0.gif' width= '150px' alt='cargandoo..' />
            </div> 
            }     
        </div>

    )

}