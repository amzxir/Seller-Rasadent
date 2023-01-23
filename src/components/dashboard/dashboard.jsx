import { useEffect, useState , useContext } from "react"
import { NavLink } from "react-router-dom"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faFileInvoice , faWallet } from '@fortawesome/free-solid-svg-icons'
import styled from "styled-components"
import styles from './dash.module.scss'
import PirChart from "../chart/pirChart"
import Context from "../../context/context"
import axios from "axios"
import Loading from "../loading/loading"


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

    const {token , spinner , setSpinner , invoicesCount , setInvoicesCount , productCount ,setProductCount} = useContext(Context)


    useEffect(()=> {
        setSpinner(true)
        const getCountProduct = async () => {
            // pass token in header api
            const config = {
                headers: { Authorization: `Bearer ${token}` }
            }
            const bodyParameters = {
                key: "value",
            }
            const Response = await axios.post('https://test.rasadent.com/api/ListProducts', bodyParameters, config)
            setProductCount(Response.data.Products)
            setSpinner(false)
        }

        getCountProduct()
    },[])


    useEffect(()=> {
        setSpinner(true)
        const getCountInvoice = async () => {
            // pass token in header api
            const config = {
                headers: { Authorization: `Bearer ${token}` }
            }
            const bodyParameters = {
                key: "value",
            }
            const Response = await axios.post('https://test.rasadent.com/api/ShowShopTitleInvoices', bodyParameters, config)
            setInvoicesCount(Response.data.invoices)
            setSpinner(false)
        }

        getCountInvoice()
    },[])


    // console.log(productCount.length , invoicesCount.length)

    // array data chart
    const data = [
        {id:1 , name:'محصولات' , int:productCount.length , link:'/manage-invoice' , icon:faFileInvoice},        
        {id:2 , name:'فاکتور ها' , int:invoicesCount.length , link:'/manage-invoice' , icon:faFileInvoice},
    ]


    // state chart
    const [userData , setUserData] = useState({
        labels: data.map((i)=> i.name) ,
        datasets:[{
            label:'رسادنت',
            data: data.map((i)=> i.int) ,
        }]
    })

    // array data card
    const datas = [
        {id:1 , name:'فاکتور ها' , int:invoicesCount.length , link:'/manage-invoice' , icon:faFileInvoice},
        {id:2 , name:'کیف پول' , int:'10000000' , link:null , icon:faWallet},
        
    ]


    if(spinner){
        return <Loading/>
    }

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