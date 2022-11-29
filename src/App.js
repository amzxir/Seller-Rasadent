import { Route, Routes } from "react-router-dom";
import styled from 'styled-components';
import Login from "./components/auth/login";
import Dashboard from "./components/dashboard/dashboard";
import Menu from "./components/navbar/menu/menu";
import Nav from "./components/navbar/nav/nav";
import Welcome from "./components/welcome/welcome";
import Context from "./context/context";

const Container = styled.div`

`

function App() {
  return (
    <Context.Provider value={{  }}>
      <Nav/>
        <Container>
          <Routes>
            <Route path="/" element={<Welcome/>}/>
            <Route path="/login" element={<Login/>}/>
            <Route path="/dashboard" element={<Dashboard/>}/>
          </Routes>
        </Container>
      {/* <Menu/> */}
    </Context.Provider>
  );
}

export default App;
