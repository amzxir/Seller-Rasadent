import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHome , faBox , faFileInvoice , faMessage } from '@fortawesome/free-solid-svg-icons'
import { NavLink, useLocation } from 'react-router-dom';
import styled from 'styled-components'
import styles from './menu.module.scss'

const Container = styled.div`
position: sticky;
bottom: 0%;
width:100%;
`

function Menu (){

    const {pathname} = useLocation()

    const menu = () => {
        return(
            <Container>
                <nav className={styles.navbar}>
                    <NavLink><div className={styles.active}><FontAwesomeIcon icon={faHome}/></div></NavLink>
                    <NavLink><div className={styles.notActive}><FontAwesomeIcon icon={faBox}/></div></NavLink>
                    <NavLink><div className={styles.notActive}><FontAwesomeIcon icon={faFileInvoice}/></div></NavLink>
                    <NavLink><div className={styles.notActive}><FontAwesomeIcon icon={faMessage}/></div></NavLink>
                </nav>
            </Container>
        )
    }
    
    return(
        <>
        {pathname !== '/' && pathname !== '/login' ? menu() : null}
        </>
    )
}

export default Menu;