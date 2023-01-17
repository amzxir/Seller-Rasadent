import { useContext , useEffect , useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from 'react-toastify';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faChevronLeft , faB , faGlobe  } from '@fortawesome/free-solid-svg-icons'
import styled from "styled-components"
import Context from "../../../../context/context"
import styles from '../create.module.scss'
import axios from "axios"
import { ErrorMessage } from '@hookform/error-message';
import Loading from "../../../loading/loading";




const Container = styled.div`
`


function StepThere(props) {

  // context
  const {t , i18n , token , spinner , setSpinner} = useContext(Context)

  // title page
  useEffect(()=> {
    document.title = 'ویژگی محصولات'
  })
  
  // const brand 
  const [brand , setBrand] = useState({})

  const [feature , setFeature] = useState({})

  const [peroperValue , setPeroperValue] = useState({})

  useEffect(()=> {
    setSpinner(true)
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
      const Response = await axios.post('http://test.rasadent.com/api/CategoryFeature', bodyParameters, config)
      setFeature(Response.data)
      setSpinner(false)
      // console.log(Response.data)
    }

    apiFeature()
  },[])

  useEffect(()=> {
      setSpinner(true)
      const dataBrand = async()=> {
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
      dataBrand();
  }, [])



  useEffect(()=> {
    setSpinner(true)
    const peroperty = async() => {

        // pass token in header api
        const config = {
            headers: { Authorization: `Bearer ${token}` }
        }
        const bodyParameters = {
          key: "value",
          feature_id:'15'
        }
        const Response = await axios.post('https://test.rasadent.com/api/PeropertyValue', bodyParameters, config)
        setPeroperValue(Response.data.values)
        setSpinner(false)
        // console.log(Response.data.values)
      

    }
    peroperty()
  },[])

  // console.log(feature)

  // state react hook form
  const { register, formState: { errors }, handleSubmit } = useForm();

  const onSubmit = async(data) => {
    setSpinner(true)

    const obj = data
    const arreyProperty = ["کشور_ایران","گارانتی_دارد","ضمانت_دارد"]
    // console.log(obj)
    const peroperty = Object.values(obj)
    const newPeroperty = peroperty[0]
    var index = peroperty.indexOf(newPeroperty);
    if (index > -1) { //Make sure item is present in the array, without if condition, -n indexes will be considered from the end of the array.
      peroperty.splice(index, 1);
    }


    // var res = Object.keys(peroperty).reduce((prev, curr, index) => { return {...prev, ['string '+(index+1)]: peroperty[curr]}}, {});
    // console.log(res);

    const productData = props.data
    const categoryProduct = sessionStorage.getItem('category')

    const config = {
      headers: { Authorization: `Bearer ${token}` }
    }
    const bodyParameters = {
        key: "value",
        images:productData.uploadImages,
        fa_name:productData.nameFa,
        peroperies:peroperty,
        en_name:productData.nameEn,
        product_category:categoryProduct,
        product_brand:data.brand,
        product_worth:productData.price,
        product_show:productData.statusSee,
        product_stock:productData.statusStock,
        product_description:productData.description,
    }


    try {
      const Response = await axios.post('http://test.rasadent.com/api/ProductCreate' , bodyParameters , config);
      const StatusCode = Response.data.status_code
      setSpinner(false);
      if (StatusCode === 422){
        toast.error(Response.data.msg)
      } else {
        toast.success("محصول با موفقیت ثبت شد")
        // console.log(data)
      }
      console.log(Response);
      } catch (error) {
        console.error(error);
    }

  }

  if(spinner){
    return <Loading/>
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
                  {Object.keys(peroperValue).map((key, index) => {
                    return (
                      <option key={index} value={key}>{key}</option>
                    );
                  })}
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