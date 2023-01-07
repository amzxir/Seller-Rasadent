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



const Container = styled.div`

`
// regex error
const codeRegExp = /^[0-9]+$/

// validate form hook
const schema = yup.object().shape({
    code: yup.string().required('فیلد کد اجباری است').matches(codeRegExp, 'فیلد کد باید عدد باشد').min(4, 'کد باید ۴ رفم باشد').max(4, 'کد باید ۴ رفم باشد'),
})

function StepTwo (props){

    // state context
    const {setAuth} = useContext(Context)

    const navigate = useNavigate();

    // react hook form
    const { register, handleSubmit, formState:{ errors } } = useForm({
        resolver: yupResolver(schema),
    });


    const onSubmit = (data) => {

        // const mobile = props.mobileData

        // const request = props.data

        // find code in array
        // const checkCode = request.find(({ code }) => code === data.code);

        if (!data){
            
            toast.error("کد را به درستی وارد کنید")
            console.log('code undefined')

        } else {

            const code = data
            // const otp = {code , mobile}
            console.log(code)
            toast.success("با موفقیت وارد شدید")
            navigate('/dashboard')

        }

        setAuth(true)
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
                    <input type="number" className='formControl vazir' {...register("code")} />
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