import styles from '../manage.module.scss'
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faFileInvoice , faTrash , faEye } from '@fortawesome/free-solid-svg-icons'
import { NavLink } from "react-router-dom";

function Item({handelFunction , dataInvoice , setDataInvoice , currentItems}) {
    

    const functionDelete = (item) => {
        const remove = dataInvoice.filter(i => i.id !== item.id)
        setDataInvoice(remove)
    };

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
                            <NavLink to={`/view-invoice/${i.id}`} onClick={()=> handelFunction(i)}><FontAwesomeIcon icon={faEye}/></NavLink>
                            <span onClick={()=> functionDelete(i)}><FontAwesomeIcon icon={faTrash}/></span>
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