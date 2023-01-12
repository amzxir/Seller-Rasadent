import styles from './loading.module.scss'
import spinner from '../../images/loading.gif'

function Loading() {
  return (
    <div className={styles.loading}>
        <img src={spinner} alt="" />
    </div>
  )
}

export default Loading