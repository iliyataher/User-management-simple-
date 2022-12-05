
import React from "react";
import { useEffect } from "react";
import { useState } from "react";
import {useParams , useNavigate} from "react-router"
import Swal from "sweetalert2";
import {JpAxios} from "../servises/jpAxios"
// import {Link} from "react-router-dom";
const AddUser = ()=>{
    const {userId} = useParams()
    const navigate = useNavigate()
    const [data , setdata] = useState({
        name:"",
        username:"",
        email:"",
        address:{
            city:"",
            street:"",
            suite:"",
            zipcode:""
        }
    })

    const HandleAddUser = async ()=>{
        const res = await JpAxios.post("/users" , data);
        if(res){
            Swal.fire(
                `با موفقیت ایجاد شد ${res.data.name} کاربر`
            )
        }
    }

    const HandleEditUser = async ()=>{
        const res = await JpAxios.put(`/users/${userId}` , data);
        if(res){
            Swal.fire(
                `با موفقیت ویرایش شد ${res.data.name}`,
                '',
                'success'
              )
        }
    }
    
    const HandleSubmitForm = (e)=>{
        e.preventDefault();
        if(!userId){
            HandleAddUser();
        }else{
            HandleEditUser();
        }
    }

    const updateIEditUser = async ()=>{
        const res = await JpAxios.get(`/users/${userId}`)
        if(res){
            if(res.status === 200){
                setdata({
                    name:res.data.name,
                    username:res.data.username,
                    email:res.data.email,
                    address:{
                        city:res.data.address.city,
                        street:res.data.address.street,
                        
                        suite:res.data.address.suite,
                        zipcode:res.data.address.zipcode,
                    }    
                })
            }else{
                Swal.fire(
                    "مشکلی در پردازش اطلاعات به وجود آمد",
                    "",
                    "error"
                )
            }
        }
    }

    useEffect(()=>{
        if(userId){
            updateIEditUser()
        }
    } , [])
    return(
        <div className="Box-AddUser">
            <h2>{userId ? "ویرایش کاربر" : "افزودن کاربر"}</h2>
            <form action="" onSubmit={HandleSubmitForm} className="Form">
                <div className="input-large">
                    <label for="name" class="form-label">: نام و نام خانوادگی</label>
                    <input type="text" class="form-control" value={data.name} onChange={e=>setdata({...data , name:e.target.value})} id="name"/>
                    
                    <label for="username" class="form-label">: نام کاربری</label>
                    <input type="text" class="form-control" value={data.username} onChange={e=>setdata({...data , username:e.target.value})} id="username"/>

                    <label for="Email" class="form-label">: ایمیل</label>
                    <input type="email" class="form-control" value={data.email} onChange={e=>setdata({...data , email:e.target.value})} id="Email"/> 
                    <label class="form-control">: آدرس</label>
                </div>

                <div className="Address">
                    <input type="text" value={data.address.city} onChange={e=>setdata({...data , address:{...data.address , city:e.target.value}})} placeholder="شهر"/>
                    <input type="text" value={data.address.street} onChange={e=>setdata({...data , address:{...data.address , street:e.target.value}})} placeholder="خیابان"/>
                    <input type="text" value={data.address.zipcode} onChange={e=>setdata({...data , address:{...data.address , zipcode:e.target.value}})} placeholder="کد پستی"/>
                    <input type="text" value={data.address.suite} onChange={e=>setdata({...data , address:{...data.address , suite:e.target.value}})} placeholder="ادامه آدرس"/>
                </div>
                <div className="Buttons">
                    <button type="submit" className="SubmitButton-AddUser">{userId ?"ویرایش" : "ذخیره"}</button>
                    <button type="reset" className="ResetButton-AddUser">ریست</button>
                    <button type="text" className="BackToHomeButton-AddUser" onClick={()=>navigate("/Users")}>بازگشت</button>
                </div>
            </form>
        </div>
    )
}

export default AddUser;