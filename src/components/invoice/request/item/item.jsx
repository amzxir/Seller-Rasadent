import { useContext , useState } from "react"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { useForm } from "react-hook-form";
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from "yup";
import { faFileUpload , faEye , faUpload } from '@fortawesome/free-solid-svg-icons'
import Modals from "../../../modal/modal"
import { NavLink } from "react-router-dom"
import styles from '../request.module.scss'
import Context from "../../../../context/context"
import { toast } from "react-toastify";

const schema = yup.object().shape({
    uploadInvoive: yup.mixed().test("file", "فیلد تصویر محصول اجباری است", (value) => {
    if (value.length > 0) {  
        return true;
    }
    return false;
    }),

})

function Item({uploadImg , article , searchTerm , functionData , imgFilehandler , currentItems }) {

    // state modal context
    const {modal , setModal} = useContext(Context)

    // search feild
    if(searchTerm.length > 0){
        currentItems = article.filter((i)=> {
            return i.serial.match(searchTerm)
        })
    }

    const { register, handleSubmit, formState:{ errors } , reset } = useForm({
        resolver: yupResolver(schema)
    });

    const onSubmit = (data) => {
        console.log(data)
        toast.success('فاکتور یا موفقیت بارگذاری شد')
        reset()
    }

    const [modalData , setModalData] = useState(null)


  return (
    <>
        <div className={styles.card}>
            <table article={article}>
            <tbody>
                <tr>
                <th>شماره</th>
                <th>تاریخ</th>
                <th>مشاهده</th>
                <th>بارگذاری</th>
                </tr>
                {currentItems && currentItems.map((i , index)=> {
                return(
                    <tr key={index}>
                    <td style={{ fontFamily:'vazir' }}>{i.serial}</td>
                    <td style={{ fontFamily:'vazir' }}>{i.date}</td>
                    <td><NavLink to={`/view-invoice/${i.id}`} onClick={()=> functionData(i)}><FontAwesomeIcon icon={faEye}/></NavLink></td>
                    <td><div onClick={()=> {setModal(i.id); setModalData(i) }}><FontAwesomeIcon icon={faFileUpload}/></div></td>
                    </tr>
                )
                })}

            
                <Modals show={modal === modalData?.id}>
                    {console.log(modalData?.id)}
                    <div className='modal'>
                    <div className="modalTitle">شماره فاکتور {modalData?.serial}</div>
                    <div className="modalBody">

                    <form style={{ marginTop:'0' }}>
                        <div className={styles.formGroups}>
                            <label htmlFor={modalData?.serial} className={styles.nameLabel}>بارگذاری فاکتور</label>
                            <span className={styles.error}>{errors.uploadInvoive?.message}</span>
                            <input type="file" className="formControl" id={modalData?.serial} {...register("uploadInvoive")}/>
                            <FontAwesomeIcon icon={faUpload} />
                        </div>
                    </form>   
                    </div>
                    <div className="modalFooter">
                        <button style={{ fontSize:'13px' , borderRadius:'5px' }} onClick={handleSubmit(onSubmit)} className='btn custom-btn m-2'>ثبت</button>
                        <button style={{ fontSize:'13px' , borderRadius:'5px' }} onClick={()=> setModal(false)} className='btn btn-secondary m-2'>خروج</button>
                    </div>
                    </div>
                </Modals>
                
            </tbody>
            </table>
        </div>
    </>
  )
}

export default Item;