import React from 'react'
import { BrowserRouter } from 'react-router-dom';
import Routes from '../routes/routes';

const App = () => {

  return (
    <main>
      <BrowserRouter>
        <Routes/>
      </BrowserRouter>
    </main>
  )
}

export default App;
