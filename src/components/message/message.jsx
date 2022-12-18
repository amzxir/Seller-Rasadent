import styles from './message.module.scss'
import styled from "styled-components"
import { useEffect, useState } from 'react'
import { NavLink } from 'react-router-dom'
import avatar from '../../images/user.png'

const Container = styled.div`
background-image: linear-gradient(to top, #48c6ef 0%, #6f86d6 100%);

@media (min-width: 600px) {
    min-height:532px;
} 

// @media (min-width: 600px) {
//     padding:25px 15px 72px 15px;
// } 
`

function Messages ({functionData}){

    useEffect(()=> {
        document.title = 'پیام ها'
    })

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
            <div className={styles.row}>
                {dataMessage.map((i , index)=> {
                    return(
                        <div key={index} className={styles.col6}>
                            <NavLink to={`/messages-view/${i.id}`} className={styles.cards} onClick={()=> functionData(i)}>
                                <div className={styles.avatar}>
                                    <img src={avatar} alt="" />
                                </div>
                                <div className={styles.content}>
                                    <p><span></span>{i.name}</p>
                                    <p>{i.message.slice(0 , 40)+ '...'}</p>
                                </div>
                            </NavLink>
                        </div>
                    )
                })}

            </div>
        </Container>
    )
}

export default Messages;