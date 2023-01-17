import { useContext , useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faKey } from '@fortawesome/free-solid-svg-icons'
import { useForm } from "react-hook-form"
import { toast } from 'react-toastify'
import { yupResolver } from '@hookform/resolvers/yup'
import * as yup from "yup"
import styled from "styled-components"
import styles from './login.module.scss'
import Context from '../../context/context'
import axios from 'axios'
import Loading from '../loading/loading'


const Container = styled.div`

`


// validate form hook
const schema = yup.object().shape({
    password: yup.string().required('فیلد کد اجباری است'),
})

function StepTwo (props){

    // state context
    const {spinner ,setSpinner} = useContext(Context)

    const navigate = useNavigate();

    // react hook form
    const { register, handleSubmit, formState:{ errors } } = useForm({
        resolver: yupResolver(schema),
    });
    

    const onSubmit = (data) => {
        setSpinner(true)

        const mobileUser = sessionStorage.getItem('mobile')
        const passwordUser = data.password

        const loginApi = { 
            mobile:mobileUser,
            password:passwordUser
        }

        console.log(loginApi)

        axios.post('http://test.rasadent.com/api/login' , loginApi )
        
        .then((response) => {
            console.log(response)
            setSpinner(false)

            const statusCode = response.data.status_code
            const errorMsg = response.data.msg

            if (statusCode === 422) {
                toast.error(errorMsg)
            } else if (statusCode === 500) {
                console.log('error server')
            } else {
                const getToken = response.data.token
                console.log('ok' , getToken)
                localStorage.setItem("token" , getToken)
                navigate('/dashboard')
            }

            
        })
        .catch( (error) => {
            setSpinner(false)
            console.log(error);
        })
    }

    const handelCode = () => {
        setSpinner(true)
        const userMobile = sessionStorage.getItem('mobile')
        const sendCode = {
            mobile:userMobile
        }
        console.log(sendCode)
        axios.post('https://test.rasadent.com/api/SendOtp' , sendCode)
        .then(function (Response) {
            setSpinner(false)
            // handle success
            console.log(Response)

            if(Response.data.msg === "code send"){
                toast.success('کد ارسال شد')
                props.nextStep()
            } else if (Response.data.status_code === 422){
                toast.error(Response.data.msg)

            }

        })
        .catch(function (error) {
            setSpinner(false)
            // handle error
            console.log(error)
        })



    }

    if(spinner){
        return <Loading/>
    }

    return(
        <Container>
            <div className={styles.content}>
                <h1>تاییدیه شماره موبایل</h1>
                <p>گذرواژه خود را وارد کنید یا <span onClick={handelCode} style={{ cursor:'pointer' , fontWeight:'bold' }}>ورود با کد</span>.</p>
            </div>
            <form onSubmit={handleSubmit(onSubmit)}>
                <div className={styles.formGroup}>
                    <label className={styles.nameLabel}>گذرواژه</label>
                    <span className={styles.error}>{errors.password?.message}</span>
                    <FontAwesomeIcon icon={faKey}/>
                    <input type="text" className='formControl vazir' {...register("password")} />
                </div>
                <div className={styles.justifyCenter}>
                    <button className='btn custom-btn' style={{ maxWidth:'47%' , marginLeft:'auto' }}>ثبت</button>
                    <button className='btn btn-secondary' style={{ maxWidth:'47%' , marginRight:'auto' }} onClick={(data)=> props.previousStep(data)}>ویرایش شماره</button>
                </div>
            </form>
        </Container>
    )
}

export default StepTwo;