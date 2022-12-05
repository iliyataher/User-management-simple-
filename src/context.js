import { createContext } from "react";

export const Maincontext = createContext({
    showsidebar : false,
    setshowsidebar : ()=>{},
    users : [],
    setusers : ()=>{}
})

