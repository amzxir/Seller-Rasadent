import styles from './product.module.scss'
import styled from "styled-components"
import { NavLink } from 'react-router-dom';
import { useEffect } from 'react';

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

    useEffect(()=> {
        document.title = 'محصولات'
    })

    const data =[
        {name:'ایجاد محصول جدید' , link:'/create-product' , class:styles.createPro},
        {name:'مدیریت محصولات' , link:'/manage-product' , class:styles.managePro},
    ]

    return(
        <Container>
            {data.map((i , index)=> {
                return(

                    <NavLink key={index} to={i.link} className={i.class}>{i.name}</NavLink>
                )
            })}
        </Container>
    )
}

export default Product;