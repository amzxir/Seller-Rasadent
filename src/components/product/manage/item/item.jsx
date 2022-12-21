import { useState , useRef , useEffect } from "react";
import styles from '../manage.module.scss'
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faNewspaper , faEdit , faEllipsisVertical } from '@fortawesome/free-solid-svg-icons'
import { NavLink } from "react-router-dom";
import listenForOutsideClick from '../../../listenOutsideClicks/listen-for-outside-clicks'


function Item({handelFunction , dataProduct , setDataProduct , currentItems}) {
    

    const functionDelete = (item) => {
        const remove = dataProduct.filter(i => i.id !== item.id)
        setDataProduct(remove)
    };

    // Hide and show dropdown
    const [isOpen, setIsOpen] = useState(false)

    // Hide Dropdown on Outside Click
    const menuRef = useRef(null)
    const [listening, setListening] = useState(false)
    useEffect(listenForOutsideClick(listening, setListening, menuRef, setIsOpen))

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
                        <div className='dropdown' onClick={() => setIsOpen(index) }>
                            <FontAwesomeIcon icon={faEllipsisVertical}/>
                        </div>

                        {isOpen === index ? (
                            <div className='dropdown-content'>
                                <ul className='ul'>
                                    <li className='itemLi' onClick={()=>functionDelete(i)}><a className='link'>حذف</a></li>
                                    <li className='itemLi'><NavLink className='link' to={`/edit-product/${i.id}`} onClick={()=> handelFunction(i)}>ویرایش</NavLink></li>
                                    <li className='itemLi'><a className='link'>تغییر قیمت</a></li>
                                    <li className='itemLi'><a className='link'>موجود</a></li>
                                    <li className='itemLi'><a className='link'>عدم موجودی</a></li>
                                </ul>
                            </div>
                        ) : ''}
                    {/* <NavLink to={`/edit-product/${i.id}`} onClick={()=> handelFunction(i)}><FontAwesomeIcon icon={faEdit}/></NavLink>
                    <span onClick={()=>functionDelete(i)}><FontAwesomeIcon icon={faTrash}/></span> */}
                    </div>
                </div>
                )
            })}
            </div>
        </div>
    </>
  )
}

export default Item