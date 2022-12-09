import { useEffect , useState } from "react"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faEye , faSearch } from '@fortawesome/free-solid-svg-icons'
import styled from "styled-components"
import styles from './request.module.scss'

const Container = styled.div`
padding:25px 0px 0px 0px;
`

// data tabel
const data = [
  {serial:'0024006547' , date:'1400/2/4' , icon:faEye},
  {serial:'003400938' , date:'1400/5/4' , icon:faEye},
  {serial:'001234642' , date:'1400/7/4' , icon:faEye}
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
              <FontAwesomeIcon icon={faSearch}/>
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
                        <td><FontAwesomeIcon icon={i.icon}/></td>
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