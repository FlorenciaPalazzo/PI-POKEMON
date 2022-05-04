import React from "react";
import { Link } from "react-router-dom";
import { useSelector,useDispatch } from "react-redux";
import { useEffect,useState } from "react";
import { getPokemonsType, postPokemon } from "../../redux/actions";



export default function Create(){
 const dispatch = useDispatch()
 const types = useSelector((state)=>state.pokemon_types)
 const [input, setInput]= useState({ 
    nombre:"" ,
    img:"" ,
    vida: "",
    fuerza: "" ,
    defensa: "",
    velocidad: "",
    altura: "",
    peso:"",
    tipo:[],
 })
 
 const[error, setError]=useState('')
// function validateNombre(){
//  if(!/^[A-Z][a-z]{3,20}$/.test(value)){
//      setError('El nombre debe comenzar con mayuscula y terminar con minuscula. Tener entre 3 y 20 caracteres')
//  }else{
//      setError('')
//  }
 
// }

 useEffect(()=>{
     dispatch(getPokemonsType())
 },[]) 


 function handleChange(e){
    setInput({
        ...input,
        [e.target.name] : e.target.value
    })
    console.log(input)
 }

 function handleSelect(e){
     setInput({
         ...input,
         tipo:[...input.tipo, e.target.value]
     })
     console.log(input)
 }
 function handleSubmit(e){
     e.preventDefault()
     console.log(input)
     dispatch(postPokemon(input))
     alert("Pokemon creado")
     setInput({
        nombre:"" ,
        img:"" ,
        vida: "",
        fuerza: "" ,
        defensa: "",
        velocidad: "",
        altura: "",
        peso:"",
        tipo:[],
     })
     //ver despues: history.push('/home), para que despues vuelvan a home "recordar importarlo"
 }

//  if(/^[A-z^[^0-9]_-]{3,16}$/.test(value)){
//     setError('el nombre debe tener la primera letra en mayuscula y no contener numeros')
//  }else{
//      setNombre(value)
//  }


    return(
        <div>
            <div><Link to='/home'><button>VOLVER POKEHOME</button></Link></div>
            <div>
            <h1>Crea tu Pokeamigo</h1>
            <form onSubmit={(e)=>handleSubmit(e)}>
                <div>
                    <label>Nombre: </label>
                    <input 
                    type="text" 
                    name="nombre" 
                    value={input.nombre} 
                    placeholder="Nombre.." 
                    onChange={(e)=>handleChange(e)}
                    />
                </div>

                <div>
                    <label>Imagen: </label>
                    <input 
                    type="text" 
                    name="img" 
                    value={input.img} 
                    placeholder="Imagen.." 
                    onChange={(e)=>handleChange(e)}
                    />
                </div>

                <div>
                    <label>Vida: </label>
                    <input 
                    type="text" 
                    name="vida"
                    value={input.vida}
                    placeholder="0"
                    onChange={(e)=>handleChange(e)}
                />
                </div>

                <div>
                    <label>Fuerza: </label>
                    <input 
                    type="text" 
                    name="fuerza"
                    value={input.fuerza}
                    placeholder="0"
                    onChange={(e)=>handleChange(e)}
                    />
                </div>

                <div>   
                    <label>Defensa: </label>
                    <input 
                    type="text" 
                    name="defensa"
                    value={input.defensa}
                    placeholder="0"
                    onChange={(e)=>handleChange(e)}
                    />
                </div>

                <div>
                    <label>Velocidad: </label>
                    <input 
                    type="text" 
                    name="velocidad"
                    value={input.velocidad}
                    placeholder="0"
                    onChange={(e)=>handleChange(e)}
                    />
                </div>

                <div>
                    <label>Altura: </label>
                    <input 
                    type="text" 
                    name="altura"
                    value={input.altura}
                    placeholder="0"
                    onChange={(e)=>handleChange(e)}
                    />
                </div>

                <div>
                    <label>Peso: </label>
                    <input 
                    type="text" 
                    name="peso"
                    value={input.peso} 
                    placeholder="0"
                    onChange={(e)=>handleChange(e)}
                    />
                </div>
       
                <div>
                    <select onChange={(e)=>handleSelect(e)}>   
                                                <option value="">Tipo:</option> 
                        {
                        types?.map((p, i )=>(<option key={i} value={p}>{p}</option>))
                        }
                    </select>
                   <ul><li>{input.tipo.map((e)=> e + " -")}</li></ul> 
                </div>

                <button type="submit">Crear</button>

            </form>
            </div>

        </div>
    )
}