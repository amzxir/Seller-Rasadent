import styled from "styled-components"
import styles from './manage.module.scss'
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faNewspaper , faEdit , faTrash } from '@fortawesome/free-solid-svg-icons'
import { NavLink } from "react-router-dom";
import { useEffect } from "react";
import { useState } from "react";

const Container = styled.div`
padding:25px 15px 0px 15px;
`

function Manage({functionData}) {

  useEffect(()=> {
    document.title = 'مدیریت محصولات'
  })

  const data = [
    {id:1 , nameFa:'ژل اسید اچ جامبو مروابن 37%' , nameEn:'Phosphoric acid 37% Etching Gel' , brand:'تاپ دنتال' , country:'iran' , guarantee:'دارد' , price:20000 , statusSee:'دارد' , statusStock:'ندارد' , stock:10 , warranty:'دارد'} ,
    {id:2 , nameFa:'ژل اسید اچ جامبو مروابن 37%' , nameEn:'Phosphoric acid 37% Etching Gel' , brand:'تاپ دنتال' , country:'iran' , guarantee:'دارد' , price:20000 , statusSee:'دارد' , statusStock:'ندارد' , stock:10 , warranty:'دارد'} ,
    {id:3 , nameFa:'ژل اسید اچ جامبو مروابن 37%' , nameEn:'Phosphoric acid 37% Etching Gel' , brand:'تاپ دنتال' , country:'iran' , guarantee:'دارد' , price:20000 , statusSee:'دارد' , statusStock:'ندارد' , stock:10 , warranty:'دارد'} 
  ]


  const [dataProduct , setDataProduct] = useState(data)

  const functionDelete = (item) => {
    const remove = dataProduct.filter(i => i.id !== item.id)
    setDataProduct(remove)
  };


  return (
    <Container>
      <div className={styles.row}>
        <div className={styles.col6}>
          {dataProduct.map((i , index)=> {
            return(
              <div key={index} className={styles.card}>
                <div className={styles.content}>
                  <span><FontAwesomeIcon icon={faNewspaper}/></span>
                  <p>{i.nameFa}</p>
                </div>
                <div className={styles.manage}>
                  <NavLink to={`/edit-product/${i.id}`} onClick={()=> functionData(i)}><FontAwesomeIcon icon={faEdit}/></NavLink>
                  <span onClick={()=>functionDelete(i)}><FontAwesomeIcon icon={faTrash}/></span>
                </div>
              </div>
            )
          })}
        </div>
      </div>
    </Container>
  )
}

export default Manage;