import axios from "axios";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import { JpAxios } from "../servises/jpAxios";
import UseTitle from "../servises/useTitle";
const Works = ()=>{
    const [todos , settodos] = useState([]);
    const [maintodos , setmaintodos] = useState([])
    const mynavigateWork = useNavigate()
    const [Completed , setCompleted] = useState(false)
    useEffect(()=>{
        JpAxios.get("/todos").then(t=>{
            settodos(t.data);
            setmaintodos(t.data)
        })
    } , [])


    const HandleSearchWork = (e)=>{
        settodos(maintodos.filter(w=>w.title.includes(e)))
    }

    const HandleDeleteWorks = (indexwork)=>{

        const swalWithBootstrapButtons = Swal.mixin({
            customClass: {
              confirmButton: 'btn btn-success success',
              cancelButton: 'btn btn-danger danger'
            },
            buttonsStyling: false
          })
          
          swalWithBootstrapButtons.fire({
            title: `آیا از حذف آیتم ${indexwork} مطمن هستید؟`,
            text: "حذف کاربر از لیست",
            icon: 'warning',
            showCancelButton: true,
            
            confirmButtonText: 'بله',
            cancelButtonText: 'خیر',
            reverseButtons: true
          }).then((result) => {
            if (result.isConfirmed) {
              axios.delete(`https://jsonplaceholder.typicode.com/users/${indexwork}`).then(res=>{
              
                if(res.status === 200){
                  // console.log(res.status);
                  const newwork = todos.filter(w=>w.id !== indexwork);
                  settodos(newwork)
                  Swal.fire(
                    'عملیات موفقیت آمیز بود',
                    'کار مورد نظر از لیست حذف شد',
                    'success'
                  )
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
    const Navigate = useNavigate();
    UseTitle("کار ها")
    return(
        <div className="Works">
            <h2>مدیریت کار ها</h2>
            <div className="Box-Add-Search">
                <span className="fas fa-plus Plus" onClick={()=>mynavigateWork("/Works/AddWork")}></span>
                <input type="text" placeholder=" ...موضوع کار مورد نظر خود را جستجو کنید" onChange={(e)=>HandleSearchWork(e.target.value)}/>
            </div>
        {todos.length ? (
                todos.map(t=>(
                        <div className="Item-Works">
                        <h4>({t.id}) کار شماره</h4>
                        <h6>: موضوع </h6>
                        <h6>({t.title.slice(0 ,20)})</h6>
                        <p> اتمام کار: {t.completed ? "تمام نشده" : "تمام شده" || Completed ? "تمام شده" : "تمام نشده"}</p>
                        <div>
                            <span className="fas fa-trash text-danger" onClick={()=>HandleDeleteWorks(t.id)} style={{cursor:"pointer"}}></span>
                            <span className="fas fa-edit text-warning pa-10" onClick={()=>{Navigate(`/Works/AddWork/${t.id}`)}} style={{cursor:"pointer"}}></span>
              

                            <span className={t.completed ? "fas fa-check text-success"  : "fas fa-times text-danger"}></span>
                        </div>
                    </div>
                ))
                        
        ) : (<h4 className="just-a-moment">...لطفا صبر کنید</h4>)}

        </div>
    )
}

export default Works;