import React from "react";
import { Link } from "react-router-dom";
import { useSelector,useDispatch } from "react-redux";
import { useEffect,useState } from "react";
import { getPokemonsType, postPokemon } from "../../redux/actions";
import { useHistory } from "react-router-dom";
import './create.css'


////////////////////////////////////////////////////////////////////////////////
export function validate(input){
    let errors={}

    //Nombre
        if(!input.nombre){
            errors.nombre ='Nombre es requerido'
        }else if(!/[A-z]{3,20}$/.test(input.nombre)){
            errors.nombre='Nombre inválido: debe tener entre 3 y 20 caracteres. Deben ser solo letras'
        }

    //Vida
        if(!input.vida){
            errors.vida = 'Numero de vida es requerido'   
        }else if(!/^[0-9]*$/.test(input.vida)){
            errors.vida = 'Debe ser un numero positivo'    
        }else if(input.vida < 10 || input.vida >= 100){
            errors.vida='Numero inválido, debe ser: igual o mayor a 10 y menor a 100'
        }
    //Fuerza
        if(!input.fuerza){
            errors.fuerza = 'Numero de fuerza es requerido'   
        }else if(!/^[0-9]*$/.test(input.fuerza)){
            errors.fuerza = 'Debe ser un numeropositivo'
        }else if(input.fuerza < 20 || input.fuerza >= 100){
            errors.fuerza='Numero inválido, debe ser: igual o mayor a 20 y menor a 100'
        }
    //Defensa
        if(!input.defensa){
            errors.defensa = 'Numero de defensa es requerido'   
        }else if(!/^[0-9]*$/.test(input.defensa)){
            errors.defensa = 'Debe ser un numero positivo'
        }else if(input.defensa < 30 || input.defensa >= 100){
            errors.defensa='Numero inválido, debe ser: igual o mayor a 30 y menor a 100'
        }
     //Velocidad
        if(!input.velocidad){
            errors.velocidad = 'Numero de velocidad es requerido'   
        }else if(!/^[0-9]*$/.test(input.velocidad)){
            errors.velocidad = 'Debe ser un numero positivo'
        }else if(input.velocidad < 50 || input.velocidad >= 300){
            errors.velocidad='Numero inválido, debe ser: igual o mayor a 50 y menor a 300'
        }
     //Altura
         if(!input.altura){
            errors.altura = 'Numero de altura es requerido'   
        }else if(!/^[0-9]*$/.test(input.altura)){
            errors.altura = 'Debe ser un numero positivo'
        }else if(input.altura < 1 || input.altura >= 100){
            errors.altura='Numero inválido, debe ser: igual o mayor a 1 y menor a 100'
        }
     //Peso
        if(!input.peso){
            errors.peso = 'Numero de peso es requerido'   
        }else if(!/^[0-9]*$/.test(input.peso)){
            errors.peso = 'Debe ser un numero positivo'
        }else if(input.peso < 1 || input.peso >= 500){
            errors.peso='Numero inválido, debe ser:igual o mayor a 1 y menor a 500'
        }

      //Tipo
        if(input.tipo.length === 0 ){
        errors.tipo = 'Selecciona al menos 1 tipo de pokemon' 
        }else if(input.tipo.length  > 2){
            errors.tipo = 'Se puede seleccionar solo 2 tipos por pokemon'
        }
         

        
        return errors   
}

