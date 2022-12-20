import { useEffect , useState , useContext } from 'react'
import { NavLink } from 'react-router-dom'
import styled from 'styled-components'
import styles from './welcome.module.scss'
import logo from '../../images/logo.png'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faChevronLeft } from '@fortawesome/free-solid-svg-icons'
import bg from '../../images/022.jpg'
import Context from '../../context/context'

const Container = styled.div`
`



function Welcome (){

    useEffect(()=> {
        document.title = 'خوش آمدید'
    })

    const {t , i18n} = useContext(Context)

    return(
        <Container>
            <img src={bg} alt="" className={styles.bg} />
            <div className={styles.Welcome}>
                <div className={styles.content}>
                    <div className={styles.centerImg}>
                        <img id={styles.heart} src={logo} alt="" />
                    </div>
                    <div className={styles.bottomContent}>
                        <NavLink className='btn' to='/login'>ورود <FontAwesomeIcon icon={faChevronLeft}/></NavLink>
                    </div>
                </div>
            </div>
            <div className={styles.border}>
                <p>{t('namePlatform')}</p>
            </div>
        </Container>
    )
}

export default Welcome;