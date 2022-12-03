import { useEffect } from "react";
import { useParams } from "react-router-dom";
import styled from "styled-components"
import styles from './edit.module.scss'


const Container = styled.div`
padding:25px 15px 0px 15px;
`

function Edit({dataManage , setId}) {

  const {id} = useParams();

  useEffect(()=> {
    setId(id)
  },[id])

  console.log(dataManage)

  return (
    <Container>
        
    </Container>
  )
}

export default Edit;