import React from "react";
import { Link } from "react-router-dom";
import './LandingPage.css'


export default function LandingPage(){
    return(
        <section className="background">
            <div >
              
                <Link to ='/home'><button className="myButton">START</button></Link>
                
            </div>
        </section>
       )
}