import React from "react";
import { Link } from "react-router-dom";
import './LandingPage.css'


export default function LandingPage(){
    return(
        <section className="background">

            <div className="landing_titulo">
                <h1 className="landing_h1">Bienvenidos a mi P.I.</h1>
                <h3 className="landing_h3">Florencia</h3>
            </div>

            <div className="landing_button">
                <Link to ='/home'><button className="myButton">START</button></Link> 
            </div>
        </section>
       )
}