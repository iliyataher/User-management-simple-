import { useReducer } from "react";
import { useEffect, useState } from "react";
import { Navigate, useNavigate, useParams } from "react-router-dom"
import { JpAxios } from "../servises/jpAxios";

const init = {
    Postdata : {
        name : "",
        id : "",
        title : "",
        body : ""
    },
    users : []
}

const reducer = (state , action)=>{
    switch (action.type) {
        case "isUpdate":
            return {...state , Postdata:action.payloadPost}
        case "ChangeUser":
            return {...state , users:action.payload}
        case "setInputValue":
            return {...state , dataPost:{
                ...state.Postdata , [action.propName] : action.propValue
            }}
    
        default:
            return state;
    }
}
const AddPost = ()=>{
    const {PostId} = useParams()
    const Navigate = useNavigate();
    const [dataPost , dispach] = useReducer(reducer , init)
    // const [users , setusers] = useState([]);
    const HandleEditPost = async ()=>{
        const res = await JpAxios.get(`/posts/${PostId}`)
        if(res){
            dispach({
                type:"isUpdate",
                payloadPost:res.data
            })
        }else{
            alert("Error");
        }
    }


    const AploadUsers = async ()=>{
        const resUsers = await JpAxios.get("/users");
        if(resUsers){
            // setusers(resUsers.data);
            dispach({
                type:"ChangeUser",
                payload: resUsers.data
            })
        }
    }
    AploadUsers()
    const setInputValue = (e , propName)=>{
        dispach({
            type:"setInputValue",
            propName:propName,
            propValue:e.target.value
        })
    }
    useEffect(()=>{
        HandleEditPost()
    } , [])
    return(
        <div>
                    <div className="Box-AddUser">
            <h2>{PostId ? "ویرایش کاربر" : "افزودن کاربر"}</h2>
            <form action="" className="Form">
                <div className="input-large">
                    <label for="name" className="form-label">: کاربر</label>
                    <select type="text" className="form-control Select" id="name" onChange={e=>setInputValue(e , "name")}>
                        <option value="1" aria-checked>از بین کاربران یکی را انتخاب کنید</option>
                        {dataPost.users.map(u=>(<option value={u.id} >{u.name}</option>))}
                    </select>
                    
                    <label for="username" className="form-label">: آی دی پست</label>
                    <input type="text" className="form-control" id="username" value={dataPost.Postdata.id} onChange={e=>setInputValue(e , "id")} />

                    <label for="text" className="form-label">: عنوان</label>
                    <input type="email" className="form-control" id="text" value={dataPost.Postdata.title} onChange={e=>setInputValue(e , "title")} /> 
                    
                    <label for="text" className="form-label">: متن اصلی</label>
                    <textarea type="text" className="form-control textarea" id="text" value={dataPost.Postdata.body} onChange={e=>setInputValue(e , "body")} /> 
                </div>
                <div className="Buttons">
                    <button type="submit" className="SubmitButton-AddUser">{PostId ?"ویرایش" : "ذخیره"}</button>
                    <button type="reset" className="ResetButton-AddUser">ریست</button>
                    <button type="text" className="BackToHomeButton-AddUser" onClick={()=>Navigate("/Posts")}>بازگشت</button>
                </div>
            </form>
        </div>
        </div>
    )
}

export default AddPost