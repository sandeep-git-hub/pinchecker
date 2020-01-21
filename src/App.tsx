import React from 'react';
import logo from './logo.svg';
import './App.css';
import Sample from './components/sample';
import { Route, Switch } from 'react-router-dom';
import SavedPin from './components/savedPins/savedPins';
import GenerateSavePin from './components/generate/generateSavePin';

const App: React.FC = () => {
  return (
    <div className="App">
     {/*  <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.tsx</code> and save to reload.
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a> */}
        <Switch>
          <Route path="/saved" component={SavedPin}/>
          <Route path="/generate" component={GenerateSavePin}/>
        </Switch>

      {/* </header> */}
    </div>
  );
}

export default App;
