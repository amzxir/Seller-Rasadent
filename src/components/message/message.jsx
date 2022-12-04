import styles from './message.module.scss'
import styled from "styled-components"
import { useEffect, useState } from 'react'
import { NavLink } from 'react-router-dom'

const Container = styled.div`
min-height:542px;
// padding:25px 15px 0px 15px;

@media (max-width: 600px) {
    padding:25px 15px 72px 15px;
} 
`

function Messages (){

    useEffect(()=> {
        document.title = 'پیام ها'
    })

    const data =[
        {id:1 , message:'لورم ایپسوم متن ساختگی با تولید سادگی نامفهوم از صنعت چاپ و با استفاده از طراحان گرافیک است. چاپگرها و متون بلکه روزنامه و مجله در ستون و سطرآنچنان که لازم است و برای شرایط فعلی تکنولوژی مورد نیاز و کاربردهای متنوع با هدف' , messageStatus:false},
        {id:2 , message:' مجله در ستون و سطرآنچنان که لازم است و برای شرایط فعلی تکنولوژی مورد نیاز و کاربردهای متنوع با هدف' , messageStatus:false},
        {id:3 , message:'لورم ایپسوم متن ساختگی با تولید سادگی نامفهوم از صنعت چاپ و با استفاده از طراحان گرافیک است. چاپگرها و متون بلکه روزنامه و مجله در ستون و سطرآنچنی متنوع با هدف' , messageStatus:false},
        {id:4 , message:'لورم ایپسوم متن ساختگی با تولید سادگی نامفهوم از صنعت چاپ و با استفاده از طراحان گرافیک است. چاپگرها و متون بلکه روزنامه و مجله در ستون و سطرآنچنی متنوع با هدف' , messageStatus:false},
    ]

    const [dataMessage , setDataMessage] = useState(data)

    return(
        <Container>
            <div className={styles.row}>
                {dataMessage.map((i , index)=> {
                    return(
                        <div key={index} className={styles.col6}>
                            <div className={styles.card}>
                                <span></span>
                                <NavLink>{i.message.slice(0 , 40)+ '...'}</NavLink>
                            </div>
                        </div>
                        
                    )
                })}
            </div>
        </Container>
    )
}

export default Messages;