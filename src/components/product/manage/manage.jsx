import { useEffect , useState } from "react";
import styled from "styled-components"
import Paginate from "../paginate/paginate";
import Item from "./item/item";

const Container = styled.div`
padding:25px 15px 0px 15px;
`

function Manage({functionData}) {

  useEffect(()=> {
    document.title = 'مدیریت محصولات'
  })

  const data = [
      {id:1 , nameFa:'ژل اسید اچ جامبو مروابن 37%' , nameEn:'Phosphoric acid 37% Etching Gel' , brand:'تاپ دنتال' , country:'iran' , guarantee:'دارد' , price:20000 , statusSee:'دارد' , statusStock:'ندارد' , stock:10 , warranty:'دارد'} ,
      {id:2 , nameFa:'ژل اسید اچ جامبو مروابن 37%' , nameEn:'Phosphoric acid 37% Etching Gel' , brand:'تاپ دنتال' , country:'iran' , guarantee:'دارد' , price:20000 , statusSee:'دارد' , statusStock:'ندارد' , stock:10 , warranty:'دارد'} ,
      {id:3 , nameFa:'ژل اسید اچ جامبو مروابن 37%' , nameEn:'Phosphoric acid 37% Etching Gel' , brand:'تاپ دنتال' , country:'iran' , guarantee:'دارد' , price:20000 , statusSee:'دارد' , statusStock:'ندارد' , stock:10 , warranty:'دارد'} ,
      {id:4 , nameFa:'ژل اسید اچ جامبو مروابن 37%' , nameEn:'Phosphoric acid 37% Etching Gel' , brand:'تاپ دنتال' , country:'iran' , guarantee:'دارد' , price:20000 , statusSee:'دارد' , statusStock:'ندارد' , stock:10 , warranty:'دارد'} ,
      {id:5 , nameFa:'ژل اسید اچ جامبو مروابن 37%' , nameEn:'Phosphoric acid 37% Etching Gel' , brand:'تاپ دنتال' , country:'iran' , guarantee:'دارد' , price:20000 , statusSee:'دارد' , statusStock:'ندارد' , stock:10 , warranty:'دارد'} ,
      {id:6 , nameFa:'ژل اسید اچ جامبو مروابن 37%' , nameEn:'Phosphoric acid 37% Etching Gel' , brand:'تاپ دنتال' , country:'iran' , guarantee:'دارد' , price:20000 , statusSee:'دارد' , statusStock:'ندارد' , stock:10 , warranty:'دارد'} ,
      {id:7 , nameFa:'ژل اسید اچ جامبو مروابن 37%' , nameEn:'Phosphoric acid 37% Etching Gel' , brand:'تاپ دنتال' , country:'iran' , guarantee:'دارد' , price:20000 , statusSee:'دارد' , statusStock:'ندارد' , stock:10 , warranty:'دارد'} ,
      {id:8 , nameFa:'ژل اسید اچ جامبو مروابن 37%' , nameEn:'Phosphoric acid 37% Etching Gel' , brand:'تاپ دنتال' , country:'iran' , guarantee:'دارد' , price:20000 , statusSee:'دارد' , statusStock:'ندارد' , stock:10 , warranty:'دارد'} ,
      {id:9 , nameFa:'ژل اسید اچ جامبو مروابن 37%' , nameEn:'Phosphoric acid 37% Etching Gel' , brand:'تاپ دنتال' , country:'iran' , guarantee:'دارد' , price:20000 , statusSee:'دارد' , statusStock:'ندارد' , stock:10 , warranty:'دارد'} ,
      {id:10 , nameFa:'ژل اسید اچ جامبو مروابن 37%' , nameEn:'Phosphoric acid 37% Etching Gel' , brand:'تاپ دنتال' , country:'iran' , guarantee:'دارد' , price:20000 , statusSee:'دارد' , statusStock:'ندارد' , stock:10 , warranty:'دارد'} ,
      {id:11 , nameFa:'لورم ایپسوم متن ساختگی با' , nameEn:'Phosphoric acid 37% Etching Gel' , brand:'تاپ دنتال' , country:'iran' , guarantee:'دارد' , price:20000 , statusSee:'دارد' , statusStock:'ندارد' , stock:10 , warranty:'دارد'} ,
  ]

  const [dataProduct , setDataProduct] = useState(data)

  const [itemOffset, setItemOffset] = useState(0);

  const endOffset = itemOffset + 6;

  console.log(`Loading items from ${itemOffset} to ${endOffset}`);

  const currentItems = dataProduct.slice(itemOffset, endOffset);

  const pageCount = Math.ceil(dataProduct.length / 6);


  return (
    <Container>
      <Item handelFunction={functionData} dataProduct={dataProduct} setDataProduct={setDataProduct} currentItems={currentItems}/>
      <Paginate  dataProduct={dataProduct} setItemOffset={setItemOffset} endOffset={endOffset} currentItems={currentItems} pageCount={pageCount} />
    </Container>
  )
}

export default Manage;