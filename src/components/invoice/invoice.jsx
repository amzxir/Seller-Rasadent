import styles from './invoice.module.scss'
import styled from "styled-components"
import { useEffect } from 'react'
import { NavLink } from 'react-router-dom'

const Container = styled.div`
padding:25px 15px 0px 15px;

// @media (min-width: 600px) {
//     min-height:507px;
// } 

@media (min-width: 600px) {
    height:500px;
    overflow:auto;
} 

@media (max-width: 600px) {
    padding:25px 15px 72px 15px;
} 
`

function Invoice (){

    useEffect(()=> {
        document.title = 'فاکتور ها'
    })

    const data =[
        {name:'مدیریت فاکتور' , link:'/manage-invoice' , class:styles.manageInvo},
        {name:'درخواست فاکتور رسمی' , link:'/request-invoice' , class:styles.requestInvo},
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

export default Invoice;