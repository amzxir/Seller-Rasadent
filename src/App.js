import { useState } from "react";
import { Route, Routes } from "react-router-dom";
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
import PrivateRoutes from "./components/utlis/private-routes";
import Welcome from "./components/welcome/welcome";
import Context from "./context/context";
import NoInternetConnection from "./components/nointernet/NoInternet";
import Manage from "./components/product/manage/manage";
import Create from "./components/product/create/create";
import Edit from "./components/product/edit/edit";

const Container = styled.div`

`

function App() {

  const [auth , setAuth] = useState(false)

  const {t , i18n} = useTranslation()

  const [dataManage , setDataManage] = useState()

  const getDataManage = (i) => {
    // console.log(i)
    setDataManage(i)
  }


  return (
    <Context.Provider value={{ 
      auth , setAuth , 
      t , i18n
     }}>

      <NoInternetConnection>
        <Nav/>
          <Container>
            <Routes>
              <Route path="/" exact element={<Welcome/>}/>
              <Route path="/login" exact element={<Login/>}/>
              <Route element={<PrivateRoutes/>}>
                <Route path="/dashboard" exact element={<Dashboard/>}/>
                <Route path="/product" exact element={<Product/>}/>
                <Route path="/create-product" element={<Create/>}/>
                <Route path="/manage-product" element={<Manage functionData={getDataManage}/>}/>
                <Route path="/edit-product/:id" element={<Edit dataManage={dataManage}/>}/>
                <Route path="/invoice" exact element={<Invoice/>}/>
                <Route path="/messages" exact element={<Messages/>}/>
              </Route>
            </Routes>
          </Container>
        <Menu/>
        <ToastContainer 
            position="bottom-right"
            rtl={true}
            theme="colored"
          />
      </NoInternetConnection>
    </Context.Provider>
  );
}

export default App;
