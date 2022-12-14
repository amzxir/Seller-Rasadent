import { useContext, useEffect } from "react";
import styled from "styled-components"
import styles from './create.module.scss'
import Context from "../../../context/context";
import WizardForm from 'react-wizard-form'
import StepOne from "./step/stepOne";
import StepTwo from "./step/stepTwo";
import StepThere from "./step/stepThere";


const Container = styled.div`
`

function Create() {

  const dataProduct = [
    {id:1 , category:'دستکش'},
    {id:2 , category:'کامپوزیت'},
    {id:3 , category:'لورم'},
    {id:4 , category:'روکش دتدان'},
    {id:5 , category:'سفید کننده'},
  ]

  useEffect(()=> {
    document.title = 'ایجاد محصول'
  })

  const {t , i18n} = useContext(Context)
  
  return (
    <Container>
      <WizardForm>
        <StepOne dataProduct={dataProduct}/>
        <StepTwo/>
        <StepThere/>
      </WizardForm>
    </Container>
  )
}

export default Create