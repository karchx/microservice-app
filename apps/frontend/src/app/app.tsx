import styled from 'styled-components';
import { Route, Routes } from 'react-router-dom';
import { Header } from '../components';
import { Login, Register, Home } from '../pages';

const StyledApp = styled.div``;

export function App() {
  return (
    <StyledApp>
      <Header />
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/home" element={<Home />} />
      </Routes>
    </StyledApp>
  );
}

export default App;