////////////////////////////////////////////////////////////////////////
export default function Create(){
 const dispatch = useDispatch()
 const history = useHistory()

 const types = useSelector((state)=>state.pokemon_types)

 const[errors, setErrors]=useState({})

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
 

 useEffect(()=>{
     dispatch(getPokemonsType())
    },[]) 
    

 function handleChange(e){
    setInput({
        ...input,
        [e.target.name] : e.target.value
    })
    console.log(input)
 
        setErrors(validate({
            ...input,
            [e.target.name] : e.target.value
        }))
}


function handleCheck(e){
  if(e.target.checked){
      setInput({
          ...input,
          tipo: [...input.tipo,e.target.name]
      })
  }else{
      setInput({
        ...input,
          tipo: input.tipo.filter((t)=> t !== e.target.name )    
      })
  }  
  
  if(e.target.checked){
        setErrors(validate({
            ...input,
            tipo: [...input.tipo,e.target.name]
        }))   
  }else{
    setErrors(validate({
        ...input,
          tipo: input.tipo.filter((t)=> t !== e.target.name )    
      }))


  }



}


function handleSubmit(e){
 e.preventDefault()  
    if(input.nombre && input.vida && input.fuerza&& input.defensa && input.velocidad && input.tipo &&input.altura && input.peso &&  
        !errors.nombre && !errors.fuerza  && !errors.defensa  && !errors.velocidad  && !errors.altura && !errors.peso  && !errors.tipo){
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
        history.push('/home')
    }else{alert("Ups, no se te creo el pokemon. Completa todos los campos")}
    
 }

    return(

        
        <div className="create_background">
            <div><Link to='/home'><button className="create_btn_enviar">VOLVER POKEHOME</button></Link></div>

            <div className="create_form">
                <h1>Crea tu Pokemon</h1>
            
            <form onSubmit={(e)=>handleSubmit(e)}>
                <div className="create_box">
                    <label>Nombre: </label>
                    <input 
                    type="text" 
                    name="nombre" 
                    value={input.nombre} 
                    placeholder="Nombre.." 
                    onChange={(e)=>handleChange(e)}
                    />
                    {/* <p>{errors.nombre}</p> */}
                </div>

                <div className="create_box">
                    <label>Imagen: </label>
                    <input 
                    type="text" 
                    name="img" 
                    value={input.img} 
                    placeholder="Imagen.." 
                    onChange={(e)=>handleChange(e)}
                    />    
                </div>

                <div className="create_box">
                    <label>Vida: </label>
                    <input 
                    type="text" 
                    name="vida"
                    value={input.vida}
                    placeholder="0"
                    onChange={(e)=>handleChange(e)}   
                />
                    {/* <p>{errors.vida}</p> */}
                </div>

                <div className="create_box">
                    <label>Fuerza: </label>
                    <input 
                    type="text" 
                    name="fuerza"
                    value={input.fuerza}
                    placeholder="0"
                    onChange={(e)=>handleChange(e)}
                    />
                    {/* <p>{errors.fuerza}</p> */}
                </div>

                <div className="create_box">   
                    <label>Defensa: </label>
                    <input 
                    type="text" 
                    name="defensa"
                    value={input.defensa}
                    placeholder="0"
                    onChange={(e)=>handleChange(e)}
                    />
                    {/* <p>{errors.defensa}</p> */}
                </div>

                <div className="create_box">
                    <label>Velocidad: </label>
                    <input 
                    type="text" 
                    name="velocidad"
                    value={input.velocidad}
                    placeholder="0"
                    onChange={(e)=>handleChange(e)}
                    />
                    {/* <p>{errors.velocidad}</p> */}
                </div>

                <div className="create_box">
                    <label>Peso: </label>
                    <input 
                    type="text" 
                    name="peso"
                    value={input.peso}
                    placeholder="0"
                    onChange={(e)=>handleChange(e)}
                    />
                    {/* <p>{errors.peso}</p> */}
                </div>

                <div className="create_box">
                    <label>Altura: </label>
                    <input 
                    type="text" 
                    name="altura"
                    value={input.altura}
                    placeholder="0"
                    onChange={(e)=>handleChange(e)}
                    />
                    {/* <p>{errors.altura}</p> */}
                </div>


                <div className="create_box">
                {types.map((p,i)=>(
                    <div key={i} className="create_check">
                        <input 
                            type="checkbox" 
                            name={p}
                            key={i}
                            value={p}
                            onChange={(e)=>handleCheck(e)}     
                            />
                            <label>{p}</label>
                    </div>
               ))}
                </div>
               {/* <p>{errors.tipo}</p> */}

                <button className="create_btn_enviar" type="submit">Crear</button>
            </form>


            </div>

            <div className="create_errors">
            <p>{errors.nombre}</p>
            <p>{errors.vida}</p>
            <p>{errors.fuerza}</p>
            <p>{errors.defensa}</p>
            <p>{errors.velocidad}</p>
            <p>{errors.peso}</p>
            <p>{errors.altura}</p>
            <p>{errors.tipo}</p>
            </div>
        </div>
        
    )
}



{/* <div>

    <select onChange={(e)=>handleSelect(e)}>   
                            <option value="">Tipo:</option> 
    {
    types?.map((p, i )=>(<option key={i} value={p}>{p}</option>))
    }
    </select>
    <p>{errors.tipo}</p>

    <div>{input.tipo.map((e)=> e + " /")}<button onClick={(e)=>handleDelete(e)}>clean</button></div> 
</div> */}