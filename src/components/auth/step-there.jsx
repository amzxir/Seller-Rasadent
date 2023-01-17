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
import Loading from '../loading/loading'



const Container = styled.div`

`
// regex error
const codeRegExp = /^[0-9]+$/

// validate form hook
const schema = yup.object().shape({
    code: yup.string().required('فیلد کد اجباری است').matches(codeRegExp, 'فیلد کد باید عدد باشد').min(4, 'کد باید ۴ رفم باشد').max(4, 'کد باید ۴ رفم باشد'),
})

function StepTwo (props){

    const {spinner , setSpinner} = useContext(Context)

    const navigate = useNavigate();

    // react hook form
    const { register, handleSubmit, formState:{ errors } } = useForm({
        resolver: yupResolver(schema),
    });


    const onSubmit = async(data) => {
        // setSpinner(true)

        // const codeOtp = data.code
        // const verify = {
        //     mobile:sessionStorage.getItem('mobile'),
        //     code:codeOtp
        // }

        // console.log(verify)

        // axios.post('https://testfe.rasadent.com/api/VerifyOtp' , verify)
        // .then(function (response) {
        //     setSpinner(false)
        //     // handle success
        //     console.log(response)
        //     const getToken = response.data.token
        //     localStorage.setItem("token" , getToken)
        //     navigate('/dashboard')
        //     toast.success("با موفقیت وارد شدید")
        // })
        // .catch(function (error) {
        //     setSpinner(false)
        //     // handle error
        //     console.log(error);
        // })
    }

    if (spinner){
        return <Loading/>
    }

    return(
        <Container>
            <div className={styles.content}>
                <h1>تاییدیه شماره موبایل</h1>
                <p>کد تایید ارسال شده به شماره موبایل را وارد نمایید.</p>
            </div>
            <form onSubmit={handleSubmit(onSubmit)}>
                <div className={styles.formGroup}>
                    <label className={styles.nameLabel}>کد ارسال شده را وارد کنید</label>
                    <span className={styles.error}>{errors.code?.message}</span>
                    <FontAwesomeIcon icon={faKey}/>
                    <input type="number" inputMode="numeric" className='formControl vazir' {...register("code")} />
                </div>
                <div className={styles.justifyCenter}>
                    <button className='btn custom-btn' style={{ maxWidth:'47%' , marginLeft:'auto' }}>تایید کد</button>
                    <button className='btn btn-secondary' style={{ maxWidth:'47%' , marginRight:'auto' }} onClick={(data)=> props.previousStep(data)}>ویرایش شماره</button>
                </div>
            </form>
        </Container>
    )
}

export default StepTwo;