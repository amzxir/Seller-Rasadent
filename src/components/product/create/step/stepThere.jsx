import { useContext , useEffect , useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from 'react-toastify';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faChevronLeft , faB , faGlobe  } from '@fortawesome/free-solid-svg-icons'
import styled from "styled-components"
import Context from "../../../../context/context"
import styles from '../create.module.scss'
import axios from "axios"
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from "yup";
import { ErrorMessage } from '@hookform/error-message';




const Container = styled.div`
`


function StepThere() {

  // context
  const {t , i18n , token} = useContext(Context)

  // title page
  useEffect(()=> {
    document.title = 'ویژگی محصولات'
  })
  
  // const brand 
  const [brand , setBrand] = useState({})

  const [feature , setFeature] = useState({})

  useEffect(()=> {
    const category_id = sessionStorage.getItem('id_category')

    const apiFeature = async() => {
        // pass token in header api
        const config = {
          headers: { Authorization: `Bearer ${token}` }
      }
      const bodyParameters = {
        key: "value",
        cat_id : category_id
      }
      const Response = await axios.post('http://testfe.rasadent.com/api/CategoryFeature', bodyParameters, config)
      setFeature(Response.data)
      console.log(Response.data)
    }

    apiFeature()
  },[])

  useEffect(()=> {
      const dataBrand = async()=> {
        // pass token in header api
        const config = {
            headers: { Authorization: `Bearer ${token}` }
        }
        const bodyParameters = {
          key: "value"
        }
        const Response = await axios.post('http://testfe.rasadent.com/api/ListBrand', bodyParameters, config)
        setBrand(Response.data.brands)

      }
      dataBrand();
  }, [])

  console.log(feature)



  // state react hook form
  const { register, formState: { errors }, handleSubmit } = useForm();



  const onSubmit = (data) => {
    console.log(data)
    toast.success("محصول با موفقیت ثبت شد")
  }

  return (
    <Container>

      <form className={styles.formProduct} onSubmit={handleSubmit(onSubmit)}>
        <div className={styles.pad}>
        <div className={styles.formGroup}>
              <label className={styles.nameLabel}>{t('labelBrand')}</label>
              <span className={styles.error}><ErrorMessage errors={errors} name="brand" /></span>
              <select className="formSelect" {...register("brand" , { required: "فیلد برند خالی است" })}>      
              <option value=''>انتخاب کنید</option>
              {Object.keys(brand).map((key, index) => {
                  return (
                    <option key={index} value={key}>{brand[key]}</option>
                  );
                })}
              </select>
              <FontAwesomeIcon icon={faB} />
          </div>
          {Array.isArray(feature) ? 
            feature.map((i, index)=> {

              const nameFeild = i.peroperty

              return(
              <div key={index} className={styles.formGroup}>
                <label htmlFor={i.id} className={styles.nameLabel}>{i.peroperty}</label>
                <span className={styles.error}><ErrorMessage errors={errors} name={i.peroperty} /></span>
                <select id={i.id} className="formSelect" {...register(i.peroperty , { required: `فیلد ${i.peroperty} خالی است` })}>
                  <option value=''>انتخاب کنید</option>
                  <option value='لورم'>لورم</option>
                </select>
                <FontAwesomeIcon icon={faGlobe} />
              </div>
              )
            })
          :
            null
          }
          <div className={styles.justifyBtn}>
            <button className="btn custom-btn"><FontAwesomeIcon icon={faChevronLeft}/>{t('submitProduct')}</button>
          </div>
        </div>
      </form>
    </Container>
  )
}

export default StepThere;