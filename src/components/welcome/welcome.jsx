import styled from 'styled-components';
import styles from './welcome.module.scss'


const Container = styled.div`
`

function Welcome (){
    return(
        <Container>
            <div className={styles.Welcome}>

            </div>
        </Container>
    )
}

export default Welcome;