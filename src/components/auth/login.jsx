import { useEffect, useState } from "react"
import styled from "styled-components"
import WizardForm from 'react-wizard-form'
import StepOne from "./step-one"
import StepTwo from "./step-two"
import StepThere from "./step-there"



const Container = styled.div`
padding:25px 15px 0px 15px;
`


function Login (){

    // title page
    useEffect(()=> {
        document.title = 'ورود به حساب کاربری'
    })

    const [mobileData , setMobileData] = useState()

    return(
        <Container>
            <WizardForm>
                <StepOne 
                    // data={request} 
                    setMobileData={setMobileData}
                />
                <StepTwo 
                    // data={request} 
                    mobileData={mobileData}
                />
                <StepThere/>
            </WizardForm>
        </Container>
    )
}

export default Login;