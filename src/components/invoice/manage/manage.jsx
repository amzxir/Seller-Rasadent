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

const data = [
    {id:1 , nameFa:'ژل اسید اچ جامبو مروابن 37%' , nameEn:'Phosphoric acid 37% Etching Gel' , brand:'تاپ دنتال' , country:'iran' , guarantee:'دارد' , price:20000 , statusSee:'دارد' , statusStock:'ندارد' , stock:10 , warranty:'دارد'} ,
    {id:2 , nameFa:'ژل اسید اچ جامبو مروابن 37%' , nameEn:'Phosphoric acid 37% Etching Gel' , brand:'تاپ دنتال' , country:'iran' , guarantee:'دارد' , price:20000 , statusSee:'دارد' , statusStock:'ندارد' , stock:10 , warranty:'دارد'} ,
    {id:3 , nameFa:'ژل اسید اچ جامبو مروابن 37%' , nameEn:'Phosphoric acid 37% Etching Gel' , brand:'تاپ دنتال' , country:'iran' , guarantee:'دارد' , price:20000 , statusSee:'دارد' , statusStock:'ندارد' , stock:10 , warranty:'دارد'} ,
    {id:4 , nameFa:'ژل اسید اچ جامبو مروابن 37%' , nameEn:'Phosphoric acid 37% Etching Gel' , brand:'تاپ دنتال' , country:'iran' , guarantee:'دارد' , price:20000 , statusSee:'دارد' , statusStock:'ندارد' , stock:10 , warranty:'دارد'} ,
    {id:5 , nameFa:'ژل اسید اچ جامبو مروابن 37%' , nameEn:'Phosphoric acid 37% Etching Gel' , brand:'تاپ دنتال' , country:'iran' , guarantee:'دارد' , price:20000 , statusSee:'دارد' , statusStock:'ندارد' , stock:10 , warranty:'دارد'} ,
    {id:6 , nameFa:'ژل اسید اچ جامبو مروابن 37%' , nameEn:'Phosphoric acid 37% Etching Gel' , brand:'تاپ دنتال' , country:'iran' , guarantee:'دارد' , price:20000 , statusSee:'دارد' , statusStock:'ندارد' , stock:10 , warranty:'دارد'} ,
    {id:7 , nameFa:'ژل اسید اچ جامبو مروابن 37%' , nameEn:'Phosphoric acid 37% Etching Gel' , brand:'تاپ دنتال' , country:'iran' , guarantee:'دارد' , price:20000 , statusSee:'دارد' , statusStock:'ندارد' , stock:10 , warranty:'دارد'} ,
    {id:8 , nameFa:'ژل اسید اچ جامبو مروابن 37%' , nameEn:'Phosphoric acid 37% Etching Gel' , brand:'تاپ دنتال' , country:'iran' , guarantee:'دارد' , price:20000 , statusSee:'دارد' , statusStock:'ندارد' , stock:10 , warranty:'دارد'} ,
]

function Manage ({functionData}){

    useEffect(()=> {
        document.title = 'مدیریت فاکتور ها'
    })

    const {invoices , setInvoices , token , spinner , setSpinner} = useContext(Context)

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

    const [dataInvoice , setDataInvoice] = useState(data)

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
                setDataInvoice={setDataInvoice}
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