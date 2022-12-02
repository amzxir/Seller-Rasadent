import { useLocation, useNavigate } from "react-router-dom"
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faChevronLeft } from '@fortawesome/free-solid-svg-icons'
import styled from "styled-components"
import styles from './nav.module.scss'

const Container = styled.div`

`

function Nav (){

    const {pathname} = useLocation()

    const navigate = useNavigate();

    const navBack = () => {
        return(
            <Container>
            <div className={styles.nav}>
                <div onClick={() => navigate(-1)} className={styles.back}>
                    <p>بازگشت</p>
                    <FontAwesomeIcon fontSize={13} icon={faChevronLeft}/>
                </div>
            </div>
        </Container>
        )
    }

    const navWelcome = () => {
        return(
            <Container>
            <div className={styles.nav}>
                <div className={styles.welcome}>
                    <p>امیر احمدی عزیز خوش آمدید</p>
                </div>
            </div>
        </Container>
        )
    }

    return(
        <>
            {pathname === '/login' || pathname === '/create-product' || pathname === '/manage-product' ? navBack():null }
            {pathname === '/dashboard' || pathname === '/product' || pathname === '/invoice' || pathname === '/messages' ? navWelcome():null }
        </>
    )
}

export default Nav;