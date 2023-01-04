import { useContext , useState , useEffect } from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from "yup";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faFileSignature , faChevronLeft , faMoneyBill , faStore , faEye , faUpload } from '@fortawesome/free-solid-svg-icons'
import styled from "styled-components"
import styles from '../create.module.scss'
import Context from "../../../../context/context";
import SeparatedNumberInput from 'react-separated-number-input';




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
    description: yup.string().required('فیلد توضیحات محصول اجباری است').min(12 , 'فیلد توضیحات باید ۱۲ کارکتر باشد'),

})


function StepTwo(props) {

    useEffect(()=> {
        document.title = 'اطلاعات محصول'
    })
    
    const [selectedImage, setSelectedImage] = useState(null);

    const {t , i18n} = useContext(Context)

    const { register, handleSubmit, formState:{ errors } } = useForm({
        resolver: yupResolver(schema)
    });
    
    const onSubmit = (data) => {
        console.log(data)
        props.nextStep(data);
    }



  return (
    <Container>
        <form className={styles.formProduct} onSubmit={handleSubmit(onSubmit)}>
            <div className={styles.pad}>
                <div className={styles.formGroup}>
                    <label htmlFor="uploadImages" className={styles.nameLabel}>{t('labelUploadImages')}</label>
                    <span className={styles.error}>{errors.uploadImages?.message}</span>
                    <input type="file" className="formControl" id="uploadImages" multiple {...register("uploadImages")}/>
                    <FontAwesomeIcon icon={faUpload} />
                </div>

                <div className={styles.formGroup}>
                    <label className={styles.nameLabel}>{t('labelNameFa')}</label>
                    <span className={styles.error}>{errors.nameFa?.message}</span>
                    <input type="text" className="formControl" {...register("nameFa")}/>
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
                    <SeparatedNumberInput groupLengths={[3, 3, 3 , 3 , 3 , 3]} type="text" className="formControl vazir ltr" {...register("price")} />
                    <FontAwesomeIcon icon={faMoneyBill} />
                </div>
                <div className={styles.formGroup}>
                    <label className={styles.nameLabel}>{t('labelStock')}</label>
                    <span className={styles.error}>{errors.stock?.message}</span>
                    <input type="text" className="formControl vazir" {...register("stock")} />
                    <FontAwesomeIcon icon={faStore} />
                </div>
                <div className={styles.formGroup}>
                    <label className={styles.nameLabel}>{t('labelstatusStock')}</label>
                    <span className={styles.error}>{errors.statusStock?.message}</span>
                    <select className="formSelect" {...register("statusStock")}>
                    <option value=''>انتخاب کنید</option>
                    <option value="بله">بله</option>
                    <option value="خیر">خیر</option>
                    </select>
                    <FontAwesomeIcon icon={faEye} />
                </div>
                <div className={styles.formGroup}>
                    <label className={styles.nameLabel}>{t('labelstatusSee')}</label>
                    <span className={styles.error}>{errors.statusSee?.message}</span>
                    <select className="formSelect" {...register("statusSee")}>
                    <option value=''>انتخاب کنید</option>
                    <option value="بله">بله</option>
                    <option value="خیر">خیر</option>
                    </select>
                    <FontAwesomeIcon icon={faEye} />
                </div>
                <div className={styles.formGroup}>
                    <label className={styles.nameLabel}>{t('descriptionProduct')}</label>
                    <span className={styles.error}>{errors.description?.message}</span>
                    <textarea type="text" className="formControl" {...register("description")} />
                </div>
                <div className={styles.justifyBtn}>
                    <button className="btn custom-btn"><FontAwesomeIcon icon={faChevronLeft}/>{t('nextStep')}</button>
                </div>
            </div>
        </form>
    </Container>
  )
}

export default StepTwo;