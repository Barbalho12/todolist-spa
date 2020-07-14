import React from 'react';
import { BrowserRouter } from 'react-router-dom';

import Routes from './routes';

import GlobalStyle, { Container } from './styles';

function App() {
  return (
    <BrowserRouter>
      <GlobalStyle />
      <Container>
        <Routes />
      </Container>
    </BrowserRouter>
  );
}

export default App;