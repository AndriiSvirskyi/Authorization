import React from 'react';
import './style.css'
import Header from './home/Header'

const App = ({ children }) => (
  <div>
    <Header/>
    { children }
  </div>
);

export default App;
