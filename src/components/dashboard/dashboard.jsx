import { useEffect } from "react"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faBagShopping , faFileInvoice } from '@fortawesome/free-solid-svg-icons'
import styled from "styled-components"
import styles from './dash.module.scss'
import { PieChart } from 'react-minimal-pie-chart';



const Container = styled.div`
min-height:517px;
padding:25px 15px 0px 15px;

@media (max-width: 600px) {
    padding:25px 15px 90px 15px;
} 
`

function Dashboard () {

    useEffect(()=> {
        document.title = 'داشبورد'
    })

    const data = [
        {id:1 , name:'فاکتور ها' , int:'12' , icon:faFileInvoice},
        {id:2 , name:'محصولات' , int:'23' , icon:faBagShopping},
    ]

    return(
        <Container>
            <div className={styles.row}>
                {data.map((i , index)=> {
                    return(
                        <div key={index} className={styles.col6}>
                            <div className={styles.card}>
                                <FontAwesomeIcon icon={i.icon}/>
                                <p>{i.name}</p>
                                <p>{i.int}</p>
                            </div>
                        </div>
                    )
                })}
            </div>
            <div className={styles.chart}>
                <PieChart
                style={{ width:'300px' }}
                    data={[
                        { title: 'One', value: 10, color: '#3ABAF5' },
                        { title: 'Two', value: 15, color: '#C13C37' },
                        { title: 'Three', value: 20, color: '#3A69E6' },
                    ]}
                />
            </div>
        </Container>
    )
}

export default Dashboard;