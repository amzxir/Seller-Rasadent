import { Route, Routes } from "react-router-dom";
import styled from 'styled-components';
import Dashboard from "./components/dashboard/dashboard";
import Menu from "./components/navbar/menu/menu";
import Welcome from "./components/welcome/welcome";
import Context from "./context/context";

const Container = styled.div`

`

function App() {
  return (
    <Context.Provider value={{  }}>
      <Container>
        <Routes>
          <Route path="/" element={<Welcome/>}/>
          <Route path="/dashboard" element={<Dashboard/>}/>
        </Routes>
        {/* <Menu/> */}
      </Container>
    </Context.Provider>
  );
}

export default App;
