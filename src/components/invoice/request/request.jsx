import { useEffect , useState , useContext } from "react"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faFileUpload , faSearch , faEye } from '@fortawesome/free-solid-svg-icons'
import styled from "styled-components"
import styles from './request.module.scss'
import Modals from "../../modal/modal"
import Context from "../../../context/context"
import { NavLink } from "react-router-dom"

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

// if for search table
const filterArticles = (searchValue) => {
  if (searchValue === '') {
    return data
  } return data.filter(article => article.serial.toLowerCase().includes(searchValue.toLowerCase()))
}

function Request({functionData}) {

  // title page //
  useEffect(()=> {
    document.title = 'درخواست فاکتور رسمی'
  })

  // data table //
  const [article , setArticle] = useState(data)

  // value input//
  const [innerValue , setInnerValue] = useState("")
  const [searchValue , setSearchValue] = useState("")

  // function search input table
  const handelSubmit = (e) => {
    e.preventDefault()
    const callBack = (searchValue) => setSearchValue(searchValue)
    callBack(innerValue)
  }
  
  useEffect(()=> {
    const filterdata = filterArticles(searchValue)
    setArticle(filterdata)
  },[searchValue])

  // console.log(searchValue)

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
  
  return (
    <Container>
        <div className={styles.row}>
          <div className={styles.col}>
            <form className={styles.search} onSubmit={handelSubmit}>
              <input 
                type="text" 
                className="formControl" 
                placeholder="شماره فاکتور را وارد کنید ..."
                value={innerValue}
                onChange={(e)=> setInnerValue(e.target.value)}
               />
              <FontAwesomeIcon onClick={()=> setModal(true)} icon={faSearch}/>
            </form>
            <div className={styles.card}>
              <table article={article}>
                <tbody>
                  <tr>
                    <th>شماره</th>
                    <th>تاریخ</th>
                    <th>مشاهده</th>
                    <th>بارگذاری</th>
                  </tr>
                  {article.map((i , index)=> {
                    return(
                      <tr key={index}>
                        <td style={{ fontFamily:'vazir' }}>{i.serial}</td>
                        <td style={{ fontFamily:'vazir' }}>{i.date}</td>
                        <td><NavLink to={`/view-invoice/${i.id}`} onClick={()=> functionData(i)}><FontAwesomeIcon icon={faEye}/></NavLink></td>
                        <td><div onClick={()=> setModal(index)}><FontAwesomeIcon icon={faFileUpload}/></div></td>
                        <Modals show={modal === index}>
                          <div className='modal'>
                            <div className="modalTitle">شماره فاکتور {i.serial}</div>
                            <div className="modalBody">
                              {
                                Object.keys(uploadImg).length === index ?
                                <>
                                  <label style={{ cursor:'pointer' }} htmlFor={i.serial}><FontAwesomeIcon className={styles.upload} icon={faFileUpload}/> <p style={{ marginBlock:'0' }}>بارگداری تصویر</p></label>
                                  <input type="file" id={i.serial} className="dNone" onChange={(e)=>imgFilehandler(e , index)} />
                                </>
                                :
                                <div style={{ display:'flex',flexDirection:'row',flexWrap:'wrap',width:'100%' }}>
                                  {
                                    uploadImg[index]?.map(item=>(
                                      <img width={50} src={item }/>
                                    ))
                                  }
                                </div>
                              }
                            </div>
                            <div className="modalFooter"><button style={{ fontSize:'13px' , borderRadius:'5px' }} onClick={()=> setModal(false)} className='btn btn-secondary'>خروج</button></div>
                          </div>
                        </Modals>
                      </tr>
                    )
                  })}
                </tbody>
              </table>
            </div>
          </div>
        </div>
    </Container>
  )
}

export default Request;