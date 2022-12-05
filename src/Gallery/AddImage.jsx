import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";

const AddImage = ()=>{
    const Navigate = useNavigate();
    const HandleChooseFile = async (e)=>{
        e.preventDefault()
        const { value: file } = await Swal.fire({
            title: 'عکس مورد نظرت رو آپلود کن',
            input: 'file',
            inputAttributes: {
              'accept': 'image/*',
              'aria-label': 'Upload your profile picture'
            }
          })
          
          if (file) {
            const reader = new FileReader()
            reader.onload = (e) => {
              Swal.fire({
                title: 'عملیات با موفقیت انجام شد',
                imageWidth:"200px",
                imageHeight:"200px",
                imageUrl: e.target.result,
                imageAlt:' ...عکس مورد نظر اضافه شد'
                
              })
            }
            reader.readAsDataURL(file)
          }
    }
    return(
        <div className="Box-Gallery">
                <h2>افزودن عکس</h2>
            <form action="" className="Form-100">
                <div className="input-large">
                    <label for="name" className="form-label">: عکس</label>
                    
                    <label for="username" className="form-label">: آی دی پست</label>
                    <button className="btn btn-primary" onClick={HandleChooseFile}>آپلود عکس</button>

                    <label for="" className="form-label">: شماره آلبوم</label>
                    <input type="number" className="form-control" id=""  /> 

                    <label for="" className="form-label">: عنوان</label>
                    <input type="text" className="form-control" id=""  /> 
                </div>
                <div className="Buttons">
                    <button type="submit" className="SubmitButton-AddUser">ذخیره</button>
                    <button type="reset" className="ResetButton-AddUser">ریست</button>
                    <button type="text" className="BackToHomeButton-AddUser" onClick={()=>Navigate("/Gallery")}>بازگشت</button>
                </div>
            </form>
        </div>
    )
}

export default AddImage;