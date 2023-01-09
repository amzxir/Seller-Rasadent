import styled from "styled-components";
import notFound from '../../images/not-page.png'

const Container = styled.div({
    height:'80vh',
    display:'flex',
    justifyContent:'center',
    alignItems:'center',

    '&> div.content':{
        padding:'0px 15px 0px 15px',
        textAlign:'center',

        '&> img':{
            maxWidth:'100%',
            height:'auto',
        },

        '& h1':{
            fontSize:'25px',
            color:'#717E93',
            marginBlockEnd:'.3rem'
        },

    }
})


function NotFound() {
  return (
    <Container>
        <div className="content">
            <img src={notFound} alt="" />
            <h1>صفحه مورد نظر یافت نشد</h1>
        </div>
    </Container>
  )
}

export default NotFound;