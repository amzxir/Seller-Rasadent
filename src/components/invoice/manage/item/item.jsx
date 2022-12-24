import { useState , useRef , useEffect } from 'react';
import { NavLink } from "react-router-dom";
import styles from '../manage.module.scss'
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faFileInvoice , faEllipsisVertical } from '@fortawesome/free-solid-svg-icons'
import { toast } from 'react-toastify';



function Item({handelFunction , dataInvoice , setDataInvoice , currentItems , searchTerm}) {
    

   const functionDelete = (item) => {
       const remove = dataInvoice.filter(i => i.id !== item.id)
       setDataInvoice(remove)
   };

   const functionSuccess = () => {
    toast.success('فاکتور با موفقیت تایید شد')
   }

   const functionDisapproval = () => {
    toast.success('فاکتور با موفقیت رد شد')
   }

   const functionPreparation = () => {
    toast.success('پیام اعلام آمادگی ارسال شد')
   }

    if(searchTerm.length > 0){
        currentItems = dataInvoice.filter((i)=> {
            return i.nameFa.match(searchTerm)
        })
    }

    const [isMenuOpen, setIsMenuOpen] = useState(false)

    const ref = useRef()

    useEffect(() => {
        const checkIfClickedOutside = e => {
          // If the menu is open and the clicked target is not within the menu,
          // then close the menu
          if (isMenuOpen && ref.current && !ref.current.contains(e.target)) {
            setIsMenuOpen(false)
          }
        }
    
        document.addEventListener("mousedown", checkIfClickedOutside)
    
        return () => {
          // Cleanup the event listener
          document.removeEventListener("mousedown", checkIfClickedOutside)
        }
    }, [isMenuOpen])
  
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

                            <div className='dropdown' onClick={() => isMenuOpen === false ? setIsMenuOpen(i) : setIsMenuOpen(false)}>
                                <FontAwesomeIcon icon={faEllipsisVertical}/>
                            </div>

                            { isMenuOpen === i &&  (
                                <div ref={ref} className='dropdown-content'>
                                    <ul className='ul'>
                                        <li className='itemLi' onClick={()=> functionDelete(i)}><a className='link'>حذف</a></li>
                                        <li className='itemLi'><NavLink className='link' to={`/view-invoice/${i.id}`} onClick={()=> handelFunction(i)}>مشاهده</NavLink></li>
                                        <li className='itemLi' onClick={()=> functionPreparation()}><a className='link'>اعلام آمادگی</a></li>
                                        <li className='itemLi' onClick={()=> functionSuccess()}><a className='link'>تایید </a></li>
                                        <li className='itemLi' onClick={()=> functionDisapproval()}><a className='link'>رد</a></li>
                                    </ul>
                                </div>
                            ) }

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