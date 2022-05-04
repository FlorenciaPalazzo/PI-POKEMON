import React from "react";
import { Link } from "react-router-dom";
import './Card.css'

export default function Card ({nombre, img, tipo, id}){
    return(
        
            <div className="card">
                <h3 className="card_titulo"><Link to ={`/home/detail/${id}`} >{nombre}</Link></h3>
                <img src={img} alt="img not found" className="image" ></img>
                <h3 >{tipo.join(" ")}</h3>
            </div>
     

    )

}