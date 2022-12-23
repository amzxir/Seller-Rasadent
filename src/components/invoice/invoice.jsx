import styles from './invoice.module.scss'
import styled from "styled-components"
import { useEffect } from 'react'
import { NavLink } from 'react-router-dom'
import invoice from '../../images/invoice.svg'

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
        {name:'مدیریت فاکتور' , link:'/manage-invoice' , class:styles.cardOne , logo:invoice},
        {name:'درخواست های فاکتور رسمی' , link:'/request-invoice' , class:styles.cardTwo , logo:invoice},
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

export default Invoice;