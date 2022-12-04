import styles from './manage.module.scss'
import styled from "styled-components"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faFileInvoice , faTrash , faEye } from '@fortawesome/free-solid-svg-icons'
import { useEffect } from 'react';
import { NavLink } from 'react-router-dom';

const Container = styled.div`
min-height:517px;
padding:25px 15px 0px 15px;

@media (max-width: 600px) {
    padding:25px 15px 72px 15px;
} 
`

function Manage (){

    useEffect(()=> {
        document.title = 'مدیریت فاکتور ها'
    })

    return(
        <Container>
            <div className={styles.row}>
                <div className={styles.col6}>
                    <div className={styles.card}>
                        <div className={styles.content}>
                            <span><FontAwesomeIcon icon={faFileInvoice}/></span>
                            <p>فاکتور شماره 1</p>
                        </div>
                        <div className={styles.manage}>
                            <NavLink><FontAwesomeIcon icon={faEye}/></NavLink>
                            <span><FontAwesomeIcon icon={faTrash}/></span>
                        </div>
                    </div>
                </div>
            </div>
        </Container>
    )
}

export default Manage;