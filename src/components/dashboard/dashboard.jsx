import { useEffect, useState } from "react"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faBagShopping , faFileInvoice } from '@fortawesome/free-solid-svg-icons'
import styled from "styled-components"
import styles from './dash.module.scss'
import PirChart from "../chart/pirChart"
import { NavLink } from "react-router-dom"


const Container = styled.div`
padding:25px 15px 0px 15px;

@media (min-width: 600px) {
    min-height:507px;
} 

@media (max-width: 600px) {
    padding:25px 15px 72px 15px;
} 
`

function Dashboard () {

    useEffect(()=> {
        document.title = 'داشبورد'
    })

    const data = [
        {id:1 , name:'فاکتور ها' , int:'12' , link:'/manage-invoice' , icon:faFileInvoice},
        {id:2 , name:'درخواست فاکتور رسمی' , int:'23' , link:'/request-invoice' , icon:faBagShopping},
    ]

    const [userData , setUserData] = useState({
        labels: data.map((i)=> i.name) ,
        datasets:[{
            label:'رسادنت',
            data: data.map((i)=> i.int) ,
        }]
    })

    return(
        <Container>
            <div className={styles.row}>
                {data.map((i , index)=> {
                    return(
                        <div key={index} className={styles.col6}>
                            <NavLink to={i.link}>
                                <div className={styles.card}>
                                    <FontAwesomeIcon icon={i.icon}/>
                                    <p>{i.name} <span>{i.int}</span></p>
                                </div>
                            </NavLink>
                        </div>
                    )
                })}
            </div>
            <div className={styles.chart}>
                <PirChart chartData={userData}/>
            </div>
        </Container>
    )
}

export default Dashboard;