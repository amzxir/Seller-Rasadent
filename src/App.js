import { useState } from "react";
import { Route, Routes } from "react-router-dom";
import { ToastContainer } from 'react-toastify';
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

const Container = styled.div`

`

function App() {

  const [auth , setAuth] = useState(false)

  return (
    <Context.Provider value={{ 
      auth , setAuth
     }}>
      <Nav/>
        <Container>
          <Routes>
            <Route element={<PrivateRoutes/>}>
              <Route path="/dashboard" element={<Dashboard/>}/>
              <Route path="/product" element={<Product/>}/>
              <Route path="/invoice" element={<Invoice/>}/>
              <Route path="/messages" element={<Messages/>}/>
            </Route>
            <Route path="/" element={<Welcome/>}/>
            <Route path="/login" element={<Login/>}/>
          </Routes>
        </Container>
      <Menu/>
      <ToastContainer 
          position="bottom-right"
          rtl={true}
          theme="colored"
        />
    </Context.Provider>
  );
}

export default App;
