import { Route, Routes } from "react-router-dom";
import styled from 'styled-components';
import Welcome from "./components/welcome/welcome";

const Container = styled.div`

`

function App() {
  return (
    <Container>
      <Routes>
        <Route path="/" element={<Welcome/>}/>
      </Routes>
    </Container>
  );
}

export default App;
