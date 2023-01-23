import { useContext , useEffect } from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from "yup";
import { useParams } from "react-router-dom";
import styled from "styled-components"
import Context from "../../../context/context";
import styles from './edit.module.scss'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faFileSignature , faMoneyBill , faStore , faEye , faB , faGlobe , faHandHoldingMedical , faHandshake , faUpload  } from '@fortawesome/free-solid-svg-icons'
import { useState } from "react";
import axios from "axios";
import Loading from "../../loading/loading";


const Container = styled.div`

`

const schema = yup.object().shape({
  uploadImages: yup.mixed().test("file", "فیلد تصویر محصول اجباری است", (value) => {
  if (value.length > 0) {  
      return true;
  }
  return false;
  }),
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
  description: yup.string().required('فیلد توضیحات محصول اجباری است').min(12 , 'فیلد توضیحات باید ۱۲ کارکتر باشد'),

})

function Edit({dataManage , setId}) {

  const {id} = useParams();

  useEffect(()=> {
    setId(id)
  },[id])

  useEffect(()=> {
    document.title = 'ویرایش محصولات'
  })

  const {t , token , spinner , setSpinner} = useContext(Context)

  const [brand , setBrand] = useState({})
  

  useEffect(()=> {
    setSpinner(true)
    const getBrand = async() => {
       // pass token in header api
       const config = {
        headers: { Authorization: `Bearer ${token}` }
        }
        const bodyParameters = {
          key: "value"
        }
        const Response = await axios.post('http://test.rasadent.com/api/ListBrand', bodyParameters, config)
          setBrand(Response.data.brands)
          setSpinner(false)
        }

    getBrand()
  },[])


  console.log(dataManage)

  const { register , handleSubmit, formState:{ errors } } = useForm({
    resolver: yupResolver(schema)
  });

  const onSubmit = (data) => {
    console.log(data)
  }

  if(spinner){
    return <Loading/>
  }

  return (
    <Container>
        <form className={styles.editProduct} onSubmit={handleSubmit(onSubmit)}>
          <div className={styles.pad}>
            <div className={styles.formGroup}>
                <div className={styles.borderImg}>
                    <label htmlFor="uploadImages" style={{ position:'absolute' , left:'85%' , top:'60%'  }}
                    className={styles.nameLabel}><FontAwesomeIcon icon={faUpload}/></label>
                </div>
                <span style={{ display:'flex' , justifyContent:'center' , paddingTop:'20px' }} className={styles.error}>{errors.uploadImages?.message}</span>
                <input type="file" id="uploadImages" className="formControl dNone" multiple {...register("uploadImages")}/>
            </div>
            <div className={styles.formGroup}>
              <label className={styles.nameLabel}>{t('labelNameFa')}</label>
              <span className={styles.error}>{errors.nameFa?.message}</span>
              <input type="text" className="formControl" {...register("nameFa")}  defaultValue={dataManage.fa_name} />
              <FontAwesomeIcon icon={faFileSignature} />
            </div>
            <div className={styles.formGroup}>
            <label className={styles.nameLabel}>{t('labelNameEn')}</label>
            <span className={styles.error}>{errors.nameEn?.message}</span>
            <input type="text" className="formControl" {...register("nameEn")} defaultValue={dataManage.en_name}/>
            <FontAwesomeIcon icon={faFileSignature} />
            </div>
            <div className={styles.formGroup}>
              <label className={styles.nameLabel}>{t('labelPrice')}</label>
              <span className={styles.error}>{errors.price?.message}</span>
              <input type="text" className="formControl" {...register("price")} defaultValue={dataManage.price} />
              <FontAwesomeIcon icon={faMoneyBill} />
            </div>
            <div className={styles.formGroup}>
              <label className={styles.nameLabel}>{t('labelStock')}</label>
              <span className={styles.error}>{errors.stock?.message}</span>
              <input type="text" className="formControl" {...register("stock")} defaultValue={dataManage.product_stock}/>
              <FontAwesomeIcon icon={faStore} />
            </div>
            <div className={styles.formGroup}>
              <label className={styles.nameLabel}>{t('labelstatusStock')}</label>
              <span className={styles.error}>{errors.statusStock?.message}</span>
              <select className="formSelect" {...register("statusStock")} defaultValue={dataManage.product_show}>
                <option value=''>انتخاب کنید</option>
                <option value="1" selected={dataManage.product_show === '1'}>بله</option>
                <option value="0" selected={dataManage.product_show === '0'}>خیر</option>
              </select>
              <FontAwesomeIcon icon={faEye} />
            </div>
            <div className={styles.formGroup}>
              <label className={styles.nameLabel}>{t('labelstatusSee')}</label>
              <span className={styles.error}>{errors.statusSee?.message}</span>
              <select className="formSelect" {...register("statusSee")} defaultValue={dataManage.statusSee}>
                <option>انتخاب کنید</option>
                <option value="بله">بله</option>
                <option value="خیر">خیر</option>
              </select>
              <FontAwesomeIcon icon={faEye} />
            </div>
            <div className={styles.formGroup}>
              <label className={styles.nameLabel}>{t('labelBrand')}</label>
              <span className={styles.error}>{errors.brand?.message}</span>
              <select className="formSelect" {...register("brand")} defaultValue={dataManage.brand}>
                <option>انتخاب کنید</option>
                {Object.values(brand).map((i , index)=> {
                  return(
                    <option key={index} value={i}>{i}</option>
                  )
                })}
              </select>
              <FontAwesomeIcon icon={faB} />
            </div>
            <div className={styles.formGroup}>
              <label className={styles.nameLabel}>{t('labelCountry')}</label>
              <span className={styles.error}>{errors.country?.message}</span>
              <select className="formSelect" {...register("country")} defaultValue={dataManage.country}>
                <option>انتخاب کنید</option>
              </select>
              <FontAwesomeIcon icon={faGlobe} />
            </div>
            <div className={styles.formGroup}>
              <label className={styles.nameLabel}>{t('labelWarranty')}</label>
              <span className={styles.error}>{errors.warranty?.message}</span>
              <select className="formSelect" {...register("warranty")} defaultValue={dataManage.warranty}>
                <option>انتخاب کنید</option>
              </select>
              <FontAwesomeIcon icon={faHandHoldingMedical} />
            </div>
            <div className={styles.formGroup}>
              <label className={styles.nameLabel}>{t('labelGuarantee')}</label>
              <span className={styles.error}>{errors.guarantee?.message}</span>
              <select className="formSelect" {...register("guarantee")} defaultValue={dataManage.guarantee}>
                <option>انتخاب کنید</option>
              </select>
              <FontAwesomeIcon icon={faHandshake} />
            </div>
            <div className={styles.formGroup}>
                <label className={styles.nameLabel}>{t('descriptionProduct')}</label>
                <span className={styles.error}>{errors.description?.message}</span>
                <textarea type="text" className="formControl" {...register("description")} defaultValue={dataManage.product_description} />
            </div>
          </div>
          <div className={styles.justifyBtn}>
            <button className="btn custom-btn">ویرایش محصول</button>
          </div>
        </form>
    </Container>
  )
}

export default Edit;