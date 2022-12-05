import { useEffect, useState } from "react"
import { useNavigate, useParams } from "react-router-dom"
import { JpAxios } from "../servises/jpAxios"

const AddWorks = ()=>{
    const {WorkId} = useParams()
    const navigate = useNavigate()
    const [Data , setData] = useState({
        id : "",
        title: ""
    })

    useEffect(()=>{
        HandleEditWorks()
    } , [])

    const HandleEditWorks = async ()=>{
        const res = await JpAxios.get(`/todos/${WorkId}`)
        if(res){
            console.log(res);
            setData({
                id : res.data.id,
                title : res.data.title
            })
        }
    }
    return(
        <div className="Add-Works">
                        <h2>{WorkId ? "ویرایش کار " : "افزودن کار جدید"}</h2>
            <form action=""  className="form-100">
                <div className="input-large">
                    <h6 for="name">: کار شماره</h6>
                    <input type="number" value={Data.id}  class="form-control" id="name"/>
                    
                    <label for="name" class="form-label">: موضوع</label>
                    <input type="text" value={Data.title} class="form-control" id="name"/>
                    
                </div>
                <div className="Buttons">
                    <button type="submit" className="SubmitButton-AddUser">{WorkId ? "ویرایش" : "ذخیره"}</button>
                    <button type="reset" className="ResetButton-AddUser">ریست</button>
                    <button type="text" className="BackToHomeButton-AddUser" onClick={()=>{navigate("/Works")}}>بازگشت</button>
                </div>
            </form>
        </div>
    )
}

export default AddWorks