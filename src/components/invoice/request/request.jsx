import { useEffect } from "react"
import styled from "styled-components"
import styles from './request.module.scss'

const Container = styled.div`
padding:25px 15px 0px 15px;
`

function Request() {

  useEffect(()=> {
    document.title = 'درحواست فاکتوز رسمی'
  })

  return (
    <Container>
        ks
    </Container>
  )
}

export default Request;