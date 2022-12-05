import React  from "react";
import { useContext } from "react";
import { Routes , Route } from "react-router-dom";
// import { Navigate } from "react-router-dom"
import { Maincontext } from "./context";
import AddImage from "./Gallery/AddImage";
import Gallery from "./Gallery/Gallery";
import MyCom from "./hoc/maincomponent";
import AddPost from "./Posts/AddPost";
import Posts from "./Posts/Posts";
import AddUser from "./Users/AddUser";
import Users from "./Users/Users";
import AddWorks from "./Works/AddWorks";
import Works from "./Works/Works";

const Content = ()=>{
    const {showsidebar , setshowsidebar} = useContext(Maincontext);
    // const [isUser , setisUser] = useState(false);
    const HandleShowSidebar = (e)=>{
        e.stopPropagation()
        setshowsidebar(!showsidebar);
    }   
    const RednerUser = (Mysweetalert )=><Users Mysweetalert={Mysweetalert}/>
    return(
        <>
         <div className="box-left" onClick={()=>{setshowsidebar(false)}}>
         <span className={`"Tab" ${showsidebar ?"fas fa-times Tab times" : "fas fa-bars Tab bars"}`} onClick={HandleShowSidebar}></span>
                    <Routes>
                        <Route path="/Users" element={<MyCom render={RednerUser} />}/>
                        <Route path="/Users/AddUser" element={<AddUser/>}>
                            <Route path=":userId" />
                        </Route>
                        <Route path="/Posts" element = {<Posts/>}/>
                        <Route path="/Posts/AddPost" element={<AddPost/>}>    
                            <Route path=":PostId"/>
                        </Route>
                        <Route path="/Gallery" element = {<Gallery/>} />
                        <Route path="/Gallery/AddImage" element={<AddImage/>} />

                        <Route path="/Works" element = {<Works/>} />
                        <Route path="/Works/AddWork" element={<AddWorks/>}>
                            <Route path=":WorkId"/>
                        </Route>
                        <Route path="*" element = {<MyCom render={RednerUser} />} />
                    </Routes>  
                </div>
        </>
    )
}

export default Content;