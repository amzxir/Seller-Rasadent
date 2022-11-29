import { useEffect } from 'react'
import styled from 'styled-components'
import styles from './welcome.module.scss'
import LoginSvg from '../../images/login.svg'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faArrowAltCircleLeft } from '@fortawesome/free-regular-svg-icons'



const Container = styled.div`
`

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
                    <button className='btn'>ورود <FontAwesomeIcon icon={faArrowAltCircleLeft}/></button>
                </div>
            </div>
        </Container>
    )
}

export default Welcome;