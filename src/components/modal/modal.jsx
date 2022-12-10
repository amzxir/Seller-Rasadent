import { useContext } from 'react';
import styled from 'styled-components';
import Context from '../../context/context';
import styles from './modal.module.scss'

const Modal = styled.div`
`

function Modals({show , children}) {
  
  const {setModal} = useContext(Context)

  return (
    <Modal className={!show?'dNone':'openModal dBlock'}>
        {
          children
        }
    </Modal>
  )
}

export default Modals;