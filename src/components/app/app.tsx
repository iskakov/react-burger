import React, { FC } from 'react'
import { BrowserRouter } from 'react-router-dom';
import Routes from '../routes/routes';

const App: FC = () => {

  return (
    <main>
      <BrowserRouter>
        <Routes/>
      </BrowserRouter>
    </main>
  )
}

export default App;
