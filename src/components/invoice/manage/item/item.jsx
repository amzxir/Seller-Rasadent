import { useState , useRef , useEffect , useContext } from 'react';
import { NavLink } from "react-router-dom";
import styles from '../manage.module.scss'
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faFileInvoice , faEllipsisVertical } from '@fortawesome/free-solid-svg-icons'
import { toast } from 'react-toastify';
import axios from 'axios';
import Context from '../../../../context/context';
import Loading from '../../../loading/loading';



function Item({handelFunction , dataInvoice , currentItems , searchTerm}) {

    const {t , i18n , token , spinner , setSpinner} = useContext(Context)

   const functionDelete = (item) => {
       const remove = dataInvoice.filter(i => i.id !== item.id)
    //    setDataInvoice(remove)
   };

   const functionSuccess = async(i) => {
        setSpinner(true)
        const id = i.id
        // pass token in header api
        const config = {
            headers: { Authorization: `Bearer ${token}` }
        }
        const bodyParameters = {
            key: "value",
            invoice_item_id:id
        }

        try {
            setSpinner(false)
            const response = await axios.post('https://test.rasadent.com/api/AcceptInvoice' , bodyParameters , config)
            console.log(response)
        } catch (error) {
            setSpinner(false)
            console.error(error)
        }
        toast.success('فاکتور با موفقیت تایید شد')
   }

   const functionDisapproval = async(i) => {
        setSpinner(true)
        const id = i.id
        // pass token in header api
        const config = {
            headers: { Authorization: `Bearer ${token}` }
        }
        const bodyParameters = {
            key: "value",
            invoice_item_id:id
        }

        try {
            setSpinner(false)
            const response = await axios.post('https://test.rasadent.com/api/RejectInvoice' , bodyParameters , config)
            console.log(response)
        } catch (error) {
            setSpinner(false)
            console.error(error)
        }
        toast.success('فاکتور با موفقیت رد شد')
   }

   const functionPreparation = async(i) => {
        setSpinner(true)
        const id = i.id
        // pass token in header api
        const config = {
            headers: { Authorization: `Bearer ${token}` }
        }
        const bodyParameters = {
            key: "value",
            invoice_item_id:id
        }

        try {
            setSpinner(false)
            const response = await axios.post('https://test.rasadent.com/api/InvoiceReady' , bodyParameters , config)
            console.log(response)
        } catch (error) {
            setSpinner(false)
            console.error(error)
        }
        toast.success('پیام اعلام آمادگی ارسال شد')
   }

    if(searchTerm.length > 0){
        currentItems = dataInvoice.filter((i)=> {
            return i.number.match(searchTerm)
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

    if(spinner){
        return <Loading/>
    }
  
  return (
    <>
    <div className={styles.row}>
        {currentItems && currentItems.map((i , index)=> {
            return(
                <div key={index} className={styles.col6}>
                    <div className={styles.card}>
                        <div className={styles.content}>
                            <span><FontAwesomeIcon icon={faFileInvoice}/></span>
                            <p>{i.number}</p>
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
                                        <li className='itemLi' onClick={()=> functionPreparation(i)}><a className='link'>اعلام آمادگی</a></li>
                                        <li className='itemLi' onClick={()=> functionSuccess(i)}><a className='link'>تایید </a></li>
                                        <li className='itemLi' onClick={()=> functionDisapproval(i)}><a className='link'>رد</a></li>
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