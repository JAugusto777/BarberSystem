import React from 'react';
import ReactDOM from 'react-dom/client';
import  GlobalStyles from './global';
import Rotas from './rotas';


const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <Rotas />
    <GlobalStyles/>
  </React.StrictMode>
);
