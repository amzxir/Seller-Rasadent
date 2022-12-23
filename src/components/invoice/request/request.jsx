import { useEffect , useState , useContext } from "react"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import {  faSearch } from '@fortawesome/free-solid-svg-icons'
import styled from "styled-components"
import styles from './request.module.scss'
import Context from "../../../context/context"
import Item from "./item/item"
import Paginate from "./paginate/paginate"

const Container = styled.div`
padding:25px 0px 0px 0px;
`

// data tabel

const data = [
  {id:1 , serial:'0024006547' , date:'1400/2/4' , nameFa:'ژل اسید اچ جامبو مروابن 37%' , nameEn:'Phosphoric acid 37% Etching Gel' , brand:'تاپ دنتال' , country:'iran' , guarantee:'دارد' , price:20000 , statusSee:'دارد' , statusStock:'ندارد' , stock:10 , warranty:'دارد'} ,
  {id:2 , serial:'0024007589' , date:'1400/2/4' , nameFa:'ژل اسید اچ جامبو مروابن 37%' , nameEn:'Phosphoric acid 37% Etching Gel' , brand:'تاپ دنتال' , country:'iran' , guarantee:'دارد' , price:20000 , statusSee:'دارد' , statusStock:'ندارد' , stock:10 , warranty:'دارد'} ,
  {id:3 , serial:'0024006547' , date:'1400/2/4' , nameFa:'ژل اسید اچ جامبو مروابن 37%' , nameEn:'Phosphoric acid 37% Etching Gel' , brand:'تاپ دنتال' , country:'iran' , guarantee:'دارد' , price:20000 , statusSee:'دارد' , statusStock:'ندارد' , stock:10 , warranty:'دارد'} ,
  {id:4 , serial:'0024006547' , date:'1400/2/4' , nameFa:'ژل اسید اچ جامبو مروابن 37%' , nameEn:'Phosphoric acid 37% Etching Gel' , brand:'تاپ دنتال' , country:'iran' , guarantee:'دارد' , price:20000 , statusSee:'دارد' , statusStock:'ندارد' , stock:10 , warranty:'دارد'} ,
  {id:5 , serial:'0024006547' , date:'1400/2/4' , nameFa:'ژل اسید اچ جامبو مروابن 37%' , nameEn:'Phosphoric acid 37% Etching Gel' , brand:'تاپ دنتال' , country:'iran' , guarantee:'دارد' , price:20000 , statusSee:'دارد' , statusStock:'ندارد' , stock:10 , warranty:'دارد'} ,
  {id:6 , serial:'0024006547' , date:'1400/2/4' , nameFa:'ژل اسید اچ جامبو مروابن 37%' , nameEn:'Phosphoric acid 37% Etching Gel' , brand:'تاپ دنتال' , country:'iran' , guarantee:'دارد' , price:20000 , statusSee:'دارد' , statusStock:'ندارد' , stock:10 , warranty:'دارد'} ,
  {id:7 , serial:'0024006547' , date:'1400/2/4' , nameFa:'ژل اسید اچ جامبو مروابن 37%' , nameEn:'Phosphoric acid 37% Etching Gel' , brand:'تاپ دنتال' , country:'iran' , guarantee:'دارد' , price:20000 , statusSee:'دارد' , statusStock:'ندارد' , stock:10 , warranty:'دارد'} ,
  {id:8 , serial:'0024006547' , date:'1400/2/4' , nameFa:'ژل اسید اچ جامبو مروابن 37%' , nameEn:'Phosphoric acid 37% Etching Gel' , brand:'تاپ دنتال' , country:'iran' , guarantee:'دارد' , price:20000 , statusSee:'دارد' , statusStock:'ندارد' , stock:10 , warranty:'دارد'} ,
]

function Request({functionData}) {

  // title page //
  useEffect(()=> {
    document.title = 'درخواست فاکتور رسمی'
  })

  // data table //
  const [article , setArticle] = useState(data)

  const [itemOffset, setItemOffset] = useState(0);

  const endOffset = itemOffset + 10;

  console.log(`Loading items from ${itemOffset} to ${endOffset}`);

  const currentItems = article.slice(itemOffset, endOffset);

  const pageCount = Math.ceil(article.length / 10);

  // state modal context
  const {modal , setModal} = useContext(Context)

  // state img file 
  const [uploadImg , setUploadImg] = useState({})

  // function upload img
  const imgFilehandler = (e ,kk) => {
      console.log(kk)
        setUploadImg((obj)=>{
        if(kk in obj)
            obj[kk].push(URL.createObjectURL(e.target.files[0]))
        else{
          obj[kk]=[]
          obj[kk].push(URL.createObjectURL(e.target.files[0]))
        }
      return {...obj}
    });
  }

  const [searchTerm , setSearchTerm] = useState ("")

  
  return (
    <Container>
        <div className={styles.row}>
          <div className={styles.col}>
            <div className={styles.search}>
              <input 
                type="text" 
                className="formControl" 
                placeholder="شماره فاکتور را وارد کنید ..."
                onChange={(e) => setSearchTerm(e.target.value)}
                value={searchTerm}
               />
              <FontAwesomeIcon onClick={()=> setModal(true)} icon={faSearch}/>
            </div>
            <Item
              article={article}
              uploadImg={uploadImg}
              functionData={functionData}
              imgFilehandler={imgFilehandler}
              currentItems={currentItems}
              searchTerm={searchTerm}
            />
          </div>
        </div>
        <Paginate
          article={article}
          setItemOffset={setItemOffset}
          endOffset={endOffset}
          currentItems={currentItems} 
          pageCount={pageCount}
        />
    </Container>
  )
}

export default Request;