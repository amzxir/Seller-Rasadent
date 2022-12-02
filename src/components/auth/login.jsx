import { useEffect, useState } from "react"
import styled from "styled-components"
import WizardForm from 'react-wizard-form'
import StepOne from "./step-one"
import StepTwo from "./step-two"


const Container = styled.div`
padding:25px 15px 0px 15px;
`


function Login (){

    useEffect(()=> {
        document.title = 'ورود به حساب کاربری'
    })

    const request = [
        {id:1 , mobile:'09199954356' , code:'2341'},
        {id:2 , mobile:'09127031823' , code:'1234'},
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