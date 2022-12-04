import styles from './manage.module.scss'
import styled from "styled-components"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faFileInvoice , faTrash , faEye } from '@fortawesome/free-solid-svg-icons'
import { useEffect, useState } from 'react';
import { NavLink } from 'react-router-dom';

const Container = styled.div`
min-height:517px;
padding:25px 15px 0px 15px;

@media (max-width: 600px) {
    padding:25px 15px 72px 15px;
} 
`

function Manage ({functionData}){

    useEffect(()=> {
        document.title = 'مدیریت فاکتور ها'
    })

    const data = [
        {id:1 , nameFa:'ژل اسید اچ جامبو مروابن 37%' , nameEn:'Phosphoric acid 37% Etching Gel' , brand:'تاپ دنتال' , country:'iran' , guarantee:'دارد' , price:20000 , statusSee:'دارد' , statusStock:'ندارد' , stock:10 , warranty:'دارد'} ,
        {id:2 , nameFa:'ژل اسید اچ جامبو مروابن 37%' , nameEn:'Phosphoric acid 37% Etching Gel' , brand:'تاپ دنتال' , country:'iran' , guarantee:'دارد' , price:20000 , statusSee:'دارد' , statusStock:'ندارد' , stock:10 , warranty:'دارد'} ,
        {id:3 , nameFa:'ژل اسید اچ جامبو مروابن 37%' , nameEn:'Phosphoric acid 37% Etching Gel' , brand:'تاپ دنتال' , country:'iran' , guarantee:'دارد' , price:20000 , statusSee:'دارد' , statusStock:'ندارد' , stock:10 , warranty:'دارد'} 
    ]

    const [dataInvoice , setDataInvoice] = useState(data)

    const functionDelete = (item) => {
        const remove = dataInvoice.filter(i=> i.id !== item.id)
        setDataInvoice(remove)
    }

    return(
        <Container>
            <div className={styles.row}>
                {dataInvoice.map((i , index)=> {
                    return(
                        <div key={index} className={styles.col6}>
                            <div className={styles.card}>
                                <div className={styles.content}>
                                    <span><FontAwesomeIcon icon={faFileInvoice}/></span>
                                    <p>{i.nameFa}</p>
                                </div>
                                <div className={styles.manage}>
                                    <NavLink to={`/view-invoice/${i.id}`} onClick={()=> functionData(i)}><FontAwesomeIcon icon={faEye}/></NavLink>
                                    <span onClick={()=> functionDelete(i)}><FontAwesomeIcon icon={faTrash}/></span>
                                </div>
                            </div>
                        </div>
                    )
                })}
            </div>
        </Container>
    )
}

export default Manage;