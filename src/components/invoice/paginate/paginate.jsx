import ReactPaginate from 'react-paginate'
import styles from './paginate.module.scss'
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faChevronLeft , faChevronRight } from '@fortawesome/free-solid-svg-icons'

function Paginate({ setItemOffset , dataInvoice , pageCount }) {

 

  const handlePageClick = (event) => {
    const newOffset = (event.selected * 5) % dataInvoice.length;
    console.log(
      `User requested page number ${event.selected}, which is offset ${newOffset}`
    );
    setItemOffset(newOffset);
  };

  return (
    <>
    <ReactPaginate
        breakLabel="..."
        nextLabel={<FontAwesomeIcon icon={faChevronLeft}/>}
        onPageChange={handlePageClick}
        pageRangeDisplayed={5}
        pageCount={pageCount}
        previousLabel={<FontAwesomeIcon icon={faChevronRight}/>}
        renderOnZeroPageCount={null}
        className={styles.paginates}
    />
    </>
  )
}

export default Paginate;