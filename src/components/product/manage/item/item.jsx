import { useState , useRef , useEffect , useContext } from "react";
import { NavLink } from "react-router-dom";
import { useForm } from "react-hook-form";
import { yupResolver } from '@hookform/resolvers/yup';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faNewspaper , faMoneyBill , faEllipsisVertical } from '@fortawesome/free-solid-svg-icons'
import { toast } from "react-toastify";
import * as yup from "yup";
import styles from '../manage.module.scss'
import listenForOutsideClick from '../../../listenOutsideClicks/listen-for-outside-clicks'
import Context from '../../../../context/context'
import Modals from "../../../modal/modal";
import SeparatedNumberInput from 'react-separated-number-input';

// validate hook form
const schema = yup.object().shape({
    price: yup.number().typeError('فیلد قیمت باید عدد باشد').required('فیلد قیمت محصول اجباری است').integer('فیلد قیمت باید عدد صحیح باشد'),

})

function Item({handelFunction , dataProduct , setDataProduct , currentItems , searchTerm}) {

    // state context
    const {modal , setModal} = useContext(Context)

    // state react hook form
    const { register, handleSubmit, formState:{ errors } } = useForm({
        resolver: yupResolver(schema)
    });
    
    const onSubmit = (data) => {
        console.log(data)
        toast.success('قیمت کالا با موفقیت ویرایش شد')
        setModal(false)
    }
    

    // handel delete
    const functionDelete = (item) => {
        const remove = dataProduct.filter(i => i.id !== item.id)
        setDataProduct(remove)
    };

    // Available product
    const functionAvailable = () => {
        toast.success('موجودیت محصول تایید شد')
    }

    // OutOfAvailable product
    const functionOutOfAvailable = () => {
        toast.success('عدم موجودیت محصول تایید شد')
    }

    // Hide and show dropdown
    const [isOpen, setIsOpen] = useState(false)

    // Hide Dropdown on Outside Click
    const menuRef = useRef(null)
    const [listening, setListening] = useState(false)
    useEffect(listenForOutsideClick(listening, setListening, menuRef, setIsOpen))

    if(searchTerm.length > 0){
        currentItems = dataProduct.filter((i)=> {
            return i.nameFa.match(searchTerm)
        })
    }

    const [isMenuOpen, setIsMenuOpen] = useState(false)

    const ref = useRef()

    useEffect(() => {
        const checkIfClickedOutside = e => {
          // If the menu is open and the clicked target is not within the menu,
          // then close the menu
          if (modal === false ? isMenuOpen && ref.current && !ref.current.contains(e.target):'') {
            setIsMenuOpen(false)
          }
        }
    
        document.addEventListener("mousedown", checkIfClickedOutside)
    
        return () => {
          // Cleanup the event listener
          document.removeEventListener("mousedown", checkIfClickedOutside)
        }
    }, [isMenuOpen , modal])
    
  return (
    <>
        <div ref={menuRef} className={styles.row}>
            <div className={styles.col6}>
            {currentItems && currentItems.map((i , index)=> {
                return(
                <div key={index} className={styles.card}>
                    <div className={styles.content}>
                    <span><FontAwesomeIcon icon={faNewspaper}/></span>
                    <p>{i.nameFa}</p>
                    </div>
                    <div className={styles.manage}>
                        <div className='dropdown' onClick={() => isMenuOpen === false ? setIsMenuOpen(i) : setIsMenuOpen(false) }>
                            <FontAwesomeIcon icon={faEllipsisVertical}/>
                        </div>
                        {isMenuOpen === i && (
                            <>
                            <div className='dropdown-content'>
                                <ul  ref={ref} className='ul'>
                                    <li className='itemLi' onClick={()=>functionDelete(i)}><a className='link'>حذف</a></li>
                                    <li className='itemLi'><NavLink className='link' to={`/edit-product/${i.id}`} onClick={()=> handelFunction(i)}>ویرایش</NavLink></li>
                                    <li className='itemLi'><a className='link' onClick={()=> setModal(index)}>تغییر قیمت</a></li>
                                    <li className='itemLi' onClick={()=> functionAvailable()}><a className='link'>موجود</a></li>
                                    <li className='itemLi' onClick={()=> functionOutOfAvailable()}><a className='link'>عدم موجودی</a></li>
                                </ul>
                            </div>
                            <Modals show={modal === index}>
                                <div className='modal'>
                                    <div className="modalTitle" style={{ color:'#000' }}>ویرایش قیمت محصول</div>
                                    <div className="modalBody">
                                    <form className={styles.formGroup} onSubmit={handleSubmit(onSubmit)}>
                                        <div className={styles.error}>{errors.price?.message}</div>
                                        <SeparatedNumberInput type="text" groupLengths={[3, 3, 3 , 3 , 3 , 3]} className="formControl vazir ltr" {...register("price")} />
                                        <FontAwesomeIcon icon={faMoneyBill}/>
                                    </form>
                                    </div>
                                    <div className="modalFooter">
                                        <button style={{ fontSize:'13px' , borderRadius:'5px' }} onClick={()=> setModal(false)} className='btn btn-secondary m-2'>خروج</button>
                                        <button style={{ fontSize:'13px' , borderRadius:'5px' }} className="btn custom-btn m-2" onClick={handleSubmit(onSubmit)}>ویرایش</button>
                                    </div>
                                </div>
                            </Modals>
                            </>
                        )}
                    </div>
                </div>
                )
            })}
            </div>
        </div>
    </>
  )
}

export default Item;