import React, { Component } from 'react';
import './App.css';
import './App.scss';
import { Route,Routes } from 'react-router-dom';
import LayoutVenta from './pages/layoutVenta';
import FormComp from './components/containers/formComp';
import Home from './components/containers/home';

class App extends Component {
  render() {
    return (
      <div className="App">
        <Routes>
          <Route path='/' element={<LayoutVenta></LayoutVenta>}>
            <Route index element={<Home></Home>}></Route>
            <Route path='sale' element={<FormComp></FormComp>}></Route>
          </Route>
        </Routes>
      </div>
    );
  }
}

export default App;
