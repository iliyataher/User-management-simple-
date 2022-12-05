import axios from "axios";
import React , {useEffect, useState} from "react";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import UseTitle from "../servises/useTitle";
const Gallery = ()=>{
    const [photos , setphotos] = useState([]);
    const [mainPhotos , setmainPhotos] = useState([])
    const [ImageId , setImageId] = useState([]);
    const nevigateGallery = useNavigate();
    useEffect(()=>{
        axios.get("https://jsonplaceholder.typicode.com/photos").then(res=>{
            setphotos(res.data);
            setmainPhotos(res.data)
        });
    } , [])
    const HandleClickImage = (t)=>{
        Swal.fire({
            title: `(${t.id}) عکس شماره `,
            text: t.title,
            imageUrl: t.thumbnailUrl,
            imageWidth: 400,
            imageHeight: 200,
            imageAlt: 'Custom image',
          })
    } 
    const HandleSearchImage = ()=>{
        if(ImageId > 0){
            setphotos(mainPhotos.filter(i=>i.albumId == ImageId));
        }else{
            setphotos(mainPhotos)
        }
    }
    useEffect(()=>{
        HandleSearchImage()
    } , [ImageId])

    useEffect(()=>{
        Swal.fire(
            "!!توجه",
            "برای مشاهده کامل روی عکس مورد نظر کلیک کنید",
            "info"
        )
    } , [])

    UseTitle("گالری")
    return(
        <div className="Gallery">
            <h2>مدیریت گالری</h2>
            <div className="Box-Add-Search">
                <span className="fas fa-plus Plus" onClick={()=>nevigateGallery("/Gallery/AddImage")}></span>
                <input type="text" placeholder=" ...شماره آلبوم مورد نظرت رو جست و جو کن " value={ImageId} onChange={(e)=>setImageId(e.target.value)} />
            </div>
            <div className="Box-Gallerty">
                {photos.length ? (                       
                    photos.map(t=>(
                        <div className="Item-Gallery" onClick={()=>HandleClickImage(t)} >
                            <img className="photo" src={t.thumbnailUrl} alt=""/>
                            <h4>{t.id} عکس شماره</h4>
                            <h6>({t.albumId}) آلبوم شماره </h6>
                        </div>
                    ))) : (
                        <h4 className="just-a-moment">...لطفا صبر کنید</h4>
                )}
            </div>
        </div>
    )
}

export default Gallery;