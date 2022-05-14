import React from "react";
import { useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import { useHistory } from "react-router-dom/cjs/react-router-dom.min";
import { deleteCard, getAllPokemons } from "../../redux/actions";
import './Card.css'

export default function Card ({nombre, img, tipo, id}){
    const dispatch  = useDispatch()
    const history = useHistory()

    function handleDelete(e){
        e.preventDefault()
        dispatch(deleteCard(id))
        dispatch(getAllPokemons())
        history.push('./home')
        
    }
    return(
        
            <div className="card">
                <div className="card_box_tit_bot">
                    <h3 className="card_titulo"><Link to ={`/home/detail/${id}`} >{nombre}</Link></h3>

                    {
                        id.length > 9 ? <button  className={'card_button'} onClick={(e)=> handleDelete(e)}>x</button> : null
                    }
                </div>
                
                <img src={img}  alt="img not found" className="card_image" ></img>
                <h3  className="card_tipo">{tipo.join("/")}</h3>
            </div>
     

    )

}