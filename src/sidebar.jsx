import React from "react";
import { useContext, useRef } from "react";
import { Maincontext } from "./context";
import {NavLink} from "react-router-dom"

const Sidebar = ()=>{
    const {showsidebar , setshowsidebar} = useContext(Maincontext);
    const BoxRight = useRef()
    return(
        <>
         <div className={`box-right ${showsidebar ? "block" : "remove" }`} ref={BoxRight}>
            <img src="../img/img.jpg" alt=""/>
            <ul>
                <li onClick={()=>{setshowsidebar(false)}}><NavLink className={({Isactive})=> {return Isactive ? "nav-active" : ""}} to="/Users">کاربران</NavLink></li>
                <li onClick={()=>{setshowsidebar(false)}}><NavLink className={({Isactive})=> {return Isactive ? "nav-active" : ""}} to="/Posts" >پست ها</NavLink></li>
                <li onClick={()=>{setshowsidebar(false)}}><NavLink className={({Isactive})=> {return Isactive ? "nav-active" : ""}} to="/Gallery" >گالری</NavLink></li>
                <li onClick={()=>{setshowsidebar(false)}}><NavLink className={({Isactive})=> {return Isactive ? "nav-active" : ""}} to="/Works">کار ها</NavLink></li>
            </ul>
        </div>
        </>
    )
}

export default Sidebar;