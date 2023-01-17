import { useContext , useEffect } from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from '@hookform/resolvers/yup';
import { toast } from 'react-toastify';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSearch , faChevronLeft } from '@fortawesome/free-solid-svg-icons'
import * as yup from "yup";
import styled from "styled-components"
import styles from '../create.module.scss'
import Context from "../../../../context/context";
import { useState } from "react";
import axios from "axios";
import Loading from "../../../loading/loading";


const Container = styled.div`
`

// validate hook form
const schema = yup.object().shape({
    category: yup.string().required('فیلد دسته بندی اجباری است'),
  
  })

function StepOne(props) {

    // title page
    useEffect(()=> {
        document.title = 'دسته بندی محصول'
    })

    // context state
    const {t , i18n , token , spinner , setSpinner} = useContext(Context)

    const [apiCategory , setApiCategory] = useState({})

    // state react hook form
    const { register, handleSubmit, formState:{ errors } } = useForm({
        resolver: yupResolver(schema)
    });
    
    const onSubmit = async(data) => {
        // setSpinner(true)
        // const name = data.category
        // // pass token in header api
        // const config = {
        //     headers: { Authorization: `Bearer ${token}` }
        // }
        // const bodyParameters = {
        //     key: "value",
        //     name:name
        // }

        // try {
        //     const Response = await axios.post(`http://testfe.rasadent.com/api/ListCategory`, bodyParameters , config)
        //     const arrayCategory = Response.data.categories
        //     // console.log(Response)
        //     setSpinner(false)
        //     if(arrayCategory.length === 0){
        //         toast.error('دسته بندی یاقت نشد')
        //     } else {
        //         setApiCategory(Response.data.categories)
        //     }
        // } catch (error) {
        //     console.error(error);
        // }


    }

    const handelCategory = async(key , data) => {
        // setSpinner(true)
        // const config = {
        //     headers: { Authorization: `Bearer ${token}` }
        // }
        // const bodyParameters = {
        //     key: "value",
        //     name:data
        // }

        // try {
        //     const Response = await axios.post(`http://testfe.rasadent.com/api/ListCategory`, bodyParameters , config)
        //     console.log(Response)
        //     sessionStorage.setItem('id_category' , key)
        //     sessionStorage.setItem('category' , data)
        //     setSpinner(false)
        //     props.nextStep(data)
        // } catch (error) {
        //     console.error(error);
        // }
    }

    if(spinner){
        return <Loading/>
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
                <div className={styles.fillter}>
                    {apiCategory && Object.keys(apiCategory).map((key, index) => {
                    return (
                        <p onClick={()=> handelCategory(key , apiCategory[key])} key={index} >{apiCategory[key]}</p>
                    )
                    })}
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