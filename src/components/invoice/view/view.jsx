import { useEffect } from "react";
import { useParams } from "react-router-dom";
import styled from "styled-components"

const Container = styled.div`

`

function Veiw({dataManage , setId}) {

    const {id} = useParams();

    useEffect(()=>{
        setId(id)
    },[id])


  return (
    <Container>
        veiw
    </Container>
  )
}

export default Veiw;