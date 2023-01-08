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
    const {setAuth} = useContext(Context)

    const navigate = useNavigate();

    // react hook form
    const { register, handleSubmit, formState:{ errors } } = useForm({
        resolver: yupResolver(schema),
    });

    const onSubmit = async(data) => {

        // find code in array
        // const checkCode = request.find(({ code }) => code === data.code);

        if (!data){
            
            toast.error("گذرواژه را به درستی وارد کنید")
            console.log('password undefined')

        } else {

            const password = data
            const Response = await axios.post(`https://test.rasadent.com/api/login` , password)
            console.log(password)
            toast.success("با موفقیت وارد شدید")
            navigate('/dashboard')

        }

        setAuth(true)
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