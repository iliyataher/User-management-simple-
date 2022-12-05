import Swal from "sweetalert2"
// const Hoc = (Maincomponent , props)=>{
//     const NewComponent = ()=>{
//         const sweetalert = (message , icon)=>{
//             Swal.fire(
//                 `${message}`,
//                 'کاربر از لیست حذف شد',
//                 `${icon}`
//               )
//         }
//         return(
//             // <Maincomponent {...props} Sweetalert={sweetalert}/>
//             )
//     }
//     return NewComponent
// }

// export default Hoc;

// End Hoc (Higher Order Component)

const MyCom = (props)=>{
    const Mysweetalert = (message , icon)=>{
        Swal.fire(
            `${message}`,
            'کاربر از لیست حذف شد',
            `${icon}`
            )
    }
    return(
        <>
            {props.render(Mysweetalert)}
        </>
    )
}

export default MyCom;

