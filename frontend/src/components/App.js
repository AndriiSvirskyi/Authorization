import React from 'react';
import './style.css'
import Header from './home/Header'

const App = ({ children }) => (
  <div>
    <Header history = {children.history}/>
    { children }
  </div>
);

export default App;
