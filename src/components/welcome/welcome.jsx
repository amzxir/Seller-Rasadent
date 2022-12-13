import { useEffect , useState } from 'react'
import { NavLink } from 'react-router-dom'
import styled from 'styled-components'
import styles from './welcome.module.scss'
import LoginSvg from '../../images/login.svg'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faArrowAltCircleLeft } from '@fortawesome/free-regular-svg-icons'




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
            <div className={styles.Welcome}>
                <div className={styles.content}>
                    <small>خوش آمدید</small>
                    <h1>لورم ایپسوم متن ساختگی با تولید سادگی نامفهوم از صنعت چاپ</h1>
                    <p>لورم ایپسوم متن ساختگی با تولید سادگی نامفهوم از صنعت چاپ</p>
                </div>
                <div className={styles.bottomContent}>
                    <div className={styles.imgCenter}>
                        <img src={LoginSvg} alt="" />
                    </div>
                    <NavLink className='btn' to='/login'>ورود <FontAwesomeIcon icon={faArrowAltCircleLeft}/></NavLink>
                </div>
            </div>
        </Container>
    )
}

export default Welcome;