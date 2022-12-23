import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faFileUpload , faEye } from '@fortawesome/free-solid-svg-icons'
import Modals from "../../../modal/modal"
import { NavLink } from "react-router-dom"
import styles from '../request.module.scss'
import { useContext } from "react"
import Context from "../../../../context/context"

function Item({uploadImg , article , searchTerm , functionData , imgFilehandler , currentItems }) {

    // state modal context
    const {modal , setModal} = useContext(Context)

    // search feild
    if(searchTerm.length > 0){
        currentItems = article.filter((i)=> {
            return i.serial.match(searchTerm)
        })
    }

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
                    <td><div onClick={()=> setModal(index)}><FontAwesomeIcon icon={faFileUpload}/></div></td>
                    <Modals show={modal === index}>
                        <div className='modal'>
                        <div className="modalTitle">شماره فاکتور {i.serial}</div>
                        <div className="modalBody">
                            {
                            Object.keys(uploadImg).length === index ?
                            <>
                                <label style={{ cursor:'pointer' }} htmlFor={i.serial}><FontAwesomeIcon className={styles.upload} icon={faFileUpload}/> <p style={{ marginBlock:'0' }}>بارگداری تصویر</p></label>
                                <input type="file" id={i.serial} className="dNone" multiple onChange={(e)=>imgFilehandler(e , index)} />
                            </>
                            :
                            <div style={{ display:'flex',flexDirection:'row',flexWrap:'wrap',width:'100%' }}>
                                {
                                uploadImg[index]?.map(item=>(
                                    <img width={50} src={item }/>
                                ))
                                }
                            </div>
                            }
                        </div>
                        <div className="modalFooter"><button style={{ fontSize:'13px' , borderRadius:'5px' }} onClick={()=> setModal(false)} className='btn btn-secondary'>خروج</button></div>
                        </div>
                    </Modals>
                    </tr>
                )
                })}
            </tbody>
            </table>
        </div>
    </>
  )
}

export default Item;