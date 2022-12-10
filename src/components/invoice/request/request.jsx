import { useEffect , useState , useContext } from "react"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faFileUpload , faSearch } from '@fortawesome/free-solid-svg-icons'
import styled from "styled-components"
import styles from './request.module.scss'
import Modals from "../../modal/modal"
import Context from "../../../context/context"

const Container = styled.div`
padding:25px 0px 0px 0px;
`

// data tabel
const data = [
  {serial:'0024006547' , date:'1400/2/4' , icon:faFileUpload},
  {serial:'003400938' , date:'1400/5/4' , icon:faFileUpload},
  {serial:'001234642' , date:'1400/7/4' , icon:faFileUpload}
]

// if for search table
const filterArticles = (searchValue) => {
  if (searchValue === '') {
    return data
  } return data.filter(article => article.serial.toLowerCase().includes(searchValue.toLowerCase()))
}

function Request() {

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
  const [uploadImg , setUploadImg] = useState(null)

  // function upload img



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
                    <th>شماره فاکتور</th>
                    <th>فاکتو تاریخ</th>
                    <th>درخواست فاکتور</th>
                  </tr>
                  {article.map((i , index)=> {
                    return(
                      <tr key={index}>
                        <td>{i.serial}</td>
                        <td>{i.date}</td>
                        <td><div onClick={()=> setModal(index)}><FontAwesomeIcon icon={i.icon}/></div></td>
                        <Modals show={modal === index}>
                          <div className='modal'>
                            <div className="modalTitle">شماره فاکتور {i.serial}</div>
                            <div className="modalBody">
                                <label style={{ cursor:'pointer' }} htmlFor="uploadImages"><FontAwesomeIcon className={styles.upload} icon={faFileUpload}/> <p style={{ marginBlock:'0' }}>بارگداری تصویر</p></label>
                                <input type="file" id="uploadImages" className="dNone" 
                                    onChange={(e , index) => {
                                      console.log(e.target.files[0]);
                                      setUploadImg(e.target.files[0]);
                                    }}
                                />
                                {uploadImg && (
                                  <div>
                                  <img width={'200px'} src={URL.createObjectURL(uploadImg)} />
                                  <br />
                                  <button onClick={()=>setUploadImg(null)}>Remove</button>
                                  </div>
                                )}
                          
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