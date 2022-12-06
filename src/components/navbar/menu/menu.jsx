import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHome , faBox , faFileInvoice , faMessage } from '@fortawesome/free-solid-svg-icons'
import { NavLink, useLocation } from 'react-router-dom';
import styled from 'styled-components'
import styles from './menu.module.scss'

const Container = styled.div`
position: sticky;
bottom: 0%;
width:100%;

@media (max-width: 600px) {
    position: fixed;
} 
`

function Menu ({id}){

    const {pathname} = useLocation()

    const menu = () => {
        return(
            <Container>
                <nav className={styles.navbar}>
                    <NavLink to='/dashboard' className={({ isActive }) => (isActive ? 'actives' : 'notActive')}><FontAwesomeIcon icon={faHome}/></NavLink>
                    <NavLink to='/product' className={({ isActive }) => (isActive ? 'actives' : 'notActive')}><FontAwesomeIcon icon={faBox}/></NavLink>
                    <NavLink to='/invoice' className={({ isActive }) => (isActive ? 'actives' : 'notActive')}><FontAwesomeIcon icon={faFileInvoice}/><span className={styles.bage}><small>5</small></span></NavLink>
                    <NavLink to='/messages' className={({ isActive }) => (isActive ? 'actives' : 'notActive')}><FontAwesomeIcon icon={faMessage}/><span className={styles.bage}><small>1</small></span></NavLink>
                </nav>
            </Container>
        )
    }
    
    return(
        <>
        {pathname !== '/' && pathname !== '/login' && 
        pathname !== '/create-product' && pathname !== '/manage-product' && 
        pathname !== '/edit-product' && pathname !== `/edit-product/${id}` 
        && pathname !== '/manage-invoice' && pathname !== `/view-invoice/${id}` 
        &&  pathname !== `/messages-view/${id}` && pathname !== '/request-invoice'   ? menu() : null}
        </>
    )
}

export default Menu;