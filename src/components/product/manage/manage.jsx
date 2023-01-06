import { useEffect , useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faSearch } from '@fortawesome/free-solid-svg-icons'
import styled from "styled-components"
import Paginate from "../paginate/paginate";
import Item from "./item/item";
import styles from './manage.module.scss'

  const Container = styled.div`
  padding:25px 15px 0px 15px;
  `

  // array data product
  const data = [
    {id:1 , nameFa:'ژل اسید اچ جامبو مروابن 37%' , nameEn:'Phosphoric acid 37% Etching Gel' , brand:'تاپ دنتال' , country:'iran' , guarantee:'بله' , price:20000 , statusSee:'بله' , statusStock:'بله' , stock:10 , warranty:'بله'} ,
    {id:2 , nameFa:'ژل اسید اچ جامبو مروابن 7%' , nameEn:'Phosphoric acid 37% Etching Gel' , brand:'تاپ دنتال' , country:'iran' , guarantee:'خیر' , price:20000 , statusSee:'خیر' , statusStock:'خیر' , stock:10 , warranty:'خیر'} ,
    {id:3 , nameFa:'ژل اسید اچ جامبو مروابن 37%' , nameEn:'Phosphoric acid 37% Etching Gel' , brand:'تاپ دنتال' , country:'iran' , guarantee:'بله' , price:20000 , statusSee:'بله' , statusStock:'بله' , stock:10 , warranty:'بله'} ,
    {id:4 , nameFa:'ژل اسید اچ جامبو مروابن 37%' , nameEn:'Phosphoric acid 37% Etching Gel' , brand:'تاپ دنتال' , country:'iran' , guarantee:'خیر' , price:20000 , statusSee:'خیر' , statusStock:'خیر' , stock:10 , warranty:'خیر'} ,
    {id:5 , nameFa:'ژل اسید اچ جامبو مروابن 37%' , nameEn:'Phosphoric acid 37% Etching Gel' , brand:'تاپ دنتال' , country:'iran' , guarantee:'بله' , price:20000 , statusSee:'بله' , statusStock:'بله' , stock:10 , warranty:'بله'} ,
    {id:6 , nameFa:'ژل اسید اچ جامبو مروابن 37%' , nameEn:'Phosphoric acid 37% Etching Gel' , brand:'تاپ دنتال' , country:'iran' , guarantee:'بله' , price:20000 , statusSee:'بله' , statusStock:'بله' , stock:10 , warranty:'بله'} ,
    {id:7 , nameFa:'ژل اسید اچ جامبو مروابن 37%' , nameEn:'Phosphoric acid 37% Etching Gel' , brand:'تاپ دنتال' , country:'iran' , guarantee:'بله' , price:20000 , statusSee:'بله' , statusStock:'بله' , stock:10 , warranty:'بله'} ,
    {id:8 , nameFa:'ژل اسید اچ جامبو مروابن 37%' , nameEn:'Phosphoric acid 37% Etching Gel' , brand:'تاپ دنتال' , country:'iran' , guarantee:'خیر' , price:20000 , statusSee:'خیر' , statusStock:'خیر' , stock:10 , warranty:'خیر'} ,
    {id:9 , nameFa:'ژل اسید اچ جامبو مروابن 37%' , nameEn:'Phosphoric acid 37% Etching Gel' , brand:'تاپ دنتال' , country:'iran' , guarantee:'خیر' , price:20000 , statusSee:'خیر' , statusStock:'خیر' , stock:10 , warranty:'خیر'} ,
    {id:10 , nameFa:'ژل اسید اچ جامبو مروابن 37%' , nameEn:'Phosphoric acid 37% Etching Gel' , brand:'تاپ دنتال' , country:'iran' , guarantee:'خیر' , price:20000 , statusSee:'خیر' , statusStock:'خیر' , stock:10 , warranty:'خیر'} ,
    {id:11 , nameFa:'لورم ایپسوم متن ساختگی با' , nameEn:'Phosphoric acid 37% Etching Gel' , brand:'تاپ دنتال' , country:'iran' , guarantee:'بله' , price:20000 , statusSee:'بله' , statusStock:'بله' , stock:10 , warranty:'بله'} ,
  ]

  // if for search table
  // const filterArticles = (searchValue) => {
  //   if (searchValue === '') {
  //     return data
  //   } return data.filter(article => article.nameFa.toLowerCase().includes(searchValue.toLowerCase()))
  // }

function Manage({ functionData }) {

  // title page
  useEffect(()=> {
    document.title = 'مدیریت محصولات'
  })


  // state data product
  const [dataProduct , setDataProduct] = useState(data)

  // pagenation
  const [itemOffset, setItemOffset] = useState(0);

  const endOffset = itemOffset + 5;

  console.log(`Loading items from ${itemOffset} to ${endOffset}`);

  const currentItems = dataProduct.slice(itemOffset, endOffset);

  const pageCount = Math.ceil(dataProduct.length / 5);

    // // value input//
    // const [innerValue , setInnerValue] = useState("")
    // const [searchValue , setSearchValue] = useState("")
  
    // // function search input table
    // const handelSubmit = (e) => {
    //   e.preventDefault()
    //   const callBack = (searchValue) => setSearchValue(searchValue)
    //   callBack(innerValue)
    // }
    
    // useEffect(()=> {
    //   const filterdata = filterArticles(searchValue)
    //   setDataProduct(filterdata)
    // },[searchValue])

    const [searchTerm , setSearchTerm] = useState ("")

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
        dataProduct={dataProduct} 
        setDataProduct={setDataProduct} 
        currentItems={currentItems}
        searchTerm={searchTerm}
      />
      <Paginate  
        dataProduct={dataProduct} 
        setItemOffset={setItemOffset} 
        endOffset={endOffset} 
        currentItems={currentItems} 
        pageCount={pageCount}
       />
    </Container>
  )
}

export default Manage;