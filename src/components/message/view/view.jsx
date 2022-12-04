import { useEffect } from "react"
import styled from "styled-components"

const Container = styled.div`

`

function Veiw() {

    useEffect(()=> {
        document.title = 'مشاهده پیام'
    })

  return (
    <Container>
        message view
    </Container>
  )
}

export default Veiw