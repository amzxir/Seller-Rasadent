import { useContext } from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from "yup";
import { toast } from 'react-toastify';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faChevronLeft , faB , faGlobe , faHandHoldingMedical , faHandshake  } from '@fortawesome/free-solid-svg-icons'
import styled from "styled-components"
import Context from "../../../../context/context";
import styles from '../create.module.scss'
import StepOne from "./stepOne";
import { useEffect } from "react";

const Container = styled.div`
`

const schema = yup.object().shape({
  brand: yup.string().required('فیلد برند اجباری است'),
  country: yup.string().required('فیلد کشور سازنده اجباری است'),
  warranty: yup.string().required('فیلد گارانتی اجباری است'),
  guarantee: yup.string().required('فیلد ضمانت اجباری است'),

})

function StepThere(props) {

useEffect(()=> {
  document.title = 'ویژگی محصولات'
})

  const {t , i18n} = useContext(Context)

  const { register, handleSubmit, formState:{ errors } } = useForm({
    resolver: yupResolver(schema)
  });

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
              <span className={styles.error}>{errors.brand?.message}</span>
              <select className="formSelect" {...register("brand")}>
                <option value=''>انتخاب کنید</option>
                <option value='لورم'>لورم</option>

              </select>
              <FontAwesomeIcon icon={faB} />
          </div>
          <div className={styles.formGroup}>
            <label className={styles.nameLabel}>{t('labelCountry')}</label>
            <span className={styles.error}>{errors.country?.message}</span>
            <select className="formSelect" {...register("country")}>
              <option value=''>انتخاب کنید</option>
              <option value='لورم'>لورم</option>

            </select>
            <FontAwesomeIcon icon={faGlobe} />
          </div>
          <div className={styles.formGroup}>
            <label className={styles.nameLabel}>{t('labelWarranty')}</label>
            <span className={styles.error}>{errors.warranty?.message}</span>
            <select className="formSelect" {...register("warranty")}>
              <option value=''>انتخاب کنید</option>
              <option value='لورم'>لورم</option>

            </select>
            <FontAwesomeIcon icon={faHandHoldingMedical} />
          </div>
          <div className={styles.formGroup}>
            <label className={styles.nameLabel}>{t('labelGuarantee')}</label>
            <span className={styles.error}>{errors.guarantee?.message}</span>
            <select className="formSelect" {...register("guarantee")}>
              <option value=''>انتخاب کنید</option>
              <option value='لورم'>لورم</option>

            </select>
            <FontAwesomeIcon icon={faHandshake} />
          </div>
          <div className={styles.justifyBtn}>
            <button className="btn custom-btn"><FontAwesomeIcon icon={faChevronLeft}/>{t('submitProduct')}</button>
          </div>
        </div>
      </form>
    </Container>
  )
}

export default StepThere;