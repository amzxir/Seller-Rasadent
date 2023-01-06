import ReactPaginate from 'react-paginate'
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faChevronLeft , faChevronRight } from '@fortawesome/free-solid-svg-icons'
import styles from './paginate.module.scss'

function Paginate({ setItemOffset , dataProduct , pageCount }) {

 

  const handlePageClick = (event) => {
    const newOffset = (event.selected * 5) % dataProduct.length;
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