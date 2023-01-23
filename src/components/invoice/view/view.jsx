import { useEffect , useContext , useRef , useState } from "react"
import { useParams } from "react-router-dom"
import styled from "styled-components"
import styles from "./view.module.scss"
import logo from '../../../images/logo.png'
import Context from '../../../context/context'
import Pdf from 'react-to-pdf';
import axios from "axios"
import Loading from "../../loading/loading"


const Container = styled.div`

`

function Veiw({dataManage , setId}) {


    const {id} = useParams();

    const {t , i18n , token , spinner , setSpinner} = useContext(Context)

    useEffect(()=>{
        setId(id)
    },[id])

    useEffect(()=> {
        document.title = dataManage?.number
    })

    const [singleInvoice , setSingleInvoice] = useState([])

    useEffect(()=> {
        setSpinner(true)
        const getSingleInvoice = async() => {
            const id = dataManage.id
            // pass token in header api
            const config = {
                headers: { Authorization: `Bearer ${token}` }
            }
            const bodyParameters = {
                key: "value",
                invoice_id:id
            }
            const Response = await axios.post('https://test.rasadent.com/api/ShowSingleInvoice', bodyParameters, config)
            setSingleInvoice(Response.data.items)
            setSpinner(false)

                    
        }

        getSingleInvoice()
    },[])

    console.log(singleInvoice)

          
    const ref = useRef();

    if(spinner){
        return <Loading/>
    }

  return (
    <Container>
        <div ref={ref} className={styles.card}>
                  <div className={styles.invoice}>
                      <div className={styles.border}>
                          <img src={logo} alt="" />
                      </div>
                      <div className={styles.content}>
                          <h1>{dataManage?.number}</h1>
                          <small>{dataManage?.number}</small>
                          <p>{dataManage?.total_price} تومان</p>
                          {/* <small className={styles.feature}>لورم ایپسوم - لورم ایپسوم - لورم ایپسوم -لورم لور </small> */}
                      </div>
                  </div>
                {singleInvoice?.map((i , index)=> {
                    console.log(singleInvoice.length)
                    return(
                    <div key={index} className={styles.details}>
                        <p className={styles.title}>جزئیات فاکتور {singleInvoice.length <= 1 ? '' : index + 1}</p>
                        <div className={styles.deatails}>
                            <div className={styles.flex}><p>نام خریدار</p> <p>امیر احمدی</p></div>
                            <div className={styles.flex}><p>نام فروشنده</p> <p>لورم ایپسوم</p></div>
                            <div className={styles.flex}><p>دسته بندی</p> <p>لوازم دندان پزشکی</p></div>
                            <div className={styles.flex}><p>تاریخ</p> <p>۱۴۰۱/۲/۴</p></div>
                            <div className={styles.flex}><p>کد فاکتور</p> <p>۱۸۴۸۳۷۴</p></div>
                            <div className={styles.flex}><p>تعداد محصول</p> <p>{i.count}</p></div>
                            <div className={styles.flex}><p>قیمت واحد</p> <p>{i.price}</p></div>
                            <div className={styles.flex}><p>تخفیف</p> <p>{i.discount} %</p></div>
                            <div className={styles.flex}><p>قیمت کل</p> <p>{i.price * i.count}</p></div>
                            <div className={styles.flex}><p>قیمت نهایی</p> <p>{i.price * i.count}</p></div>
                        </div>
                    </div>
                    )
                })}
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