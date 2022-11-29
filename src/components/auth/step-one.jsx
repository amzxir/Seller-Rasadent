import { useForm } from "react-hook-form";
import { yupResolver } from '@hookform/resolvers/yup';
import { toast } from 'react-toastify';
import * as yup from "yup";
import styled from "styled-components"
import styles from './login.module.scss'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faMobileAlt  } from '@fortawesome/free-solid-svg-icons'


const Container = styled.div`

`

const phoneRegExp = /^(\+\d{1,3}[- ]?)?\d{11}$/

const schema = yup.object().shape({
    mobile: yup.string().required('فیلد شماره موبایل اجباری است').matches(phoneRegExp , 'شماره موبایل را به درستی وارد کنید'),
})

function StepOne (props){

    const { register, handleSubmit, formState:{ errors } } = useForm({
        resolver: yupResolver(schema),
    });
    const onSubmit = (data) => {
        const request = props.data
        const checkMobile = request.find(({ mobile }) => mobile === data.mobile);
        if(!checkMobile){
            toast.error("شماره موبایل یافت نشد")
            console.log('mobile undefined')
        } else {
            console.log(data)
            props.nextStep(data);
        }
    }

    return(
        <Container>
            <div className={styles.content}>
                <h1>ورود به حساب کاربری</h1>
                <p>برای ورود به حساب کاربری، شماره موبایل خود را وارد نمایید.</p>
            </div>
            <form onSubmit={handleSubmit(onSubmit)}>
                <div className={styles.formGroup}>
                    <label className={styles.nameLabel}>شماره موبایل</label>
                    <span className={styles.error}>{errors.mobile?.message}</span>
                    <FontAwesomeIcon icon={faMobileAlt}/>
                    <input type="text" className='formControl' {...register("mobile")} />
                </div>
                <div className={styles.justifyCenter}>
                    <button className='btn custom-btn'>ارسال کد</button>
                </div>
            </form>
        </Container>
    )
}

export default StepOne;