import { useEffect, useState , useContext } from 'react'
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faSearch } from '@fortawesome/free-solid-svg-icons'
import styled from "styled-components"
import Paginate from '../paginate/paginate'
import Item from '../manage/item/item'
import styles from './manage.module.scss'
import axios from 'axios'
import Context from "../../../context/context"
import Loading from '../../loading/loading'


const Container = styled.div`
min-height:517px;
padding:25px 15px 0px 15px;

@media (max-width: 600px) {
    padding:25px 15px 72px 15px;
} 
`

function Manage ({functionData}){

    useEffect(()=> {
        document.title = 'مدیریت فاکتور ها'
    })

    const {token , spinner , setSpinner} = useContext(Context)

    const [invoices , setInvoices] = useState([])

    useEffect(()=> {
        setSpinner(true)
        const getInvoices = async() => {
            // pass token in header api
            const config = {
                headers: { Authorization: `Bearer ${token}` }
            }
            const bodyParameters = {
            key: "value",
            }
            const Response = await axios.post('https://test.rasadent.com/api/ShowShopTitleInvoices', bodyParameters, config)
            setInvoices(Response.data.invoices)
            setSpinner(false)
        }

        getInvoices()
    },[])

    const [itemOffset, setItemOffset] = useState(0);

    const endOffset = itemOffset + 5;
  
    console.log(`Loading items from ${itemOffset} to ${endOffset}`);
  
    const currentItems = invoices.slice(itemOffset, endOffset);
  
    const pageCount = Math.ceil(invoices.length / 5);
    
    const [searchTerm , setSearchTerm] = useState ("")

    if(spinner){
        return <Loading/>
    }

    return(
        <Container>
            <div className={styles.search}>
                <input 
                type="text" 
                className="formControl" 
                placeholder="محصولات خود را جستجو کنید ..."
                onChange={(e) => setSearchTerm(e.target.value)}
                value={searchTerm}
                />
                <FontAwesomeIcon icon={faSearch}/>
            </div>
            <Item 
                handelFunction={functionData}
                dataInvoice={invoices}
                currentItems={currentItems}
                searchTerm={searchTerm}
            />
            <Paginate
                dataInvoice={invoices}
                setItemOffset={setItemOffset}
                endOffset={endOffset}
                currentItems={currentItems} 
                pageCount={pageCount}
            />
        </Container>
    )
}

export default Manage;