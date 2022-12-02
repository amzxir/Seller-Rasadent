import styles from './product.module.scss'
import styled from "styled-components"
import { NavLink } from 'react-router-dom';
import { useEffect } from 'react';

const Container = styled.div`
min-height:517px;
padding:25px 15px 0px 15px;

@media (max-width: 600px) {
    padding:25px 15px 90px 15px;
} 
`

function Product (){

    useEffect(()=> {
        document.title = 'محصولات'
    })

    return(
        <Container>
            <NavLink className={styles.createPro}>ایجاد محصول جدید</NavLink>
            <NavLink className={styles.managePro}>مدیریت محصولات</NavLink>
        </Container>
    )
}

export default Product;