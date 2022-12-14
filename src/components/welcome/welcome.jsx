import { useEffect , useState } from 'react'
import { NavLink } from 'react-router-dom'
import styled from 'styled-components'
import styles from './welcome.module.scss'
import logo from '../../images/logo.png'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faArrowAltCircleLeft } from '@fortawesome/free-regular-svg-icons'
import { faChevronLeft, faChevronRight } from '@fortawesome/free-solid-svg-icons'
import bg from '../../images/022.jpg'




const Container = styled.div`
`

const Loading = styled.div({
    height:'667px',
    display:'flex',
    justifyContent:'center',
    alignItems:'center',
    backgroundImage: 'linear-gradient(120deg, #a1c4fd 0%, #c2e9fb 100%)',

    '@media (max-width: 600px)': {
        height:'100vh',

    },

    '&> div.content':{
        textAlign:'center',

        '& h1':{
            fontSize:'20px',
            fontFamily:'sans-serif',
            color:'#119FDC',
        },
        

        '& img':{
            maxWidth:'60%',
            height:'auto',
            zIndex:'1000'
        }
    }
})

function Welcome (){

    useEffect(()=> {
        document.title = 'خوش آمدید'
    })

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
                <p>Seller Rasadent Application</p>
            </div>
        </Container>
    )
}

export default Welcome;