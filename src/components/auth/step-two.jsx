import { useContext } from 'react'
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



const Container = styled.div`

`


// validate form hook
const schema = yup.object().shape({
    password: yup.string().required('فیلد کد اجباری است'),
})

function StepTwo (props){

    // state context
    const {setAuth , auth} = useContext(Context)

    const navigate = useNavigate();

    // react hook form
    const { register, handleSubmit, formState:{ errors } } = useForm({
        resolver: yupResolver(schema),
    });
    
    
    const onSubmit = async(data) => {

        const mobile = props.data.mobile
        const password = data.password

        const loginApi = { mobile , password }

        console.log(loginApi)

        axios.post('https://testfe.rasadent.com/api/login' , loginApi)
        
        .then( (response) => {

            const statusCode = response.data.status_code
            const errorMsg = response.data.msg

            if (statusCode === 422) {
                toast.error(errorMsg)
            } else if (statusCode === 500) {
                console.log('error server')
            } else {
                const getToken = response.data.token
                console.log('ok' , getToken)
                localStorage.setItem("token" , response.data.token)
                navigate('/dashboard')
            }

            
        })
        .catch( (error) => {
            console.log(error);
        })
    }

    const handelCode = () => {
        const mobile = props.data
        props.nextStep(mobile)

    }

    return(
        <Container>
            <div className={styles.content}>
                <h1>تاییدیه شماره موبایل</h1>
                <p>گذرواژه خود را وارد کنید یا <span style={{ cursor:'pointer' , fontWeight:'bold' }} onClick={handelCode}>ورود با کد</span>.</p>
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