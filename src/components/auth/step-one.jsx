import { useContext } from "react";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faMobileAlt  } from '@fortawesome/free-solid-svg-icons'
import { useForm } from "react-hook-form";
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from "yup";
import styled from "styled-components"
import styles from './login.module.scss'
import Context from "../../context/context";





const Container = styled.div`

`

// regex error
const phoneRegExp = /^(\+\d{1,3}[- ]?)?\d{11}$/


// validate form hook
const schema = yup.object().shape({
    mobile: yup.string().required('فیلد شماره موبایل اجباری است').matches(phoneRegExp , 'شماره موبایل را به درستی وارد کنید'),
})

function StepOne (props){

    // language application
    const {t , i18n} = useContext(Context)

    // react hook form
    const { register, handleSubmit, formState:{ errors } } = useForm({
        resolver: yupResolver(schema),
    });


    const onSubmit = (data) => {
        sessionStorage.setItem('mobile' , data.mobile)
        console.log(data)
        props.nextStep()
    }

    return(
        <Container>
            <div className={styles.content}>
                <h1>ورود به حساب کاربری</h1>
                <p>برای ورود به حساب کاربری، شماره موبایل خود را وارد نمایید.</p>
            </div>
            <form onSubmit={handleSubmit(onSubmit)}>
                <div className={styles.formGroup}>
                    <label className={styles.nameLabel}>{t('labelMobile')}</label>
                    <span className={styles.error}>{errors.mobile?.message}</span>
                    <FontAwesomeIcon icon={faMobileAlt}/>
                    <input type="number" inputMode="numeric" className='formControl vazir' {...register("mobile")} />
                </div>
                <div className={styles.justifyCenter}>
                    <button className='btn custom-btn'>تایید</button>
                </div>
            </form>
        </Container>
    )
}

export default StepOne;