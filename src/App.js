import React from 'react';
import { BrowserRouter } from 'react-router-dom';

// import Routes from './routes';

import GlobalStyle, { Container } from './styles';


import Main from './pages/Main';

function App() {
  return (
    <BrowserRouter>
      <GlobalStyle />
      <Container>
        {/* <Routes /> */}
        <Main />
      </Container>
    </BrowserRouter>
  );
}

export default App;