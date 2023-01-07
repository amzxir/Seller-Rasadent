import { useEffect, useState } from "react"
import styled from "styled-components"
import WizardForm from 'react-wizard-form'
import StepOne from "./step-one"
import StepTwo from "./step-two"
import axios from "axios"



const Container = styled.div`
padding:25px 15px 0px 15px;
`


function Login (){

    // title page
    useEffect(()=> {
        document.title = 'ورود به حساب کاربری'
    })

    useEffect(()=> [
        
    ])

    const [apiLogin , setApiLogin] = useState()

    // data login
    const request = [
        {id:1 , mobile:'09199954356' , code:'2341'},
        {id:2 , mobile:'09379026444' , code:'1234'},
    ]

    const [mobileData , setMobileData] = useState()

    return(
        <Container>
            <WizardForm>
                <StepOne data={request} setMobileData={setMobileData}/>
                <StepTwo data={request} mobileData={mobileData}/>
            </WizardForm>
        </Container>
    )
}

export default Login;