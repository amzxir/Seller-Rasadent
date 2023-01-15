import { useEffect, useState } from "react"
import { NavLink } from "react-router-dom"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faFileInvoice , faWallet } from '@fortawesome/free-solid-svg-icons'
import styled from "styled-components"
import styles from './dash.module.scss'
import PirChart from "../chart/pirChart"


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

function Dashboard () {

    // title page
    useEffect(()=> {
        document.title = 'داشبورد'
    })

    // array data chart
    const data = [
        {id:1 , name:'فاکتور ها' , int:'12' , link:'/manage-invoice' , icon:faFileInvoice},
        {id:2 , name:'محصولات' , int:'23' , link:'/manage-invoice' , icon:faFileInvoice},        
    ]

    // array data card
    const datas = [
        {id:1 , name:'فاکتور ها' , int:'12' , link:'/manage-invoice' , icon:faFileInvoice},
        {id:3 , name:'کیف پول' , int:'10000000' , link:null , icon:faWallet},
        
    ]

    // state chart
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
                {datas.map((i , index)=> {
                    return(
                        <div key={index} className={styles.col6}>
                            <NavLink to={i.link}>
                                <div className={styles.card}>
                                    <FontAwesomeIcon icon={i.icon}/>
                                    <p>{i.name}</p>
                                    <p>{i.int}</p>
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