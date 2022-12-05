import axios from "axios";
import { createRef } from "react";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import { JpAxios } from "../servises/jpAxios";
import UseTitle from "../servises/useTitle";
import Users from "../Users/Users";

const Posts = (props)=>{
    const [post , setpost] = useState([]);
    const [UserId , setUserId] = useState("")
    const [mainpost , setmainpost] = useState([])
    const [Cstatus , setCstatus] = useState(false);
    const [DataComment , setDataComment] = useState([]);
    const myref = createRef()
    useEffect(()=>{
        axios.get("https://jsonplaceholder.typicode.com/Posts").then(t=>{
            setpost(t.data)
            setmainpost(t.data)
        })
    } , [])
    useEffect(()=>{
        HandleSearchInput()
    } , [UserId])
    const HandleClickPost = (post)=>{
        Swal.fire(`${post.id} پست شماره` , ` : موضوع <br> (${post.title}) <br> : بدنه <br> ${post.body} <br> ` , )
    }
    const mynavigatepost = useNavigate()
    const HandleSearchInput = (e)=>{
        if(UserId > 0){
            setpost(mainpost.filter(p=>p.userId == UserId))
        }else{
            setpost(mainpost)
        }
    }
    const HandleDeletePost = (indexUser)=>{
        Swal.fire({
            title: `آیا از پاک کردن پست شماره ${indexUser} اطمینان دارید؟`,
            text: "حذف پست از لیست",
            icon: 'warning',
            showCancelButton: true,

            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'بله',
            cancelButtonText: 'خیر',
          }).then((result) => {
            if (result.isConfirmed) {
                const newpost = post.filter(p=>p.id !== indexUser)
                setpost(newpost)
              Swal.fire(
                'عملیات با موفقیت انجام شد',
                '!!پست از لیست حذف شد',
                'success'
              )
            }
          })
    }


    const HandleShowComments = async (indexUser)=>{
        setCstatus(true);
        const ResC = await JpAxios.get(`/posts/${indexUser}/comments`);
        if(ResC.status == 200){
            setDataComment(ResC.data)
        }
    }
    

    UseTitle("پست ها")
    useEffect(()=>{
        Swal.fire(
            "!!توجه",
            "برای مشاهده کامل روی پست مورد نظر کلیک کنید",
            "info"
        )
    } , [])

    return(
        <div className="Posts">
            {
                Cstatus ? (
                    
                    <div className='Comments animate__animated animate__backInDown' ref={myref}>     
                <span className="fas fa-times text-danger" style={{fontSize:"20px" , cursor:"pointer"}} onClick={()=>{
                    myref.current.className="Comments animate__animated animate__bounceOut"
                    setTimeout(() => {
                        setCstatus(false)
                    }, 1000);
                }}></span>
                {
                    DataComment.map(c=>(
                        <div className="Item-comment">
                            <div className="Comments-text" style={{padding:"10px"}}>
                            <p className="text-primary">{c.postId} : آی دی کاربر</p>
                            <p>{c.name}: موضوع</p>
                            <h6>{c.email} : ایمیل</h6>
                            <h5>: متن کامنت</h5>
                            <p className="text-success">{c.body} </p>

                            </div>
                            <div className="Comments-image">
                                <img style={{width:"100%" , margin:"10px" , borderRadius:"50%"}} src="../img/img.jpg" alt="" />
                            </div>
                        </div>
                    ))
                }
            </div>
            
            ): (
                <>
                </>
            )
            }
            <h2>مدیریت پست ها</h2>
            <div className="Box-Add-Search">
                <span className="fas fa-plus Plus" onClick={()=>mynavigatepost("/Posts/AddPost")}></span>
                <input type="text" placeholder="جستجو" value={UserId} onChange={(e)=>setUserId(e.target.value)} />
            </div>

        {post.length ? (
                      <div className="Box-Posts">
                      {post.map(p=>(
                          <div className="Item-Posts">
                                <div >
                                    <p className="text-primary" onClick={()=>setUserId(p.userId)} style={{cursor:"pointer"}}>{p.userId} : آی دی کاربر</p> 
                                    <div onClick={()=>HandleClickPost(p)} style={{cursor:"pointer"}}>
                                        <h5>{p.id} پست شماره </h5>
                                        <p> {p.title.slice(0 , 15)} : موضوع</p>
                                        <p>{p.body.slice(0 , 20)} : بدنه</p>
                                    
                                    </div>
                                </div>
                              <div>
                              <span className="fas fa-trash Trash pa-10" onClick={()=>HandleDeletePost(p.id)}></span>
                              <span className="fas fa-edit Edit" onClick={()=>{mynavigatepost(`/Posts/AddPost/${p.id}`)}}></span>
                              <span className="fas fa-comment pa-10 text-primary" style={{cursor:"pointer"}} onClick={()=>HandleShowComments(p.userId)}></span>
                              
                              </div>
                          </div>
                      ))}
                  </div>
        ) : (<h4 className="just-a-moment">...لطفا صبر کنید</h4>)}
        </div>
    )
}
export default Posts;