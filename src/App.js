import React, { useState } from "react";
import Content from "./content";
import { Maincontext } from "./context";
import Sidebar from "./sidebar";
import { BrowserRouter } from "react-router-dom"
const App = ()=>{
        const [showsidebar , setshowsidebar] = useState(false)
        const [users , setusers] = useState([]);
        return(
            <BrowserRouter>
                <div className="container">
                    <Maincontext.Provider value={{showsidebar , setshowsidebar , users  ,setusers}}>
                        <Content/>
                        <Sidebar/>
                    </Maincontext.Provider>
                </div>
            </BrowserRouter>
        )

}

export default App;