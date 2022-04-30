import React from "react";
import { Link } from "react-router-dom";

export default function Card ({nombre, img, tipo, id}){
    return(
        <div>
            <div>
                <h1><Link to ={`/home/detail/${id}`} >{nombre}</Link></h1>
                <img src={img} alt="img not found" ></img>
                <h3>{tipo}</h3>
            </div>
        </div>

    )

}