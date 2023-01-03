import { useContext , useState } from "react"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faFileUpload , faEye } from '@fortawesome/free-solid-svg-icons'
import Modals from "../../../modal/modal"
import { NavLink } from "react-router-dom"
import styles from '../request.module.scss'
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

    const [imgsSrc, setImgsSrc] = useState([]);

    const onChange = (e) => {
        for (const file of e.target.files) {
          const reader = new FileReader();
          reader.readAsDataURL(file);
          reader.onload = () => {
            setImgsSrc((imgs) => [...imgs, reader.result]);
          };
          reader.onerror = () => {
            console.log(reader.error);
          };
        }
    };

    //   console.log(imgsSrc, imgsSrc.length);

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
                            imgsSrc === index ?
                            <>
                                <label style={{ cursor:'pointer' }} htmlFor={index}><FontAwesomeIcon className={styles.upload} icon={faFileUpload}/> <p style={{ marginBlock:'0' }}>بارگداری تصویر</p></label>
                                <input type="file" id={index} className="dNone" multiple onChange={onChange} />
                            </>
                            :
                            <div style={{ display:'flex',flexDirection:'row',flexWrap:'wrap',width:'100%' }}>
                                {imgsSrc.map((link) => (
                                    <img src={link} width={50} />
                                ))}
                            </div>
                        }

   
                        </div>
                        <div className="modalFooter">
                            <button style={{ fontSize:'13px' , borderRadius:'5px' }} onClick={()=> setModal(false)} className='btn btn-secondary m-2'>خروج</button>
                        </div>
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