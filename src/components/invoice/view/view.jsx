import { useEffect , useContext , useRef , useState } from "react"
import { useParams } from "react-router-dom"
import styled from "styled-components"
import styles from "./view.module.scss"
import logo from '../../../images/logo.png'
import Context from '../../../context/context'
import Pdf from 'react-to-pdf';


const Container = styled.div`

`

function Veiw({dataManage , setId}) {


    const {id} = useParams();

    const {t , i18n} = useContext(Context)

    useEffect(()=>{
        setId(id)
    },[id])

    useEffect(()=> {
        document.title = dataManage?.nameFa
    })

          
    const ref = useRef();


  return (
    <Container>
        <div ref={ref} className={styles.card}>
                  <div className={styles.invoice}>
                      <div className={styles.border}>
                          <img src={logo} alt="" />
                      </div>
                      <div className={styles.content}>
                          <h1>لورم ,ایپسوم</h1>
                          <small>لورم ایپسوم</small>
                          <p>120000تومان</p>
                          <small className={styles.feature}>لورم ایپسوم - لورم ایپسوم - لورم ایپسوم -لورم لور </small>
                      </div>
                  </div>
                  <div className={styles.details}>
                      <p className={styles.title}>جزئیات</p>
                      <div className={styles.deatails}>
                          <div className={styles.flex}><p>نام خریدار</p> <p>امیر احمدی</p></div>
                          <div className={styles.flex}><p>نام فروشنده</p> <p>لورم ایپسوم</p></div>
                          <div className={styles.flex}><p>دسته بندی</p> <p>لوازم دندان پزشکی</p></div>
                          <div className={styles.flex}><p>تاریخ</p> <p>۱۴۰۱/۲/۴</p></div>
                          <div className={styles.flex}><p>کد فاکتور</p> <p>۱۸۴۸۳۷۴</p></div>
                          <div className={styles.flex}><p>تعداد محصول</p> <p>۱۰</p></div>
                          <div className={styles.flex}><p>قیمت واحد</p> <p>۱۰۰,۰۰۰</p></div>
                          <div className={styles.flex}><p>قیمت کل</p> <p>۲۰۰,۰۰۰</p></div>
                          <div className={styles.flex}><p>قیمت نهایی</p> <p>۳۰۰,۰۰۰</p></div>

                      </div>
                  </div>
        </div>
        <Pdf targetRef={ref} filename="invoice.pdf" x={50}>
          {({ toPdf }) => (
              <div className={styles.justifybtn}>
                  <button type="button" className="btn" onClick={toPdf}>خروجی PDF</button>
              </div>
        )}
        </Pdf>

    </Container>
  )
}

export default Veiw;