import { useEffect , useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faSearch } from '@fortawesome/free-solid-svg-icons'
import styled from "styled-components"
import Paginate from "../paginate/paginate";
import Item from "./item/item";
import styles from './manage.module.scss'
import { useContext } from "react";
import Context from "../../../context/context";
import axios from "axios";
import Loading from "../../loading/loading";

  const Container = styled.div`
  padding:25px 15px 0px 15px;
  `


function Manage({ functionData }) {

  // title page
  useEffect(()=> {
    document.title = 'مدیریت محصولات'
  })

  const {token , spinner , setSpinner} = useContext(Context)

  const [listProducts , setListProducts ] = useState([])


  useEffect(()=> {
    setSpinner(true)
    const listsProducts = async() => {
      // pass token in header api
      const config = {
      headers: { Authorization: `Bearer ${token}` }
      }
      const bodyParameters = {
        key: "value",
      }
      const Response = await axios.post('https://test.rasadent.com/api/ListProducts', bodyParameters, config)
      setListProducts(Response.data.Products)
      setSpinner(false)
      // console.log(Response.data.Products)
    }

    listsProducts()
  },[])


  // pagenation
  const [itemOffset, setItemOffset] = useState(0);

  const endOffset = itemOffset + 5;

  console.log(`Loading items from ${itemOffset} to ${endOffset}`);

  const currentItems = listProducts.slice(itemOffset, endOffset);

  const pageCount = Math.ceil(listProducts.length / 5);

  const [searchTerm , setSearchTerm] = useState ("")

  if (spinner){
    return <Loading/>
  }

  return (
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
        dataProduct={listProducts} 
        currentItems={currentItems}
        searchTerm={searchTerm}
      />
      <Paginate  
        dataProduct={listProducts} 
        setItemOffset={setItemOffset} 
        endOffset={endOffset} 
        currentItems={currentItems} 
        pageCount={pageCount}
       />
    </Container>
  )
}

export default Manage;