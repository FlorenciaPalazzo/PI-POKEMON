import React from 'react'
import { useState} from 'react'
import { useDispatch} from 'react-redux'
import { getPokemonsName } from '../../redux/actions'

import './search.css'



export default function Search(){

    const dispatch = useDispatch()
    
    const [nombre, SetNombre] = useState("")

 

    function handleInputChange(e){
        e.preventDefault()
        SetNombre(e.target.value)
        
    }

    function handleSubmit(e){
        e.preventDefault()    
        dispatch(getPokemonsName(nombre))
        SetNombre("")
    }
 
    return(
        <div>
            <form>
                <button  className='search_btn' onClick={(e)=> handleSubmit(e)} type='submit'>Buscar</button>
                <input  className='search_input'  onChange={(e)=>handleInputChange(e)} value ={nombre} type='text' placeholder='Nombre...'/>
            </form>
        </div>
    )
}