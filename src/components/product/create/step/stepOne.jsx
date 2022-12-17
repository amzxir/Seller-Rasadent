import { useContext } from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from '@hookform/resolvers/yup';
import { toast } from 'react-toastify';
import * as yup from "yup";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSearch , faChevronLeft } from '@fortawesome/free-solid-svg-icons'
import styled from "styled-components"
import styles from '../create.module.scss'
import Context from "../../../../context/context";
import { useEffect } from "react";


const Container = styled.div`
`

const schema = yup.object().shape({
    category: yup.string().required('فیلد دسته بندی اجباری است'),
  
  })

function StepOne(props) {

    useEffect(()=> {
        document.title = 'دسته بندی محصول'
    })

    const {t , i18n} = useContext(Context)

    const { register, handleSubmit, formState:{ errors } } = useForm({
        resolver: yupResolver(schema)
    });
    
    const onSubmit = (data) => {

        const responseProduct = props.dataProduct

        const checkCategory = responseProduct.find(({category}) => category === data.category )

        console.log(checkCategory)

        if(!checkCategory) {
            toast.error("دسته بندی یافت نشد")
            console.log('mobile undefined')
        } else {
            console.log(data)
            props.nextStep(data);
        }
    }

  return (
    <Container>
        <form className={styles.formProduct}  onSubmit={handleSubmit(onSubmit)}>
            <div className={styles.pad}>
                <div className={styles.formGroup}>
                    <label className={styles.nameLabel}>{t('categoryProduct')}</label>
                    <span className={styles.error}>{errors.category?.message}</span>
                    <input type="text" className="formControl" {...register("category")}/>
                    <FontAwesomeIcon icon={faSearch}/>
                </div>
                <div className={styles.justifyBtn}>
                    <button className="btn custom-btn"><FontAwesomeIcon icon={faChevronLeft}/>{t('nextStep')}</button>
                </div>
            </div>
        </form>
    </Container>
  )
}

export default StepOne;