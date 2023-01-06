import { useEffect } from 'react';
import { NavLink } from 'react-router-dom';
import styles from './product.module.scss'
import styled from "styled-components"
import box from '../../images/box.svg'
import note from '../../images/manage.svg'


const Container = styled.div`
padding:25px 15px 0px 15px;

@media (min-width: 600px) {
    height:500px;
    overflow:auto;
} 

@media (max-width: 600px) {
    padding:25px 15px 72px 15px;
} 
`

function Product (){

    // title page 
    useEffect(()=> {
        document.title = 'محصولات'
    })

    // array data card
    const data =[
        {name:'ایجاد محصول جدید' , link:'/create-product' , class:styles.cardOne , logo:note},
        {name:'مدیریت محصولات' , link:'/manage-product' , class:styles.cardTwo , logo:box},
    ]

    return(
        <Container>
            <div className={styles.row}>
                {data.map((i , index)=> {
                    return(

                        <NavLink key={index} to={i.link} className={i.class}>
                            <div className={styles.content}>
                                <img src={i.logo} alt="" />
                                <p>{i.name}</p>
                            </div>
                        </NavLink>
                    )
                })}
            </div>
        </Container>
    )
}

export default Product;