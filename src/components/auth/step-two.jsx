import { useNavigate } from 'react-router-dom'
import styled from "styled-components"
import styles from './login.module.scss'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faKey } from '@fortawesome/free-solid-svg-icons'
import { useForm } from "react-hook-form"
import { toast } from 'react-toastify'
import { yupResolver } from '@hookform/resolvers/yup'
import * as yup from "yup"



const Container = styled.div`

`

const codeRegExp = /^[0-9]+$/

const schema = yup.object().shape({
    code: yup.string().required('فیلد کد اجباری است').matches(codeRegExp , 'فیلد کد باید عدد باشد').min(4, 'کد باید ۴ رفم باشد').max(4, 'کد باید ۴ رفم باشد'),
})

function StepTwo (props){

    const navigate = useNavigate();
    const { register, handleSubmit, formState:{ errors } } = useForm({
        resolver: yupResolver(schema),
    });
    const onSubmit = (data) => {
        const request = props.data
        const checkCode = request.find(({ code }) => code === data.code);
        if (!checkCode){
            toast.error("کد را به درستی وارد کنید")
            console.log('code undefined')
        } else {
            console.log(data)
            toast.success("با موفقیت وارد شدید")
            navigate('/dashboard')
        }
    }

    return(
        <Container>
            <div className={styles.content}>
                <h1>تاییدیه شماره موبایل</h1>
                <p>کد تایید ارسال شده به شماره موبایل را وارد نمایید.</p>
            </div>
            <form onSubmit={handleSubmit(onSubmit)}>
                <div className={styles.formGroup}>
                    <label className={styles.nameLabel}>کد تایید</label>
                    <span className={styles.error}>{errors.code?.message}</span>
                    <FontAwesomeIcon icon={faKey}/>
                    <input type="text" className='formControl' {...register("code")} />
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