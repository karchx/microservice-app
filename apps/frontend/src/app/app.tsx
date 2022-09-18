import styled from 'styled-components';
import { Route, Routes } from 'react-router-dom';
import { Header } from '../components';
import {Login, Register} from '../pages';

const StyledApp = styled.div`
`;

export function App() {
  return (
    <StyledApp>
      <Header/>
      <Routes>
        <Route path="/login" element={<Login/>} />
        <Route path="/register" element={<Register/>} />
      </Routes>
    </StyledApp>
  );
}

export default App;
