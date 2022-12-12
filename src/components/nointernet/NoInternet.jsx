import {useState , useEffect} from 'react';
import styled from 'styled-components';

const Container = styled.div({
    height:'80vh',
    display:'flex',
    justifyContent:'center',
    alignItems:'center',

    // '&> div.imgCenter':{
    //     display:'flex',
    //     justifyContent:'center',
    //     marginBottom:'1rem',

    //     '& img':{
    //         maxWidth:'100%',
    //         height:'100px',
    //     }
    // },

    '&> div.content':{
        padding:'0px 15px 0px 15px',
        textAlign:'center',

        '& h1':{
            fontSize:'25px',
            color:'#717E93',
            marginBlockEnd:'.3rem'
        },

        '& p':{
            color:'#717E93',
            fontSize:'14px'
        },
    }
})

const NoInternetConnection = (props) => {
    // state variable holds the state of the internet connection
    const [isOnline, setOnline] = useState(true);

    // On initization set the isOnline state.
    useEffect(()=>{
        setOnline(navigator.onLine)
    },[])

    // event listeners to update the state 
    window.addEventListener('online', () => {
        setOnline(true)
    });

    window.addEventListener('offline', () => {
        setOnline(false)
    });

    // if user is online, return the child component else return a custom component
    if(isOnline){
    return(
        props.children
    )
    } else {
        return(
            <Container>
                <div className="content">
                    <h1>اینترنت وصل نیست</h1>
                    <p>لظفا دیوایس خود را به اینترنت متصل کنید</p>
                </div>
            </Container>
        )
    }
}

export default NoInternetConnection;