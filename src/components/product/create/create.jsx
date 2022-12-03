import { useForm } from "react-hook-form";
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from "yup";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faFileSignature , faMoneyBill , faStore , faEye , faB , faGlobe , faHandHoldingMedical , faHandshake  } from '@fortawesome/free-solid-svg-icons'
import styled from "styled-components"
import styles from './create.module.scss'
import { useContext, useEffect } from "react";
import Context from "../../../context/context";


const Container = styled.div`
`

const schema = yup.object().shape({
  nameFa: yup.string().required('فیلد نام فارسی محصول اجباری است'),
  nameEn: yup.string().required('فیلد نام انگیلیسی محصول اجباری است'),
  price: yup.number().typeError('فیلد قیمت باید عدد باشد').required('فیلد قیمت محصول اجباری است').integer('فیلد قیمت باید عدد صحیح باشد'),
  stock: yup.number().typeError('فیلد موجودی باید عدد باشد').required('فیلد موجودی محصول اجباری است').integer('فیلد موجودی باید عدد صحیح باشد'),
  statusStock: yup.string().required('فیلد وضعیت نمایش اجباری است'),
  statusSee: yup.string().required('فیلد وضعیت نمایش اجباری است'),
  brand: yup.string().required('فیلد برند اجباری است'),
  country: yup.string().required('فیلد کشور سازنده اجباری است'),
  warranty: yup.string().required('فیلد گارانتی اجباری است'),
  guarantee: yup.string().required('فیلد ضمانت اجباری است'),

})

function Create() {

  useEffect(()=> {
    document.title = 'ایجاد محصول'
  })

  const {t , i18n} = useContext(Context)

  const { register, handleSubmit, formState:{ errors } } = useForm({
    resolver: yupResolver(schema)
  });

  const onSubmit = (data) => {

    console.log(data)
  }
  
  return (
    <Container>
      <form className={styles.formProduct} onSubmit={handleSubmit(onSubmit)}>
        <div className={styles.pad}>
          <div className={styles.formGroup}>
            <label className={styles.nameLabel}>{t('labelNameFa')}</label>
            <span className={styles.error}>{errors.nameFa?.message}</span>
            <input type="text" className="formControl" {...register("nameFa")} />
            <FontAwesomeIcon icon={faFileSignature} />
          </div>
          <div className={styles.formGroup}>
            <label className={styles.nameLabel}>{t('labelNameEn')}</label>
            <span className={styles.error}>{errors.nameEn?.message}</span>
            <input type="text" className="formControl" {...register("nameEn")} />
            <FontAwesomeIcon icon={faFileSignature} />
          </div>
          <div className={styles.formGroup}>
            <label className={styles.nameLabel}>{t('labelPrice')}</label>
            <span className={styles.error}>{errors.price?.message}</span>
            <input type="text" className="formControl" {...register("price")} />
            <FontAwesomeIcon icon={faMoneyBill} />
          </div>
          <div className={styles.formGroup}>
            <label className={styles.nameLabel}>{t('labelStock')}</label>
            <span className={styles.error}>{errors.stock?.message}</span>
            <input type="text" className="formControl" {...register("stock")} />
            <FontAwesomeIcon icon={faStore} />
          </div>
          <div className={styles.formGroup}>
            <label className={styles.nameLabel}>{t('labelstatusStock')}</label>
            <span className={styles.error}>{errors.statusStock?.message}</span>
            <select className="formSelect" {...register("statusStock")}>
              <option>انتخاب کنید</option>
              <option value="بله">بله</option>
              <option value="خیر">خیر</option>
            </select>
            <FontAwesomeIcon icon={faEye} />
          </div>
          <div className={styles.formGroup}>
            <label className={styles.nameLabel}>{t('labelstatusSee')}</label>
            <span className={styles.error}>{errors.statusStock?.message}</span>
            <select className="formSelect" {...register("statusSee")}>
              <option>انتخاب کنید</option>
              <option value="بله">بله</option>
              <option value="خیر">خیر</option>
            </select>
            <FontAwesomeIcon icon={faEye} />
          </div>
          <div className={styles.formGroup}>
            <label className={styles.nameLabel}>{t('labelBrand')}</label>
            <span className={styles.error}>{errors.statusStock?.message}</span>
            <select className="formSelect" {...register("brand")}>
              <option>انتخاب کنید</option>
            </select>
            <FontAwesomeIcon icon={faB} />
          </div>
          <div className={styles.formGroup}>
            <label className={styles.nameLabel}>{t('labelCountry')}</label>
            <span className={styles.error}>{errors.statusStock?.message}</span>
            <select className="formSelect" {...register("country")}>
              <option>انتخاب کنید</option>
            </select>
            <FontAwesomeIcon icon={faGlobe} />
          </div>
          <div className={styles.formGroup}>
            <label className={styles.nameLabel}>{t('labelWarranty')}</label>
            <span className={styles.error}>{errors.statusStock?.message}</span>
            <select className="formSelect" {...register("warranty")}>
              <option>انتخاب کنید</option>
            </select>
            <FontAwesomeIcon icon={faHandHoldingMedical} />
          </div>
          <div className={styles.formGroup}>
            <label className={styles.nameLabel}>{t('labelGuarantee')}</label>
            <span className={styles.error}>{errors.statusStock?.message}</span>
            <select className="formSelect" {...register("guarantee")}>
              <option>انتخاب کنید</option>
            </select>
            <FontAwesomeIcon icon={faHandshake} />
          </div>
        </div>
        <div className={styles.justifyBtn}>
          <button className="btn custom-btn">{t('submitProduct')}</button>
        </div>
      </form>
    </Container>
  )
}

export default Create