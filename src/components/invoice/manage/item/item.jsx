import { useState } from 'react';
import { NavLink } from "react-router-dom";
import styles from '../manage.module.scss'
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faFileInvoice , faTrash , faEye , faEllipsisVertical } from '@fortawesome/free-solid-svg-icons'


function Item({handelFunction , dataInvoice , setDataInvoice , currentItems}) {
    

   const functionDelete = (item) => {
       const remove = dataInvoice.filter(i => i.id !== item.id)
       setDataInvoice(remove)
   };

   const [dropdowns , setDropdowns] = useState(false)

  return (
    <>
    <div className={styles.row}>
        {currentItems && currentItems.map((i , index)=> {
            return(
                <div key={index} className={styles.col6}>
                    <div className={styles.card}>
                        <div className={styles.content}>
                            <span><FontAwesomeIcon icon={faFileInvoice}/></span>
                            <p>{i.nameFa}</p>
                        </div>
                        <div className={styles.manage}>
                            <div className='dropdown' onClick={()=> dropdowns === false ? setDropdowns(index): setDropdowns(false)}>
                                <FontAwesomeIcon icon={faEllipsisVertical}/>
                            </div>
                            <div className={dropdowns === index ?'dropdown-content dBlock':'dropdown-content dNone'}>
                                <ul className='ul'>
                                    <li className='itemLi' onClick={()=> functionDelete(i)}><a className='link'>حذف</a></li>
                                    <li className='itemLi'><NavLink className='link' to={`/view-invoice/${i.id}`} onClick={()=> handelFunction(i)}>مشاهده</NavLink></li>
                                    <li className='itemLi'><NavLink className='link' to='/request-invoice'>درخواست فاکتور رسمی</NavLink></li>
                                </ul>
                            </div>
                        </div>
                    </div>
                </div>
            )
        })}
    </div>
    </>
  )
}

export default Item