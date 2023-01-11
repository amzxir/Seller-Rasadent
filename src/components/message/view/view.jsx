import { useEffect } from "react"
import { useParams } from "react-router-dom"
import styled from "styled-components"
import styles from './view.module.scss'

const Container = styled.div`
padding:25px 15px 0px 15px;

`

function Veiw({dataManage , setId}) {

  useEffect(()=> {
      document.title = 'مشاهده پیام'
  })

  // console.log(dataManage)

  const {i} = useParams();

  useEffect(()=>{
    setId(i)
  },[i])

  return (
    <Container>
        <div className={styles.card}>
          <p>{dataManage}</p>
        </div>
    </Container>
  )
}

export default Veiw