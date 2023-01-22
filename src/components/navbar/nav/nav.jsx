import { useContext , useEffect } from "react"
import { NavLink, useLocation, useNavigate } from "react-router-dom"
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faChevronLeft , faMessage , faSignOutAlt } from '@fortawesome/free-solid-svg-icons'
import styled from "styled-components"
import styles from './nav.module.scss'
import avatar from '../../../images/user.png'
import Context from '../../../context/context'
import { toast } from 'react-toastify'
import axios from "axios"




const Container = styled.div`
position:sticky;
top:0;
z-index:10000;
`

function Nav ({id}){

    const {pathname} = useLocation()

    const navigate = useNavigate()

    const {unreadMessage} = useContext(Context)


    const logOut = () => {
        localStorage.clear("token")
        console.log('logout')
    }


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
                <div className={styles.navs}>
                        <div className={styles.content}>
                            <img src={avatar} alt="" />
                            <p>فروشگاه رسادنت</p>
                        </div>
                        <div className={styles.item}>
                            <NavLink to='/messages'><FontAwesomeIcon icon={faMessage}/><span className={styles.bage}><small>{Object.values(unreadMessage)?.length}</small></span></NavLink>
                            <div onClick={logOut}><FontAwesomeIcon icon={faSignOutAlt}/></div>
                        </div>
                </div>
            </Container>
        )
    }

    return(
        <>
            {pathname === '/login' || pathname === '/create-product' ||
            pathname === '/manage-product' || pathname === `/edit-product/${id}`
            || pathname === '/manage-invoice' || pathname === `/view-invoice/${id}` 
            || pathname === `/messages-view/${id}` || pathname === '/request-invoice'  ? navBack():null }
            {pathname === '/dashboard' || pathname === '/product' || pathname === '/invoice' || pathname === '/messages' ? navWelcome():null }
        </>
    )
}

export default Nav;