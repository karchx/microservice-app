import styled from 'styled-components';
import { Route, Routes } from 'react-router-dom';
import { Header } from '../components';
import { Login, Register, Home, Article } from '../pages';

const StyledApp = styled.div``;

export function App() {
  return (
    <StyledApp>
      <Header />
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/home" element={<Home />} />
        <Route path="/article/:slug" element={<Article />} />
      </Routes>
    </StyledApp>
  );
}

export default App;
