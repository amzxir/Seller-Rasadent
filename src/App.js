import { useState } from "react";
import { Route, Routes, useLocation } from "react-router-dom";
import { ToastContainer } from 'react-toastify';
import { useTranslation } from 'react-i18next';
import 'react-toastify/dist/ReactToastify.css';
import styled from 'styled-components';
import Login from "./components/auth/login";
import Dashboard from "./components/dashboard/dashboard";
import Invoice from "./components/invoice/invoice";
import Messages from "./components/message/message";
import Menu from "./components/navbar/menu/menu";
import Nav from "./components/navbar/nav/nav";
import Product from "./components/product/product";
import Welcome from "./components/welcome/welcome";
import Context from "./context/context";
import NoInternetConnection from "./components/nointernet/NoInternet";
import ManageProduct from "./components/product/manage/manage";
import Create from "./components/product/create/create";
import Edit from "./components/product/edit/edit";
import ManageInvoice from "./components/invoice/manage/manage";
import ViewInvoice from "./components/invoice/view/view";
import VeiwMessage from "./components/message/view/view";
import RequestInvoice from "./components/invoice/request/request";
import { ComponentTransition, AnimationTypes } from "react-component-transition";
import Protected from "./Protected";
import NotFound from "./components/not-found/not-found";



const Container = styled.div`

`

function App() {

  // language platform
  const {t , i18n} = useTranslation()

  // get data component
  const [dataManage , setDataManage] = useState()

  // loading state
  const [spinner, setSpinner] = useState(false);    

  // api message state
  const [unreadMessage , setUnreadMessage] = useState({})

  // api invoice state
  const [invoices , setInvoices] = useState([])


  // get data function component
  const getDataManage = (i) => {
    // console.log(i)
    setDataManage(i)
  }

  // get id data
  const [urlId , setUrlId] = useState()

  // get id data function component
  const setId = (id) => {
    setUrlId(id)
  }

  // state modal
  const [modal , setModal] = useState(false)


  const location = useLocation();

  const token = localStorage.getItem("token");

  return (
    <Context.Provider value={{ 
      t , i18n , setModal , 
      modal , token , unreadMessage,
      setUnreadMessage, spinner ,
      setSpinner , invoices ,
      setInvoices
     }}>
      <NoInternetConnection>
          <Nav id={urlId}/>
            <Container>
              <ComponentTransition enterAnimation={AnimationTypes.slideLeft.enter}>
                <Routes key={location.key} location={location}>
                  <Route path="/login" exact element={<Login/>}/>
                  <Route path="/" exact element={<Welcome/>}/>
                  <Route element={<Protected/>}>
                      <Route path="/dashboard" exact element={<Dashboard/>}/>
                      <Route path="/product" exact element={<Product/>}/>
                      <Route path="/create-product" element={<Create/>}/>
                      <Route path="/manage-product" element={<ManageProduct functionData={getDataManage}/>}/>
                      <Route path="/edit-product/:id" element={<Edit dataManage={dataManage} setId={setId}/>}/>
                      <Route path="/invoice" exact element={<Invoice/>}/>
                      <Route path="/manage-invoice" element={<ManageInvoice functionData={getDataManage}/>}/>
                      {/* <Route path="/request-invoice" element={<RequestInvoice functionData={getDataManage}/>}/> */}
                      <Route path="/view-invoice/:id" element={<ViewInvoice dataManage={dataManage} setId={setId}/>}/>
                      <Route path="/messages" exact element={<Messages functionData={getDataManage}/>}/>
                      <Route path="/messages-view/:id" exact element={<VeiwMessage dataManage={dataManage} setId={setId}/>}/>
                      <Route path="*" exact element={<NotFound/>}/>
                  </Route>
                </Routes>
              </ComponentTransition>
            </Container>
          <Menu id={urlId}/>
      </NoInternetConnection>
      <ToastContainer 
        position="top-right"
        rtl={true}
        theme="colored"
        style={{ zIndex:'100000'  }}
      />
    </Context.Provider>
  );
}

export default App;
