import styles from './invoice.module.scss'
import styled from "styled-components"

const Container = styled.div`
min-height:517px;
padding:25px 15px 0px 15px;

@media (max-width: 600px) {
    padding:25px 15px 90px 15px;
} 
`

function Invoice (){
    return(
        <Container>
        invoice
        </Container>
    )
}

export default Invoice;