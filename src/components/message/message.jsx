import styles from './message.module.scss'
import styled from "styled-components"
import { useEffect, useState } from 'react'
import { NavLink } from 'react-router-dom'
import avatar from '../../images/user.png'
import { useContext } from 'react'
import Context from '../../context/context'
import iconMessage from '../../images/message.svg'
import axios from 'axios'
import Loading from '../loading/loading'


const Container = styled.div`
background-image: linear-gradient(to top, #48c6ef 0%, #6f86d6 100%);
position: absolute;
top: 63px;
bottom: 72px;
width:100%;
overflow: auto;
height: -webkit-fill-available;


`

function Messages ({functionData}){

    // state context
    const {unreadMessage , setUnreadMessage , token , spinner , setSpinner } = useContext(Context)

    // title page
    useEffect(()=> {
        document.title = 'پیام ها'
    })



    useEffect(()=> {
        setSpinner(true)
        const apiMessage = async() => {
            // pass token in header api
            const config = {
                headers: { Authorization: `Bearer ${token}` }
            }
            const bodyParameters = {
            key: "value"
            }

            axios.post('http://test.rasadent.com/api/ShowList', bodyParameters, config)
            .then((Response) => {
                setUnreadMessage(Response.data.messages)
                setSpinner(false);
       
            })
            .catch( (error) => {
                console.log(error);
            })

        }
        apiMessage()

        
    },[])


    if(spinner){
        return <Loading/>
    }

    const id = Object.values(unreadMessage)

    return(
        <Container>
            {Object.keys(unreadMessage)?.length === 0 ?
                <div className={styles.empty}>
                    <img src={iconMessage} alt="" />
                    <p>پیام رسان شما خالی است</p>
                </div>
            :
                <div className={styles.row}>
                    {Object.keys(unreadMessage)?.map((i , index)=> {
                        return(
                            <div key={index} className={styles.col6}>
                                <NavLink to={`/messages-view/${id}`} className={styles.cards} onClick={()=> functionData(i)}>
                                    <div className={styles.avatar}>
                                        <img src={avatar} alt="" />
                                    </div>
                                    <div className={styles.content}>
                                        <p><span></span>امیر احمدی</p>
                                        <p>{i.slice(0 , 40)+ '...'}</p>
                                    </div>
                                </NavLink>
                            </div>
                        )
                    })}
                </div>
            }

        </Container>
    )
}

export default Messages;