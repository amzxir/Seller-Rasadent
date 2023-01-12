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
        const apiMessage = async() => {
            // pass token in header api
            const config = {
                headers: { Authorization: `Bearer ${token}` }
            }
            const bodyParameters = {
            key: "value"
            }
            const Response = await axios.post('http://testfe.rasadent.com/api/ShowList', bodyParameters, config)
            setUnreadMessage(Response.data.messages)
        }
        apiMessage()

        
    },[])


    const data =[
        {id:1 , name:'امیر احمدی', message:'لورم ایپسوم متن ساختگی با تولید سادگی نامفهوم از صنعت چاپ و با استفاده از طراحان گرافیک است. چاپگرها و متون بلکه روزنامه و مجله در ستون و سطرآنچنان که لازم است و برای شرایط فعلی تکنولوژی مورد نیاز و کاربردهای متنوع با هدف' , messageStatus:false},
        {id:2 , name:'لورم اپیسوم' ,message:' مجله در ستون و سطرآنچنان که لازم است و برای شرایط فعلی تکنولوژی مورد نیاز و کاربردهای متنوع با هدف' , messageStatus:false},
        {id:3 , name:'ایناز اسلامی', message:'لورم ایپسوم متن ساختگی با تولید سادگی نامفهوم از صنعت چاپ و با استفاده از طراحان گرافیک است. چاپگرها و متون بلکه روزنامه و مجله در ستون و سطرآنچنی متنوع با هدف' , messageStatus:false},
        {id:4 , name:'سعید جعفری' ,message:'لورم ایپسوم متن ساختگی با تولید سادگی نامفهوم از صنعت چاپ و با استفاده از طراحان گرافیک است. چاپگرها و متون بلکه روزنامه و مجله در ستون و سطرآنچنی متنوع با هدف' , messageStatus:false},
        {id:4 , name:'سعید جعفری' ,message:'لورم ایپسوم متن ساختگی با تولید سادگی نامفهوم از صنعت چاپ و با استفاده از طراحان گرافیک است. چاپگرها و متون بلکه روزنامه و مجله در ستون و سطرآنچنی متنوع با هدف' , messageStatus:false},
        {id:4 , name:'سعید جعفری' ,message:'لورم ایپسوم متن ساختگی با تولید سادگی نامفهوم از صنعت چاپ و با استفاده از طراحان گرافیک است. چاپگرها و متون بلکه روزنامه و مجله در ستون و سطرآنچنی متنوع با هدف' , messageStatus:false},
        {id:4 , name:'سعید جعفری' ,message:'لورم ایپسوم متن ساختگی با تولید سادگی نامفهوم از صنعت چاپ و با استفاده از طراحان گرافیک است. چاپگرها و متون بلکه روزنامه و مجله در ستون و سطرآنچنی متنوع با هدف' , messageStatus:false},
        {id:4 , name:'سعید جعفری' ,message:'لورم ایپسوم متن ساختگی با تولید سادگی نامفهوم از صنعت چاپ و با استفاده از طراحان گرافیک است. چاپگرها و متون بلکه روزنامه و مجله در ستون و سطرآنچنی متنوع با هدف' , messageStatus:false},
        {id:4 , name:'سعید جعفری' ,message:'لورم ایپسوم متن ساختگی با تولید سادگی نامفهوم از صنعت چاپ و با استفاده از طراحان گرافیک است. چاپگرها و متون بلکه روزنامه و مجله در ستون و سطرآنچنی متنوع با هدف' , messageStatus:false},

    ]



    const [dataMessage , setDataMessage] = useState(data)

    return(
        <Container>
            {unreadMessage?.length === 0 ?
                <div className={styles.empty}>
                    <img src={iconMessage} alt="" />
                    <p>پیام رسان شما خالی است</p>
                </div>
            :
                <div className={styles.row}>
                    {unreadMessage?.map((i , index)=> {
                        return(
                            <div key={index} className={styles.col6}>
                                <NavLink to={`/messages-view/${i}`} className={styles.cards} onClick={()=> functionData(i)}>
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