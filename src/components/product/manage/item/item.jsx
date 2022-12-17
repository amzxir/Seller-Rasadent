import { useState } from "react";
import styles from '../manage.module.scss'
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faNewspaper , faEdit , faTrash } from '@fortawesome/free-solid-svg-icons'
import { NavLink } from "react-router-dom";

function Item({handelFunction , dataProduct , setDataProduct , currentItems}) {
    

    const functionDelete = (item) => {
        const remove = dataProduct.filter(i => i.id !== item.id)
        setDataProduct(remove)
    };

  return (
    <>
        <div className={styles.row}>
            <div className={styles.col6}>
            {currentItems && currentItems.map((i , index)=> {
                return(
                <div key={index} className={styles.card}>
                    <div className={styles.content}>
                    <span><FontAwesomeIcon icon={faNewspaper}/></span>
                    <p>{i.nameFa}</p>
                    </div>
                    <div className={styles.manage}>
                    <NavLink to={`/edit-product/${i.id}`} onClick={()=> handelFunction(i)}><FontAwesomeIcon icon={faEdit}/></NavLink>
                    <span onClick={()=>functionDelete(i)}><FontAwesomeIcon icon={faTrash}/></span>
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