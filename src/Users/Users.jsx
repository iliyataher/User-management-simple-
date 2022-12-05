import React from "react";
import axios from "axios"
import { useEffect } from "react";
import {useNavigate} from "react-router";
import Swal from "sweetalert2";
import { useState } from "react";
import { useContext } from "react";
import { Maincontext } from "../context";
import UseTitle from "../servises/useTitle";

const Users = (props)=>{
    const {users , setusers} = useContext(Maincontext)
    const [mainusers , setmainusers] = useState([])
    const {Mysweetalert} = props
    useEffect(()=>{
      axios.get('https://jsonplaceholder.typicode.com/users').then(res=>{
        setusers(res.data)
        setmainusers(res.data)
      }).catch(err=>{
        alert(err)
      })
    } , [])

    const deleteItemFromList = (indexUser)=>{
        const swalWithBootstrapButtons = Swal.mixin({
            customClass: {
              confirmButton: 'btn btn-success success',
              cancelButton: 'btn btn-danger danger'
            },
            buttonsStyling: false
          })
          
          swalWithBootstrapButtons.fire({
            title: `آیا از حذف آیتم ${indexUser} مطمن هستید؟`,
            text: "حذف کاربر از لیست",
            icon: 'warning',
            showCancelButton: true,
            
            confirmButtonText: 'بله',
            cancelButtonText: 'خیر',
            reverseButtons: true
          }).then((result) => {
            if (result.isConfirmed) {
              axios.delete(`https://jsonplaceholder.typicode.com/users/${indexUser}`).then(res=>{
              
                if(res.status === 200){
                  // console.log(res.status);
                  const newuser = users.filter(u=>u.id !== indexUser);
                  setusers(newuser);
                  Mysweetalert("عملیات موفقیت آمیز بود" , "success")
                }else{
                  swalWithBootstrapButtons.fire(
                    '!!عملیات موفقیت آمیز نبود',
                    'کاربر از لیست حذف نشد',
                    'error'
                  )
                }

              })
            } 
          })
    }

    const mynavigate = useNavigate()
    const HandleSearchInput = (e)=>{
      setusers(mainusers.filter(u=>u.name.includes(e.target.value)))
    }
    UseTitle("کاربران");
    return(
        <div className="Users"> 
            <h2>مدیریت کاربران</h2>
            <div className="Box-Add-Search">
                
                <span className="fas fa-plus Plus" onClick={()=>mynavigate("/Users/AddUser")}></span>
                <input type="text" placeholder="...نام کاربر مورد نظر خود را جستجو کنید" onChange={HandleSearchInput} />
            </div>
        {users.length ? (
          <table className="Table">
                  <tr>
                  <td>عملیات</td>
                  <td>ایمیل</td>
                  <td>نام کاربری</td>
                  <td>نام</td>
                  <td>#</td>
              </tr>
            {users.map(u=>(
              <tr key={u.id}>
                <td className="Box-Edit-Trash">
                  <span className="fas fa-trash Trash" onClick={()=>{deleteItemFromList(u.id)}}></span>
                  <span className="fas fa-edit Edit" onClick={()=>{mynavigate(`/Users/AddUser/${u.id}`)}}></span>
                </td>
                <td>{u.email}</td>
                <td>{u.username}</td>
                <td>{u.name}</td>
                <td>{u.id}</td>
              </tr>
            ))}`
          </table>
        ) : (
          <h4 className="just-a-moment">...لطفا صبر کنید</h4>
        )}
        </div>
    )
}

export default Users;

