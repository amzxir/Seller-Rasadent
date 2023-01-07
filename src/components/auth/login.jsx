import { useEffect, useState } from "react"
import styled from "styled-components"
import WizardForm from 'react-wizard-form'
import StepOne from "./step-one"
import StepTwo from "./step-two"
import StepThere from "./step-there"
import axios from "axios"



const Container = styled.div`
padding:25px 15px 0px 15px;
`


function Login (){

    const [apiLogin , setApiLogin] = useState({})

    useEffect(()=> {
        const dataLogin = async() => {
            const Response = await axios.get(`https://reqres.in/api/users?page=2`)
            setApiLogin(Response.data.data)
        }

        dataLogin();
    },[])

    // title page
    useEffect(()=> {
        document.title = 'ورود به حساب کاربری'
    })

    // data login
    // const request = [
    //     {id:1 , mobile:'09199954356' , code:'2341'},
    //     {id:2 , mobile:'09379026444' , code:'1234'},
    // ]

    // console.log(apiLogin)

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